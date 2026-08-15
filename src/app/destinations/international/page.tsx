import type { Metadata } from "next";
import Destinations from "@/views/Destinations";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const metadata: Metadata = buildMetadata({
  title: "International Destinations",
  description:
    "Luxury international holidays to Dubai, Vietnam, Bali, Singapore, Thailand, Malaysia, Bhutan, Nepal, Sri Lanka, Maldives, Turkey, Egypt, Kenya and more.",
  path: "/destinations/international",
  image: IMG.mld1,
});

export default function Page() {
  return <Destinations scope="international" />;
}
