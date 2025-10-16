<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../stores/theme';

  let progress = 0;
  let intervalId: number;

  onMount(() => {
    intervalId = window.setInterval(() => {
      if (progress < 100) {
        progress += 2;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  });

  $: progressBar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
</script>

<div class="progress-container">
  <span style={`color: ${$theme.green}; font-weight: bold;`}>
    [{progressBar}] {progress}%
  </span>
</div>

<style>
  .progress-container {
    display: block;
    margin-top: 1rem;
    font-family: monospace;
  }
</style>
