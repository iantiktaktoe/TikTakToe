<script>
  import { theme } from '../stores/theme';
  let hostname = window.location.hostname;
</script>

<p class="font-bold flex" style="opacity: 0.6; font-size: 1rem;">
  <span style={`color: ${$theme.yellow};`}>guest</span>
  <span style={`color: ${$theme.white}`}>@</span>
  <span style={`color: ${$theme.green}`}>{hostname}</span>
  <span style={`color: ${$theme.white}`}>:</span>
</p>
