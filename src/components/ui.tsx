import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

/* ───────────── Layout ───────────── */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-luxe", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tone = "ivory",
  label,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "beige" | "white" | "royal";
  label?: string;
}) {
  const tones = {
    ivory: "bg-ivory text-charcoal",
    beige: "bg-beige text-charcoal",
    white: "bg-white text-charcoal",
    royal: "bg-royal text-white",
  };
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("py-20 md:py-28 lg:py-32", tones[tone], className)}
    >
      {children}
    </section>
  );
}

/* ───────────── Motion ───────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </MotionTag>
  );
}

/* ───────────── Typography ───────────── */

export function Kicker({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]",
        light ? "text-gold-soft" : "text-gold-ink",
      )}
    >
      <span aria-hidden className={cn("h-px w-8", light ? "bg-gold-soft/70" : "bg-gold")} />
      {children}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "center",
  light,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {kicker && (
        <Reveal>
          <Kicker light={light}>{kicker}</Kicker>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h2
          className={cn(
            "mt-5 text-3xl leading-[1.15] font-medium text-balance sm:text-4xl lg:text-[2.75rem]",
            light ? "text-white" : "text-charcoal",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={2}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed sm:text-lg",
              light ? "text-white/80" : "text-slateluxe",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ───────────── Buttons ───────────── */

type Variant = "primary" | "gold" | "outline" | "ghost" | "white";

const variants: Record<Variant, string> = {
  primary:
    "bg-royal text-white shadow-[0_14px_34px_-14px_rgba(30,78,140,0.75)] hover:bg-royal-700 hover:shadow-[0_20px_46px_-14px_rgba(30,78,140,0.85)]",
  gold: "bg-gold text-charcoal shadow-[0_14px_34px_-14px_rgba(212,178,90,0.9)] hover:bg-gold-soft hover:shadow-[0_20px_46px_-14px_rgba(212,178,90,1)]",
  outline:
    "border border-royal/25 bg-white/70 text-royal hover:border-royal/50 hover:bg-white hover:shadow-[0_16px_34px_-18px_rgba(30,78,140,0.6)]",
  ghost: "border border-white/45 text-white hover:bg-white/12 hover:border-white/80",
  white:
    "bg-white text-royal shadow-[0_14px_34px_-16px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.45)]",
};

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  to?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  magnetic?: boolean;
  external?: boolean;
}

export function Button({
  variant = "primary",
  to,
  href,
  size = "md",
  className,
  children,
  magnetic = false,
  external,
  ...rest
}: BtnProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const sizes = {
    sm: "px-5 py-2.5 text-[13px]",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4 text-[15px]",
  };

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0",
    sizes[size],
    variants[variant],
    className,
  );

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  const inner = (
    <span
      ref={ref}
      className="pointer-events-none inline-flex items-center gap-2 transition-transform duration-300 ease-out"
    >
      {children}
    </span>
  );

  if (to)
    return (
      <Link to={to} className={base} onMouseMove={onMove} onMouseLeave={onLeave}>
        {inner}
      </Link>
    );

  if (href)
    return (
      <a
        href={href}
        className={base}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );

  return (
    <button className={base} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {inner}
    </button>
  );
}

/* ───────────── Image with graceful load ───────────── */

export function Img({
  src,
  alt,
  className,
  imgClassName,
  ratio = "aspect-[4/3]",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-beige", ratio, className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-[1200ms] ease-out",
          loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md",
          imgClassName,
        )}
      />
    </div>
  );
}

/* ───────────── Accordion ───────────── */

export function Accordion({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn("divide-y divide-royal/10 overflow-hidden rounded-[24px] border border-royal/10 bg-white shadow-[0_18px_50px_-30px_rgba(30,78,140,0.35)]", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-royal-50/60 md:px-8 md:py-6"
              >
                <span className="font-sans text-[15px] leading-snug font-semibold text-charcoal md:text-base">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-royal/20 text-royal transition-transform duration-300",
                    isOpen && "rotate-45 bg-royal text-white",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              className={cn(
                "grid transition-all duration-400 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-slateluxe md:px-8 md:pb-8">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────────── Misc ───────────── */

export function Ribbon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold-soft px-3.5 py-1.5 text-[10px] font-bold tracking-[0.14em] text-charcoal uppercase shadow-[0_8px_20px_-8px_rgba(212,178,90,0.9)]">
      ✦ {children}
    </span>
  );
}

export function Pill({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium",
        light
          ? "border border-white/25 bg-white/10 text-white/90"
          : "border border-royal/12 bg-royal-50 text-royal",
      )}
    >
      {children}
    </span>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("gold-rule block h-px w-24", className)} />;
}

/* ───────────── Parallax image ───────────── */

export function ParallaxImage({
  src,
  alt,
  className,
  strength = 40,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = wrap.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        setOffset(Math.max(-1, Math.min(1, progress)) * strength);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduce, strength]);

  return (
    <div ref={wrap} className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.16)` }}
        className="h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}
