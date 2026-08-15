import type { Metadata } from "next";
import { Legal } from "@/views/Utility";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms & Conditions for Royal Rajasthan Holidays.",
  path: "/terms",
});

export default function Page() {
  return <Legal kind="terms" />;
}
