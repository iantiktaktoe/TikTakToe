<script lang="ts">
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import Ps1 from './Ps1.svelte';

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
</script>

{#each $history as { command, outputs }}
  <div class="mb-4" style={`color: ${$theme.foreground}`}>
    <div class="flex flex-col md:flex-row mb-2">
      <Ps1 />

      <div class="flex">
        <p class="visible md:hidden">❯</p>

        <p class="px-2">{command}</p>
      </div>
    </div>

    {#each outputs as output}
      <p class="whitespace-pre mb-2">
        {#each parseOutput(output) as part}
          {#if part.type === 'command'}
            <span style={`color: ${$theme.yellow}; font-weight: bold;`}>{part.text}</span>
          {:else if part.type === 'dim'}
            <span style={`opacity: 0.6; font-weight: bold;`}>{part.text}</span>
          {:else if part.type === 'arrow'}
            <span style={`color: ${$theme.green}; opacity: 0.7;`}>{part.text} </span>
          {:else if part.type === 'title'}
            <span style={`font-weight: 900; font-size: 1.1em; color: ${$theme.green}; display: block; margin-top: 1rem;`}>{part.text}</span>
          {:else}
            {part.text}
          {/if}
        {/each}
      </p>
    {/each}
  </div>
{/each}
