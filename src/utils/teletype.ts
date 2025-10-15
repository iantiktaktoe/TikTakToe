// ABOUTME: Teletype utility for character-by-character text animation
// ABOUTME: Provides typing effect with sound and skip functionality

import { writable, type Writable } from 'svelte/store';

export interface TeletypeState {
  displayedText: string;
  isComplete: boolean;
  isTyping: boolean;
}

export interface TeletypeOptions {
  speed?: number; // milliseconds per character (default: 25)
  playSound?: boolean; // play typing sound (default: true)
  maxLength?: number; // skip animation if text exceeds this (default: 2000)
}

let audioContext: AudioContext | null = null;

// Initialize audio context
async function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
}

// Play typing sound - synthesized "dit" sound
async function playTypeSound() {
  if (!audioContext) {
    await initAudio();
  }

  if (!audioContext) return;

  try {
    // Resume audio context if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // High-pitched click sound (like old terminal)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

    // Very short, subtle sound
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.03);
  } catch (error) {
    // Silently fail if audio doesn't work
    console.warn('Audio playback failed:', error);
  }
}

export function createTeletype(
  text: string,
  options: TeletypeOptions = {}
): Writable<TeletypeState> {
  const { speed = 25, playSound = true, maxLength = 2000 } = options;

  const store = writable<TeletypeState>({
    displayedText: '',
    isComplete: false,
    isTyping: false,
  });

  // Skip animation for very long text
  if (text.length > maxLength) {
    store.set({
      displayedText: text,
      isComplete: true,
      isTyping: false,
    });
    return store;
  }

  let currentIndex = 0;
  let animationId: number | null = null;
  let lastFrameTime = 0;
  let isSkipped = false;

  // Initialize audio if sound is enabled
  if (playSound) {
    initAudio();
  }

  function animate(timestamp: number) {
    if (isSkipped) return;

    if (!lastFrameTime) {
      lastFrameTime = timestamp;
    }

    const elapsed = timestamp - lastFrameTime;

    if (elapsed >= speed) {
      currentIndex++;
      const displayedText = text.substring(0, currentIndex);

      store.set({
        displayedText,
        isComplete: currentIndex >= text.length,
        isTyping: currentIndex < text.length,
      });

      // Play sound for each character
      if (playSound && currentIndex < text.length) {
        playTypeSound();
      }

      lastFrameTime = timestamp;
    }

    if (currentIndex < text.length) {
      animationId = requestAnimationFrame(animate);
    }
  }

  // Start animation
  store.set({
    displayedText: '',
    isComplete: false,
    isTyping: true,
  });

  animationId = requestAnimationFrame(animate);

  // Skip function
  const skip = () => {
    isSkipped = true;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    store.set({
      displayedText: text,
      isComplete: true,
      isTyping: false,
    });
  };

  // Extend store with skip method
  return {
    ...store,
    skip,
  } as any;
}
