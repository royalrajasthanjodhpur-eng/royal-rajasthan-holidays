import { Mail, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BRAND, holidayTypes, services, waLink } from "../lib/content";
import { domesticDestinations, internationalSorted, primeDestinations } from "../lib/destinations";
import { Button } from "./ui";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-sans text-[11px] font-bold tracking-[0.22em] text-gold-soft uppercase">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-[13.5px] text-white/70 transition-colors hover:text-gold-soft">
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10 bg-royal">
        <div className="container-luxe grid gap-8 py-14 lg:grid-cols-2 lg:items-center lg:py-16">
          <div>
            <p className="text-[11px] font-bold tracking-[0.24em] text-gold-soft uppercase">Newsletter</p>
            <h2 className="mt-3 font-display text-2xl leading-snug text-white sm:text-3xl">
              Travel inspiration, quietly delivered.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              Seasonal destination guides, visa updates and new group departures. One thoughtful email a
              month — never spam.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
                setDone(true);
                setEmail("");
              }
            }}
            className="flex flex-col gap-3 sm:flex-row lg:justify-end"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-[15px] text-white placeholder:text-white/55 focus:border-gold focus:outline-none sm:max-w-sm"
            />
            <Button type="submit" variant="gold" size="md">
              {done ? "Subscribed ✓" : "Subscribe"}
            </Button>
          </form>
          {done && (
            <p role="status" className="text-sm text-gold-soft lg:col-span-2">
              Thank you — you are on the list.
            </p>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="inline-flex rounded-2xl bg-white px-4 py-3">
            <img
              src="/logo.png"
              alt="Royal Rajasthan Holidays"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
                if (sib) sib.style.display = "block";
              }}
            />
            <span className="hidden font-display text-lg text-royal">
              Royal <span className="text-gold">Rajasthan</span> Holidays
            </span>
          </div>
          <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-white/70">
            {BRAND.tagline}. Since {BRAND.established} we have designed bespoke international and Indian
            journeys from Jodhpur — for families, couples, honeymooners, senior citizens, friends and
            corporate groups.
          </p>

          <ul className="mt-6 space-y-3 text-[14px] text-white/75">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <address className="not-italic">
                {BRAND.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </li>
            <li className="flex items-start gap-3">
              <UserRound aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                Contact person: <span className="text-white/90">{BRAND.contactPerson}</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-gold-soft">
                {BRAND.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${BRAND.email}`} className="break-all hover:text-gold-soft">
                {BRAND.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle aria-hidden className="h-4 w-4 shrink-0 text-gold" />
              <a
                href={waLink("Hello Royal Rajasthan Holidays, I would like to plan a journey.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-soft"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <Col title="Prime Destinations">
            {primeDestinations.map((d) => (
              <FLink key={d.slug} to={`/destination/${d.slug}`}>
                {d.name}
              </FLink>
            ))}
          </Col>
        </div>

        <div className="lg:col-span-2">
          <Col title="International">
            {internationalSorted
              .filter((d) => !d.prime)
              .slice(0, 11)
              .map((d) => (
                <FLink key={d.slug} to={`/destination/${d.slug}`}>
                  {d.name}
                </FLink>
              ))}
          </Col>
        </div>

        <div className="lg:col-span-2">
          <Col title="India">
            {domesticDestinations.slice(0, 11).map((d) => (
              <FLink key={d.slug} to={`/destination/${d.slug}`}>
                {d.name}
              </FLink>
            ))}
          </Col>
        </div>

        <div className="space-y-8 lg:col-span-2">
          <Col title="Holiday Types">
            {holidayTypes.slice(0, 6).map((h) => (
              <FLink key={h.slug} to={`/holidays/${h.slug}`}>
                {h.name}
              </FLink>
            ))}
          </Col>
          <Col title="Company">
            <FLink to="/about">About Us</FLink>
            {services.map((s) => (
              <FLink key={s.slug} to={`/${s.slug}`}>
                {s.title}
              </FLink>
            ))}
            <FLink to="/guest-stories">Guest Stories</FLink>
            <FLink to="/faq">FAQ</FLink>
            <FLink to="/contact">Contact</FLink>
          </Col>
        </div>
      </div>

      {/* Office hours strip */}
      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col gap-4 py-6 text-[13px] text-white/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-1">
            {BRAND.hours.map((h) => (
              <span key={h.day}>
                <span className="text-white/80">{h.day}:</span> {h.time}
              </span>
            ))}
          </div>
          <p>Prices are never published — every journey is individually quoted.</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col gap-3 py-6 text-[12.5px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-gold-soft">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold-soft">
              Terms &amp; Conditions
            </Link>
            <Link to="/sitemap" className="hover:text-gold-soft">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
