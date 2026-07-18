import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { blogs } from "@/lib/data";
import { BookCTA } from "@/components/home/BookCTA";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const b = blogs.find((x) => x.slug === params.slug);
    if (!b) throw notFound();
    return { post: b };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Arnav Physio Journal` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:image", content: loaderData.post.image },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
  }),
  component: BlogDetail,
  notFoundComponent: () => (
    <PageHero eyebrow="Not found" title="Article not found"
      subtitle="Browse our journal for the latest articles."
      breadcrumbs={[{ label: "Blog", to: "/blog" }]} />
  ),
});

function BlogDetail() {
  const { post } = Route.useLoaderData();
  return (
    <>
      <PageHero accent="amber" eyebrow={post.category} title={post.title} subtitle={post.excerpt}
        image={post.image}
        breadcrumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />
      <section className="py-14 md:py-20">
        <article className="container-page max-w-3xl">
          <div className="text-sm text-muted-foreground mb-6">{post.date} • {post.read}</div>
          <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-3xl shadow-card" />
          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-foreground/85">
            <p>Recovery isn't just about the injury — it's about the whole person. In this piece, we walk through
              a simple, sustainable approach you can apply this week, without expensive equipment or a full gym setup.</p>
            <h2 className="text-2xl font-bold text-foreground pt-4">Why small habits matter</h2>
            <p>Consistency beats intensity. A five-minute routine done daily creates far more change than an hour done occasionally.
              The goal is to build a rhythm your body can rely on.</p>
            <h2 className="text-2xl font-bold text-foreground pt-4">A simple starting plan</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Warm-up: gentle mobility for 2 minutes.</li>
              <li>Activation: light strengthening for the affected area.</li>
              <li>Cool-down: 3 focused stretches, held for 30 seconds each.</li>
            </ol>
            <p>If any exercise increases your pain, stop and check in with a physiotherapist.
              A short assessment now can save weeks of trial and error later.</p>
          </div>
          <div className="mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to journal
            </Link>
          </div>
        </article>
      </section>
      <BookCTA />
    </>
  );
}
