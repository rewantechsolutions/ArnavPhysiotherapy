import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { services } from "@/lib/data";

const AUTOPLAY_DELAY = 4200;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, clipPath: "inset(0% 0% 100% 0%)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TreatmentsGrid() {
  const autoplay = useRef(Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", containScroll: "trimSnaps" },
    [autoplay.current],
  );
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [cycle, setCycle] = useState(0);
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
    <section className="relative overflow-hidden py-16 md:py-20 bg-surface">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl" />

      <div className="container-page relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-primary"
            >
              Our Treatments
            </motion.span>

            {/* Text-mask reveal: headline slides up out of a hidden mask as it scrolls into view */}
            <div className="overflow-hidden mt-3 py-2">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl font-bold tracking-tight"
              >
                Effective Physiotherapy Solutions
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-3 text-[15px] text-muted-foreground"
            >
              Evidence-based treatments — combined into a plan that's uniquely yours.
            </motion.p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                aria-label="Previous"
                onClick={prev}
                disabled={!canPrev}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white transition hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next"
                onClick={next}
                disabled={!canNext}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white transition hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="overflow-hidden -mx-2 px-2"
          ref={emblaRef}
        >
          <div className="flex gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                variants={cardVariants}
                className="shrink-0 basis-[80%] sm:basis-[48%] md:basis-[33%] lg:basis-[25%] xl:basis-[22%]"
              >
                <TiltCard slug={s.slug} name={s.name} image={s.image} short={s.short} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Autoplay-synced progress timeline — very compact strip style */}
        <div className="mx-auto mt-5 flex w-full max-w-[9rem] items-center gap-[1px] sm:max-w-[10rem] h-1.5 rounded-full bg-border/30 overflow-hidden">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-1.5 flex-1 min-w-0 overflow-hidden rounded-full bg-border/50"
            >
              <span
                key={i === selected ? cycle : `static-${i}`}
                className={`block h-full rounded-full bg-gradient-to-r from-primary/90 to-brand-cyan/90 ${
                  i === selected
                    ? "[animation:tg-bar_var(--bar-duration)_linear_forwards]"
                    : i < selected
                      ? "w-full"
                      : "w-0"
                }`}
                style={{ "--bar-duration": `${AUTOPLAY_DELAY}ms` } as React.CSSProperties}
              />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tg-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="--bar-duration"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/**
 * Cursor-reactive 3D tilt card with a spotlight highlight that follows the
 * pointer — the same "premium hover" language used on Linear/Vercel-style
 * marketing sites. Falls back to a flat card automatically on touch devices
 * (no mousemove events fire there, so it just never tilts).
 */
function TiltCard({
  slug,
  name,
  image,
  short,
  index,
}: {
  slug: string;
  name: string;
  image: string;
  short: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group h-full [transform-style:preserve-3d]"
    >
      <Link
        to="/services/$slug"
        params={{ slug }}
        className="relative block h-full overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-shadow duration-500 group-hover:shadow-glow"
      >
        {/* Cursor spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(240px circle at ${glowX} ${glowY}, rgba(255,255,255,0.35), transparent 70%)`,
          }}
        />

        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition group-hover:opacity-100" />
          <span className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[10px] font-bold text-primary shadow-soft backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="relative p-5" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-[16px] font-bold text-foreground transition group-hover:text-primary line-clamp-1">
            {name}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">{short}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-all group-hover:gap-2.5">
            Learn More <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
