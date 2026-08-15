"use client";

import Lenis from "lenis";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "../compat/router";
import { BRAND, waLink } from "../lib/content";
import { Footer } from "./Footer";
import { Header } from "./Header";

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 });
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {show && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-royal/15 bg-white/90 text-royal shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp aria-hidden className="h-4 w-4" />
        </button>
      )}
      <a
        href={`tel:${BRAND.phoneRaw}`}
        aria-label={`Call Royal Rajasthan Holidays on ${BRAND.phone}`}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-royal text-white shadow-[0_14px_34px_-12px_rgba(30,78,140,0.9)] transition-transform hover:-translate-y-0.5 md:hidden"
      >
        <Phone aria-hidden className="h-5 w-5" />
      </a>
      <a
        href={waLink("Hello Royal Rajasthan Holidays, I would like to plan a journey.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-white shadow-[0_16px_38px_-12px_rgba(37,211,102,0.85)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-12px_rgba(37,211,102,1)]"
      >
        <MessageCircle aria-hidden className="h-5 w-5" />
        <span className="hidden text-sm md:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  useLenis();
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
