import type { Metadata } from "next";
import Destinations from "@/views/Destinations";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/media";

export const metadata: Metadata = buildMetadata({
  title: "India Destinations",
  description:
    "Luxury journeys across India — Rajasthan, Kashmir, Ladakh, Kerala, Goa, Andaman, Himachal, Uttarakhand, Sikkim, North East, Gujarat, Madhya Pradesh and more.",
  path: "/destinations/domestic",
  image: IMG.raj3,
});

export default function Page() {
  return <Destinations scope="domestic" />;
}
