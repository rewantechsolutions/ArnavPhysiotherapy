import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Home, ChevronRight, Sparkles } from "lucide-react";

// Unified single-theme (teal) page hero across all routes.
// The `accent` prop is kept for backwards compatibility but ignored.
type Accent = "teal" | "coral" | "violet" | "amber" | "rose" | "sky";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  image = "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=2000&q=80",
  accent: _accent = "teal",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
  image?: string;
  accent?: Accent;
  children?: ReactNode;
}) {
  const heroRef = useRef<HTMLElement>(null);

  // Track how far the hero has scrolled past the top of the viewport.
  // progress 0  -> hero sits fully in view, right at the top of the page
  // progress 1  -> hero has fully scrolled out from under the sticky header
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Smooth out the raw scroll value so the expansion feels eased, not 1:1 jittery.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 260, damping: 38, mass: 0.6 });

  // The whole effect resolves within the first ~35% of the hero scrolling past —
  // after that it simply stays full-width for the rest of the scroll.
  const marginX = useTransform(smoothProgress, [0, 0.35], ["2rem", "0rem"]);
  const marginY = useTransform(smoothProgress, [0, 0.35], ["1rem", "0rem"]);
  const radius = useTransform(smoothProgress, [0, 0.35], ["20px", "0px"]);

  return (
    <motion.section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{
        marginLeft: marginX,
        marginRight: marginX,
        marginTop: marginY,
        marginBottom: marginY,
        borderRadius: radius,
      }}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
      />
      {/* Unified teal scrim */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/30 via-teal-700/15 to-cyan-800/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/30" />

      {/* Decorative blobs (single theme) */}
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-teal-400/30 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative container-page pt-14 pb-16 md:pt-24 md:pb-24 text-center">
        <nav className="flex items-center justify-center gap-1.5 text-xs text-white/80 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-white transition"><Home className="h-3 w-3" /> Home</Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              {b.to ? <Link to={b.to} className="hover:text-white transition">{b.label}</Link> : <span className="text-white font-semibold">{b.label}</span>}
            </span>
          ))}
        </nav>

        {/* {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border bg-teal-400/20 text-teal-50 border-teal-300/40 backdrop-blur px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
          >
            <Sparkles className="h-3 w-3" /> {eyebrow}
          </motion.span>
        )} */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </motion.section>
  );
}
