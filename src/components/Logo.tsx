"use client";

import { useState } from "react";
import { Link } from "../compat/router";
import { cn } from "../utils/cn";

/**
 * OFFICIAL LOGO
 * ─────────────
 * Drop the official high-resolution logo file at:  public/logo.png
 * It will be used automatically and is never recoloured, cropped or redesigned.
 * The inline mark below is only a temporary stand-in that renders if the
 * official file has not been added yet.
 */
const LOGO_SRC = "/logo.png";

function FallbackMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 108" role="img" aria-label="Royal Rajasthan Holidays" className={className}>
      {/* emblem */}
      <circle cx="52" cy="54" r="45" fill="#1E4E8C" />
      <circle cx="52" cy="54" r="45" fill="none" stroke="#D4B25A" strokeWidth="2" />
      <g>
        <circle cx="52" cy="52" r="13" fill="#E7C977" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <line
              key={i}
              x1={52 + Math.cos(a) * 17}
              y1={52 + Math.sin(a) * 17}
              x2={52 + Math.cos(a) * 23}
              y2={52 + Math.sin(a) * 23}
              stroke="#D4B25A"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          );
        })}
        <path d="M18 74c14-11 30-15 46-11s28 12 40 8c-9 12-24 13-38 8s-30-8-48-5z" fill="#2D8C7C" />
      </g>
      {/* wordmark */}
      <text
        x="116"
        y="38"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="17"
        letterSpacing="6.5"
        fill="#1E4E8C"
      >
        ROYAL
      </text>
      <text
        x="116"
        y="72"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="600"
        fontSize="31"
        letterSpacing="0.5"
        fill="#D4B25A"
      >
        RAJASTHAN
      </text>
      <text
        x="117"
        y="93"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize="11.5"
        letterSpacing="7.6"
        fill="#56616B"
      >
        HOLIDAYS
      </text>
    </svg>
  );
}

export function Logo({
  className,
  onLight = true,
}: {
  className?: string;
  onLight?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <Link
      to="/"
      aria-label="Royal Rajasthan Holidays — home"
      className={cn(
        "flex shrink-0 items-center rounded-2xl transition-all duration-500",
        /* Clear space is always preserved around the mark */
        onLight
          ? "px-1 py-1"
          : "border border-white/25 bg-white/92 px-3.5 py-2 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.6)] backdrop-blur-sm",
        className,
      )}
    >
      {failed ? (
        <FallbackMark className="h-10 w-auto md:h-[46px]" />
      ) : (
        <img
          src={LOGO_SRC}
          alt="Royal Rajasthan Holidays"
          onError={() => setFailed(true)}
          className="h-10 w-auto object-contain md:h-[46px]"
        />
      )}
      <span className="sr-only">Royal Rajasthan Holidays</span>
    </Link>
  );
}
