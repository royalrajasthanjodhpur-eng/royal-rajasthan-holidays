import type { Metadata } from "next";
import ServicePage from "@/views/ServicePage";
import { services } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const SLUG = "hotels";

export function generateMetadata(): Metadata {
  const s = services.find((x) => x.slug === SLUG);
  if (!s) return buildMetadata({ title: "Services", description: "" });
  return buildMetadata({
    title: `${s.title} — ${s.kicker}`,
    description: s.intro.slice(0, 158),
    path: `/${SLUG}`,
    image: s.hero,
  });
}

export default function Page() {
  return <ServicePage slug={SLUG} />;
}
