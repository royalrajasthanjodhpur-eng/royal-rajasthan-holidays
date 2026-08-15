import type { Metadata } from "next";
import { GuestStoriesPage } from "@/views/Content";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const metadata: Metadata = buildMetadata({
  title: "Guest Stories — Verified Google Reviews",
  description:
    "Real, verified Google Reviews from travellers who have journeyed with Royal Rajasthan Holidays. We never publish fabricated testimonials.",
  path: "/guest-stories",
  image: IMG.ppl2,
});

export default function Page() {
  return <GuestStoriesPage />;
}
