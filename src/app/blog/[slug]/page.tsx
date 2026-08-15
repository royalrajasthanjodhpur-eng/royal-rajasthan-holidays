import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/views/Content";
import { blogPosts } from "@/lib/content";
import { buildMetadata, jsonLdScript } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) return buildMetadata({ title: "Article", description: "" });

  return buildMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${slug}`,
    image: p.image,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    image: p.image,
    datePublished: p.date,
    author: { "@type": "Organization", name: "Royal Rajasthan Holidays" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <BlogPost />
    </>
  );
}
