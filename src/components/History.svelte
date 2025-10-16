<script lang="ts">
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import Ps1 from './Ps1.svelte';
  import TeletypeOutput from './TeletypeOutput.svelte';

  // Parse output text for styled command hints
  function parseOutput(text: string) {
    // Match all markup patterns
    const parts = text.split(/(\[CMD\].*?\[\/CMD\]|\[DIM\].*?\[\/DIM\]|\[ARROW\]|\[TITLE\].*?\[\/TITLE\])/g);
    return parts.map((part, i) => {
      if (part.includes('[CMD]')) {
        return {
          text: part.replace(/\[CMD\]|\[\/CMD\]/g, ''),
          type: 'command',
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
</script>

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
        />
      {:else}
        {@const parsedParts = parseOutput(output)}
        <p class="whitespace-pre mb-2" style="word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">
          {#each parsedParts as part, index}
            {#if part.type === 'command'}
              <span style={`color: ${$theme.yellow}; font-weight: bold;`}>{part.text}</span>
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
            >{:else}
              {part.text}
            {/if}
          {/each}
        </p>
      {/if}
    {/each}
  </div>
{/each}
