<script lang="ts">
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import Ps1 from './Ps1.svelte';
  import TeletypeOutput from './TeletypeOutput.svelte';
  import ProgressBar from './ProgressBar.svelte';
  import { commands } from '../utils/commands';
  import { track } from '../utils/tracking';

  // Filter output based on screen size
  function filterOutputForDevice(output: string): string {
    const isMobile = window.innerWidth <= 640;
    if (isMobile) {
      return output.replace(/\[DESKTOP\].*?\[\/DESKTOP\]/gs, '');
    } else {
      return output.replace(/\[MOBILE\].*?\[\/MOBILE\]/gs, '');
    }
  }

  // Parse output text for styled command hints
  function parseOutput(text: string) {
    // First, remove any remaining DESKTOP/MOBILE tags (shouldn't be here but failsafe)
    text = text.replace(/\[DESKTOP\]/g, '').replace(/\[\/DESKTOP\]/g, '');
    text = text.replace(/\[MOBILE\]/g, '').replace(/\[\/MOBILE\]/g, '');

    // Match all markup patterns including ASCII, PARA, LIST, HEADING, LINK, PROGRESS, BSOD, and GLITCH
    const parts = text.split(/(\[CMD\].*?\[\/CMD\]|\[DIM\].*?\[\/DIM\]|\[ARROW\]|\[TITLE\].*?\[\/TITLE\]|\[HEADING\].*?\[\/HEADING\]|\[ASCII\].*?\[\/ASCII\]|\[PARA\].*?\[\/PARA\]|\[LIST\].*?\[\/LIST\]|\[LINK\].*?\[\/LINK\]|\[PROGRESS\]|\[BSOD\].*?\[\/BSOD\]|\[GLITCH\].*?\[\/GLITCH\])/gs);
    return parts.map((part, i) => {
      if (part.includes('[CMD]')) {
        return {
          text: part.replace(/\[CMD\]|\[\/CMD\]/g, ''),
          type: 'command',
          key: i
        };
      } else if (part.includes('[LINK]')) {
        const content = part.replace(/\[LINK\]|\[\/LINK\]/g, '');
        const [url, displayText] = content.split('|');
        return {
          text: displayText || url,
          url: url,
          type: 'link',
          key: i
        };
      } else if (part.includes('[DIM]')) {
        return {
          text: part.replace(/\[DIM\]|\[\/DIM\]/g, ''),
          type: 'dim',
          key: i
        };
      } else if (part === '[ARROW]') {
        return {
          text: '→',
          type: 'arrow',
          key: i
        };
      } else if (part.includes('[TITLE]')) {
        return {
          text: part.replace(/\[TITLE\]|\[\/TITLE\]/g, ''),
          type: 'title',
          key: i
        };
      } else if (part.includes('[HEADING]')) {
        return {
          text: part.replace(/\[HEADING\]|\[\/HEADING\]/g, ''),
          type: 'heading',
          key: i
        };
      } else if (part.includes('[ASCII]')) {
        return {
          text: part.replace(/\[ASCII\]|\[\/ASCII\]/g, ''),
          type: 'ascii',
          key: i
        };
      } else if (part.includes('[PARA]')) {
        return {
          text: part.replace(/\[PARA\]|\[\/PARA\]/g, ''),
          type: 'para',
          key: i
        };
      } else if (part.includes('[LIST]')) {
        return {
          text: part.replace(/\[LIST\]|\[\/LIST\]/g, ''),
          type: 'list',
          key: i
        };
      } else if (part === '[PROGRESS]') {
        return {
          text: '',
          type: 'progress',
          key: i
        };
      } else if (part.includes('[BSOD]')) {
        return {
          text: part.replace(/\[BSOD\]|\[\/BSOD\]/g, ''),
          type: 'bsod',
          key: i
        };
      } else if (part.includes('[GLITCH]')) {
        return {
          text: part.replace(/\[GLITCH\]|\[\/GLITCH\]/g, ''),
          type: 'glitch',
          key: i
        };
      }
      return {
        text: part,
        type: 'normal',
        key: i
      };
    });
  }

  function handleTeletypeComplete(historyIndex: number) {
    // Mark typing as complete
    history.update(h => {
      const updated = [...h];
      if (updated[historyIndex]) {
        updated[historyIndex] = {
          ...updated[historyIndex],
          isTyping: false
        };
      }
      return updated;
    });
  }

  async function handleCommandClick(commandText: string) {
    // Strip quotes if present (e.g., 'help' -> help)
    const cleanCommand = commandText.replace(/^['"]|['"]$/g, '');

    const [commandName, ...args] = cleanCommand.split(' ');
    const commandNameLower = commandName.toLowerCase();

    if (import.meta.env.VITE_TRACKING_ENABLED === 'true') {
      track(commandNameLower, ...args);
    }

    const commandFunction = commands[commandNameLower];

    if (commandFunction) {
      if (commandNameLower === 'reboot') {
        await commandFunction(args);
        return;
      }

      const rawOutput = await commandFunction(args);
      const output = filterOutputForDevice(rawOutput);

      if (commandNameLower !== 'clear' && commandNameLower !== 'cls' && commandNameLower !== 'home') {
        $history = [...$history, {
          command: cleanCommand,
          outputs: [output],
          isTyping: true,
          teletypeIndex: 0
        }];
      } else if (output) {
        $history = [{
          command: commandNameLower,
          outputs: [filterOutputForDevice(output)],
          isTyping: false
        }];
      }
    } else {
      const output = `${commandNameLower}: command not found`;
      $history = [...$history, {
        command: cleanCommand,
        outputs: [output],
        isTyping: true,
        teletypeIndex: 0
      }];
    }
  }
</script>

<style>
  .command-link:hover {
    text-decoration: underline;
    opacity: 0.8;
  }

  .command-link:active {
    opacity: 0.6;
  }
</style>

{#each $history as historyItem, historyIndex}
  <div class="mb-8" style={`color: ${$theme.foreground}`}>
    <div class="flex flex-col md:flex-row mb-2">
      <Ps1 />

      <div class="flex">
        <p class="visible md:hidden">❯</p>

        <p class="px-2">{historyItem.command}</p>
      </div>
    </div>

    {#each historyItem.outputs as output, outputIndex}
      {#if historyItem.isTyping && outputIndex === (historyItem.teletypeIndex || 0)}
        <TeletypeOutput
          {output}
          onComplete={() => handleTeletypeComplete(historyIndex)}
          fastMode={historyItem.fastTeletype || false}
        />
      {:else}
        {@const parsedParts = parseOutput(output)}
        <p class="whitespace-pre mb-2" style="word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">
          {#each parsedParts as part, index}
            {#if part.type === 'command'}
              <span
                role="button"
                tabindex="0"
                on:click={() => handleCommandClick(part.text)}
                on:keydown={(e) => e.key === 'Enter' && handleCommandClick(part.text)}
                style={`color: ${$theme.yellow}; font-weight: bold; cursor: pointer; transition: opacity 0.2s;`}
                class="command-link"
              >{part.text}</span>
            {:else if part.type === 'link'}
              <a
                href={part.url}
                target={part.url.startsWith('http') ? '_blank' : '_self'}
                rel={part.url.startsWith('http') ? 'noopener noreferrer' : ''}
                style={`color: ${$theme.yellow}; font-weight: bold; cursor: pointer; transition: opacity 0.2s; text-decoration: none;`}
                class="command-link"
              >{part.text}</a>
            {:else if part.type === 'dim'}
              <span style={`opacity: 0.6; font-weight: bold;`}>{part.text}</span>
            {:else if part.type === 'arrow'}
              <span style={`color: ${$theme.green}; opacity: 0.7;`}>{part.text} </span>
            {:else if part.type === 'title'}
              {@const findPrevNonWhitespace = () => {
                for (let i = index - 1; i >= 0; i--) {
                  if (parsedParts[i].text.trim() !== '') {
                    return parsedParts[i];
                  }
                }
                return null;
              }}
              {@const prevPart = findPrevNonWhitespace()}
              {@const marginTop = prevPart && prevPart.type === 'title' ? '0.25rem' : '1rem'}
              <span style={`font-weight: 900; font-size: 1.1em; color: ${$theme.green}; display: block; margin-top: ${marginTop}; margin-bottom: 0rem; word-wrap: break-word; overflow-wrap: break-word;`}>{part.text}</span
            >{:else if part.type === 'heading'}
              <span style={`font-weight: bold; color: ${$theme.yellow}; opacity: 0.6;`}>{part.text}</span
            >{:else if part.type === 'ascii'}
              <span class="ascii-art">{part.text}</span>
            {:else if part.type === 'para'}
              <span class="paragraph-text">{part.text}</span>
            {:else if part.type === 'list'}
              <span class="client-list">{part.text}</span>
            {:else if part.type === 'progress'}
              <ProgressBar />
            {:else if part.type === 'bsod'}
              <span style={`color: #ffffff; background-color: #0000aa; display: block; padding: 1rem; font-family: 'Courier New', monospace; white-space: pre; line-height: 1.2;`}>{part.text}</span>
            {:else if part.type === 'glitch'}
              <span style={`color: ${$theme.red}; font-weight: bold; display: block; animation: glitch 0.3s infinite; letter-spacing: 2px;`}>{part.text}</span>
            {:else}
              {part.text}
            {/if}
          {/each}
        </p>
      {/if}
    {/each}
  </div>
{/each}
