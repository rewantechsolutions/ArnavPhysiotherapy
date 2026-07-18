import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { services } from "@/lib/data";
import { Check, ArrowRight } from "lucide-react";
import { BookCTA } from "@/components/home/BookCTA";
import { motion } from "framer-motion";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { service: s };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.name} — Arnav Physiotherapy` },
          { name: "description", content: loaderData.service.short },
          { property: "og:title", content: `${loaderData.service.name} — Arnav Physiotherapy` },
          { property: "og:description", content: loaderData.service.short },
          { property: "og:image", content: loaderData.service.image },
        ]
      : [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ServiceDetail,
  notFoundComponent: () => (
    <PageHero eyebrow="Not found" title="Service not found"
      subtitle="This service doesn't exist. Explore our full range instead."
      breadcrumbs={[{ label: "Services", to: "/services" }]} />
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  return (
    <>
      <PageHero accent="teal" eyebrow="Service" title={service.name} subtitle={service.short}
        image={service.image}
        breadcrumbs={[{ label: "Services", to: "/services" }, { label: service.name }]} />

      <section className="py-16 md:py-24">
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <motion.img initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src={service.image} alt={service.name}
              className="w-full aspect-[16/10] object-cover rounded-3xl shadow-card" />
            <div className="mt-10 prose prose-slate max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold">What to expect</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Your first session begins with a thorough assessment. From there we design a step-by-step plan,
                combine hands-on treatment with the right modalities and progress you at your own pace — always
                measuring what matters.
              </p>
            </div>
          </div>
          <aside className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl bg-surface p-6 md:p-8 border border-border">
              <h3 className="text-lg font-bold">Key benefits</h3>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((b: string) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl gradient-teal p-8 text-white">
              <h3 className="text-lg font-bold">Book your first session</h3>
              <p className="mt-2 text-sm text-white/85">Personalised assessment and a clear recovery plan — in one appointment.</p>
              <Link to="/book" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 py-3 text-sm font-semibold">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-page">
          <h2 className="text-2xl md:text-4xl font-bold text-center">Related treatments</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {related.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}
                className="group rounded-3xl bg-white border border-border overflow-hidden shadow-card card-lift card-lift-hover">
                <img src={s.image} alt={s.name} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="p-5">
                  <h3 className="font-bold group-hover:text-primary">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
