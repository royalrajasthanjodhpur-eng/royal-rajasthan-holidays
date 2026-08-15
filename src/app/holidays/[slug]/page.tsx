import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HolidayTypeDetail } from "@/views/Holidays";
import { holidayTypes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return holidayTypes.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = holidayTypes.find((x) => x.slug === slug);
  if (!h) return buildMetadata({ title: "Holiday Type", description: "" });

  return buildMetadata({
    title: `${h.name} — Curated by Royal Rajasthan Holidays`,
    description: h.intro,
    path: `/holidays/${slug}`,
    image: h.image,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  if (!holidayTypes.some((x) => x.slug === slug)) notFound();
  return <HolidayTypeDetail />;
}
