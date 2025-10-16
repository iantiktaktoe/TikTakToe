<script lang="ts">
  import { onMount } from 'svelte';

  export let onComplete: () => void;

  let progress = 0;
  let intervalId: number;

  onMount(() => {
    // Animate progress bar
    intervalId = window.setInterval(() => {
      if (progress < 100) {
        progress += 1;
      } else {
        clearInterval(intervalId);
        // Wait a moment at 100% then call complete
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 60); // 6 seconds total

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  });

  $: progressBarWidth = `${progress}%`;
</script>

<div class="bsod-container">
  <div class="bsod-content">
    <h1>A problem has been detected and your terminal has been shut down to prevent damage to your vintage hardware.</h1>

    <p class="error-code">PROFANITY_OVERLOAD_EXCEPTION</p>

    <p>If this is the first time you've seen this Stop error screen, try using nicer language. If this screen appears again, follow these steps:</p>

    <p>Check to make sure any new vocabulary is properly sanitized. If this is a new installation, ask your parents or teacher for the profanity filter update.</p>

    <p>If problems continue, disable or remove any recently learned expletives. Press F13 to continue (just kidding, that key doesn't exist).</p>

    <p class="technical">Technical information:</p>

    <p class="technical">*** STOP: 0x0000DEAD (0xBADC0FFE, 0x00000004, 0xDEADBEEF, 0xCAFEBABE)</p>

    <div class="progress-section">
      <p>Dumping physical memory to disk: {progress}%</p>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width: {progressBarWidth}"></div>
      </div>
    </div>

    <p class="footer">Physical memory dump complete.</p>
    <p class="footer">Contact your system administrator or try being nicer to the computer.</p>
  </div>
</div>

<style>
  .bsod-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background: linear-gradient(180deg, #0000aa 0%, #000088 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
  }

  .bsod-content {
    max-width: 800px;
    width: 100%;
    color: #ffffff;
    font-family: 'Courier New', 'Lucida Console', monospace;
    font-size: 16px;
    line-height: 1.6;
    text-align: left;
  }

  h1 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2rem;
    line-height: 1.4;
  }

  .error-code {
    font-weight: bold;
    margin: 1.5rem 0;
    font-size: 18px;
  }

  p {
    margin-bottom: 1rem;
  }

  .technical {
    margin-top: 1.5rem;
    font-family: 'Courier New', monospace;
  }

  .progress-section {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .progress-bar-container {
    width: 100%;
    height: 24px;
    background-color: #ffffff;
    border: 2px solid #ffffff;
    margin-top: 0.5rem;
    box-sizing: border-box;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: #ffffff;
    transition: width 0.1s linear;
  }

  .footer {
    margin-top: 0.5rem;
    font-size: 14px;
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .bsod-content {
      font-size: 12px;
      padding: 0 1rem;
    }

    h1 {
      font-size: 14px;
    }

    .error-code {
      font-size: 14px;
    }

    .progress-bar-container {
      height: 20px;
    }

    .footer {
      font-size: 11px;
    }
  }
</style>
