"use client";

import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "../compat/router";
import { BRAND, holidayTypes, waLink } from "../lib/content";
import { destinations } from "../lib/destinations";
import { cn } from "../utils/cn";
import { Button } from "./ui";

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  destination: string;
  holidayType: string;
  travellers: string;
  travelDate: string;
  message: string;
  source: string;
}

const empty: EnquiryPayload = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  holidayType: "",
  travellers: "2 Adults",
  travelDate: "",
  message: "",
  source: "website",
};

const field =
  "w-full rounded-xl border border-royal/15 bg-white px-4 py-3 text-[15px] text-charcoal placeholder:text-slateluxe/60 transition-colors focus:border-royal focus:outline-none";

const labelCls = "mb-1.5 block text-[12px] font-semibold tracking-wide text-charcoal uppercase";

export function EnquiryForm({
  defaultDestination,
  compact = false,
  title = "Start Your Enquiry",
  subtitle = "Share a few details and a dedicated travel designer will respond with a customised plan. We never publish fixed prices — every journey is quoted individually.",
}: {
  defaultDestination?: string;
  compact?: boolean;
  title?: string;
  subtitle?: string;
}) {
  const [data, setData] = useState<EnquiryPayload>({
    ...empty,
    destination: defaultDestination ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryPayload, string>>>({});
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const set = (key: keyof EnquiryPayload) => (e: { target: { value: string } }) => {
    setData((d) => ({ ...d, [key]: e.target.value }));
    setErrors((x) => ({ ...x, [key]: undefined }));
  };

  const validate = () => {
    const err: Partial<Record<keyof EnquiryPayload, string>> = {};
    if (data.name.trim().length < 2) err.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) err.email = "Please enter a valid email address.";
    if (!/^[+\d][\d\s-]{7,17}$/.test(data.phone.trim())) err.phone = "Please enter a valid contact number.";
    if (!data.destination) err.destination = "Please choose a destination.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const first = document.querySelector<HTMLElement>("[data-error='true']");
      first?.focus();
      return;
    }
    setBusy(true);
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => undefined);
      const stored = JSON.parse(localStorage.getItem("rrh_enquiries") ?? "[]");
      stored.push({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem("rrh_enquiries", JSON.stringify(stored));
    } finally {
      setBusy(false);
      navigate("/thank-you", { state: { name: data.name } });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "rounded-[24px] border border-royal/10 bg-white p-6 shadow-[0_30px_80px_-45px_rgba(30,78,140,0.55)] sm:p-8",
        compact && "sm:p-7",
      )}
      aria-labelledby="enquiry-title"
    >
      <h3 id="enquiry-title" className="font-display text-2xl text-charcoal sm:text-[28px]">
        {title}
      </h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-slateluxe">{subtitle}</p>

      <div className={cn("mt-6 grid gap-4", compact ? "sm:grid-cols-1" : "sm:grid-cols-2")}>
        <div>
          <label className={labelCls} htmlFor="ef-name">
            Full Name *
          </label>
          <input
            id="ef-name"
            className={cn(field, errors.name && "border-red-400")}
            value={data.name}
            onChange={set("name")}
            data-error={!!errors.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && (
            <p id="err-name" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor="ef-phone">
            Phone / WhatsApp *
          </label>
          <input
            id="ef-phone"
            type="tel"
            className={cn(field, errors.phone && "border-red-400")}
            value={data.phone}
            onChange={set("phone")}
            data-error={!!errors.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
            placeholder="+91 00000 00000"
            autoComplete="tel"
          />
          {errors.phone && (
            <p id="err-phone" className="mt-1 text-xs text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelCls} htmlFor="ef-email">
            Email Address *
          </label>
          <input
            id="ef-email"
            type="email"
            className={cn(field, errors.email && "border-red-400")}
            value={data.email}
            onChange={set("email")}
            data-error={!!errors.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p id="err-email" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor="ef-destination">
            Destination *
          </label>
          <select
            id="ef-destination"
            className={cn(field, errors.destination && "border-red-400")}
            value={data.destination}
            onChange={set("destination")}
            data-error={!!errors.destination}
            aria-invalid={!!errors.destination}
          >
            <option value="">Select a destination</option>
            <optgroup label="⭐ Prime Group Destinations">
              {destinations
                .filter((d) => d.prime)
                .map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </optgroup>
            <optgroup label="International">
              {destinations
                .filter((d) => d.region === "international" && !d.prime)
                .map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </optgroup>
            <optgroup label="India">
              {destinations
                .filter((d) => d.region === "domestic")
                .map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </optgroup>
            <option value="Not decided yet">Not decided yet — please advise</option>
          </select>
          {errors.destination && <p className="mt-1 text-xs text-red-600">{errors.destination}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="ef-type">
            Holiday Type
          </label>
          <select id="ef-type" className={field} value={data.holidayType} onChange={set("holidayType")}>
            <option value="">Select (optional)</option>
            {holidayTypes.map((h) => (
              <option key={h.slug} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="ef-travellers">
            Travellers
          </label>
          <select id="ef-travellers" className={field} value={data.travellers} onChange={set("travellers")}>
            {["2 Adults", "2 Adults + 1 Child", "2 Adults + 2 Children", "Family (5–8)", "Group (9–20)", "Group (20+)", "Solo"].map(
              (t) => (
                <option key={t}>{t}</option>
              ),
            )}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="ef-date">
            Approximate Travel Date
          </label>
          <input id="ef-date" type="date" className={field} value={data.travelDate} onChange={set("travelDate")} />
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelCls} htmlFor="ef-message">
            Tell us about your trip
          </label>
          <textarea
            id="ef-message"
            rows={compact ? 3 : 4}
            className={cn(field, "resize-y")}
            value={data.message}
            onChange={set("message")}
            placeholder="Occasion, interests, preferred hotel style, dietary needs…"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">
          {busy ? (
            <>
              <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send aria-hidden className="h-4 w-4" /> Send Enquiry
            </>
          )}
        </Button>
        <Button
          href={waLink(
            `Hello Royal Rajasthan Holidays, I'd like a customised itinerary${
              data.destination ? ` for ${data.destination}` : ""
            }.`,
          )}
          external
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          WhatsApp Us
        </Button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slateluxe">
        By submitting you agree to be contacted by {BRAND.name} regarding your enquiry. We never share
        your details with third parties.
      </p>
    </form>
  );
}
