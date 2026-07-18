import { motion } from "framer-motion";
import { galleryImages } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function GalleryPreview() {
  const imgs = galleryImages.slice(0, 8);
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container-page">
        <SectionHeader eyebrow="Our Space" title="Inside Arnav Physio" subtitle="A calm, private clinic with modern equipment — designed to help you focus on recovery." />
        <div className="columns-2 md:columns-4 gap-4 [column-fill:_balance]">
          {imgs.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-soft group"
            >
              <img src={src} alt="" loading="lazy" className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${i % 3 === 0 ? "h-72" : "h-56"}`} />
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold hover:border-primary/40 hover:text-primary transition">
            View Full Gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
