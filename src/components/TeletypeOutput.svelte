<!-- ABOUTME: Component for rendering command output with teletype animation -->
<!-- ABOUTME: Displays text character-by-character with blinking cursor and typing sound -->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { theme } from '../stores/theme';
  import { createTeletype, type TeletypeState } from '../utils/teletype';
  import type { Writable } from 'svelte/store';

  export let output: string;
  export let onComplete: () => void;

  let teletypeStore: (Writable<TeletypeState> & { skip?: () => void }) | null = null;
  let state: TeletypeState = {
    displayedText: '',
    isComplete: false,
    isTyping: false,
  };

  let unsubscribe: (() => void) | null = null;

  onMount(() => {
    teletypeStore = createTeletype(output);

    unsubscribe = teletypeStore.subscribe((newState) => {
      state = newState;
      if (newState.isComplete) {
        onComplete();
      }
    });

    // Allow skipping with any keypress (but wait a bit to avoid immediate skip from Enter key)
    let skipEnabled = false;
    setTimeout(() => {
      skipEnabled = true;
    }, 100);

    const handleKeyPress = () => {
      if (skipEnabled && teletypeStore && (teletypeStore as any).skip) {
        (teletypeStore as any).skip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  // Parse output text for styled command hints
  function parseOutput(text: string) {
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

  $: parsedParts = parseOutput(state.displayedText);
</script>

<p class="whitespace-pre mb-2">
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
      <span style={`font-weight: 900; font-size: 1.1em; color: ${$theme.green}; display: block; margin-top: ${marginTop};`}>{part.text}</span>
    {:else}
      {part.text}
    {/if}
  {/each}
  {#if state.isTyping}
    <span class="blinking-cursor" style="color: #00ff00; font-weight: bold;">█</span>
  {/if}
</p>
