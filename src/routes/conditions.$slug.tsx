import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { conditions } from "@/lib/data";
import { Check, ArrowRight } from "lucide-react";
import { BookCTA } from "@/components/home/BookCTA";

export const Route = createFileRoute("/conditions/$slug")({
  loader: ({ params }) => {
    const c = conditions.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { condition: c };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.condition.name} — Physiotherapy in Jhansi` },
          { name: "description", content: loaderData.condition.summary },
          { property: "og:title", content: `${loaderData.condition.name} — Physiotherapy` },
          { property: "og:description", content: loaderData.condition.summary },
          { property: "og:image", content: loaderData.condition.image },
        ]
      : [{ title: "Condition not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ConditionDetail,
  notFoundComponent: () => (
    <PageHero eyebrow="Not found" title="Condition not found"
      subtitle="Explore our full list of conditions instead."
      breadcrumbs={[{ label: "Conditions", to: "/conditions" }]} />
  ),
});

function ConditionDetail() {
  const { condition } = Route.useLoaderData();
  const causes = [
    "Prolonged static posture",
    "Sudden or repetitive strain",
    "Under-recovery from previous injury",
    "Weakness of supporting muscles",
  ];
  const approach = [
    "Detailed clinical assessment",
    "Hands-on manual therapy",
    "Progressive exercise programme",
    "Modalities where appropriate",
    "Home routine to prevent recurrence",
  ];
  return (
    <>
      <PageHero accent="rose" eyebrow="Condition" title={condition.name} subtitle={condition.summary}
        image={condition.image}
        breadcrumbs={[{ label: "Conditions", to: "/conditions" }, { label: condition.name }]} />
      <section className="py-16 md:py-24">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <img src={condition.image} alt={condition.name} className="w-full aspect-[16/10] object-cover rounded-3xl shadow-card" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Understanding {condition.name}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {condition.summary} We assess the full picture — mechanics, lifestyle, history — before recommending a plan.
                No guesswork, no assumptions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Common causes</h3>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {causes.map((c) => (
                  <li key={c} className="flex gap-3 items-start rounded-2xl border border-border bg-white p-4">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-3.5 w-3.5" /></span>
                    <span className="text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl bg-surface p-6 md:p-8 border border-border">
              <h3 className="text-lg font-bold">How we treat it</h3>
              <ul className="mt-4 space-y-3">
                {approach.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-3.5 w-3.5" /></span>
                    <span className="text-sm">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl gradient-teal p-8 text-white">
              <h3 className="text-lg font-bold">Talk to a physiotherapist</h3>
              <p className="mt-2 text-sm text-white/85">Get a clear plan and honest timelines in your first session.</p>
              <Link to="/book" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 py-3 text-sm font-semibold">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <BookCTA />
    </>
  );
}
