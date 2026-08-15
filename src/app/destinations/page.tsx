import type { Metadata } from "next";
import Destinations from "@/views/Destinations";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const metadata: Metadata = buildMetadata({
  title: "All Destinations — International & India",
  description:
    "Explore 36 curated destinations: Dubai, Vietnam, Bali, Singapore, Thailand, Malaysia, Bhutan, Nepal, Sri Lanka and 16 Indian destinations. Enquire for a customised itinerary.",
  path: "/destinations",
  image: IMG.dubai1,
});

export default function Page() {
  return <Destinations scope="all" />;
}
