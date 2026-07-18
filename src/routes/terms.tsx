import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Arnav Physio" }] }),
  component: () => (
    <>
      <PageHero accent="violet" eyebrow="Legal" title="Terms & Conditions" breadcrumbs={[{ label: "Terms" }]} />
      <section className="py-14 md:py-20">
        <article className="container-page max-w-3xl prose prose-slate">
          <p className="text-muted-foreground">By booking an appointment or using this website you agree to these terms.</p>
          <h2 className="mt-8 text-2xl font-bold">Appointments</h2>
          <p className="text-muted-foreground mt-2">Please arrive 10 minutes before your scheduled time. Kindly inform us at least 4 hours in advance to reschedule.</p>
          <h2 className="mt-6 text-2xl font-bold">Content</h2>
          <p className="text-muted-foreground mt-2">Information on this website is for educational purposes and does not replace professional medical advice.</p>
        </article>
      </section>
    </>
  ),
});
