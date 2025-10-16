<script lang="ts">
  import { onMount } from 'svelte';
  import { bootComplete } from '../stores/boot';

  let displayedLines: string[] = [];
  let showSkipHint = false;
  let skipped = false;

  // Boot sequence messages
  const bootMessages = [
    'TikTakToe BIOS v25.0 (C) 1999-2024 Ian Bell Systems',
    "CPU: Ian's Brain™ (Overclocked since 1999)",
    '',
    'Memory Test: 25 years experience.......[OK]',
    'Memory Test: Government clearance......[OK]',
    'Memory Test: Enterprise architecture...[OK]',
    'Memory Test: AI/ML knowledge graphs....[OK]',
    '',
    'Detecting Hardware...',
    '.NET/C# Module...........[OK]',
    'React Framework..........[OK]',
    'Azure Cloud Stack........[OK]',
    'LLM Fine-tuning Unit.....[OK]',
    'RAG Pipeline Generator...[OK]',
    '',
    'Loading TikTakToe OS...',
    'Initializing Digital Employees...',
    'Calibrating AI Agent Orchestra...',
    'Mounting knowledge graphs...',
    'Starting vibe → production compiler...',
    '',
    'WARNING: This system turns vibe code into maintainable systems',
    '',
    'Ian Bell ready. Type \'help\' for available commands.'
  ];

  // Beep sound using Web Audio API
  function playBeep(frequency: number = 800, duration: number = 100) {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
      // Silently fail if audio not supported
      console.warn('Audio not supported:', e);
    }
  }

  function finishBoot() {
    if (!skipped) {
      playBeep(1000, 150); // Success beep
    }
    setTimeout(() => {
      bootComplete.set(true);
    }, 500);
  }

  function skipBoot() {
    if (!skipped) {
      skipped = true;
      displayedLines = bootMessages;
      finishBoot();
    }
  }

  onMount(() => {
    // Play initial beep
    playBeep(600, 80);

    let currentIndex = 0;
    const lineDelay = 120; // ms between lines

    // Show skip hint after 1 second
    setTimeout(() => {
      showSkipHint = true;
    }, 1000);

    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length && !skipped) {
        displayedLines = [...displayedLines, bootMessages[currentIndex]];

        // Play subtle beep for certain lines
        if (bootMessages[currentIndex].includes('[OK]') ||
            bootMessages[currentIndex].includes('complete')) {
          playBeep(900, 50);
        }

        currentIndex++;
      } else if (!skipped) {
        clearInterval(interval);
        finishBoot();
      }
    }, lineDelay);

    // Allow skipping with any keypress
    const handleKeyPress = () => skipBoot();
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  });
</script>

<div class="boot-screen">
  <div class="boot-content">
    {#each displayedLines as line}
      <div class="boot-line">{line || '\u00A0'}</div>
    {/each}
    {#if displayedLines.length < bootMessages.length && !skipped}
      <span class="boot-cursor">_</span>
    {/if}
  </div>

  {#if showSkipHint && !skipped && displayedLines.length < bootMessages.length}
    <div class="skip-hint">Press any key to skip...</div>
  {/if}
</div>

<style>
  .boot-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    color: #33ff33;
    font-family: 'Courier New', monospace;
    padding: 2rem;
    overflow: hidden;
    z-index: 9999;
  }

  .boot-content {
    font-size: 0.9rem;
    line-height: 1.4;
    white-space: pre;
  }

  @media (min-width: 640px) {
    .boot-content {
      font-size: 1rem;
    }
  }

  .boot-line {
    margin-bottom: 0.1rem;
  }

  .boot-cursor {
    display: inline-block;
    animation: blink 1s step-end infinite;
    font-weight: bold;
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }

  .skip-hint {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    font-size: 0.75rem;
    opacity: 0.5;
    animation: fade-in 0.5s ease-in;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
</style>
