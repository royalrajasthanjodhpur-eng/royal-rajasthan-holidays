import type { NextConfig } from "next";

/**
 * Royal Rajasthan Holidays — Next.js 15 (App Router).
 *
 * Replaces the previous Vite + vite-plugin-singlefile static build so the project
 * can host server routes, an authenticated admin panel and a real database.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Pexels URLs remain the documented placeholder source until real photography
    // is uploaded through the admin CMS (see src/lib/media.ts).
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Keep server-only native/optional deps out of the client bundle.
  serverExternalPackages: ["bcryptjs", "nodemailer", "postgres", "cloudinary"],

  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
