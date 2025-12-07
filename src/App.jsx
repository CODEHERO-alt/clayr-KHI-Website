import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "./assets/clayr-logo.svg";

// Canonical App.jsx export (requested for copy/paste reuse)

/*
  Clayr Site — Monolithic Single File
  ----------------------------------
  - Vite + React + Tailwind single-file monolith.
  - Sections: Hero, Studio, Journey, Workshops, Gallery, Community, FAQ,
    Newsletter, Contact, Modal.
*/

// ------------------------
// Simple data + i18n
// ------------------------

const copy = {
  en: {
    nav: ["Home", "Studio", "Journey", "Workshops", "Community", "Connect"],
    hero: {
      title: "CLAY. FIRE. FORM.",
      subtitle: "Handmade Ceramics Atelier",
      kicker: "Karachi — Studio & Community",
    },
    philosophy: {
      title: "Studio Philosophy",
      text: "We shape clay with patience, intention and heritage. Each object is an echo of craft and culture — designed for daily rituals and lasting stories.",
    },
    journey: "Craft Journey",
    workshops: "Workshops & Events",
    community: "Our Community",
    testimonials: "What People Say",
    newsletter: {
      title: "Join the Atelier — Newsletter",
      desc: "Stories, drops and studio updates. We share craft knowledge and community events.",
    },
    contact: "Get in Touch",
    footer: "Crafted by hand — for everyday rituals",
    send: "Send",
    whatsapp: "Chat on WhatsApp",
    placeholderEmail: "you@example.com",
  },
  ur: {
    nav: ["ہوم", "اسٹوڈیو", "سفر", "ورکشاپس", "کمیونٹی", "رابطہ"],
    hero: {
      title: "مٹی، آگ، شکل",
      subtitle: "ہینڈ میڈ سیرامکس اسٹوڈیو",
      kicker: "کراچی — اسٹوڈیو اور کمیونٹی",
    },
    philosophy: {
      title: "اسٹوڈیو فلسفہ",
      text: "ہم صبر اور روایت کے ساتھ مٹی کو شکل دیتے ہیں۔ ہر پیس روزمرہ کے معمولات اور قصوں کے لیے تخلیق کیا جاتا ہے۔",
    },
    journey: "کرافٹ جرنی",
    workshops: "ورکشاپس اور ایونٹس",
    community: "ہماری کمیونٹی",
    testimonials: "لوگ کیا کہتے ہیں",
    newsletter: {
      title: "نیوز لیٹر میں شامل ہوں",
      desc: "اسٹوڈیو کی خبریں، کہانیاں اور ایونٹس براہِ راست آپ تک۔",
    },
    contact: "رابطہ کریں",
    footer: "ہاتھوں سے بنا — روزمرہ کے لیے",
    send: "بھیجیں",
    whatsapp: "واٹس ایپ پر بات کریں",
    placeholderEmail: "you@example.com",
  },
};

const galleryItems = [
  {
    id: 1,
    title: "Wheel-thrown Cups",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=80",
  },
  {
    id: 2,
    title: "Serving Bowls",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=80",
  },
  {
    id: 3,
    title: "Textured Vessels",
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80",
  },
  {
    id: 4,
    title: "Everyday Plates",
    img: "https://images.unsplash.com/photo-1528821154947-1aa3d1b74902?w=800&q=80",
  },
];

const studioStory = [
  {
    id: 1,
    title: "Clay & Preparation",
    img: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=80",
    desc: "Local clay is wedged, tested and blended for strength, tone and character.",
  },
  {
    id: 2,
    title: "Throwing & Forming",
    img: "https://images.unsplash.com/photo-1615486364313-73ea2855f817?w=900&q=80",
    desc: "Every form is thrown or hand-built in small batches with slow, intentional gestures.",
  },
  {
    id: 3,
    title: "Fire & Finish",
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=80",
    desc: "Bisque, glaze, and final firing bring depth, tactility and life to each piece.",
  },
];

