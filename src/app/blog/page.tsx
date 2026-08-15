import type { Metadata } from "next";
import { Blog } from "@/views/Content";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/media";
export const metadata: Metadata = buildMetadata({
  title: "The Journal — Travel Guides, Visa Tips & Inspiration",
  description: "Destination guides, visa tips, itinerary ideas and practical travel advice from the travel designers at Royal Rajasthan Holidays.",
  path: "/blog",
  image: IMG.vn6,
});

export default function Page() {
  return <Blog />;
}
