<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import { commands } from '../utils/commands';
  import { track } from '../utils/tracking';

  let command = '';
  let historyIndex = -1;

  let input: HTMLInputElement;

  onMount(() => {
    input.focus();

    if ($history.length === 0) {
      const command = commands['banner'] as () => string;

      if (command) {
        const output = command();

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
    input.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const [commandName, ...args] = command.split(' ');

      if (import.meta.env.VITE_TRACKING_ENABLED === 'true') {
        track(commandName, ...args);
      }

      const commandFunction = commands[commandName];

      if (commandFunction) {
        const output = await commandFunction(args);

        if (commandName !== 'clear' && commandName !== 'cls' && commandName !== 'home') {
          $history = [...$history, {
            command,
            outputs: [output],
            isTyping: true,
            teletypeIndex: 0
          }];
        } else if (output) {
          // For clear/cls/home, still show the banner output instantly without teletype
          $history = [{
            command: commandName,
            outputs: [output],
            isTyping: false
          }];
        }
      } else {
        const output = `${commandName}: command not found`;

        $history = [...$history, {
          command,
          outputs: [output],
          isTyping: true,
          teletypeIndex: 0
        }];
      }

      command = '';
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
        cmd.startsWith(command),
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

<div class="flex items-center">
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
</div>
