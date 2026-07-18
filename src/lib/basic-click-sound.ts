let audioContext: AudioContext | null = null;
let lastPlay = 0;

function getAudioContext() {
  if (typeof window === "undefined") return null;

  const AudioContextCtor = (window as typeof window & {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  }).AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextCtor) return null;

  if (!audioContext) {
    audioContext = new AudioContextCtor();
  }
  if (audioContext?.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
}

function playTinyClick() {
  const now = Date.now();
  if (now - lastPlay < 120) return;
  lastPlay = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const startTime = ctx.currentTime;

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(880, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(520, startTime + 0.04);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.035, startTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.06);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + 0.06);
}

export function attachBasicClickSound() {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};

  const handlePointerDown = (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const shouldPlay = target.closest("button, a[href], [role='button'], [role='link'], input, select, textarea, summary");
    if (!shouldPlay) return;

    playTinyClick();
  };

  document.addEventListener("pointerdown", handlePointerDown, true);
  return () => {
    document.removeEventListener("pointerdown", handlePointerDown, true);
  };
}
