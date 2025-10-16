<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import { bootComplete } from '../stores/boot';
  import { commands } from '../utils/commands';
  import { track } from '../utils/tracking';

  let command = '';
  let historyIndex = -1;

  let input: HTMLInputElement;

  // Filter output based on screen size - remove hidden device-specific content
  function filterOutputForDevice(output: string): string {
    const isMobile = window.innerWidth <= 640;

    if (isMobile) {
      // Remove desktop content on mobile
      return output.replace(/\[DESKTOP\].*?\[\/DESKTOP\]/gs, '');
    } else {
      // Remove mobile content on desktop
      return output.replace(/\[MOBILE\].*?\[\/MOBILE\]/gs, '');
    }
  }

  onMount(() => {
    input.focus();

    // Only show banner after boot sequence is complete
    if ($bootComplete && $history.length === 0) {
      const command = commands['banner'] as () => string;

      if (command) {
        const rawOutput = command();
        const output = filterOutputForDevice(rawOutput);

        // Banner/home page should display instantly without teletype
        $history = [...$history, {
          command: 'banner',
          outputs: [output],
          isTyping: false
        }];
      }
    }
  });

  afterUpdate(() => {
    // Enhanced mobile keyboard visibility
    if (window.innerWidth <= 640) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      input.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  });

  const handleSubmit = async (event?: Event) => {
    if (event) {
      event.preventDefault();
    }

    const [commandName, ...args] = command.split(' ');
    const commandNameLower = commandName.toLowerCase();

    if (import.meta.env.VITE_TRACKING_ENABLED === 'true') {
      track(commandNameLower, ...args);
    }

    const commandFunction = commands[commandNameLower];

    if (commandFunction) {
      // Skip history for reboot command (it will reload the page)
      if (commandNameLower === 'reboot') {
        await commandFunction(args);
        return; // Don't continue - page will reload
      }

      const rawOutput = await commandFunction(args);
      const output = filterOutputForDevice(rawOutput);

      if (commandNameLower !== 'clear' && commandNameLower !== 'cls' && commandNameLower !== 'home') {
        $history = [...$history, {
          command,
          outputs: [output],
          isTyping: true,
          teletypeIndex: 0
        }];
      } else if (output) {
        // For clear/cls/home, still show the banner output instantly without teletype
        $history = [{
          command: commandNameLower,
          outputs: [filterOutputForDevice(output)],
          isTyping: false
        }];
      }
    } else {
      const output = `${commandNameLower}: command not found`;

      $history = [...$history, {
        command,
        outputs: [output],
        isTyping: true,
        teletypeIndex: 0
      }];
    }

    command = '';
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      await handleSubmit();
    } else if (event.key === 'ArrowUp') {
      if (historyIndex < $history.length - 1) {
        historyIndex++;

        command = $history[$history.length - 1 - historyIndex].command;
      }

      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      if (historyIndex > -1) {
        historyIndex--;
        command =
          historyIndex >= 0
            ? $history[$history.length - 1 - historyIndex].command
            : '';
      }
      event.preventDefault();
    } else if (event.key === 'Tab') {
      event.preventDefault();

      const autoCompleteCommand = Object.keys(commands).find((cmd) =>
        cmd.startsWith(command.toLowerCase()),
      );

      if (autoCompleteCommand) {
        command = autoCompleteCommand;
      }
    } else if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();

      $history = [];
    }
  };
</script>

<svelte:window
  on:click={() => {
    input.focus();
  }}
/>

<form on:submit={handleSubmit} class="flex items-center">
  <p class="visible md:hidden">❯</p>
  {#if command.length === 0}
    <span class="blinking-cursor" style="color: #33cc33; font-weight: bold;">█</span>
  {/if}

  <input
    id="command-input"
    name="command-input"
    aria-label="Command input"
    class="bg-transparent outline-none font-bold"
    style={`color: ${$theme.foreground}; caret-color: transparent; width: ${command.length > 0 ? command.length + 1 : 1}ch; vertical-align: baseline; line-height: 1; ${command.length > 0 ? 'background-color: #33cc33; color: #000000; padding: 2px 4px;' : ''}`}
    type="text"
    bind:value={command}
    on:keydown={handleKeyDown}
    on:blur={() => input.focus()}
    bind:this={input}
  />
</form>
