import type { Metadata } from "next";
import { ThankYou } from "@/views/Utility";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thank You — Your Enquiry Has Been Received",
  description: "Thank you for contacting Royal Rajasthan Holidays. A travel designer will be in touch shortly.",
  path: "/thank-you",
});

export default function Page() {
  return <ThankYou />;
}
