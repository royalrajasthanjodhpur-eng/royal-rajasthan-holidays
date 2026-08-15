"use client";

/**
 * A brief, skippable ritual before the homepage resolves.
 *
 * Rules it obeys:
 *  - Hard-capped at 2 seconds, then it dismisses itself no matter what.
 *  - Skippable by click, Escape, or the visible Skip button.
 *  - Shown once per browser session (sessionStorage), never on repeat views.
 *  - Never shown for prefers-reduced-motion.
 *  - Purely additive: the page beneath is fully rendered and functional; this
 *    is an overlay, so if anything goes wrong the content is still there.
 *  - It does NOT block scrolling for longer than it is visible.
 */

import { useCallback, useEffect, useRef, useState } from "react";

import { BRAND } from "@/lib/content";
import { ORIGIN } from "@/lib/wayfinder";

const SESSION_KEY = "rrh:loader-seen";
const DURATION_MS = 2000;

export function CinematicLoader() {
  // Start hidden: the server render and first paint must never show an overlay
  // that a reduced-motion or returning visitor should not see.
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  const dismiss = useCallback(() => {
    setLeaving(true);
    // Match the CSS fade-out before unmounting.
    const t = window.setTimeout(() => {
      setActive(false);
      document.documentElement.style.removeProperty("overflow");
    }, 620);
    timers.current.push(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    setActive(true);
    // Lock scroll only while the overlay is genuinely up.
    document.documentElement.style.overflow = "hidden";

    const auto = window.setTimeout(dismiss, DURATION_MS);
    timers.current.push(auto);

    return () => {
      timers.current.forEach(clearTimeout);
      document.documentElement.style.removeProperty("overflow");
    };
  }, [dismiss]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, dismiss]);

  if (!active) return null;

  return (
    <div
      // aria-hidden + a live status elsewhere would be noisy; this is a purely
      // decorative curtain that removes itself in under two seconds.
      aria-hidden
      onClick={dismiss}
      className={[
        "fixed inset-0 z-[999] flex cursor-pointer flex-col items-center justify-center bg-midnight",
        "transition-opacity duration-[600ms] ease-out",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div aria-hidden className="wayfinder-vignette absolute inset-0" />

      <div className="relative flex flex-col items-center">
        {/* An engraved ring drawing itself — the instrument waking up */}
        <svg viewBox="0 0 120 120" className="h-24 w-24">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(232,220,200,.14)"
            strokeWidth="1.5"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#d4b25a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="327"
            strokeDashoffset="327"
            transform="rotate(-90 60 60)"
            style={{ animation: `rrh-draw ${DURATION_MS}ms cubic-bezier(.22,1,.36,1) forwards` }}
          />
          <ellipse
            cx="60"
            cy="60"
            rx="52"
            ry="18"
            fill="none"
            stroke="rgba(212,178,90,.35)"
            strokeWidth="1"
          />
          <circle cx="60" cy="60" r="4" fill="#e7c977" />
        </svg>

        <p className="mt-7 font-display text-xl tracking-wide text-ivory sm:text-2xl">
          {BRAND.name}
        </p>
        <p className="mt-2 text-[10px] font-semibold tracking-[0.32em] text-gold-soft/80 uppercase">
          {ORIGIN.label}
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        className="absolute right-6 bottom-6 rounded-full border border-sand/20 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-sand/70 uppercase transition-colors hover:border-gold/50 hover:text-ivory"
      >
        Skip
      </button>
    </div>
  );
}
