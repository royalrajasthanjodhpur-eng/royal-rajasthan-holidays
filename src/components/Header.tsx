import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BRAND, holidayTypes, services, waLink } from "../lib/content";
import { domesticDestinations, internationalSorted, primeDestinations } from "../lib/destinations";
import { cn } from "../utils/cn";
import { Logo } from "./Logo";
import { Button, Img } from "./ui";

type MenuKey = "destinations" | "holidays" | "services" | null;

const simpleLinks = [
  { label: "About", to: "/about", xlOnly: false },
  { label: "Gallery", to: "/gallery", xlOnly: true },
  { label: "Blog", to: "/blog", xlOnly: true },
  { label: "Contact", to: "/contact", xlOnly: false },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>("destinations");
  const closeTimer = useRef<number | undefined>(undefined);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || open !== null;

  const enter = (key: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const leave = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  const navBtn = (key: Exclude<MenuKey, null>, label: string) => (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={open === key}
      onMouseEnter={() => enter(key)}
      onFocus={() => enter(key)}
      onClick={() => setOpen(open === key ? null : key)}
      className={cn(
        "flex items-center gap-1 rounded-full px-2.5 py-2 text-[13.5px] font-medium tracking-wide transition-colors xl:px-4",
        solid
          ? "text-charcoal hover:text-royal"
          : "text-white/90 hover:text-white",
        open === key && (solid ? "text-royal" : "text-white"),
      )}
    >
      {label}
      <ChevronDown
        aria-hidden
        className={cn("h-3.5 w-3.5 transition-transform duration-300", open === key && "rotate-180")}
      />
    </button>
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-royal focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      {/* Utility bar */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 hidden h-9 items-center border-b border-white/10 transition-all duration-500 lg:flex",
          solid
            ? "-translate-y-full border-transparent opacity-0"
            : "translate-y-0 bg-charcoal/25 opacity-100 backdrop-blur-sm",
        )}
      >
        <div className="container-luxe flex items-center justify-between text-[11.5px] tracking-wide text-white/85">
          <p className="font-medium">{BRAND.tagline}</p>
          <div className="flex items-center gap-6">
            <a href={`tel:${BRAND.phoneRaw}`} className="inline-flex items-center gap-1.5 hover:text-gold-soft">
              <Phone aria-hidden className="h-3 w-3" /> {BRAND.phone}
            </a>
            <a
              href={waLink("Hello Royal Rajasthan Holidays, I would like to plan a journey.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-gold-soft"
            >
              <MessageCircle aria-hidden className="h-3 w-3" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <header
        onMouseLeave={leave}
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-500",
          solid
            ? "top-0 border-b border-royal/8 bg-white/92 shadow-[0_10px_40px_-24px_rgba(30,78,140,0.5)] backdrop-blur-xl"
            : "top-0 bg-transparent lg:top-9",
        )}
      >
        <div className="container-luxe flex h-[68px] items-center justify-between gap-4 md:h-[76px]">
          <Logo onLight={solid} />

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            <Link
              to="/"
              className={cn(
                "rounded-full px-2.5 py-2 text-[13.5px] font-medium tracking-wide transition-colors xl:px-4",
                solid ? "text-charcoal hover:text-royal" : "text-white/90 hover:text-white",
              )}
            >
              Home
            </Link>
            {navBtn("destinations", "Destinations")}
            {navBtn("holidays", "Holiday Types")}
            {navBtn("services", "Services")}
            {simpleLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-full px-2.5 py-2 text-[13.5px] font-medium tracking-wide transition-colors xl:px-4",
                  l.xlOnly && "hidden xl:inline-flex",
                  solid ? "text-charcoal hover:text-royal" : "text-white/90 hover:text-white",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button to="/contact" variant={solid ? "primary" : "ghost"} size="sm" magnetic>
              Plan Your Journey
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobile(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobile}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              solid ? "border-royal/15 text-royal" : "border-white/40 text-white",
            )}
          >
            <Menu aria-hidden className="h-5 w-5" />
          </button>
        </div>

        {/* Mega menus */}
        <AnimatePresence>
          {open && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => enter(open)}
              className="absolute inset-x-0 top-full hidden border-t border-royal/8 bg-white/97 shadow-[0_40px_80px_-40px_rgba(30,78,140,0.5)] backdrop-blur-xl lg:block"
            >
              <div className="container-luxe py-9">
                {open === "destinations" && <DestinationsMenu />}
                {open === "holidays" && <HolidaysMenu />}
                {open === "services" && <ServicesMenu />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobile(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col bg-ivory shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-royal/10 px-5 py-3">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobile(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-royal/15 text-royal"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-5">
                <Link to="/" className="block border-b border-royal/8 py-3.5 font-medium text-charcoal">
                  Home
                </Link>

                <MobileGroup
                  id="destinations"
                  label="Destinations"
                  open={mobileSection}
                  setOpen={setMobileSection}
                >
                  <p className="pt-1 pb-2 text-[10.5px] font-bold tracking-[0.2em] text-gold-ink uppercase">
                    ⭐ Prime Group Destinations
                  </p>
                  <div className="grid grid-cols-2 gap-x-4">
                    {primeDestinations.map((d) => (
                      <Link
                        key={d.slug}
                        to={`/destination/${d.slug}`}
                        className="py-2 text-sm font-medium text-charcoal"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                  <p className="pt-4 pb-2 text-[10.5px] font-bold tracking-[0.2em] text-royal uppercase">
                    International
                  </p>
                  <div className="grid grid-cols-2 gap-x-4">
                    {internationalSorted
                      .filter((d) => !d.prime)
                      .map((d) => (
                        <Link
                          key={d.slug}
                          to={`/destination/${d.slug}`}
                          className="py-2 text-sm text-slateluxe"
                        >
                          {d.name}
                        </Link>
                      ))}
                  </div>
                  <p className="pt-4 pb-2 text-[10.5px] font-bold tracking-[0.2em] text-royal uppercase">
                    India
                  </p>
                  <div className="grid grid-cols-2 gap-x-4">
                    {domesticDestinations.map((d) => (
                      <Link
                        key={d.slug}
                        to={`/destination/${d.slug}`}
                        className="py-2 text-sm text-slateluxe"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                </MobileGroup>

                <MobileGroup id="holidays" label="Holiday Types" open={mobileSection} setOpen={setMobileSection}>
                  <div className="grid grid-cols-2 gap-x-4">
                    {holidayTypes.map((h) => (
                      <Link key={h.slug} to={`/holidays/${h.slug}`} className="py-2 text-sm text-slateluxe">
                        {h.name}
                      </Link>
                    ))}
                  </div>
                </MobileGroup>

                <MobileGroup id="services" label="Services" open={mobileSection} setOpen={setMobileSection}>
                  <div className="grid grid-cols-2 gap-x-4">
                    {services.map((s) => (
                      <Link key={s.slug} to={`/${s.slug}`} className="py-2 text-sm text-slateluxe">
                        {s.title}
                      </Link>
                    ))}
                    <Link to="/guest-stories" className="py-2 text-sm text-slateluxe">
                      Guest Stories
                    </Link>
                    <Link to="/faq" className="py-2 text-sm text-slateluxe">
                      FAQ
                    </Link>
                  </div>
                </MobileGroup>

                {simpleLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block border-b border-royal/8 py-3.5 font-medium text-charcoal"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className="space-y-3 border-t border-royal/10 bg-white px-5 py-5">
                <Button to="/contact" className="w-full">
                  Plan Your Journey
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button href={`tel:${BRAND.phoneRaw}`} variant="outline" size="sm">
                    <Phone aria-hidden className="h-4 w-4" /> Call
                  </Button>
                  <Button
                    href={waLink("Hello Royal Rajasthan Holidays, I would like to plan a journey.")}
                    external
                    variant="outline"
                    size="sm"
                  >
                    <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileGroup({
  id,
  label,
  open,
  setOpen,
  children,
}: {
  id: string;
  label: string;
  open: string | null;
  setOpen: (v: string | null) => void;
  children: React.ReactNode;
}) {
  const isOpen = open === id;
  return (
    <div className="border-b border-royal/8">
      <button
        type="button"
        onClick={() => setOpen(isOpen ? null : id)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-3.5 font-medium text-charcoal"
      >
        {label}
        <ChevronDown aria-hidden className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function MenuCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[10.5px] font-bold tracking-[0.22em] text-gold-ink uppercase">{title}</p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function MenuLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="block rounded-lg px-2.5 py-[7px] text-[13.5px] text-slateluxe transition-colors hover:bg-royal-50 hover:text-royal"
      >
        {children}
      </Link>
    </li>
  );
}

function DestinationsMenu() {
  const featured = primeDestinations[0];
  const rest = internationalSorted.filter((d) => !d.prime);
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-3">
        <p className="mb-3 flex items-center gap-2 text-[10.5px] font-bold tracking-[0.22em] text-gold-ink uppercase">
          ⭐ Prime Group Destinations
        </p>
        <ul className="grid grid-cols-2 gap-x-2">
          {primeDestinations.map((d) => (
            <li key={d.slug}>
              <Link
                to={`/destination/${d.slug}`}
                className="block rounded-lg px-2.5 py-[7px] text-[13.5px] font-semibold text-charcoal transition-colors hover:bg-gold/12 hover:text-royal"
              >
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/destinations"
          className="mt-4 inline-block text-[12.5px] font-semibold text-royal underline underline-offset-4"
        >
          View all destinations →
        </Link>
      </div>

      <div className="col-span-3">
        <MenuCol title="International">
          <div className="grid grid-cols-2 gap-x-2">
            {rest.map((d) => (
              <MenuLink key={d.slug} to={`/destination/${d.slug}`}>
                {d.name}
              </MenuLink>
            ))}
          </div>
        </MenuCol>
      </div>

      <div className="col-span-3">
        <MenuCol title="India">
          <div className="grid grid-cols-2 gap-x-2">
            {domesticDestinations.map((d) => (
              <MenuLink key={d.slug} to={`/destination/${d.slug}`}>
                {d.name}
              </MenuLink>
            ))}
          </div>
        </MenuCol>
      </div>

      <div className="col-span-3">
        <Link to={`/destination/${featured.slug}`} className="group block overflow-hidden rounded-[20px]">
          <div className="relative">
            <Img src={featured.hero} alt={featured.name} ratio="aspect-[4/3]" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[10px] font-bold tracking-[0.2em] text-gold-soft uppercase">Featured</p>
              <p className="font-display text-xl text-white">{featured.name}</p>
              <p className="mt-1 text-xs text-white/75">{featured.tagline}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function HolidaysMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <p className="mb-4 text-[10.5px] font-bold tracking-[0.22em] text-gold-ink uppercase">
          Travel by Holiday Type
        </p>
        <div className="grid grid-cols-3 gap-x-6 gap-y-1">
          {holidayTypes.map((h) => (
            <Link
              key={h.slug}
              to={`/holidays/${h.slug}`}
              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-royal-50"
            >
              <span aria-hidden className="text-lg leading-none">
                {h.icon}
              </span>
              <span>
                <span className="block text-[13.5px] font-semibold text-charcoal group-hover:text-royal">
                  {h.name}
                </span>
                <span className="block text-[11.5px] leading-snug text-slateluxe">{h.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-4 rounded-[20px] bg-royal-50 p-7">
        <p className="font-display text-2xl text-royal">Not sure where to begin?</p>
        <p className="mt-3 text-sm leading-relaxed text-slateluxe">
          Tell us who is travelling and when. A dedicated travel designer will craft an itinerary
          around your family — no fixed packages, no published prices.
        </p>
        <Button to="/contact" size="sm" className="mt-5">
          Get Customised Itinerary
        </Button>
      </div>
    </div>
  );
}

function ServicesMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-7">
        <p className="mb-4 text-[10.5px] font-bold tracking-[0.22em] text-gold-ink uppercase">
          Travel Services
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/${s.slug}`}
              className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-royal-50"
            >
              <span className="block text-[13.5px] font-semibold text-charcoal group-hover:text-royal">
                {s.title}
              </span>
              <span className="block text-[11.5px] leading-snug text-slateluxe">{s.kicker}</span>
            </Link>
          ))}
          <Link to="/guest-stories" className="group block rounded-xl px-3 py-2.5 hover:bg-royal-50">
            <span className="block text-[13.5px] font-semibold text-charcoal group-hover:text-royal">
              Guest Stories
            </span>
            <span className="block text-[11.5px] text-slateluxe">Verified Google Reviews</span>
          </Link>
          <Link to="/faq" className="group block rounded-xl px-3 py-2.5 hover:bg-royal-50">
            <span className="block text-[13.5px] font-semibold text-charcoal group-hover:text-royal">
              FAQ
            </span>
            <span className="block text-[11.5px] text-slateluxe">Booking, visas & payments</span>
          </Link>
        </div>
      </div>
      <div className="col-span-5 flex items-center gap-5 rounded-[20px] border border-gold/25 bg-gradient-to-br from-gold/12 to-transparent p-7">
        <div>
          <p className="font-display text-2xl text-charcoal">Talk to a Travel Expert</p>
          <p className="mt-2 text-sm text-slateluxe">
            {BRAND.phone} · {BRAND.hoursShort}
          </p>
          <p className="mt-1 text-sm text-slateluxe">
            Speak with {BRAND.contactPerson}, Jodhpur
          </p>
          <Button
            href={waLink("Hello, I would like to speak with a travel expert.")}
            external
            variant="gold"
            size="sm"
            className="mt-5"
          >
            <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp Us
          </Button>
        </div>
      </div>
    </div>
  );
}
