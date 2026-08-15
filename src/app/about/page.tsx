import type { Metadata } from "next";
import About from "@/views/About";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/media";
export const metadata: Metadata = buildMetadata({
  title: "About Us — 20+ Years of Designing Journeys",
  description: "Royal Rajasthan Holidays has designed bespoke international and Indian journeys from Jodhpur, Rajasthan since 2005. Our story, mission, values, team and certifications.",
  path: "/about",
  image: IMG.raj6,
});

export default function Page() {
  return <About />;
}
