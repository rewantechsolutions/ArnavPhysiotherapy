import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { SectionHeader } from "@/components/ui-primitives/Section";

type Video = { id: string; title: string; category: string; thumb: string; youtubeId: string };

const videos: Video[] = [
  {
    id: "1",
    title: "Inside Our Clinic",
    category: "Clinic Tour",
    thumb: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Back Pain — Recovery Journey",
    category: "Patient Story",
    thumb: "https://images.unsplash.com/photo-1616012480717-fd9867f34d99?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "How Manual Therapy Works",
    category: "Treatment",
    thumb: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Return-to-Sport Rehab",
    category: "Treatment",
    thumb: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "5-Minute Neck Relief",
    category: "Education",
    thumb: "https://images.unsplash.com/photo-1607962776028-c56f9e21afcf?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Stroke Recovery Milestones",
    category: "Patient Story",
    thumb: "https://images.unsplash.com/photo-1666214277657-e21e42b02c8a?auto=format&fit=crop&w=1200&q=80",
    youtubeId: "dQw4w9WgXcQ",
  },
];

const categories = ["All", "Clinic Tour", "Treatment", "Patient Story", "Education"];

export function VideoShowcase() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<Video | null>(null);
  const list = cat === "All" ? videos : videos.filter((v) => v.category === cat);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-surface to-white">
      <div className="container-page">
        <SectionHeader
          eyebrow="Watch & Learn"
          title="Videos From Our Clinic"
          subtitle="Clinic tours, treatment explainers and real patient recovery stories."
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                cat === c
                  ? "gradient-teal text-white shadow-soft"
                  : "bg-white border border-border text-foreground/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {list.map((v, i) => (
            <motion.button
              key={v.id}
              onClick={() => setActive(v)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl aspect-video shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1 text-left"
            >
              <img src={v.thumb} alt={v.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 backdrop-blur text-primary shadow-glow group-hover:scale-110 transition">
                  <Play className="h-6 w-6 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-glow">{v.category}</div>
                <h3 className="mt-1 text-lg font-bold">{v.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-glow"
            >
              <button
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <X className="h-4 w-4" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
                title={active.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
