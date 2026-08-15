import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "@/views/DestinationDetail";
import { bySlug, destinations } from "@/lib/destinations";
import { buildMetadata, jsonLdScript } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

/** Pre-render all 36 destination pages at build time. */
export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = bySlug(slug);
  if (!d) return buildMetadata({ title: "Destination", description: "" });

  // Values copied verbatim from the original useSeo() call.
  return buildMetadata({
    title: `${d.name} Holidays — ${d.tagline}`,
    description: `${d.overview.slice(0, 155)}…`,
    path: `/destination/${slug}`,
    image: d.hero,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const d = bySlug(slug);

  // Server-side 404 instead of the old client-side <Navigate to="/404">.
  if (!d) notFound();

  /**
   * TouristDestination structured data, preserved from useSeo().
   * No aggregateRating is emitted — there are no verified ratings to report,
   * and inventing one would be a fabrication.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.overview,
    image: d.hero,
    touristType: d.idealFor,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <DestinationDetail />
    </>
  );
}
