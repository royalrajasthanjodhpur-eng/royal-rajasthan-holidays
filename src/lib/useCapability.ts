"use client";

import { useEffect, useState } from "react";

/**
 * Device capability tiers for the Wayfinder 3D experience.
 *
 *  full    — capable desktop: 3D instrument, full ring set, animated routes.
 *  reduced — mid-range / tablet / mobile with WebGL: fewer segments, lower DPR,
 *            no continuous idle motion.
 *  static  — no WebGL, low-end hardware, or prefers-reduced-motion: the CSS/SVG
 *            fallback renders instead. The 3D bundle is never downloaded.
 *
 * Detection is deliberately conservative: anything we cannot positively verify
 * as capable falls back to a lighter tier. The 3D scene is an enhancement and is
 * never the only path to the destination content.
 */
export type Tier = "full" | "reduced" | "static";

export interface Capability {
  /** Null until detection has run on the client (server render is always null). */
  tier: Tier | null;
  /** True once detection has completed in the browser. */
  ready: boolean;
  prefersReducedMotion: boolean;
  /** Device pixel ratio clamped to a sane ceiling for the chosen tier. */
  dpr: [number, number];
}

/**
 * One-shot WebGL probe. The context is explicitly released afterwards so we
 * don't hold a GPU context open for a test.
 */
function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;

    // A software rasteriser (SwiftShader/llvmpipe) reports WebGL support but
    // performs terribly for a continuously animated scene — treat it as absent.
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = String(
        gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ?? "",
      ).toLowerCase();
      if (
        renderer.includes("swiftshader") ||
        renderer.includes("llvmpipe") ||
        renderer.includes("software")
      ) {
        return false;
      }
    }

    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function useCapability(): Capability {
  const [state, setState] = useState<Capability>({
    tier: null,
    ready: false,
    prefersReducedMotion: false,
    dpr: [1, 1.5],
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const reduced = motionQuery.matches;

      // prefers-reduced-motion is an accessibility instruction, not a hint:
      // it always wins, regardless of how powerful the device is.
      if (reduced) {
        setState({
          tier: "static",
          ready: true,
          prefersReducedMotion: true,
          dpr: [1, 1],
        });
        return;
      }

      if (!detectWebGL()) {
        setState({ tier: "static", ready: true, prefersReducedMotion: false, dpr: [1, 1] });
        return;
      }

      const cores = navigator.hardwareConcurrency ?? 4;
      // deviceMemory is Chromium-only; absence must not imply a weak device.
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const narrow = window.innerWidth < 1024;
      const saveData = Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
      );

      // Explicit user request to conserve data — respect it.
      if (saveData) {
        setState({ tier: "static", ready: true, prefersReducedMotion: false, dpr: [1, 1] });
        return;
      }

      const weak = cores <= 4 || (memory !== undefined && memory <= 4);

      if (weak && (coarse || narrow)) {
        setState({ tier: "static", ready: true, prefersReducedMotion: false, dpr: [1, 1] });
        return;
      }

      if (coarse || narrow || weak) {
        setState({
          tier: "reduced",
          ready: true,
          prefersReducedMotion: false,
          dpr: [1, 1.5],
        });
        return;
      }

      setState({ tier: "full", ready: true, prefersReducedMotion: false, dpr: [1, 2] });
    };

    evaluate();

    // Re-evaluate if the user changes their motion preference mid-session.
    motionQuery.addEventListener("change", evaluate);
    return () => motionQuery.removeEventListener("change", evaluate);
  }, []);

  return state;
}
