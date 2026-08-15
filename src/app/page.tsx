import type { Metadata } from "next";
import Home from "@/views/Home";
import { buildMetadata } from "@/lib/seo";
import { HERO_POSTER } from "@/lib/media";

export const metadata: Metadata = buildMetadata({
  title: "Luxury Holidays to the World's Most Beautiful Destinations",
  description:
    "Royal Rajasthan Holidays designs bespoke luxury journeys to Dubai, Vietnam, Bali, Singapore, Thailand, Malaysia, Bhutan, Nepal, Sri Lanka and across India. Enquire for a customised itinerary.",
  path: "/",
  image: HERO_POSTER,
});

export default function Page() {
  return <Home />;
}
