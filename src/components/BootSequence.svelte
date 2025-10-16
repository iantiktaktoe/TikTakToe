<script lang="ts">
  import { onMount } from 'svelte';
  import { bootComplete } from '../stores/boot';

  let displayedLines: string[] = [];
  let showSkipHint = false;
  let skipped = false;
  let progress = 0;
  let memoryChecksum = 0;
  let showMemoryCheck = false;
  const totalMemory = 32768; // 32MB in KB for retro feel
  let bootAudio: HTMLAudioElement | null = null;

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

  // Play boot sound
  function playBootSound() {
    try {
      bootAudio = new Audio('/sounds/pc-booting.mp3');
      bootAudio.volume = 0.5; // Set volume to 50%
      bootAudio.play().catch(e => {
        console.warn('Audio playback failed:', e);
      });
    } catch (e) {
      console.warn('Audio not supported:', e);
    }
  }

  function stopBootSound() {
    if (bootAudio) {
      bootAudio.pause();
      bootAudio.currentTime = 0;
    }
  }

  function finishBoot() {
    stopBootSound();
    setTimeout(() => {
      bootComplete.set(true);
    }, 500);
  }

  function skipBoot() {
    if (!skipped) {
      skipped = true;
      displayedLines = bootMessages;
      progress = 100;
      memoryChecksum = totalMemory;
      showMemoryCheck = true;
      stopBootSound();
      setTimeout(() => {
        finishBoot();
      }, 100);
    }
  }

  onMount(() => {
    // Play boot sound
    playBootSound();

    let currentIndex = 0;
    const lineDelay = 120; // ms between lines

    // Show skip hint after 1 second
    setTimeout(() => {
      showSkipHint = true;
    }, 1000);

    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length && !skipped) {
        displayedLines = [...displayedLines, bootMessages[currentIndex]];

        // Update progress bar
        progress = Math.round((currentIndex / bootMessages.length) * 100);

        currentIndex++;
      } else if (!skipped) {
        progress = 100;
        clearInterval(interval);

        // Start memory checksum animation
        showMemoryCheck = true;
        displayedLines = [...displayedLines, '', 'Verifying system memory...'];

        const memoryInterval = setInterval(() => {
          if (memoryChecksum < totalMemory) {
            // Increment by chunks for speed
            memoryChecksum = Math.min(memoryChecksum + 2048, totalMemory);
          } else {
            clearInterval(memoryInterval);
            displayedLines = [...displayedLines, `Memory checksum: ${totalMemory}KB OK`];
            finishBoot();
          }
        }, 50);
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
    {#if showMemoryCheck && memoryChecksum < totalMemory}
      <div class="boot-line memory-check">{memoryChecksum}KB</div>
    {/if}
    {#if displayedLines.length < bootMessages.length && !skipped}
      <span class="boot-cursor">_</span>
    {/if}
  </div>

  <!-- Progress bar at bottom -->
  <div class="progress-container">
    <div class="progress-bar" style="width: {progress}%"></div>
    <div class="progress-text">{progress}%</div>
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
    padding: 1rem;
    overflow: hidden;
    z-index: 9999;
    box-sizing: border-box;
  }

  @media (min-width: 640px) {
    .boot-screen {
      padding: 2rem;
    }
  }

  .boot-content {
    font-size: 0.75rem;
    line-height: 1.3;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    padding-bottom: 5rem;
  }

  @media (min-width: 640px) {
    .boot-content {
      font-size: 1rem;
      line-height: 1.4;
      white-space: pre;
    }
  }

  .boot-line {
    margin-bottom: 0.1rem;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .memory-check {
    color: #33ff33;
    font-weight: bold;
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

  .progress-container {
    position: fixed;
    bottom: 2rem;
    left: 1rem;
    right: 1rem;
    height: 2rem;
    background-color: #001100;
    border: 1px solid #33ff33;
    box-sizing: border-box;
  }

  @media (min-width: 640px) {
    .progress-container {
      left: 2rem;
      right: 2rem;
    }
  }

  .progress-bar {
    height: 100%;
    background-color: #33ff33;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px #33ff33;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #33ff33;
    font-weight: bold;
    font-size: 0.875rem;
    text-shadow: 0 0 5px #33ff33;
    mix-blend-mode: difference;
  }

  .skip-hint {
    position: fixed;
    bottom: 4rem;
    right: 1rem;
    font-size: 0.7rem;
    opacity: 0.5;
    animation: fade-in 0.5s ease-in;
  }

  @media (min-width: 640px) {
    .skip-hint {
      bottom: 4.5rem;
      right: 2rem;
      font-size: 0.75rem;
    }
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
