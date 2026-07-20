import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, Mail, Search, Instagram, Facebook,
  ChevronDown, ChevronRight, Stethoscope, HeartPulse, Activity, Zap, Dumbbell, Brain,
  Bone, Sparkles, Image as ImageIcon, BookOpen, MessageSquare,
  Info, HelpCircle, Calendar, Star, ArrowRight,
} from "lucide-react";
import { doctorProfile, nav, site } from "@/lib/site";
import { services, conditions, galleryItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search/SearchDialog";
import { closeSearch, getSearchState, openSearch } from "@/lib/search-store";
import logo from '../../assets/logo.png';

const serviceIcons: Record<string, any> = {
  "manual-therapy": HeartPulse,
  "exercise-therapy": Dumbbell,
  "electrotherapy": Zap,
  "dry-needling": Activity,
  "shockwave-therapy": Zap,
  "sports-rehabilitation": Dumbbell,
  "cupping-therapy": Sparkles,
  "neurological-physiotherapy": Brain,
};
const conditionIcons: Record<string, any> = {
  "back-pain": Bone,
  "neck-pain": Bone,
  "shoulder-pain": Activity,
  "knee-pain": Bone,
  "sciatica": Activity,
  "slip-disc": Bone,
  "frozen-shoulder": Activity,
  "sports-injury": Dumbbell,
  "arthritis": Bone,
  "stroke-rehab": Brain,
  "neurological-rehab": Brain,
  "post-surgery-rehab": HeartPulse,
};

type MegaItem = { to: string; label: string; desc: string; Icon: any; img?: string };
type MegaTheme = {
  gradient: string;
  chip: string;
  soft: string;
  ring: string;
  layout: "grid" | "list" | "stack" | "mosaic";
  title: string;
  blurb: string;
  cta: string;
};

const tealBase = {
  gradient: "gradient-teal",
  chip: "text-teal-700 bg-teal-50",
  soft: "from-teal-50/70 to-white",
  ring: "hover:ring-teal-300/60",
} as const;

const megaThemes: Record<string, MegaTheme> = {
  "/services": {
    ...tealBase,
    layout: "grid",
    title: "Our Treatments",
    blurb: "Hands-on, evidence-based physiotherapy tailored to your goal.",
    cta: "Explore all services",
  },
  "/conditions": {
    ...tealBase,
    layout: "list",
    title: "Conditions We Treat",
    blurb: "From back pain to stroke recovery — we've got a plan for it.",
    cta: "See all conditions",
  },
  "/about": {
    ...tealBase,
    layout: "stack",
    title: "About Arnav Physio",
    blurb: "Meet the team, our philosophy and what patients say about us.",
    cta: "About the clinic",
  },
  "/gallery": {
    ...tealBase,
    layout: "mosaic",
    title: "Explore & Connect",
    blurb: "Photos, articles and quick ways to reach out.",
    cta: "Open gallery",
  },
};

function buildMega(kind: string): MegaItem[] | null {
  if (kind === "/services") {
    return services.slice(0, 8).map((s) => ({
      to: `/services/${s.slug}`,
      label: s.name,
      desc: s.short,
      Icon: serviceIcons[s.slug] || Stethoscope,
      img: s.image,
    }));
  }
  if (kind === "/conditions") {
    return conditions.slice(0, 8).map((c) => ({
      to: `/conditions/${c.slug}`,
      label: c.name,
      desc: c.summary,
      Icon: conditionIcons[c.slug] || HeartPulse,
      img: c.image,
    }));
  }
  if (kind === "/about") {
    return [
      { to: "/about", label: "Our Story", desc: "Who we are and what drives us.", Icon: Info },
      { to: "/testimonials", label: "Testimonials", desc: "Real recovery stories from patients.", Icon: Star },
      { to: "/faq", label: "FAQs", desc: "Answers to common questions.", Icon: HelpCircle },
    ];
  }
  if (kind === "/gallery") {
    const imgs = galleryItems.map((g) => g.src);
    return [
      { to: "/gallery", label: "Clinic Gallery", desc: "Facilities, treatments and results.", Icon: ImageIcon, img: imgs[0] },
      { to: "/blog", label: "Health Blog", desc: "Tips, guides & wellness reads.", Icon: BookOpen, img: imgs[3] },
      { to: "/contact", label: "Contact", desc: "Reach out — we'll get back fast.", Icon: MessageSquare, img: imgs[8] },
      { to: "/book", label: "Book Now", desc: "Reserve a personalised session.", Icon: Calendar, img: imgs[5] },
    ];
  }
  return null;
}

// Shared reveal variants — blur-to-focus card entrance with a cascading
// stagger for the children inside (link grid, intro block, etc.)
const panelReveal = {
  hidden: { opacity: 0, y: -10, scale: 0.97, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.36,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.035,
      delayChildren: 0.06,
    },
  },
};
const itemReveal = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

