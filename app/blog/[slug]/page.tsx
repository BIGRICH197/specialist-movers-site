import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { getBlogArticle } from "@/lib/blog-articles";
import { blogPosts } from "@/lib/site-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  const article = getBlogArticle(params.slug);
  if (!article) notFound();

  return (
    <article className="bg-brand-white">
      <PageHero
        variant="light"
        title={article.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.title },
        ]}
      />

      <PagePhotoMomentStrip momentKey="blog" />

      <div className="mx-auto max-w-3xl py-10 container-px">
        <div className="space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-purple/85">
                {section.paragraphs.map((p, i) => (
                  <p key={`${section.heading}-${i}`}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-brand-purple/15 bg-brand-purple/[0.04] p-6">
          <p className="font-heading text-lg text-brand-purple">Get a quote</p>
          <p className="mt-2 text-sm text-brand-purple/80">
            Tell us your suburbs and move date , we&apos;ll call back within 15 minutes.
          </p>
          <Link
            href="#quote"
            className="mt-4 inline-flex rounded-full bg-brand-yellow px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple"
          >
            Free quote
          </Link>
        </div>
      </div>
    </article>
  );
}