const workshops = [
  { id: 1, title: "Intro to Wheel Throwing", date: "Sat — 14 Dec", slots: 8 },
  { id: 2, title: "Handbuilding for Beginners", date: "Sun — 21 Dec", slots: 10 },
];

const testimonials = [
  {
    id: 1,
    text: "The most grounding evening I’ve had in months. Clayr’s studio feels like a small world of its own.",
    author: "Sara, Karachi",
  },
  {
    id: 2,
    text: "Beautifully crafted pieces and a team that truly cares about process and community.",
    author: "Omar, Lahore",
  },
];

const team = [
  {
    id: 1,
    name: "Ayesha",
    role: "Founder & Ceramic Artist",
    bio: "Focuses on functional ware with warm glazes and quiet silhouettes.",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&q=80",
  },
  {
    id: 2,
    name: "Hassan",
    role: "Studio Technician",
    bio: "Keeps kilns, clay bodies and glazes consistent and reliable.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
  },
  {
    id: 3,
    name: "Noor",
    role: "Programs & Community",
    bio: "Designs workshops, open studios and community markets.",
    img: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=400&q=80",
  },
];

export default function ClayrMonolith() {
  // ------------------------
  // State
  // ------------------------
  const [language, setLanguage] = useState("en");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [workshopForm, setWorkshopForm] = useState({
    name: "",
    email: "",
    note: "",
  });
  const [faqOpen, setFaqOpen] = useState(null);
  const [activeTab, setActiveTab] = useState("studio");

  // refs
  const heroRef = useRef(null);
  const topRightLangRef = useRef(null);

  const t = copy[language];

  const fadeIn = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 },
  };

  const floatIn = {
    initial: { opacity: 0, scale: 0.98, y: 12 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 },
  };

  // ------------------------
  // Helpers
  // ------------------------
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  const handleNewsletter = (e) => {
    e?.preventDefault?.();
    alert(`${newsletterEmail} subscribed — (demo only)`);
    setNewsletterEmail("");
  };

  const handleWorkshopSign = (e) => {
    e?.preventDefault?.();
    alert(
      `Thanks ${workshopForm.name}! We'll contact you at ${workshopForm.email} (demo)`
    );
    setWorkshopForm({ name: "", email: "", note: "" });
  };

  const toggleFaq = (index) => setFaqOpen((s) => (s === index ? null : index));

  const navTargets = [
    "home",
    "studio",
    "journey",
    "workshops",
    "community",
    "connect",
  ];

  // ------------------------
  // Render monolith
  // ------------------------
  return (
    <div className="min-h-screen bg-[#F9F5EE] text-[#1E1C1A] font-sans antialiased">
      {/* ===== Header / Nav ===== */}
      <header className="fixed inset-x-0 top-0 z-40">
        <motion.div
          className="backdrop-blur-sm transition-all duration-300 bg-white/50 border-b border-[#E7D6B7]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollTo("home")}
                aria-label="Go to home"
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#4B3324] shadow-sm">
                  <img
                    src={logo}
                    alt="Clayr logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="font-black text-lg tracking-tight">CLAYR</div>
                  <div className="text-xs text-[#8B8A5C] tracking-wide">
                    Handmade Ceramics
                  </div>
                </div>
              </button>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {t.nav.map((n, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(navTargets[i])}
                  className="text-sm font-semibold uppercase tracking-wider hover:text-[#C7885B] transition-colors"
                >
                  {n}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* language toggle */}
              <div ref={topRightLangRef} className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage("en")}
                  aria-pressed={language === "en"}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-[#C7885B] ${
                    language === "en"
                      ? "bg-[#1E1C1A] text-[#F9F5EE]"
                      : "bg-transparent text-[#4B3324]"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("ur")}
                  aria-pressed={language === "ur"}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-[#C7885B] ${
                    language === "ur"
                      ? "bg-[#1E1C1A] text-[#F9F5EE]"
                      : "bg-transparent text-[#4B3324]"
                  }`}
                >
                  اردو
                </button>
              </div>

              <div className="md:hidden">
                <button
                  aria-label="Open menu"
                  className="p-2 rounded-md bg-white shadow-sm"
                  onClick={() => setIsMenuOpen((s) => !s)}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1E1C1A"
                    strokeWidth="1.6"
                  >
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/80 border-t border-[#E7D6B7]">
              <div className="px-6 py-4 space-y-2">
                {t.nav.map((n, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(navTargets[i])}
                    className="block w-full text-left font-medium py-2"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </header>

      {/* ===== HERO ===== */}
      <main className="pt-20">
        <motion.section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615486364313-73ea2855f817?w=1600&q=80')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F9F5EE]/80 to-[#E7D6B7]/40" />

          <div className="max-w-7xl mx-auto px-6 py-24 z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="inline-block px-4 py-1 bg-[#C7885B] text-[#F9F5EE] rounded-full text-xs font-bold">
                  {t.hero.kicker}
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-[#4B3324]">
                  {t.hero.title}
                </h1>
                <p className="text-xl md:text-2xl text-[#8B8A5C] max-w-xl">
                  {t.hero.subtitle}
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={() => scrollTo("workshops")}
                    className="px-6 py-3 rounded-full bg-[#4B3324] text-[#F9F5EE] font-bold hover:scale-[1.02] transition-transform"
                  >
                    {t.workshops}
                  </button>

                  <button
                    onClick={() => scrollTo("community")}
                    className="px-6 py-3 rounded-full border-2 border-[#4B3324] bg-transparent font-bold hover:bg-[#4B3324] hover:text-[#F9F5EE] transition-all"
                  >
                    {t.community}
                  </button>
                </div>

                <div className="mt-6">
                  <div className="inline-block bg-white border-2 border-[#1E1C1A] p-4">
                    <div className="text-sm font-semibold">#clayRstyle</div>
                    <div className="text-xs text-[#8B8A5C]">
                      Handmade in Karachi — commissions open
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    className="rounded-xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  >
                    <img
                      src={galleryItems[0].img}
                      alt="gallery"
                      className="w-full h-80 object-cover"
                    />
                  </motion.div>
                  <div className="space-y-6">
                    <motion.div
                      className="rounded-xl overflow-hidden shadow-2xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                      }}
                    >
                      <img
                        src={galleryItems[1].img}
                        alt="gallery"
                        className="w-full h-36 object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="rounded-xl overflow-hidden shadow-2xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                      }}
                    >
                      <img
                        src={galleryItems[2].img}
                        alt="gallery"
                        className="w-full h-36 object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="absolute -bottom-8 right-2 hidden lg:block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-48 h-48 rounded-2xl bg-[#F9F5EE] border-4 border-[#1E1C1A] flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="font-black">CLAYR</div>
                      <div className="text-xs text-[#8B8A5C]">
                        Atelier Editions
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* subtle scroll hint */}
            <div className="mt-12 flex items-center gap-3 text-sm text-[#8B8A5C]">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B8A5C"
                strokeWidth="1.6"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <div>Scroll to explore the atelier</div>
            </div>
          </div>
        </motion.section>

        {/* ===== Studio Philosophy ===== */}
        <motion.section
          id="studio"
          className="px-6 md:px-24 py-24 bg-transparent"
          {...fadeIn}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              className="space-y-6"
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.05 }}
            >
              <h2 className="text-4xl font-extrabold text-[#4B3324]">
                {t.philosophy.title}
              </h2>
              <p className="text-lg text-[#1E1C1A] leading-relaxed">
                {t.philosophy.text}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Materials", "Sustainability"].map((title, idx) => (
                  <motion.div
                    key={title}
                    className="bg-[#F9F5EE] rounded-lg p-6 border border-[#E7D6B7]"
                    whileHover={{
                      translateY: -4,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm text-[#4B3324] mt-2">
                      {idx === 0
                        ? "Locally sourced clays — tested for strength and tone."
                        : "Recycled packing, low waste glazing techniques, community trade."}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                className="rounded-xl overflow-hidden bg-white border-2 border-[#1E1C1A] shadow-lg"
                {...floatIn}
              >
                <img
                  src={studioStory[1].img}
                  alt="throwing"
                  className="w-full h-96 object-cover"
                />
                <div className="p-6">
                  <div className="font-bold text-lg">{studioStory[1].title}</div>
                  <p className="text-sm mt-2 text-[#4B3324]">
                    {studioStory[1].desc}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="rounded-xl overflow-hidden bg-[#E7D6B7] p-6 border border-[#4B3324]"
                {...floatIn}
                transition={{ ...floatIn.transition, delay: 0.05 }}
              >
                <h4 className="font-bold">Open Studio Days</h4>
                <p className="text-sm mt-2">
                  We welcome the public on selected Saturdays — tours, talks and
                  hands-on demonstrations.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => scrollTo("workshops")}
                    className="px-4 py-2 bg-[#4B3324] text-white rounded"
                  >
                    See schedule
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-4 py-2 border border-[#4B3324] rounded"
                  >
                    Plan a visit
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== Craft Journey ===== */}
        <motion.section
          id="journey"
          className="py-20 bg-[#E7D6B7]"
          {...fadeIn}
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl text-[#4B3324] font-extrabold text-center mb-12">
              {t.journey}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studioStory.map((s, idx) => (
                <motion.article
                  key={s.id}
                  className="rounded-lg overflow-hidden bg-white shadow-lg"
                  {...floatIn}
                  transition={{ ...floatIn.transition, delay: idx * 0.05 }}
                  whileHover={{ translateY: -6 }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm text-[#4B3324]">{s.desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== Workshops & Events ===== */}
        <motion.section
          id="workshops"
          className="py-20 px-6"
          {...fadeIn}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-extrabold text-[#4B3324]">
                {t.workshops}
              </h2>
              <div className="text-sm text-[#8B8A5C]">
                Practical sessions, limited seats
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {workshops.map((w, idx) => (
                <motion.div
                  key={w.id}
                  className="p-6 rounded-xl border border-[#E7D6B7] shadow-md bg-white"
                  {...floatIn}
                  transition={{ ...floatIn.transition, delay: idx * 0.05 }}
                  whileHover={{ translateY: -4 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-lg">{w.title}</div>
                      <div className="text-sm text-[#8B8A5C]">
                        {w.date} • {w.slots} seats
                      </div>
                      <p className="mt-4 text-sm text-[#4B3324]">
                        Hands-on guidance, materials included. Suitable for
                        beginners.
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => setActiveTab(String(w.id))}
                        className="px-4 py-2 bg-[#C7885B] text-white rounded"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* reservation / simple form */}
              <motion.div
                className="p-6 rounded-xl border border-[#E7D6B7] bg-[#F9F5EE]"
                {...floatIn}
                transition={{ ...floatIn.transition, delay: 0.1 }}
              >
                <h3 className="font-extrabold mb-4">Reserve a spot</h3>
                <form onSubmit={handleWorkshopSign} className="space-y-3">
                  <input
                    value={workshopForm.name}
                    onChange={(e) =>
                      setWorkshopForm((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="w-full p-3 border rounded"
                    required
                  />
                  <input
                    value={workshopForm.email}
                    onChange={(e) =>
                      setWorkshopForm((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="Email"
                    type="email"
                    className="w-full p-3 border rounded"
                    required
                  />
                  <textarea
                    value={workshopForm.note}
                    onChange={(e) =>
                      setWorkshopForm((s) => ({ ...s, note: e.target.value }))
                    }
                    placeholder="Questions or notes"
                    className="w-full p-3 border rounded"
                    rows={4}
                  ></textarea>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#4B3324] text-white rounded"
                  >
                    {t.send}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== Gallery / Showcase ===== */}
        <motion.section
          id="work"
          className="py-24 px-6 bg-transparent"
          {...fadeIn}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-[#4B3324] mb-12">
              Gallery — Selected Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {galleryItems.map((g, idx) => (
                <motion.div
                  key={g.id}
                  className="rounded-xl overflow-hidden bg-white border border-[#E7D6B7] shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(g)}
                  {...floatIn}
                  transition={{ ...floatIn.transition, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={g.img}
                    alt={g.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <div className="font-semibold">{g.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-[#C7885B] text-white rounded-full"
                onClick={() => alert("Open catalog (demo)")}
              >
                View Catalog
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* ===== Community / Events / Testimonials ===== */}
        <motion.section
          id="community"
          className="py-24 px-6 bg-[#E7D6B7]"
          {...fadeIn}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-[#4B3324] mb-10">
              {t.community}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {["Community Market", "Open Critique", "Apprenticeship"].map(
                (title, idx) => (
                  <motion.div
                    key={title}
                    className="p-6 bg-white border rounded-lg shadow"
                    {...floatIn}
                    transition={{ ...floatIn.transition, delay: idx * 0.05 }}
                    whileHover={{ translateY: -4 }}
                  >
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-2 text-sm">
                      {idx === 0
                        ? "A monthly market showcasing local makers and limited editions."
                        : idx === 1
                        ? "Peer review nights for makers and design feedback sessions."
                        : "Long-term placements for those who wish to pursue craft professionally."}
                    </p>
                  </motion.div>
                )
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-extrabold text-[#4B3324] mb-6">
                  {t.testimonials}
                </h3>
                <div className="space-y-4">
                  {testimonials.map((tt, idx) => (
                    <motion.blockquote
                      key={tt.id}
                      className="bg-white p-4 border rounded"
                      {...floatIn}
                      transition={{
                        ...floatIn.transition,
                        delay: idx * 0.05,
                      }}
                    >
                      <p className="text-sm">“{tt.text}”</p>
                      <div className="mt-2 text-xs font-semibold">
                        — {tt.author}
                      </div>
                    </motion.blockquote>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-[#4B3324] mb-6">
                  Meet the Team
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {team.map((m, idx) => (
                    <motion.div
                      key={m.id}
                      className="flex items-center gap-4 bg-white p-4 border rounded"
                      {...floatIn}
                      transition={{
                        ...floatIn.transition,
                        delay: idx * 0.05,
                      }}
                    >
                      <img
                        src={m.img}
                        alt={m.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div>
                        <div className="font-bold">{m.name}</div>
                        <div className="text-xs text-[#8B8A5C]">{m.role}</div>
                        <div className="text-sm mt-2">{m.bio}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold mb-6">Partners</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Local Cafe",
                    "Design Collective",
                    "Gallery",
                    "Material Supplier",
                  ].map((partner, idx) => (
                    <motion.div
                      key={partner}
                      className="p-4 bg-white border rounded"
                      {...floatIn}
                      transition={{
                        ...floatIn.transition,
                        delay: idx * 0.05,
                      }}
                    >
                      {partner}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== FAQ ===== */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-extrabold mb-6">FAQ</h3>
              <div className="space-y-2">
                {[
                  "How do I order?",
                  "Do you ship internationally?",
                  "Can I book a private workshop?",
                ].map((q, i) => (
                  <div key={i} className="bg-white border rounded p-4">
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full text-left font-bold flex items-center justify-between"
                    >
                      <span>{q}</span>
                      <span className="ml-4">
                        {faqOpen === i ? "—" : "+"}
                      </span>
                    </button>
                    {faqOpen === i && (
                      <p className="mt-3 text-sm text-[#4B3324]">
                        Answer goes here — sample text describing policies and
                        steps.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F9F5EE] border border-[#E7D6B7] rounded-lg p-6">
              <h4 className="font-bold">Need more details?</h4>
              <p className="text-sm mt-2 text-[#4B3324]">
                Reach out for custom timelines, private sessions or wholesale
                partnerships. We respond within one business day.
              </p>
            </div>
          </div>
        </section>

        {/* ===== Newsletter / CTA ===== */}
        <motion.section
          className="py-16 bg-[#4B3324] text-[#F9F5EE] px-6"
          {...fadeIn}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-extrabold mb-4">
              {t.newsletter.title}
            </h3>
            <p className="mb-6 text-sm opacity-80">
              {t.newsletter.desc}
            </p>
            <motion.form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="p-3 rounded w-full sm:w-auto min-w-[280px] text-black"
                placeholder={t.placeholderEmail}
                required
              />
              <motion.button
                type="submit"
                className="px-6 py-3 bg-[#DCB34A] font-bold rounded"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.send}
              </motion.button>
            </motion.form>
          </div>
        </motion.section>

        {/* ===== Contact / Connect ===== */}
        <motion.section
          id="connect"
          className="py-20 px-6"
          {...fadeIn}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-extrabold text-[#4B3324] mb-4">
                {t.contact}
              </h2>
              <p className="text-sm text-[#4B3324] mb-6">
                Custom orders, collaborations, wholesale enquiries — let’s talk
                through your idea.
              </p>

              <div className="space-y-4">
                <motion.div
                  className="bg-white p-4 border rounded"
                  whileHover={{ translateY: -3 }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 18,
                  }}
                >
                  <div className="font-bold">INSTAGRAM</div>
                  <a
                    href="https://instagram.com/clayronline"
                    rel="noreferrer"
                    target="_blank"
                    className="text-sm text-[#C7885B]"
                  >
                    @clayronline
                  </a>
                </motion.div>
                <motion.div
                  className="bg-white p-4 border rounded"
                  whileHover={{ translateY: -3 }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 18,
                  }}
                >
                  <div className="font-bold">EMAIL</div>
                  <a
                    href="mailto:hello@clayronline.com"
                    className="text-sm text-[#C7885B]"
                  >
                    hello@clayronline.com
                  </a>
                </motion.div>
                <motion.div
                  className="bg-white p-4 border rounded"
                  whileHover={{ translateY: -3 }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 18,
                  }}
                >
                  <div className="font-bold">VISIT</div>
                  <div className="text-sm">
                    Studio visits by appointment — Karachi
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div {...floatIn}>
              <div className="bg-white p-6 rounded-lg border shadow">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Message sent (demo)");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold">Name</label>
                    <input
                      className="w-full p-3 border rounded"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold">Email</label>
                    <input
                      className="w-full p-3 border rounded"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold">Message</label>
                    <textarea
                      className="w-full p-3 border rounded"
                      rows={5}
                      placeholder="Tell us about your project"
                      required
                    ></textarea>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      className="px-4 py-2 bg-[#4B3324] text-white rounded"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Send
                    </motion.button>
                    <motion.a
                      className="px-4 py-2 border border-[#4B3324] rounded"
                      href="https://wa.me/"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {t.whatsapp}
                    </motion.a>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ===== Footer ===== */}
        <footer className="bg-[#1E1C1A] text-[#F9F5EE] py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#C7885B]">
                  <img
                    src={logo}
                    alt="Clayr icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-black">CLAYR</div>
                  <div className="text-xs text-[#E7D6B7]">{t.footer}</div>
                </div>
              </div>

              <div className="text-sm text-[#E7D6B7]">
                © {new Date().getFullYear()} CLAYR — All rights reserved
              </div>
            </div>

            <div className="mt-6 text-xs text-[#E7D6B7]">
              Made with clay, fire and hands.
            </div>
          </div>
        </footer>

        {/* ===== Image Modal ===== */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80"
              onClick={() => setSelectedImage(null)}
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="max-w-4xl w-full relative"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-10 right-0 text-white p-2 rounded"
                >
                  Close
                </button>
                <img
                  src={selectedImage.img}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded"
                />
                <div className="mt-4 bg-white p-4 rounded">
                  <div className="font-bold">{selectedImage.title}</div>
                  <div className="text-sm text-[#4B3324]">
                    Item details and story. Replace with real copy for
                    production.
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
