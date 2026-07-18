import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { conditions } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

const AUTOPLAY_DELAY = 3200;

/**
 * Premium circular condition cards. Signature element: the ring around each
 * avatar doubles as the autoplay progress indicator — it sweeps closed on the
 * active card in real time, so the same gradient that brands the card also
 * tells you when the carousel will advance. No separate dot progress needed.
 */
export function ConditionsSlider() {
  const autoplay = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", containScroll: "trimSnaps" },
    [autoplay.current],
  );
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [cycle, setCycle] = useState(0); // bump to restart the ring animation
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCycle((c) => c + 1);
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-mint/40 to-white py-20 md:py-28">
      {/* Ambient field */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, theme(colors.border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)",
          }}
        />
      </div>
      <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-brand-cyan/10 blur-3xl" />

      <div className="container-page relative">
        <SectionHeader
          eyebrow="We Treat"
          title="Conditions We Help With"
          subtitle="From everyday aches to complex recoveries — we design a plan that fits you."
        />

        <div className="relative mt-4">
          <button
            aria-label="Previous"
            onClick={prev}
            disabled={!canPrev}
            className="absolute -left-4 top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/80 shadow-soft backdrop-blur-md transition hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-40 md:grid"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 py-6 md:gap-8">
              {conditions.map((c, i) => {
                const isActive = i === selected;
                return (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: (i % 8) * 0.045, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-[16.66%]"
                  >
                    <Link
                      to="/conditions/$slug"
                      params={{ slug: c.slug }}
                      className="group flex flex-col items-center text-center"
                    >
                      <div className="relative h-32 w-32 md:h-36 md:w-36">
                        {/* Glow on hover */}
                        <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-primary/40 to-brand-cyan/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Static brand ring (always visible, quiet) */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 to-brand-cyan/25" />

                        {/* Autoplay progress ring — only sweeps on the active card */}
                        {isActive && (
                          <svg
                            key={cycle}
                            viewBox="0 0 100 100"
                            className="absolute inset-0 h-full w-full -rotate-90"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="47"
                              fill="none"
                              strokeWidth="3"
                              stroke="url(#conditionRingGradient)"
                              strokeLinecap="round"
                              strokeDasharray={2 * Math.PI * 47}
                              className="origin-center [animation:condition-ring_var(--ring-duration)_linear_forwards]"
                              style={{ "--ring-duration": `${AUTOPLAY_DELAY}ms` } as React.CSSProperties}
                            />
                            <defs>
                              <linearGradient id="conditionRingGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--color-primary, #0ea5e9)" className="text-primary [stop-color:currentColor]" />
                                <stop offset="100%" className="text-brand-cyan [stop-color:currentColor]" />
                              </linearGradient>
                            </defs>
                          </svg>
                        )}

                        <div className="absolute inset-[3px] rounded-full bg-white p-1.5 shadow-card transition-all duration-500 group-hover:shadow-glow group-hover:-translate-y-1">
                          <div className="h-full w-full overflow-hidden rounded-full ring-2 ring-white">
                            <img
                              src={c.image}
                              alt={c.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      </div>

                      <h3 className="mt-4 text-sm font-bold text-foreground transition-colors group-hover:text-primary md:text-[15px]">
                        {c.name}
                      </h3>
                      <p className="mt-1 max-w-[16ch] text-xs text-muted-foreground line-clamp-2">
                        {c.summary.split("—")[0].split(",")[0]}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <button
            aria-label="Next"
            onClick={next}
            disabled={!canNext}
            className="absolute -right-4 top-[38%] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/80 shadow-soft backdrop-blur-md transition hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-40 md:grid"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Segmented timeline instead of plain dots — each bar fills as its
            slide plays, so position and pacing are both legible at a glance */}
        <div className="mx-auto mt-10 flex max-w-xs items-center gap-1.5 h-1.5 rounded-full bg-border/30 overflow-hidden">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-1 flex-1 overflow-hidden rounded-full bg-border "
            >
              <span
                key={i === selected ? cycle : `static-${i}`}
                className={`block h-full rounded-full bg-gradient-to-r from-primary to-brand-cyan ${
                  i === selected
                    ? "[animation:condition-bar_var(--bar-duration)_linear_forwards]"
                    : i < selected
                      ? "w-full"
                      : "w-0"
                }`}
                style={{ "--bar-duration": `${AUTOPLAY_DELAY}ms` } as React.CSSProperties}
              />
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/conditions"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-white px-6 py-2.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
          >
            View All Conditions
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes condition-ring {
          from { stroke-dashoffset: ${2 * Math.PI * 47}; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes condition-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          svg circle, [style*="--bar-duration"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
