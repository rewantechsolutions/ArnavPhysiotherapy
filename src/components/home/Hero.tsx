import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Search, ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Award } from "lucide-react";
import { services } from "@/lib/data";
import { openSearch } from "@/lib/search-store";
import hero1 from "../../assets/hero1.jpg";
import video1 from "../../assets/videos/video1.mp4";
import video2 from "../../assets/videos/video2.mp4";
import video3 from "../../assets/videos/video3.mp4";
import video4 from "../../assets/videos/video4.mp4";
import video5 from "../../assets/videos/video5.mp4";
import video6 from "../../assets/videos/video6.mp4";

const SLIDE_DURATION = 6500;

const rotating = [
  "Pain-Free Living",
  "Athletic Recovery",
  "Everyday Movement",
  "A Stronger You",
];

// Each slide can be an image OR a video. If `video` is present it takes
// priority; `image` is always kept as the poster / fallback (shown instantly
// while the video loads, and used if the video fails to load).
// To wire up a real video: import it like the jpg above
// (e.g. `import hero1Video from "../../assets/hero1.mp4"`) and set it here.
const slides: { eyebrow: string; image: string; video?: string }[] = [
  {
    eyebrow: "Move Better • Live Pain-Free",
    video: video4,
    image: ""
  },
  {
    eyebrow: "Evidence-Based • Personalised Care",
    video: video6,
    image: ""
  },
  {
    eyebrow: "Recover Faster • Return Stronger",
    video: video5,
    image: ""
    // image: hero1,
  },
];

/** Typewriter effect: types a word, holds, deletes it, moves to the next. */
function useTypewriter(words: string[]) {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 1500);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 300);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
      } else {
        setWordIdx((v) => (v + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIdx, words]);

  return text;
}

export function Hero() {
  const [i, setI] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [query, setQuery] = useState("");
  const [service, setService] = useState("all");
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 768 : false));
  const videoRef = useRef<HTMLVideoElement>(null);

  const typedWord = useTypewriter(rotating);

  const goTo = (next: number) => {
    setI(next);
    setCycle((c) => c + 1); // restart the slide-progress bar animation
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const t = setInterval(() => goTo((i + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  // Restart playback whenever the video slide changes.
  useEffect(() => {
    videoRef.current?.play().catch(() => { });
  }, [i]);

  const s = slides[i];

  // Scroll-linked "unwrap to full-bleed" effect: the outer margin and corner
  // radius shrink to 0 as the page scrolls down, so the hero expands to take
  // the full viewport width. scrollY is smoothed with a spring first so the
  // interpolated values glide instead of jittering on every scroll tick.
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 300, damping: 40, mass: 0.5 });
  const marginX = useTransform(smoothScrollY, [0, 100], ["2rem", "0rem"]);
  const radius = useTransform(smoothScrollY, [0, 100], ["20px", "0px"]);

  return (
    <motion.section
      className="relative overflow-hidden hero-mobile-bleed"
      style={isMobile ? undefined : {
        marginLeft: marginX,
        marginRight: marginX,
        borderRadius: radius,
      }}
    >
      {/* Background — front and centre, only a soft scrim on top */}
      <div className="absolute inset-0 bg-[oklch(0.18_0.04_220)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0.5, scale: 1.06 }}
          animate={{ opacity: 0.9, scale: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {s.video ? (
            <video
              ref={videoRef}
              key={s.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={s.image}
              className="h-full w-full object-cover"
              onError={(e) => {
                // If the video fails, quietly fall back to the poster image.
                (e.currentTarget as HTMLVideoElement).style.display = "none";
              }}
            >
              <source src={s.video} type="video/mp4" />
            </video>
          ) : (
            <img src={s.image} alt="" className="h-full w-full object-cover" />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/30 via-teal-700/15 to-cyan-800/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* arrows */}
      <button
        aria-label="Previous"
        onClick={() => goTo((i - 1 + slides.length) % slides.length)}
        className="hidden md:grid absolute left-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-white/80 backdrop-blur border border-border shadow-soft hover:bg-white transition"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        aria-label="Next"
        onClick={() => goTo((i + 1) % slides.length)}
        className="hidden md:grid absolute right-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-white/80 backdrop-blur border border-border shadow-soft hover:bg-white transition"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="relative container-page pt-16 md:pt-24 pb-16 md:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={s.eyebrow}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-primary/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-soft"
              >
                <Sparkles className="h-3 w-3" /> {s.eyebrow}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-[40px] sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
          >
            Expert Physiotherapy
            <br className="hidden sm:block" /> for{" "}

            {/* Fixed-height wrapper so the empty-string moment doesn't collapse the line */}
            <span className="relative inline-flex items-center align-baseline min-h-[44px] sm:min-h-[64px] md:min-h-[76px]">
              <span
                className="relative inline-block whitespace-nowrap text-gradient-teal
                 text-[clamp(28px,8vw,64px)] sm:text-[clamp(36px,6vw,72px)]"
              >
                {typedWord || "\u00A0"}
                <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.05em] bg-current align-middle [animation:hero-cursor-blink_1s_step-end_infinite]" />
              </span>
            </span>
          </motion.h1>

          {/*
            Smart Hero Search.
            - Typing here no longer redirects the page. Instead it opens the
              shared SearchDialog (see src/lib/search-store.ts) pre-filled
              with whatever was typed, so live grouped results/suggestions
              show up immediately — exactly like the navbar search.
            - Picking a specific service from the dropdown still jumps
              straight to that service page, since there's nothing to search.
          */}
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              if (service !== "all") {
                window.location.href = `/services/${service}`;
                return;
              }
              openSearch(query.trim());
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 mx-auto max-w-2xl px-4 sm:px-0"
          >
            <div className="flex items-center gap-1 rounded-full bg-white/95 backdrop-blur border border-white/30 p-1.5 shadow-glow">
              <div className="relative shrink-0 max-w-[38%] sm:max-w-none">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full appearance-none bg-transparent pl-3 sm:pl-5 pr-6 sm:pr-9 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-foreground outline-none rounded-full cursor-pointer border-r border-border truncate"
                >
                  <option value="all">All Services</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </div>

              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  // Open (or keep updating) the dialog live as the person
                  // types, once there's enough to search meaningfully.
                  if (service === "all" && e.target.value.trim().length > 1) {
                    openSearch(e.target.value);
                  }
                }}
                onFocus={() => {
                  if (service === "all" && query.trim().length > 1) openSearch(query);
                }}
                placeholder="Search treatments…"
                className="flex-1 min-w-0 bg-transparent px-2 sm:px-3 py-2.5 sm:py-3 text-sm outline-none placeholder:text-muted-foreground text-foreground"
              />

              <button
                type="submit"
                aria-label="Search"
                className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-full gradient-teal text-white shadow-soft hover:scale-105 transition"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <style>{`
        @keyframes hero-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes hero-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="--bar-duration"] {
            animation: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
