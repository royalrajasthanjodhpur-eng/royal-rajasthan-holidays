import type { Metadata } from "next";
import { Gallery } from "@/views/Content";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const metadata: Metadata = buildMetadata({
  title: "Gallery — Destinations, Journeys & Moments",
  description:
    "A visual journey through the destinations we curate — international beaches, Himalayan passes, palaces and the moments in between.",
  path: "/gallery",
  image: IMG.bali2,
});

export default function Page() {
  return <Gallery />;
}