// Grace period (ms) before the mega menu closes after the cursor leaves the
// hover region — gives users time to travel from the nav link to the panel
// without it slamming shut on them.
const CLOSE_DELAY = 300;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(70);

  // Hover-intent timer so a slow/diagonal cursor move doesn't close the menu.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMegaImmediate = (to: string | null) => {
    clearCloseTimer();
    setOpenMega(to);
  };

  const scheduleCloseMega = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpenMega(null);
    }, CLOSE_DELAY);
  };

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setHeaderHeight(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    clearCloseTimer();
    setOpenMega(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const state = getSearchState();
        if (state.open) {
          closeSearch();
        } else {
          openSearch();
        }
      }
      if (e.key === "Escape") openMegaImmediate(null);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearCloseTimer(), []);

  const activeMega = openMega ? buildMega(openMega) : null;
  const activeTheme = openMega ? megaThemes[openMega] : null;
  const activeLabel = nav.find((n) => n.to === openMega)?.label ?? "";

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      {/* Main nav */}
      <div
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] border-border/60"
            : "bg-white/90 backdrop-blur-md border-transparent",
        )}
      >
        <div className="container-page flex h-[70px] items-center justify-between gap-4">
          <Link to="/" className="flex items-center justify-center -ml-6 ">
            <div className=" flex items-center justify-center overflow-hidden" style={{ width: "100px", height: "auto" }}>
              <img src={logo} alt="Arnav Physiotherapy Centre" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col -ml-6">
              <span className="text-xl font-bold tracking-tight text-foreground leading-tight">ARNAV</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Physiotherapy</span>
            </div>
          </Link>

          {/* Nav row + mega panel share one hover region. Leaving the whole
              region schedules a delayed close instead of closing instantly,
              so a slow diagonal cursor move to the panel doesn't get cut off. */}
          <div
            className="hidden lg:flex flex-1 items-center justify-center relative"
            onMouseLeave={scheduleCloseMega}
            onMouseEnter={clearCloseTimer}
          >
            <nav className="flex items-center gap-1">
              {nav.map((n) => {
                const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
                const hasMega = !!megaThemes[n.to];
                return (
                  <div key={n.to} onMouseEnter={() => openMegaImmediate(hasMega ? n.to : null)}>
                    <Link
                      to={n.to}
                      className={cn(
                        "relative flex items-center gap-1 px-3 py-2 text-[14px] font-medium transition-colors",
                        active || openMega === n.to ? "text-primary" : "text-foreground/80 hover:text-primary",
                      )}
                    >
                      {n.label}
                      {hasMega && (
                        <ChevronDown className={cn("h-3.5 w-3.5 opacity-70 transition-transform", openMega === n.to && "rotate-180")} />
                      )}
                      {active && <motion.span layoutId="nav-underline" className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-[70%] rounded-full bg-primary" />}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Floating centered card — no longer a full-width sheet.
                Positioned absolute against the sticky header so it's always
                pinned correctly, even before the header engages sticky mode. */}
            <AnimatePresence>
              {activeMega && activeTheme && (
                <>
                  <motion.div
                    key="mega-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => openMegaImmediate(null)}
                    className="absolute inset-x-0 z-30 bg-slate-900/20"
                    style={{ top: headerHeight, height: "60vh" }}
                  />
                  <div
                    className="absolute inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
                    style={{ top: headerHeight }}
                  >
                    <motion.div
                      key={openMega}
                      variants={panelReveal}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      onMouseEnter={clearCloseTimer}
                      className="pointer-events-auto mt-3 w-[860px] max-w-[94vw] origin-top rounded-3xl border border-border bg-white shadow-[0_30px_70px_-25px_rgba(15,23,42,0.35)]"
                    >
                      <FullMegaPanel
                        theme={activeTheme}
                        items={activeMega}
                        navTo={openMega!}
                        navLabel={activeLabel}
                        onClose={() => openMegaImmediate(null)}
                      />
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => openSearch()} aria-label="Search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full gradient-teal text-white shadow-soft hover:scale-105 transition">
              <Search className="h-4 w-4" />
            </button>
            {/* <button aria-label="Open search" onClick={() => openSearch()} className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70">
              <Search className="h-4 w-4" />
            </button> */}
            <Link to="/book" className="hidden sm:inline-flex items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5">
              Book Appointment
            </Link>
            <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border bg-white"
            >
              <div className="container-page py-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
                {nav.map((n) => {
                  const mega = buildMega(n.to);
                  const active = mobileSub === n.to;
                  return (
                    <div key={n.to} className="border-b border-border/60 last:border-0">
                      <div className="flex items-center">
                        <Link to={n.to} className="flex-1 px-3 py-3 rounded-xl text-[15px] font-medium text-foreground/90">
                          {n.label}
                        </Link>
                        {mega && (
                          <button aria-label="Toggle" onClick={() => setMobileSub(active ? null : n.to)} className="p-3 text-foreground/60">
                            <ChevronDown className={cn("h-4 w-4 transition", active && "rotate-180")} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {mega && active && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-3 pb-3">
                            <div className="grid gap-1">
                              {mega.map((m) => (
                                <Link key={m.to} to={m.to} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted">
                                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                                    <m.Icon className="h-3.5 w-3.5" />
                                  </div>
                                  <span className="text-sm text-foreground/80">{m.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <Link to="/book" className="mt-3 text-center rounded-full gradient-teal px-5 py-3 text-sm font-semibold text-white">
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SearchDialog />
    </header>
  );
}

function SafeImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
    />
  );
}

/**
 * One shared template used by every nav item — a compact floating card with
 * a left "intro" column (title/blurb/featured visual) and a right-hand grid
 * of links. Sized to content instead of the full viewport, so it reads as a
 * considered dropdown rather than a page takeover.
 */
function FullMegaPanel({
  theme,
  items,
  navTo,
  navLabel,
  onClose,
}: {
  theme: MegaTheme;
  items: MegaItem[];
  navTo: string;
  navLabel: string;
  onClose: () => void;
}) {
  const featured = items[0];
  const rest = theme.layout === "grid" ? items.slice(1) : items;
  const isAbout = theme.layout === "stack";

  return (
    <div className="p-7">
      <div className="grid grid-cols-[240px_1fr] gap-7">
        {/* Left: identity column */}
        <motion.div variants={itemReveal} className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary/70">{navLabel}</span>
          <h3 className="mt-1.5 text-xl font-bold leading-tight text-foreground">{theme.title}</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{theme.blurb}</p>

          {isAbout ? (
            <div className="relative mt-4 min-h-[150px] overflow-hidden rounded-2xl border border-border/70 shadow-soft">
              <SafeImg
                src={doctorProfile.image}
                alt="Dr. Dushyant Singh"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/25 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-3.5 text-white">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/20 backdrop-blur border border-white/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">
                  Founder
                </span>
                <div className="mt-1.5 text-[13px] font-bold leading-tight">Dr. Dushyant Singh</div>
                <div className="text-[10.5px] text-white/85">BPT, MPT (Sports)</div>
              </div>
            </div>
          ) : (
            <Link
              to={featured.to}
              onClick={onClose}
              className="group relative mt-4 block min-h-[150px] overflow-hidden rounded-2xl border border-border/70 shadow-soft transition hover:shadow-glow"
            >
              {featured.img && (
                <SafeImg
                  src={featured.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/85 via-teal-900/35 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-3.5 text-white">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/20 backdrop-blur border border-white/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">
                  Featured
                </span>
                <div className="mt-1.5 text-[13.5px] font-bold leading-tight">{featured.label}</div>
                <div className="mt-1 text-[10.5px] text-white/85 line-clamp-2 leading-snug">{featured.desc}</div>
                <span className="mt-2 inline-flex items-center gap-1 text-[10.5px] font-semibold text-white/95">
                  Learn more <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              to={navTo}
              onClick={onClose}
              className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition hover:opacity-90", theme.chip)}
            >
              {theme.cta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/book"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-[12px] font-semibold text-foreground/80 transition hover:border-primary hover:text-primary"
            >
              Book Now
            </Link>
          </div>
        </motion.div>

        {/* Right: link grid — each item cascades in on open */}
        <div className={cn("grid gap-2", isAbout ? "grid-cols-2 content-start" : "grid-cols-2 content-start")}>
          {rest.map((m) => (
            <motion.div key={m.to} variants={itemReveal}>
              <Link
                to={m.to}
                onClick={onClose}
                className="group flex items-start gap-3 rounded-2xl border border-transparent p-2.5 transition-all hover:border-teal-100 hover:bg-teal-50/50 hover:shadow-soft"
              >
                {m.img ? (
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border/60">
                    <SafeImg src={m.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                ) : (
                  <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-soft transition group-hover:scale-105 group-hover:rotate-3", theme.gradient)}>
                    <m.Icon className="h-4 w-4" />
                  </div>
                )}
                <div className="min-w-0 pt-0.5">
                  <div className="flex items-center gap-1 text-[12.5px] font-semibold text-foreground transition group-hover:text-teal-700">
                    {m.label}
                    <ChevronRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground line-clamp-2">{m.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        variants={itemReveal}
        className={cn("mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-br px-4 py-2.5", theme.soft)}
      >
        <span className="text-[11px] text-muted-foreground">
          Need help deciding? <span className="font-semibold text-foreground/80">Call {site.phone1}</span>
        </span>
        <span className="text-[10.5px] text-muted-foreground">
          Press <kbd className="rounded bg-white border border-border px-1.5 py-0.5 text-[9.5px] font-semibold">Esc</kbd> to close
        </span>
      </motion.div>
    </div>
  );
}