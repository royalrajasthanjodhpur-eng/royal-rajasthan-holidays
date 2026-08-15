"use client";

/**
 * Desktop-only custom cursor.
 *
 * Guards:
 *  - Only mounts for fine pointers (mouse) on wide viewports — never touch.
 *  - Never shown for prefers-reduced-motion.
 *  - Purely decorative: the native cursor is NOT hidden, so if this fails or
 *    is unsupported the user still has a working pointer. This is an additive
 *    ring that trails the real cursor.
 *  - Position is written straight to the DOM via rAF, never through React
 *    state, so it costs no re-renders.
 */

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => setEnabled(fine.matches && wide.matches && !motion.matches);
    evaluate();

    fine.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);
    motion.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
      motion.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = dot.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let scale = 1;
    let targetScale = 1;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      // Grow over interactive elements so the ring reads as a state indicator.
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select");
      targetScale = interactive ? 1.9 : 1;
    };

    const loop = () => {
      // Trailing ease — the ring follows the cursor rather than sticking to it.
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      scale += (targetScale - scale) * 0.14;
      el.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };
    const onEnter = () => {
      el.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[900] h-8 w-8 rounded-full border border-gold/55 mix-blend-difference transition-opacity duration-300"
      style={{ willChange: "transform" }}
    />
  );
}
