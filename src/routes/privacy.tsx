import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Arnav Physio" }] }),
  component: () => (
    <>
      <PageHero accent="violet" eyebrow="Legal" title="Privacy Policy" breadcrumbs={[{ label: "Privacy" }]} />
      <section className="py-14 md:py-20">
        <article className="container-page max-w-3xl prose prose-slate">
          <p className="text-muted-foreground">We take your privacy seriously. This page describes how we collect, use, and protect the information you share with us when you book an appointment or contact the clinic.</p>
          <h2 className="mt-8 text-2xl font-bold">Information we collect</h2>
          <p className="text-muted-foreground mt-2">Name, phone, email, and clinical information provided by you for the purposes of booking and treating you.</p>
          <h2 className="mt-6 text-2xl font-bold">How we use it</h2>
          <p className="text-muted-foreground mt-2">Only to provide you with care, communicate about appointments, and improve your treatment outcomes. We do not sell or share your data with third parties.</p>
          <h2 className="mt-6 text-2xl font-bold">Contact</h2>
          <p className="text-muted-foreground mt-2">For any privacy request, please contact us via the Contact page.</p>
        </article>
      </section>
    </>
  ),
});
