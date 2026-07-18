import { Link } from "@tanstack/react-router";
import {
  motion, useMotionValue, useMotionValueEvent, useInView, animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Award, Check, GraduationCap, HeartPulse, Quote, ShieldCheck, Star,
} from "lucide-react";
import { Eyebrow } from "@/components/ui-primitives/Section";
import { doctorProfile, site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const parentReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const maskItem = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Fires exactly once when `ref` scrolls into view, then permanently
 * disconnects the observer — so it is physically impossible for this to
 * re-fire, flicker, or revert, no matter what else re-renders on the page.
 * This is deliberately plain browser API (no framer-motion viewport
 * watcher), since that was the source of the earlier disappearing bug.
 */
function useRevealOnScroll<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, revealed };
}

export function DoctorProfile() {
  const { ref: photoRef, revealed } = useRevealOnScroll<HTMLDivElement>();
  const on = revealed ? "dp-in" : "";

  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28" id="doctor">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-brand-cyan/10 blur-3xl" />

      <div className="container-page relative grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Photo column — reveal is driven by a plain IntersectionObserver
            (see useRevealOnScroll above). It triggers once when this column
            scrolls into view, then disconnects itself for good, so the
            entrance can't restart, flicker, or reset later. */}
        <div ref={photoRef} className={`dp-photo relative lg:col-span-5 ${on}`}>
          <div className="absolute -left-6 -top-6 -z-10 h-32 w-32 rounded-3xl bg-primary/15" />
          <div className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-brand-cyan/20" />

          {/* Dashed ring — slides in from the left and rotates to a fixed
              settle angle, then stops there permanently. */}
          <div className={`dp-ring pointer-events-none absolute -inset-3 -z-10 ${on}`}>
            <div className="h-full w-full rounded-[2rem] border-[3px] border-dashed border-primary/40" />
          </div>
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] border border-primary/15" />

          <div className="relative">
            <img
              src={doctorProfile.image}
              alt={`${doctorProfile.name} — ${doctorProfile.title}`}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-glow"
            />

            <div className={`dp-badge absolute -right-3 -top-3 grid h-14 w-14 place-items-center rounded-full bg-white shadow-card ring-4 ring-white/60 md:right-4 md:top-4 ${on}`}>
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>

            <div className={`dp-chip absolute -left-4 top-8 hidden items-center gap-2 rounded-full border border-border bg-white px-3.5 py-2 shadow-card md:flex ${on}`}>
              <Star className="h-3.5 w-3.5 text-primary" />
              <span className="text-[12px] font-semibold text-foreground/85">{doctorProfile.specializations[0]}</span>
            </div>

            <div className={`dp-card absolute -right-4 bottom-8 flex max-w-[240px] items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 shadow-card md:bottom-14 md:right-6 ${on}`}>
              <div className={`dp-float grid h-11 w-16 shrink-0 place-items-center rounded-xl gradient-teal text-lg font-bold text-white ${on}`}>
                <Counter to={20} suffix="+" />
              </div>
              <div>
                <div className="text-sm font-bold">Years of practice</div>
                <div className="text-xs text-muted-foreground">{doctorProfile.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content column — single reveal trigger, propagated to every child via variants */}
        <motion.div
          variants={parentReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-7"
        >
          <motion.div variants={item}>
            <Eyebrow>Meet Your Physiotherapist</Eyebrow>
          </motion.div>

          <div className="mt-3 overflow-hidden">
            <motion.h2
              variants={maskItem}
              className="text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl"
            >
              {doctorProfile.name}
            </motion.h2>
          </div>

          <motion.p variants={item} className="mt-2 font-semibold text-primary">
            {doctorProfile.title}
          </motion.p>

          <motion.blockquote
            variants={item}
            className="relative mt-6 rounded-2xl bg-gradient-to-br from-teal-50/70 to-white py-5 pl-8 pr-4"
          >
            <Quote className="absolute left-2 top-4 h-6 w-6 -scale-x-100 text-primary/25" />
            <p className="italic leading-relaxed text-muted-foreground">{doctorProfile.philosophy}</p>
          </motion.blockquote>

          <motion.div variants={item} className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            <div className="flex flex-col gap-6">
              <InfoBlock icon={GraduationCap} title="Qualifications" items={doctorProfile.qualifications} />
              <InfoBlock icon={ShieldCheck} title="Certifications" items={doctorProfile.certifications} />
            </div>
            <div className="flex flex-col gap-6">
              <InfoBlock icon={Star} title="Specializations" items={doctorProfile.specializations} />
              <InfoBlock icon={Award} title="Recognitions" items={doctorProfile.awards} />
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white to-teal-50/60 p-5"
          >
            <div className="flex items-center gap-2 text-sm font-bold">
              <HeartPulse className="h-4 w-4 text-primary" /> Why patients choose {doctorProfile.name}
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {doctorProfile.reasons.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full gradient-teal px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
            >
              Book with {doctorProfile.name.split(" ").slice(-1)[0]}
            </Link>
            <a
              href={`tel:${site.phoneRaw1}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
            >
              Call {site.phone1}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        /* Base = hidden/pre-entrance state. .dp-in = the class we add exactly
           once (via React state that only ever goes false -> true) when the
           IntersectionObserver reports this column has scrolled into view.
           These are transitions, not keyframe animations — a transition
           naturally holds at its end value forever once triggered, with no
           "forwards" fill-mode subtleties to get wrong. */
        .dp-photo {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .dp-photo.dp-in { opacity: 1; transform: translateX(0); }

        /* The ring: starts off-screen to the left and rotated, then slides
           in and settles at a fixed -6deg tilt — never spins, never loops. */
        .dp-ring {
          opacity: 0;
          transform: translateX(-90px) rotate(-28deg);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s,
                      transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s;
        }
        .dp-ring.dp-in { opacity: 1; transform: translateX(0) rotate(10deg); }

        .dp-badge {
          opacity: 0;
          transform: scale(0.8) translateY(-10px);
          transition: opacity 0.5s ease-out 0.35s, transform 0.5s ease-out 0.35s;
        }
        .dp-badge.dp-in { opacity: 1; transform: scale(1) translateY(0); }

        .dp-chip {
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.5s ease-out 0.4s, transform 0.5s ease-out 0.4s;
        }
        .dp-chip.dp-in { opacity: 1; transform: translateX(0); }

        .dp-card {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease-out 0.45s, transform 0.6s ease-out 0.45s;
        }
        .dp-card.dp-in { opacity: 1; transform: translateY(0); }

        /* Gentle continuous float — only starts once revealed, via
           animation-play-state, so it doesn't play silently off-screen
           before you've scrolled to it. */
        .dp-float { animation: dp-float 3.2s ease-in-out infinite; animation-play-state: paused; }
        .dp-float.dp-in { animation-play-state: running; }

        @keyframes dp-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .dp-photo, .dp-ring, .dp-badge, .dp-chip, .dp-card {
            transition-duration: 0.01ms !important;
          }
          .dp-float { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function InfoBlock({ icon: Icon, title, items }: { icon: typeof Award; title: string; items: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-bold text-foreground">
        <span className="grid h-9 w-9 place-items-center rounded-xl gradient-teal text-white shadow-soft">
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((it) => (
          <span
            key={it}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-[12.5px] font-medium text-foreground/80 transition hover:border-primary/30 hover:text-primary"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Counts up from 0 to `to` once it scrolls into view. */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(value, "change", (v) => setDisplay(Math.round(v)));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.3, ease: EASE });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
