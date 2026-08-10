import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { ArticleByline } from "@/components/ArticleByline";
import { schemaIds } from "@/lib/schema-graph";
import { linkedInUrl } from "@/lib/company-facts";
import { PageHero } from "@/components/PageHero";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { PageUpdatedStamp } from "@/components/PageUpdatedStamp";
import { getBlogArticle } from "@/lib/blog-articles";
import { blogPosts } from "@/lib/site-data";
import { siteUrl } from "@/lib/site-config";

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
  return buildPageMetadata({
    title: { absolute: post.seoTitle },
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraphType: "article",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  const article = getBlogArticle(params.slug);
  if (!article) notFound();

  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    image: `${siteUrl}/opengraph-image`,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/about#richard`,
      name: "Richard Boote",
      jobTitle: "Owner & General Manager",
      worksFor: { "@id": schemaIds.organization },
      sameAs: [
        "https://www.linkedin.com/in/richard-boote-531b7a1b4/",
        linkedInUrl,
      ],
    },
    publisher: { "@id": schemaIds.organization },
  };

  return (
    <article className="bg-brand-white">
      <JsonLd data={blogPostingJsonLd} />
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
        <PageUpdatedStamp
          date={new Date(post.publishedDate).toLocaleDateString("en-NZ", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          className="mb-8"
        />
        <ArticleByline className="mb-10" />
        <div className="space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              {section.image ? (
                <figure className="mb-6">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      className="object-cover"
                      /* Article column is max-w-3xl, so the image never renders
                         wider than 768px on any viewport. */
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                  {section.image.credit ? (
                    <figcaption className="mt-2 text-xs text-brand-purple/60">
                      Photo: {section.image.credit}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
              <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-purple/85">
                {section.paragraphs.map((p, i) => (
                  <p key={`${section.heading}-${i}`}>{p}</p>
                ))}
              </div>
              {section.table ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                    {section.table.caption ? (
                      <caption className="caption-bottom pt-3 text-left text-xs text-brand-purple/60">
                        {section.table.caption}
                      </caption>
                    ) : null}
                    <thead>
                      <tr className="border-b border-brand-purple/20">
                        {section.table.columns.map((col) => (
                          <th
                            key={col}
                            scope="col"
                            className="py-2 pr-4 font-heading text-sm font-bold text-brand-purple"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr
                          key={row.join("|")}
                          className="border-b border-brand-purple/10"
                        >
                          {row.map((cell, i) => (
                            <td
                              key={`${row[0]}-${i}`}
                              className="py-2 pr-4 align-top text-brand-purple/85 tabular-nums"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              {section.link ? (
                <p className="mt-4">
                  <Link
                    href={section.link.href}
                    className="font-heading text-base font-bold text-brand-purple underline decoration-brand-yellow decoration-2 underline-offset-4"
                  >
                    {section.link.label}
                  </Link>
                </p>
              ) : null}
            </section>
          ))}
        </div>

        {article.faqs?.length ? (
          <section className="mt-12">
            <FaqPageJsonLd items={article.faqs} />
            <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
              Common questions
            </h2>
            <dl className="mt-6 space-y-6">
              {article.faqs.map((faq) => (
                <div key={faq.q}>
                  <dt className="font-heading text-lg text-brand-purple">
                    {faq.q}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-brand-purple/85">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <div className="mt-12 rounded-2xl border border-brand-purple/15 bg-brand-purple/[0.04] p-6">
          <p className="font-heading text-lg text-brand-purple">Get a quote</p>
          <p className="mt-2 text-sm text-brand-purple/80">
            Tell us your suburbs and move date , we&apos;ll call back within 15 minutes.
          </p>
          <Link
            href="/#quote"
            className="mt-4 inline-flex rounded-full bg-brand-yellow px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple"
          >
            Free quote
          </Link>
        </div>
      </div>
    </article>
  );
}
