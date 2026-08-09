import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { SectionReveal } from "@/components/SectionReveal";
import { blogPosts } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Moving Tips & Guides Auckland",
  description:
    "Moving tips, packing guides and relocation advice for Auckland and the Waikato, from the Specialist Movers crew.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="Guides & tips"
        title="Moving insights"
        description="Practical ideas for smoother home relocations and piano moves across Auckland and New Zealand."
      />
      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <div className="grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-brand-purple/15 bg-brand-white p-5"
          >
            <h2 className="font-heading text-xl text-brand-purple">{post.title}</h2>
            <p className="mt-2 text-sm text-brand-purple/75">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-brand-purple underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-brand-purple/80"
            >
              Read more
            </Link>
          </article>
        ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-xl py-8 container-px">
        <ScatteredReviews slot="blog-footer" count={1} variant="pullquote" />
      </SectionReveal>

      <PagePhotoMomentStrip momentKey="blog" />
    </div>
  );
}
