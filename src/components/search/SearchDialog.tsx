import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, ArrowRight, CornerDownLeft, ArrowUp, ArrowDown,
  Stethoscope, HeartPulse, Compass, Sparkles,
} from "lucide-react";
import { services, conditions } from "@/lib/data";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { closeSearch, openSearch } from "@/lib/search-store";
import { useSearchState } from "@/lib/useSearchState";

type Group = "Services" | "Conditions" | "Pages";

type ResultItem = {
  id: string;
  to: string;
  title: string;
  subtitle: string;
  group: Group;
  image?: string;
};

const GROUP_ORDER: Group[] = ["Services", "Conditions", "Pages"];
const GROUP_ICON: Record<Group, any> = {
  Services: Stethoscope,
  Conditions: HeartPulse,
  Pages: Compass,
};

const QUICK_SUGGESTIONS = ["Back Pain", "Sports Injury", "Dry Needling", "Book Appointment"];

function buildIndex(): ResultItem[] {
  const svc: ResultItem[] = services.map((s) => ({
    id: `s-${s.slug}`,
    to: `/services/${s.slug}`,
    title: s.name,
    subtitle: s.short,
    group: "Services",
    image: s.image,
  }));
  const cond: ResultItem[] = conditions.map((c) => ({
    id: `c-${c.slug}`,
    to: `/conditions/${c.slug}`,
    title: c.name,
    subtitle: c.summary,
    group: "Conditions",
    image: c.image,
  }));
  const pages: ResultItem[] = nav.map((n) => ({
    id: `p-${n.to}`,
    to: n.to,
    title: n.label,
    subtitle: "Page",
    group: "Pages",
  }));
  return [...svc, ...cond, ...pages];
}

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-teal-100 text-teal-900 px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/**
 * Self-contained search dialog. Doesn't need `open`/`onOpenChange` props —
 * it reads/writes its visibility + initial query from the shared search
 * store (see `src/lib/search-store.ts`). Any component in the app can call
 * `openSearch("some query")` to open this with results already showing.
 *
 * Mount it once near the root of your app (e.g. in the root layout or
 * Header), e.g.  <SearchDialog />
 */
export function SearchDialog() {
  const { open, query: initialQuery } = useSearchState();

  const [query, setQuery] = useState(initialQuery);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q))
      .slice(0, 9);
  }, [query, index]);

  const grouped = useMemo(() => {
    const map = new Map<Group, ResultItem[]>();
    for (const g of GROUP_ORDER) map.set(g, []);
    for (const r of results) map.get(r.group)!.push(r);
    return GROUP_ORDER.map((g) => [g, map.get(g)!] as const).filter(([, items]) => items.length > 0);
  }, [results]);

  // Whenever the dialog opens, pick up whatever query it was opened with
  // (instead of always resetting to empty) and focus the input with the
  // cursor placed at the end of the pre-filled text.
  useEffect(() => {
    if (open) {
      setQuery(initialQuery);
      setActiveIndex(0);
      const t = setTimeout(() => {
        const el = inputRef.current;
        if (el) {
          el.focus();
          el.setSelectionRange(el.value.length, el.value.length);
        }
      }, 60);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialQuery]);

  useEffect(() => setActiveIndex(0), [query]);

  const goTo = (to: string) => {
    closeSearch();
    navigate({ to });
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        closeSearch();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        goTo(results[activeIndex].to);
      }
    }
    window.addEventListener("keydown", onKey as any);
    return () => window.removeEventListener("keydown", onKey as any);
  }, [open, results, activeIndex]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="search-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closeSearch()}
            className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm"
          />

          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[8vh] z-[101] mx-auto w-[92vw] max-w-2xl"
          >
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[0_50px_120px_-30px_rgba(15,23,42,0.45)]">
              {/* Input row */}
              <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-teal text-white">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    // keep the store's query in sync so re-opens / refreshes
                    // reflect the latest typed value too
                    openSearch(e.target.value);
                  }}
                  placeholder="Search treatments, conditions, pages…"
                  className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  aria-label="Close search"
                  onClick={() => closeSearch()}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[60vh] overflow-y-auto p-3">
                {!query.trim() && (
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-teal-500" /> Popular searches
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {QUICK_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="rounded-full border border-border/70 bg-teal-50/50 px-3.5 py-1.5 text-[12.5px] font-medium text-teal-700 hover:bg-teal-100/60 transition"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {query.trim() && results.length === 0 && (
                  <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
                      <Search className="h-5 w-5" />
                    </div>
                    <div className="text-[14px] font-semibold text-foreground">No matches for "{query}"</div>
                    <div className="text-[12.5px] text-muted-foreground max-w-xs">
                      Try a symptom like "knee pain" or a treatment like "dry needling".
                    </div>
                  </div>
                )}

                {grouped.map(([group, items]) => {
                  const GroupIcon = GROUP_ICON[group];
                  return (
                    <div key={group} className="mb-2 last:mb-0">
                      <div className="flex items-center gap-1.5 px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        <GroupIcon className="h-3.5 w-3.5 text-teal-500" /> {group}
                      </div>
                      <div className="grid gap-1">
                        {items.map((item) => {
                          const flatIndex = results.findIndex((r) => r.id === item.id);
                          const isActive = flatIndex === activeIndex;
                          return (
                            <Link
                              key={item.id}
                              to={item.to}
                              onClick={() => closeSearch()}
                              onMouseEnter={() => setActiveIndex(flatIndex)}
                              className={cn(
                                "group flex items-center gap-3 rounded-2xl p-2.5 transition-colors",
                                isActive ? "bg-teal-50" : "hover:bg-muted/70",
                              )}
                            >
                              {item.image ? (
                                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border/60">
                                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                                </div>
                              ) : (
                                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600">
                                  <GroupIcon className="h-4.5 w-4.5" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="text-[13.5px] font-semibold text-foreground truncate">
                                  {highlight(item.title, query)}
                                </div>
                                <div className="text-[11.5px] text-muted-foreground truncate">{item.subtitle}</div>
                              </div>
                              <ArrowRight className={cn("h-3.5 w-3.5 shrink-0 text-teal-400 transition-transform", isActive && "translate-x-0.5")} />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer hints */}
              <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-5 py-2.5 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><ArrowUp className="h-3 w-3" /><ArrowDown className="h-3 w-3" /> navigate</span>
                  <span className="inline-flex items-center gap-1"><CornerDownLeft className="h-3 w-3" /> select</span>
                </div>
                <span>
                  Press <kbd className="rounded bg-white border border-border px-1.5 py-0.5 text-[10px] font-semibold">Esc</kbd> to close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
