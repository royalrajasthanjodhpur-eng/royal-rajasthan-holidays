import type { Metadata } from "next";
import { Legal } from "@/views/Utility";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Royal Rajasthan Holidays.",
  path: "/privacy",
});

export default function Page() {
  return <Legal kind="privacy" />;
}
