<script lang="ts">
  import Ps1 from './components/Ps1.svelte';
  import Input from './components/Input.svelte';
  import History from './components/History.svelte';
  import { theme } from './stores/theme';
</script>

<svelte:head>
  {#if import.meta.env.VITE_TRACKING_ENABLED === 'true'}
    <script
      async
      defer
      data-website-id={import.meta.env.VITE_TRACKING_SITE_ID}
      src={import.meta.env.VITE_TRACKING_URL}
    ></script>
  {/if}
</svelte:head>

<main
  class="h-full border-2 rounded-md p-3 sm:p-4 overflow-x-hidden overflow-y-auto text-xs sm:text-sm md:text-base break-words"
  style={`background-color: ${$theme.background}; color: ${$theme.foreground}; border-color: ${$theme.green}; word-wrap: break-word; overflow-wrap: break-word;`}
>
  <div style="position: relative; z-index: 10; max-width: 100%; overflow-wrap: break-word; word-wrap: break-word;">
    <History />

    <div class="flex flex-col md:flex-row mt-2">
      <Ps1 />

      <Input />
    </div>
  </div>
</main>
