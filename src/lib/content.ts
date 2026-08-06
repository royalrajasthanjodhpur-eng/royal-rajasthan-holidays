import { IMG } from "./media";

/**
 * OFFICIAL BUSINESS INFORMATION — single source of truth.
 * Every page, component, footer, form, schema and metadata block reads from here.
 */
export const BRAND = {
  name: "Royal Rajasthan Holidays",
  short: "Royal Rajasthan Holidays",
  legalName: "ROYAL RAJASTHAN HOLIDAYS",
  tagline: "We Take You to the World's Most Beautiful Destinations",
  contactPerson: "Prakash Arora",
  phone: "+91 94141 96978",
  phoneRaw: "+919414196978",
  whatsapp: "919414196978",
  email: "royalrajasthanjodhpur@gmail.com",
  address: "D Road, Sardarpura, Jodhpur, Rajasthan, India",
  addressLines: ["D Road", "Sardarpura", "Jodhpur", "Rajasthan, India"],
  street: "D Road, Sardarpura",
  city: "Jodhpur",
  state: "Rajasthan",
  country: "India",
  countryCode: "IN",
  mapsQuery: "D+Road,+Sardarpura,+Jodhpur,+Rajasthan,+India",
  hours: [
    { day: "Monday – Saturday", time: "11:00 AM – 08:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  hoursShort: "Mon–Sat, 11:00 AM – 08:00 PM",
  established: 2005,
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;

/* ─────────────  HOLIDAY TYPES  ───────────── */

export interface HolidayType {
  slug: string;
  name: string;
  icon: string;
  blurb: string;
  image: string;
  highlights: string[];
  intro: string;
  suited: string[];
}

export const holidayTypes: HolidayType[] = [
  {
    slug: "family-holidays",
    name: "Family Holidays",
    icon: "👨‍👩‍👧‍👦",
    blurb: "Multi-generational journeys paced for every age, from toddlers to grandparents.",
    image: IMG.sg4,
    intro:
      "A family holiday has to work for everyone at once. We build flexible days with a gentle start, connecting rooms, tried-and-tested dining and enough downtime that nobody comes home exhausted.",
    highlights: [
      "Connecting rooms and family suites",
      "Child-friendly attractions and kids' clubs",
      "Vegetarian, Jain and Indian meal planning",
      "Private vehicles with flexible timings",
    ],
    suited: ["Singapore", "Dubai", "Thailand", "Kerala", "Himachal Pradesh"],
  },
  {
    slug: "honeymoon",
    name: "Honeymoon",
    icon: "💍",
    blurb: "Private villas, candlelit dinners and moments designed only for two.",
    image: IMG.mld1,
    intro:
      "Your honeymoon should feel effortless. We handle every romantic detail quietly in the background — the room upgrade request, the flower setup, the private dinner, the sunset timing.",
    highlights: [
      "Private pool villas and overwater suites",
      "Candlelight dinners and spa rituals",
      "Honeymoon inclusions negotiated with hotels",
      "Discreet, unhurried itineraries",
    ],
    suited: ["Maldives", "Bali", "Seychelles", "Kashmir", "Andaman Islands"],
  },
  {
    slug: "senior-citizen-tours",
    name: "Senior Citizen Tours",
    icon: "🌿",
    blurb: "Comfortable pacing, accessible hotels and attentive on-ground care.",
    image: IMG.ppl1,
    intro:
      "Travel should remain joyful at every age. Our senior journeys use shorter drives, lift-accessible hotels, familiar cuisine and a slower rhythm — with a 24×7 support line throughout.",
    highlights: [
      "Short travel days and mid-morning departures",
      "Lift access, ground floors and wheelchair support",
      "Indian and diet-specific meal arrangements",
      "Medical and insurance guidance",
    ],
    suited: ["Nepal", "Kerala", "Singapore", "Bhutan", "Golden Triangle"],
  },
  {
    slug: "luxury-holidays",
    name: "Luxury Holidays",
    icon: "✦",
    blurb: "Palace suites, private guides and the finest addresses in every city.",
    image: IMG.res3,
    intro:
      "For guests who value time, privacy and craftsmanship. Expect suite-level accommodation, private transfers, dedicated guides and access that is difficult to arrange independently.",
    highlights: [
      "Suites and villas at leading global hotels",
      "Private guides and chauffeur-driven cars",
      "Restaurant reservations and event access",
      "Dedicated travel designer from enquiry to return",
    ],
    suited: ["Maldives", "Dubai", "Rajasthan", "Turkey", "Mauritius"],
  },
  {
    slug: "group-tours",
    name: "Group Tours",
    icon: "🎌",
    blurb: "Prime group departures with tour managers and celebratory dining.",
    image: IMG.dubai3,
    intro:
      "Our Prime Group Destinations run as escorted departures with an experienced tour manager, Indian meals, coach transport and a group atmosphere that friends and extended families love.",
    highlights: [
      "Experienced Indian tour managers",
      "Indian meal arrangements throughout",
      "Group celebration dinners and photo sessions",
      "Fixed departures and private group charters",
    ],
    suited: ["Dubai", "Vietnam", "Thailand", "Bali", "Sri Lanka"],
  },
  {
    slug: "corporate-travel",
    name: "Corporate Travel",
    icon: "🏢",
    blurb: "MICE, offsites, incentives and conferences delivered flawlessly.",
    image: IMG.sg2,
    intro:
      "From a 30-person leadership offsite to a 500-delegate incentive programme, we manage venues, logistics, branding, ground handling and reporting with a single point of contact.",
    highlights: [
      "Venue sourcing and conference logistics",
      "Incentive programmes and reward travel",
      "Team-building and gala dinner production",
      "GST invoicing and consolidated reporting",
    ],
    suited: ["Dubai", "Singapore", "Thailand", "Goa", "Rajasthan"],
  },
  {
    slug: "pilgrimage",
    name: "Pilgrimage",
    icon: "🛕",
    blurb: "Char Dham, Nepal, Ramayana trail and sacred circuits, respectfully arranged.",
    image: IMG.bhu1,
    intro:
      "Pilgrimage travel demands sensitivity and precision — darshan timings, priest coordination, satvik meals and comfortable rest between long journeys. We plan all of it.",
    highlights: [
      "Char Dham by road and helicopter",
      "Satvik meal planning throughout",
      "Darshan and temple coordination",
      "Medical support at high altitude",
    ],
    suited: ["Nepal", "Uttarakhand", "Sri Lanka", "Odisha", "Gujarat"],
  },
  {
    slug: "adventure",
    name: "Adventure",
    icon: "🧗",
    blurb: "Ski slopes, high passes, rafting and expedition road trips.",
    image: IMG.him3,
    intro:
      "Certified operators, quality equipment and genuine safety standards — adventure with a luxury base to return to each evening.",
    highlights: [
      "Skiing, paragliding and rafting",
      "Himalayan road and motorbike expeditions",
      "Trekking with licensed mountain guides",
      "Certified equipment and safety briefings",
    ],
    suited: ["Ladakh", "Georgia", "Kazakhstan", "Himachal Pradesh", "Nepal"],
  },
  {
    slug: "wildlife",
    name: "Wildlife",
    icon: "🐅",
    blurb: "Tiger safaris, African plains and expert naturalist guiding.",
    image: IMG.wl2,
    intro:
      "Core-zone permits are limited and time-sensitive. We book early, place you with the right naturalist and choose lodges positioned close to the best gates.",
    highlights: [
      "Core-zone safari permits secured in advance",
      "Expert naturalists and private jeeps",
      "Luxury tented camps and jungle lodges",
      "Photography-focused departures",
    ],
    suited: ["Madhya Pradesh", "Kenya", "Sri Lanka", "Uttarakhand", "Karnataka"],
  },
  {
    slug: "beach-holidays",
    name: "Beach Holidays",
    icon: "🏖️",
    blurb: "Barefoot islands, lagoon villas and long, slow shorelines.",
    image: IMG.bali5,
    intro:
      "Whether it is an overwater villa or a family beach resort with a shallow lagoon, we match the island, the resort and the room category to how you actually like to holiday.",
    highlights: [
      "Overwater and beachfront villas",
      "Snorkelling, diving and island-hopping",
      "Half-board and all-inclusive options",
      "Private beach dining setups",
    ],
    suited: ["Maldives", "Andaman Islands", "Seychelles", "Philippines", "Goa"],
  },
  {
    slug: "customized-tours",
    name: "Customized Tours",
    icon: "🗺️",
    blurb: "A blank page and a travel designer. Anything is possible.",
    image: IMG.vn2,
    intro:
      "Most of our guests start here. Tell us the occasion, the dates and the people travelling — we will design the journey around them, then refine it until it is exactly right.",
    highlights: [
      "Designed entirely around your dates and interests",
      "Unlimited revisions before confirmation",
      "Multi-country and twin-centre routing",
      "Special occasions, anniversaries and celebrations",
    ],
    suited: ["Any destination", "Multi-country routings", "Special occasions"],
  },
];

/* ─────────────  SERVICES  ───────────── */

export interface ServicePage {
  slug: string;
  title: string;
  kicker: string;
  hero: string;
  intro: string;
  sections: { title: string; body: string; items: string[] }[];
  faqs: { q: string; a: string }[];
}

export const services: ServicePage[] = [
  {
    slug: "visa",
    title: "Visa Services",
    kicker: "Documentation Desk",
    hero: IMG.dubai5,
    intro:
      "Our documentation team prepares accurate, country-specific visa files and submits them through authorised channels. We never promise an outcome — approval always rests with the issuing authority — but we do make the process clear, calm and correctly documented.",
    sections: [
      {
        title: "Country-wise visa guidance",
        body: "Requirements differ by nationality, purpose and duration. We confirm the current rule for your passport before you pay for anything.",
        items: [
          "UAE / Dubai — tourist visa (14, 30 or 60 days)",
          "Singapore — tourist visa via authorised agents",
          "Vietnam — electronic visa",
          "Thailand, Malaysia, Sri Lanka — e-visa / ETA / visa-free as per current policy",
          "Bhutan — permit and Sustainable Development Fee",
          "Turkey, Egypt, Georgia, Azerbaijan, Kenya — e-visa or sticker visa",
          "Maldives, Mauritius, Seychelles, Nepal — visa on arrival or visa-free",
        ],
      },
      {
        title: "Standard document checklist",
        body: "A typical tourist file includes the following. Additional documents may be requested by the consulate.",
        items: [
          "Passport valid for at least 6 months with blank pages",
          "Recent photographs to consulate specification",
          "Confirmed flight and hotel itinerary",
          "Bank statements for the last 3–6 months",
          "Income tax returns or salary slips",
          "Covering letter and completed application form",
          "Travel insurance where mandated",
        ],
      },
      {
        title: "How we support you",
        body: "From first enquiry to passport return, one person owns your file.",
        items: [
          "Eligibility check for your passport and travel purpose",
          "Form filling, appointment booking and biometrics guidance",
          "Document verification before submission",
          "Application tracking and status updates",
          "Guidance on re-application if a request is declined",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you guarantee my visa will be approved?",
        a: "No, and any agency that promises approval is being dishonest. Visa decisions are made solely by the embassy or immigration authority. What we guarantee is a correctly prepared, honestly presented and promptly submitted application.",
      },
      {
        q: "How early should I apply?",
        a: "We recommend starting 25–45 days before departure for most destinations, and earlier during peak travel seasons or school holidays.",
      },
      {
        q: "Do you handle visas if I book only flights or hotels?",
        a: "Yes, we offer standalone visa assistance. Share your travel details through the enquiry form and our documentation desk will respond with the requirements.",
      },
    ],
  },
  {
    slug: "hotels",
    title: "Hotel Booking Assistance",
    kicker: "Stay Beautifully",
    hero: IMG.res5,
    intro:
      "We hold direct relationships with luxury hotels, resorts and palace properties across India and abroad. That means the right room category, honest advice about which wing to request, and preferential inclusions where available.",
    sections: [
      {
        title: "Hotel categories we work with",
        body: "Matched to the way you travel, not to a star rating alone.",
        items: [
          "Luxury and ultra-luxury international hotel groups",
          "Private pool villas and overwater suites",
          "Heritage palaces, havelis and boutique properties",
          "Family resorts with kids' clubs and connecting rooms",
          "Wildlife lodges and luxury tented camps",
          "Business hotels for corporate and MICE groups",
        ],
      },
      {
        title: "What we take care of",
        body: "The details that decide whether a stay feels ordinary or exceptional.",
        items: [
          "Room category and view recommendations",
          "Honeymoon, anniversary and birthday arrangements",
          "Early check-in and late check-out requests",
          "Meal plans, dietary requirements and Indian cuisine",
          "Group room blocks and wedding allocations",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you only book hotels as part of a package?",
        a: "No. We are happy to arrange standalone hotel bookings anywhere in the world.",
      },
      {
        q: "Will you recommend the right property for my family?",
        a: "Yes — that is the real value. We advise based on ground knowledge: pool depth, lift access, distance to attractions, food quality and how a property actually performs for Indian guests.",
      },
    ],
  },
  {
    slug: "flights",
    title: "Flight Booking Assistance",
    kicker: "Fly Well",
    hero: IMG.cr3,
    intro:
      "Sensible routings, comfortable connection times and fare rules explained in plain language — for individuals, families and large groups.",
    sections: [
      {
        title: "Routing and fare support",
        body: "We look beyond the cheapest fare to the journey that actually works.",
        items: [
          "International and domestic ticketing",
          "Group fares and series bookings",
          "Multi-city and open-jaw routings",
          "Sensible layover planning for seniors and children",
          "Premium economy, business and first class",
        ],
      },
      {
        title: "Baggage & travel guidance",
        body: "Clear information before you reach the airport.",
        items: [
          "Airline-wise checked and cabin baggage allowances",
          "Excess baggage and sports equipment advice",
          "Web check-in, seat selection and special meals",
          "Wheelchair assistance and unaccompanied minor support",
          "Schedule change and reschedule handling",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you assist with group flight bookings?",
        a: "Yes. We regularly handle group series bookings for 10 to 300 travellers, including block seat allocation and staggered name submission.",
      },
      {
        q: "What happens if my flight is rescheduled or cancelled?",
        a: "Our team monitors your booking and coordinates with the airline for rebooking, refunds or alternative routing as per the fare rules of your ticket.",
      },
    ],
  },
  {
    slug: "cruises",
    title: "Cruise Holidays",
    kicker: "At Sea, In Style",
    hero: IMG.cr4,
    intro:
      "Unpack once and wake up somewhere new. We arrange international cruises across Southeast Asia, the Mediterranean, the Arabian Gulf and the Caribbean, plus luxury river cruises and Indian coastal sailings.",
    sections: [
      {
        title: "Cruise regions",
        body: "Choose the sea, we will choose the ship.",
        items: [
          "Singapore, Malaysia & Thailand short cruises",
          "Dubai & Arabian Gulf sailings",
          "Mediterranean and Greek Isles",
          "Alaska, Caribbean and Northern Europe",
          "Nile, Mekong and European river cruises",
        ],
      },
      {
        title: "Typically included",
        body: "Cruise inclusions vary by line and cabin category — we explain exactly what your fare covers.",
        items: [
          "Cabin or suite accommodation with butler service in higher grades",
          "Main dining, buffets and selected speciality restaurants",
          "Onboard entertainment, pools and enrichment programmes",
          "Port charges and government taxes as applicable",
          "Shore excursions arranged on request",
        ],
      },
    ],
    faqs: [
      {
        q: "Are cruises suitable for senior citizens?",
        a: "Very much so. Cruising avoids repeated packing and airport transfers, and most ships offer lift access, medical facilities and Indian meal options on request.",
      },
      {
        q: "Do I need a visa for a cruise?",
        a: "Usually yes, depending on the ports of call. Our documentation desk will confirm the exact requirement for your sailing and passport.",
      },
    ],
  },
];

/* ─────────────  WHY CHOOSE US  ───────────── */

export const whyChooseUs = [
  {
    title: "20+ Years of Journeys",
    body: "Two decades of designing travel from Jodhpur to the world — with the relationships and ground knowledge that only time can build.",
    icon: "award",
  },
  {
    title: "Bespoke, Never Off-the-Shelf",
    body: "We publish no fixed prices and no rigid packages. Every itinerary begins as a blank page shaped around your dates and travellers.",
    icon: "pen",
  },
  {
    title: "One Dedicated Expert",
    body: "A single travel designer owns your journey from first enquiry to the day you return home. No call centres, no handovers.",
    icon: "user",
  },
  {
    title: "24×7 On-Trip Support",
    body: "A real person on WhatsApp while you travel — for a delayed flight, a room change or a last-minute reservation.",
    icon: "clock",
  },
  {
    title: "Transparent & Honest",
    body: "Clear inclusions, clear exclusions, and no promises we cannot keep — especially where visas and approvals are concerned.",
    icon: "shield",
  },
  {
    title: "Indian Comforts Abroad",
    body: "Vegetarian, Jain and satvik meal planning, Hindi-speaking guides and hotels chosen for how well they host Indian families.",
    icon: "heart",
  },
];

/* ─────────────  ABOUT  ───────────── */

export const timeline = [
  { year: "2005", title: "A Jodhpur beginning", body: "Royal Rajasthan Holidays opens its first desk on D Road, Sardarpura, crafting heritage journeys through Rajasthan." },
  { year: "2009", title: "Across India", body: "Kerala, Kashmir, Himachal and the Golden Triangle join our portfolio as domestic travel expands." },
  { year: "2014", title: "Going international", body: "Our first escorted group departures to Dubai, Singapore and Thailand set the template for Prime Group Destinations." },
  { year: "2019", title: "Luxury & MICE", body: "A dedicated corporate and incentive travel division launches for offsites, conferences and reward programmes." },
  { year: "2025", title: "Twenty years on", body: "Twenty countries, thousands of families, and the same promise — beautiful journeys, honestly planned." },
];

export const values = [
  { title: "Honesty", body: "We would rather lose a booking than overstate what is possible." },
  { title: "Craft", body: "Every itinerary is written by hand, reviewed, and refined before it reaches you." },
  { title: "Care", body: "Our guests are families first and clients second — and they travel with us again." },
  { title: "Detail", body: "Room views, drive times, meal preferences and rest days. Details make luxury." },
];

/* ─────────────  BLOG  ───────────── */

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-visit-dubai",
    title: "The Best Time to Visit Dubai — A Month-by-Month Guide",
    category: "Destination Guide",
    excerpt:
      "From desert safari season to Global Village and the Dubai Shopping Festival, here is how to choose the right month for your family.",
    image: IMG.dubai2,
    date: "12 January 2026",
    readTime: "6 min read",
    body: [
      "Dubai is a year-round destination, but the experience changes dramatically with the calendar. Between October and April, daytime temperatures settle into the mid-twenties and the entire city moves outdoors — desert camps, beach clubs, dhow cruises and open-air dining all come alive.",
      "November to February is our most requested window for families and senior travellers. Evenings are cool enough for the Dubai Fountain and Global Village, and the Dubai Shopping Festival in January brings city-wide savings for guests who enjoy retail.",
      "March and April remain very pleasant and are ideal if you want lower hotel occupancy after the peak festive season. From June to September the heat is intense, but this is also when Dubai's indoor attractions, waterparks and hotel rates are at their most generous — a genuinely good option for budget-conscious families who do not mind an indoor-led itinerary.",
      "Whichever month you choose, we plan desert safaris for late afternoon, keep midday for indoor attractions, and build in a rest hour at the hotel for younger children and grandparents.",
    ],
  },
  {
    slug: "first-international-trip-checklist",
    title: "Your First International Trip: A Complete Checklist",
    category: "Travel Tips",
    excerpt:
      "Passports, visas, forex, insurance, roaming and packing — everything to organise before your first flight abroad.",
    image: IMG.sg3,
    date: "28 December 2025",
    readTime: "8 min read",
    body: [
      "Start with your passport. It must be valid for at least six months beyond your return date and have at least two blank pages. If renewal is needed, begin there — everything else depends on it.",
      "Next, confirm the visa rule for your specific passport and destination. Policies change frequently, and what applied to a friend last year may not apply to you today. Our documentation desk verifies the current requirement before any payment is made.",
      "Arrange travel insurance covering medical treatment, trip cancellation and baggage. For some destinations it is mandatory; for all destinations it is sensible. Carry a mix of forex card and a small amount of local cash, and inform your bank that you will be travelling.",
      "Finally, the practical layer: international roaming or a local eSIM, universal adaptors, printed copies of all bookings, a small medical kit with prescriptions in their original packaging, and photographs of your passport stored securely online.",
    ],
  },
  {
    slug: "honeymoon-maldives-vs-bali",
    title: "Maldives or Bali? Choosing Your Honeymoon Island",
    category: "Honeymoon",
    excerpt:
      "Two extraordinary islands, two very different honeymoons. Here is how to decide which one suits you as a couple.",
    image: IMG.mld2,
    date: "05 December 2025",
    readTime: "5 min read",
    body: [
      "The Maldives is a destination of stillness. You choose one resort island, arrive by seaplane or speedboat, and spend your days between an overwater villa, a house reef and a spa. If your idea of a honeymoon is complete privacy with nothing to organise, this is it.",
      "Bali is a destination of variety. In one week you can move from a jungle villa in Ubud to a clifftop suite in Uluwatu, taking in temples, waterfalls, rice terraces and beach clubs along the way. It suits couples who like to explore between the resting.",
      "Budget behaves differently too. Maldives concentrates spend into the resort and transfer; Bali spreads it across villas, drivers and experiences, often delivering more variety for the same outlay.",
      "Our honest recommendation: if you have ten days, do both — three or four nights in the Maldives to decompress, then Bali to explore. We routinely design this pairing and it is consistently the honeymoon our guests write to us about.",
    ],
  },
  {
    slug: "senior-citizen-travel-tips",
    title: "Travelling Comfortably After 60: Our Ten Rules",
    category: "Travel Tips",
    excerpt:
      "How we design journeys for senior travellers — pacing, hotels, food, medication and the small decisions that matter most.",
    image: IMG.ppl4,
    date: "18 November 2025",
    readTime: "7 min read",
    body: [
      "Rule one: fewer hotels. Every change of hotel costs a half-day in packing, transfers and settling in. We would rather use one comfortable base and travel out from it than move every second night.",
      "Rule two: mid-morning departures. A relaxed 10 AM start instead of a 6 AM one transforms how a holiday feels. Rule three: never more than four hours in a vehicle without a proper break.",
      "Food matters enormously. We confirm vegetarian, Jain or satvik requirements with each hotel in writing, and always identify Indian restaurants near the hotel as a fallback. Rule five: carry medication in original packaging with prescriptions, split across two bags.",
      "The remaining rules are about care — lift-accessible rooms, wheelchair assistance pre-booked at every airport, travel insurance with medical cover, a rest afternoon every third day, and a WhatsApp line to a real person for the entire journey.",
    ],
  },
  {
    slug: "vietnam-7-day-itinerary",
    title: "Seven Perfect Days in Vietnam",
    category: "Itinerary",
    excerpt:
      "Hanoi, Ha Long Bay, Da Nang and Hoi An — a week that captures the very best of Vietnam without rushing.",
    image: IMG.vn6,
    date: "02 November 2025",
    readTime: "6 min read",
    body: [
      "Days one and two belong to Hanoi: the Old Quarter on foot, a cyclo through the French Quarter, egg coffee at a rooftop café and a water puppet performance in the evening.",
      "Day three transfers to Ha Long or the quieter Lan Ha Bay for an overnight cruise. Kayaking at sunset among the karsts is, for most guests, the memory of the trip.",
      "Days four and five fly south to Da Nang. Ba Na Hills and the Golden Bridge fill one morning; the rest is beach, spa and the marble mountains.",
      "Days six and seven are Hoi An — a tailor fitting, a lantern-lit river evening, a cooking class and a bicycle ride through rice fields. It is a gentle, beautiful way to finish.",
    ],
  },
  {
    slug: "understanding-visa-documents",
    title: "Visa Documents Explained: What Consulates Actually Look For",
    category: "Visa Tips",
    excerpt:
      "Bank statements, covering letters and itinerary proof — what each document signals and how to present it correctly.",
    image: IMG.tur4,
    date: "20 October 2025",
    readTime: "6 min read",
    body: [
      "A visa officer is answering one question: will this traveller return home as declared? Every document in your file exists to answer that question credibly.",
      "Bank statements demonstrate that you can fund the trip without working abroad. Consistency matters more than a large closing balance — a sudden deposit shortly before applying often raises more questions than it answers.",
      "Your covering letter should state the purpose, exact dates, who is travelling and who is funding the journey. Keep it to one page and make sure it agrees precisely with your flight and hotel bookings.",
      "Ties to home — employment letters, business registration, property documents, family responsibilities — complete the picture. We help assemble the file honestly and completely; the decision always rests with the consulate.",
    ],
  },
];

/* ─────────────  FAQ  ───────────── */

export const faqCategories = [
  {
    name: "Booking & Planning",
    items: [
      {
        q: "Why don't you display package prices on the website?",
        a: "Because no two journeys we design are the same. Prices shift with dates, hotel category, group size, flight class and season. Publishing a headline price would mean publishing something you could not actually book. Instead, share your requirements and we will send a genuine, itemised proposal.",
      },
      {
        q: "How do I start planning a holiday with you?",
        a: "Send an enquiry through any form on this website, WhatsApp us on +91 94141 96978, email royalrajasthanjodhpur@gmail.com, or call our office. A travel designer responds — usually within a few working hours — with questions, ideas and a first draft itinerary.",
      },
      {
        q: "Where is your office and when are you open?",
        a: "Our office is at D Road, Sardarpura, Jodhpur, Rajasthan, India. We are open Monday to Saturday, 11:00 AM to 08:00 PM, and closed on Sundays. You are welcome to visit us — please call ahead on +91 94141 96978 so Prakash Arora or a travel designer can set aside time for you.",
      },
      {
        q: "How far in advance should I book?",
        a: "For peak periods (Diwali, Christmas, New Year, summer holidays) we recommend 3–4 months. For most other travel, 6–8 weeks gives good hotel availability and comfortable visa timelines.",
      },
      {
        q: "Can I change the itinerary after receiving it?",
        a: "Absolutely, and most guests do. We revise the plan as many times as needed before anything is confirmed.",
      },
    ],
  },
  {
    name: "Visas & Documents",
    items: [
      {
        q: "Do you handle the visa process?",
        a: "Yes. Our documentation desk prepares country-specific checklists, verifies your papers and submits through authorised channels. We do not and cannot guarantee approval — that decision belongs to the consulate.",
      },
      {
        q: "My passport expires in five months. Can I travel?",
        a: "Most countries require six months of validity from your date of entry. We strongly recommend renewing before booking.",
      },
      {
        q: "What if my visa is refused?",
        a: "We will explain the stated reason where one is given, advise on re-application, and help you understand which booking components can be amended or refunded under the applicable supplier policies.",
      },
    ],
  },
  {
    name: "Hotels & Flights",
    items: [
      {
        q: "Can I request a specific hotel?",
        a: "Of course. If you have a property in mind we will quote it directly, and tell you honestly if we believe another option would serve you better.",
      },
      {
        q: "Are flights included in your itineraries?",
        a: "They can be. Many guests prefer us to handle flights for a single point of accountability; others book independently. Both are fine.",
      },
      {
        q: "Do you arrange special meals and wheelchair assistance?",
        a: "Yes — special meals, wheelchair assistance, seat requests and unaccompanied minor support are all arranged as part of your booking.",
      },
    ],
  },
  {
    name: "Payments & Cancellations",
    items: [
      {
        q: "How do payments work?",
        a: "A confirmation advance secures your bookings, with the balance due before departure as per the schedule in your proposal. All payments are made to our registered company account and receipted with a GST invoice.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellation terms depend on the airlines, hotels and operators in your specific itinerary. Every proposal we issue states the applicable cancellation and amendment terms clearly before you pay.",
      },
      {
        q: "Do you recommend travel insurance?",
        a: "Strongly, for every international journey and for any domestic travel involving high altitude or adventure activity.",
      },
    ],
  },
  {
    name: "On Trip & Travel Tips",
    items: [
      {
        q: "Is there support while I am travelling?",
        a: "Yes. You will have a 24×7 WhatsApp line to our team on +91 94141 96978, plus local ground contacts in every destination on your itinerary. Our Jodhpur office is open Monday to Saturday, 11:00 AM to 08:00 PM.",
      },
      {
        q: "Will vegetarian or Jain food be available?",
        a: "In every destination we sell. We confirm dietary requirements with hotels in writing and identify Indian restaurants close to your accommodation.",
      },
      {
        q: "Do you provide Hindi-speaking guides?",
        a: "Hindi-speaking guides are available in most major destinations. We confirm availability at the time of proposal.",
      },
    ],
  },
];

/* ─────────────  GUEST STORIES  ─────────────
   IMPORTANT: Reviews are never fabricated.
   Paste verified Google Reviews into the array below exactly as received. */

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  source: "Google";
}

export const verifiedReviews: Review[] = [];

/* ─────────────  GALLERY  ───────────── */

export const galleryItems = [
  { src: IMG.dubai1, caption: "Dubai skyline at golden hour", group: "International" },
  { src: IMG.vn2, caption: "Terraced valleys, Northern Vietnam", group: "International" },
  { src: IMG.bali2, caption: "Cliffside Bali, Indonesia", group: "International" },
  { src: IMG.sg3, caption: "Marina Bay, Singapore", group: "International" },
  { src: IMG.th3, caption: "Long-tail boat, Thailand", group: "International" },
  { src: IMG.mld1, caption: "Overwater villas, Maldives", group: "International" },
  { src: IMG.bhu4, caption: "Paro Taktsang, Bhutan", group: "International" },
  { src: IMG.tur4, caption: "Cappadocia sunrise, Türkiye", group: "International" },
  { src: IMG.wl1, caption: "Amboseli elephant, Kenya", group: "International" },
  { src: IMG.raj3, caption: "Hawa Mahal, Jaipur", group: "India" },
  { src: IMG.him3, caption: "Pangong Tso, Ladakh", group: "India" },
  { src: IMG.ker2, caption: "Backwaters, Kerala", group: "India" },
  { src: IMG.him1, caption: "Himalayan winter, Kashmir", group: "India" },
  { src: IMG.wl2, caption: "Bengal tiger, Madhya Pradesh", group: "India" },
  { src: IMG.raj1, caption: "Amber Fort, Rajasthan", group: "India" },
  { src: IMG.ker5, caption: "Palm-lined canals, Alleppey", group: "India" },
  { src: IMG.res3, caption: "Villa sunset — luxury stays", group: "Experiences" },
  { src: IMG.cr4, caption: "Deck views — cruise holidays", group: "Experiences" },
  { src: "/gallery/1786023240799.jpg", caption: "Office Photograph 1", group: "Experiences" },
{ src: "/gallery/1786023240837.jpg", caption: "Office Photograph 2", group: "Experiences" },
{ src: "/gallery/1786023240870.jpg", caption: "Office Photograph 3", group: "Experiences" },
{ src: "/gallery/1786023240902.jpg", caption: "Office Photograph 4", group: "Experiences" },
{ src: "/gallery/1786023240932.jpg", caption: "Office Photograph 5", group: "Experiences" },
{ src: "/gallery/1786023240960.jpg", caption: "Office Photograph 6", group: "Experiences" },
];

export const stats = [
  { value: "20+", label: "Years of Journeys" },
  { value: "36", label: "Destinations Curated" },
  { value: "50k+", label: "Happy Travellers" },
  { value: "24×7", label: "On-Trip Support" },
];
