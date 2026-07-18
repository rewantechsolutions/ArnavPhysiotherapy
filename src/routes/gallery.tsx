import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut,
  ArrowUpRight, ImageOff,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { galleryItems, type GalleryItem } from "@/lib/data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Arnav Physiotherapy Centre, Jhansi" },
      { name: "description", content: "Take a tour of our clinic, equipment and treatment sessions at Arnav Physiotherapy Centre, Jhansi." },
      { property: "og:title", content: "Gallery — Arnav Physiotherapy Centre" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const CATEGORIES = ["All", "Clinic", "Treatments", "Equipment", "Sessions"] as const;
type Category = (typeof CATEGORIES)[number];

function GalleryPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [loaded, setLoaded] = useState<Set<string>>(new Set());

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: galleryItems.length };
    for (const c of CATEGORIES) {
      if (c === "All") continue;
      map[c] = galleryItems.filter((g) => g.category === c).length;
    }
    return map;
  }, []);

  const items = useMemo<GalleryItem[]>(
    () => (filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter],
  );

  const markLoaded = useCallback((src: string) => {
    setLoaded((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));
  }, []);

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(() => {
    setDirection(1);
    setOpenIdx((i) => (i === null ? i : (i + 1) % items.length));
  }, [items.length]);
  const prev = useCallback(() => {
    setDirection(-1);
    setOpenIdx((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  }, [items.length]);
  const jumpTo = useCallback((target: number) => {
    setOpenIdx((i) => {
      if (i === null) return i;
      setDirection(target > i ? 1 : -1);
      return target;
    });
  }, []);

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    if (openIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [openIdx]);

  useEffect(() => {
    if (openIdx === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [openIdx, close, next, prev]);

  return (
    <>
      <PageHero
        accent="amber"
        eyebrow="Gallery"
        title="Inside Arnav Physio"
        subtitle="A calm, modern clinic built around recovery — clinic space, equipment and real treatment sessions."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          {/* Filter bar */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((c) => {
                const active = filter === c;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={
                      "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors " +
                      (active ? "text-white" : "bg-white border border-border text-foreground/70 hover:text-primary hover:border-primary/40")
                    }
                  >
                    {active && (
                      <motion.span
                        layoutId="gallery-active-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full gradient-teal shadow-soft"
                      />
                    )}
                    <span className="relative flex items-center gap-1.5">
                      {c}
                      <span className={"text-[11px] font-bold " + (active ? "text-white/75" : "text-muted-foreground")}>
                        {counts[c] ?? 0}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={filter}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="text-[13px] text-muted-foreground"
              >
                Showing <span className="font-semibold text-foreground">{items.length}</span> photo{items.length !== 1 ? "s" : ""}
                {filter !== "All" && <> in <span className="font-semibold text-foreground">{filter}</span></>}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Masonry grid */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-muted text-muted-foreground">
                <ImageOff className="h-6 w-6" />
              </div>
              <div className="text-[15px] font-semibold text-foreground">No photos here yet</div>
              <div className="text-[13px] text-muted-foreground">Try a different category — we're adding more soon.</div>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
              <AnimatePresence>
                {items.map((it, i) => {
                  const isLoaded = loaded.has(it.src);
                  return (
                    <motion.button
                      key={it.src}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                      onClick={() => setOpenIdx(i)}
                      className="group block w-full break-inside-avoid rounded-3xl overflow-hidden bg-white border border-border shadow-card hover:shadow-glow hover:-translate-y-1 transition-all"
                    >
                      <div className="relative overflow-hidden bg-muted">
                        {!isLoaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted to-muted/60" />}
                        <img
                          ref={(el) => {
                            // Cached images can finish loading before onLoad attaches — catch that here.
                            if (el && el.complete && el.naturalWidth > 0) markLoaded(it.src);
                          }}
                          src={it.src}
                          alt={it.title}
                          loading="lazy"
                          onLoad={() => markLoaded(it.src)}
                          onError={() => markLoaded(it.src)}
                          className={
                            "w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 " +
                            (isLoaded ? "opacity-100" : "opacity-0")
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                          <div className="text-xs font-bold uppercase tracking-widest text-white/80">{it.category}</div>
                          <div className="text-sm font-semibold">{it.title}</div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        items={items}
        openIdx={openIdx}
        direction={direction}
        onClose={close}
        onNext={next}
        onPrev={prev}
        onJump={jumpTo}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Cinematic lightbox — directional slide, zoom, filmstrip navigator  */
/* ------------------------------------------------------------------ */

function Lightbox({
  items,
  openIdx,
  direction,
  onClose,
  onNext,
  onPrev,
  onJump,
}: {
  items: GalleryItem[];
  openIdx: number | null;
  direction: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJump: (i: number) => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoomed(false);
    if (openIdx !== null) closeBtnRef.current?.focus();
  }, [openIdx]);

  useEffect(() => {
    if (openIdx === null) return;
    const thumb = filmstripRef.current?.children[openIdx] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [openIdx]);

  return (
    <AnimatePresence>
      {openIdx !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="text-[13px] text-white/70">
              <span className="font-semibold text-white">{items[openIdx].category}</span>
              <span className="mx-2 opacity-40">•</span>
              {openIdx + 1} / {items.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </button>
              <a
                href={items[openIdx].src}
                target="_blank"
                rel="noreferrer"
                aria-label="Open original size"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image stage */}
          <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onPrev}
              aria-label="Previous"
              className="absolute left-2 sm:left-4 z-10 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next"
              className="absolute right-2 sm:right-4 z-10 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <AnimatePresence custom={direction} mode="popLayout">
              <motion.img
                key={items[openIdx].src}
                src={items[openIdx].src}
                alt={items[openIdx].title}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ x: dir >= 0 ? 90 : -90, opacity: 0, scale: 0.97 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (dir: number) => ({ x: dir >= 0 ? -90 : 90, opacity: 0, scale: 0.97 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                drag={zoomed ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) onNext();
                  else if (info.offset.x > 80) onPrev();
                }}
                onClick={() => setZoomed((z) => !z)}
                className={
                  "max-h-[68vh] sm:max-h-[70vh] w-auto rounded-2xl object-contain select-none " +
                  (zoomed ? "max-w-none h-auto scale-[1.7] cursor-zoom-out transition-transform duration-300" : "max-w-full cursor-zoom-in")
                }
              />
            </AnimatePresence>
          </div>

          {/* Caption */}
          <div className="text-center text-white/90 text-sm pb-3" onClick={(e) => e.stopPropagation()}>
            <span className="font-bold text-white">{items[openIdx].title}</span>
            <span className="mx-2 opacity-50">•</span>
            <span className="opacity-70">Swipe or use ← → to browse</span>
          </div>

          {/* Filmstrip */}
          <div
            ref={filmstripRef}
            onClick={(e) => e.stopPropagation()}
            className="flex gap-2 overflow-x-auto px-4 sm:px-6 pb-5 pt-1 scrollbar-thin"
          >
            {items.map((it, i) => (
              <button
                key={it.src}
                onClick={() => onJump(i)}
                aria-label={`Go to ${it.title}`}
                className={
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all " +
                  (i === openIdx ? "border-white opacity-100 scale-105" : "border-white/10 opacity-50 hover:opacity-80")
                }
              >
                <img src={it.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
