import { useEffect } from "react";

const SITE = "https://www.royalrajasthanholidays.com";

const setMeta = (key: string, value: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

export function useSeo({ title, description, path = "/", image, jsonLd }: SeoProps) {
  useEffect(() => {
    const full = `${title} | Royal Rajasthan Holidays`;
    document.title = full;
    setMeta("description", description);
    setMeta("og:title", full, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `${SITE}${path}`, "property");
    setMeta("og:type", "website", "property");
    if (image) setMeta("og:image", image, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", full);
    setMeta("twitter:description", description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${SITE}${path}`;

    const id = "page-jsonld";
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, jsonLd]);
}
