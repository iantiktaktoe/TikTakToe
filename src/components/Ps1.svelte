<script>
  import { theme } from '../stores/theme';
  let hostname = window.location.hostname;
</script>

<p class="font-bold flex prompt-text" style="opacity: 0.6;">
  <span style={`color: ${$theme.yellow};`}>guest</span>
  <span style={`color: ${$theme.white}`}>@</span>
  <span style={`color: ${$theme.green}`}>{hostname}</span>
  <span style={`color: ${$theme.white}`}>:</span>
</p>

<style>
  .prompt-text {
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    .prompt-text {
      font-size: 0.9rem;
    }
  }
</style>
