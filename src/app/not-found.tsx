import type { Metadata } from "next";
import { NotFound } from "@/views/Utility";
import { buildMetadata } from "@/lib/seo";

/**
 * Replaces the old `/404` route and the `<Route path="*">` catch-all.
 * Next.js serves this with a real HTTP 404 status, which the HashRouter
 * version could not do.
 */
export const metadata: Metadata = {
  ...buildMetadata({
    title: "Page Not Found",
    description: "The page you are looking for could not be found.",
    path: "/404",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <NotFound />;
}
