type FeedbackTone = "default" | "navbar" | "button" | "tab" | "link" | "secondary" | "success" | "danger" | "scroll";

type FeedbackConfig = {
  frequency: number;
  duration: number;
  gain: number;
  vibrate: number[];
};

const FEEDBACK_CONFIG: Record<FeedbackTone, FeedbackConfig> = {
  default: { frequency: 780, duration: 0.075, gain: 0.14, vibrate: [10, 14, 8] },
  navbar: { frequency: 1040, duration: 0.065, gain: 0.16, vibrate: [12, 16, 10] },
  button: { frequency: 980, duration: 0.085, gain: 0.18, vibrate: [14, 20, 12] },
  tab: { frequency: 860, duration: 0.072, gain: 0.15, vibrate: [10, 16, 8] },
  link: { frequency: 720, duration: 0.07, gain: 0.14, vibrate: [10, 14] },
  secondary: { frequency: 700, duration: 0.072, gain: 0.15, vibrate: [10, 14] },
  success: { frequency: 900, duration: 0.09, gain: 0.16, vibrate: [12, 18, 12] },
  danger: { frequency: 300, duration: 0.11, gain: 0.18, vibrate: [16, 24, 16] },
  scroll: { frequency: 620, duration: 0.06, gain: 0.16, vibrate: [8, 10] },
};

let audioContext: AudioContext | null = null;
let lastInteractionAt = 0;
let lastScrollAt = 0;
let scrollCooldownTimer: number | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new window.AudioContext();
  }
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
}

function getToneForElement(element: HTMLElement | null): FeedbackTone {
  if (!element) return "default";

  const explicitTone = element.getAttribute("data-feedback-tone")?.toLowerCase();
  if (explicitTone && explicitTone in FEEDBACK_CONFIG) {
    return explicitTone as FeedbackTone;
  }

  if (element.closest("nav, header, [role='navigation']")) return "navbar";
  if (element.matches("button, [role='button'], summary, [data-feedback-button]")) return "button";
  if (element.matches("input[type='submit'], button[type='submit']")) return "success";
  if (element.closest("[role='tab']")) return "tab";
  if (element.closest("a[href], [role='link'], [data-feedback-link]")) return "link";
  if (element.closest("form")) return "success";

  return "default";
}

function isLikelyInteractiveElement(element: HTMLElement | null): boolean {
  if (!element) return false;

  const interactiveSelector = [
    "button",
    "a[href]",
    "[role='button']",
    "[role='link']",
    "[role='tab']",
    "input",
    "select",
    "textarea",
    "summary",
    "option",
    "label",
    "[data-feedback-tone]",
    "[onclick]",
    "[data-action]",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  if (element.matches(interactiveSelector)) return true;
  if (element.closest(interactiveSelector)) return true;

  const computedStyle = window.getComputedStyle(element);
  return computedStyle.cursor === "pointer" || computedStyle.cursor === "zoom-in";
}

function playTone(tone: FeedbackTone) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const config = FEEDBACK_CONFIG[tone];
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = tone === "scroll" ? "sine" : tone === "navbar" ? "sawtooth" : tone === "button" ? "square" : "triangle";
  oscillator.frequency.setValueAtTime(config.frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(config.frequency * 1.04, now + Math.max(config.duration * 0.35, 0.02));

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(Math.max(config.gain, tone === "scroll" ? 0.14 : 0.13), now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + config.duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + config.duration);
}

function vibrate(config: FeedbackConfig) {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  navigator.vibrate(config.vibrate);
}

function triggerFeedback(tone: FeedbackTone) {
  const now = Date.now();
  const minimumGap = tone === "scroll" ? 20 : 16;
  if (tone === "scroll") {
    if (now - lastScrollAt < minimumGap) return;
    lastScrollAt = now;
  } else {
    if (now - lastInteractionAt < minimumGap) return;
    lastInteractionAt = now;
  }

  const config = FEEDBACK_CONFIG[tone];
  playTone(tone);
  vibrate(config);
}

function getEventTargetElement(event: Event): HTMLElement | null {
  if (event.target instanceof Element) {
    return event.target as HTMLElement;
  }

  const composedPath = (event as Event & { composedPath?: () => EventTarget[] }).composedPath?.();
  if (composedPath) {
    for (const item of composedPath) {
      if (item instanceof HTMLElement) return item;
    }
  }

  return null;
}

function handlePointerDown(event: Event) {
  const target = getEventTargetElement(event);
  if (!target) return;

  const interactive = target.closest(
    "button, a[href], [role='button'], [role='link'], [role='tab'], input, select, textarea, summary, [data-feedback-tone], [onclick], [data-action], [tabindex]:not([tabindex='-1'])",
  );
  if (!interactive || !isLikelyInteractiveElement(interactive as HTMLElement)) return;

  const tone = getToneForElement(interactive as HTMLElement);
  triggerFeedback(tone);
}

function handleClickEvent(event: Event) {
  const target = getEventTargetElement(event);
  if (!target) return;

  const interactive = target.closest(
    "button, a[href], [role='button'], [role='link'], [role='tab'], input, select, textarea, summary, [data-feedback-tone], [onclick], [data-action], [tabindex]:not([tabindex='-1'])",
  );
  if (!interactive || !isLikelyInteractiveElement(interactive as HTMLElement)) return;

  const pulseTarget = interactive instanceof HTMLElement ? interactive : target;
  pulseTarget.classList.add("interaction-feedback-hit");
  window.setTimeout(() => pulseTarget.classList.remove("interaction-feedback-hit"), 140);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.repeat) return;
  if (event.key === "Enter" || event.key === " ") {
    const active = document.activeElement;
    if (active && active instanceof HTMLElement) {
      const interactive = active.closest(
        "button, a[href], [role='button'], [role='link'], [role='tab'], input, select, textarea, summary",
      );
      if (interactive) {
        const tone = getToneForElement(interactive as HTMLElement);
        triggerFeedback(tone);
      }
    }
  }
}

function handleScroll() {
  if (scrollCooldownTimer) {
    window.clearTimeout(scrollCooldownTimer);
  }

  scrollCooldownTimer = window.setTimeout(() => {
    triggerFeedback("scroll");
  }, 20);
}

export function attachGlobalInteractionFeedback() {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};

  document.addEventListener("pointerdown", handlePointerDown, true);
  document.addEventListener("click", handleClickEvent, true);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("wheel", handleScroll, { passive: true });
  window.addEventListener("touchmove", handleScroll, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    document.removeEventListener("pointerdown", handlePointerDown, true);
    document.removeEventListener("click", handleClickEvent, true);
    document.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("wheel", handleScroll);
    window.removeEventListener("touchmove", handleScroll);
    window.removeEventListener("scroll", handleScroll);
    if (scrollCooldownTimer) {
      window.clearTimeout(scrollCooldownTimer);
      scrollCooldownTimer = null;
    }
  };
}
