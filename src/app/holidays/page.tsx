import type { Metadata } from "next";
import { HolidayTypesIndex } from "@/views/Holidays";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/media";
export const metadata: Metadata = buildMetadata({
  title: "Holiday Types — Family, Honeymoon, Luxury, Group & More",
  description: "Family holidays, honeymoons, senior citizen tours, luxury travel, group tours, corporate travel, pilgrimage, adventure, wildlife, beach and fully customised holidays.",
  path: "/holidays",
  image: IMG.ppl2,
});

export default function Page() {
  return <HolidayTypesIndex />;
}
