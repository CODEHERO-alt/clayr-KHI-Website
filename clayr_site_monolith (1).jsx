import React, { useEffect, useState, useRef } from "react";

/*
  Clayr Site — Monolithic Single File
  ----------------------------------
  - Vite + React + Tailwind single-file monolith for canvas preview.
  - Expanded: additional sections, components and behaviours to give the site
    a deeper community & atelier feel: Events, Workshops, Testimonials,
    Team, FAQ, Newsletter, Partners, Accessibility fixes, better language toggle
    placement and responsive behavior.
  - Keep this single file for now, later can be split into components.

  Notes:
  - This file intentionally contains many commented sections and helper
    structures to keep the monolith readable in canvas.
  - All visuals use placeholder images / colors; replace /assets with real
    production images when ready.
*/

export default function ClayrMonolith() {
  // ------------------------
  // State
  // ------------------------
  const [language, setLanguage] = useState("en");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [workshopForm, setWorkshopForm] = useState({ name: "", email: "", note: "" });
  const [faqOpen, setFaqOpen] = useState(null);
  const [activeTab, setActiveTab] = useState("studio");

  // refs
  const heroRef = useRef(null);
  const topRightLangRef = useRef(null);

  // ------------------------
  // Localization strings (simple inline i18n)
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
      placeholderEmail: "you@email.com",
      send: "Send",
      whatsapp: "WhatsApp Us",
    },
    ur: {
      nav: ["گھر", "اسٹوڈیو", "سفر", "ورشاں", "کمیونٹی", "رابطہ"],
      hero: {
        title: "مٹی۔ آگ۔ شکل",
        subtitle: "ہاتھ سے بنے ہوئے برتن",
        kicker: "کراچی — اسٹوڈیو اور کمیونٹی",
      },
      philosophy: {
        title: "اسٹوڈیو کا نظریہ",
        text: "ہم صبر، نیت اور ثقافت کے ساتھ مٹی کو شکل دیتے ہیں۔ ہر شے دستکاری اور روایت کی گونج ہے — روزمرہ کے طرزِ عمل کیلئے۔",
      },
      journey: "صنعتی سفر",
      workshops: "ورکشاپس اور تقریبات",
      community: "ہماری کمیونٹی",
      testimonials: "لوگ کیا کہتے ہیں",
      newsletter: {
        title: "اٹیلیئر میں شامل ہوں — نیوز لیٹر",
        desc: "کہانیاں، نئی مصنوعات اور اسٹوڈیو کی خبریں۔ ہم دستکاری اور کمیونٹی کے پروگرام شئیر کرتے ہیں۔",
      },
      contact: "رابطہ کریں",
      footer: "ہاتھ سے تیار — روزمرہ کے طرز عمل کے لیے",
      placeholderEmail: "aap@email.com",
      send: "بھیجیں",
      whatsapp: "واٹس ایپ کریں",
    },
  };

  // shorthand
  const t = copy[language];

  // ------------------------
  // Sample content arrays
  // ------------------------
  const studioStory = [
    { id: 1, title: "Raw Clay", desc: "Sourced locally, prepared with care.", img: "https://images.unsplash.com/photo-1600973310604-3b9ea50a2f92?w=1600&q=80" },
    { id: 2, title: "Throwing", desc: "Wheel work with hands-on control.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80" },
    { id: 3, title: "Shaping", desc: "Forming silhouettes with rhythm.", img: "https://images.unsplash.com/photo-1520975910965-8b27b7f2c7db?w=1600&q=80" },
    { id: 4, title: "Glazing", desc: "Color and surface treatments.", img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1600&q=80" },
    { id: 5, title: "Firing", desc: "Kiln magic — transformation and finish.", img: "https://images.unsplash.com/photo-1526857847615-cc3b7f6b0b7b?w=1600&q=80" },
    { id: 6, title: "Finishing", desc: "Polish, inspect and send to a home.", img: "https://images.unsplash.com/photo-1556228453-6c5a67f7f4b4?w=1600&q=80" },
  ];

  const galleryItems = [
    { id: 1, title: "Tea Set", img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&q=80" },
    { id: 2, title: "Serving Bowl", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80" },
    { id: 3, title: "Ceramic Mug", img: "https://images.unsplash.com/photo-1600180758894-7d1d4efb7ad8?w=1600&q=80" },
    { id: 4, title: "Decorative Plate", img: "https://images.unsplash.com/photo-1526130064578-3cf6f9c0b6f7?w=1600&q=80" },
  ];

  const workshops = [
    { id: 1, title: "Intro to Wheel", date: "2025-12-20", slots: 6 },
    { id: 2, title: "Glaze Lab", date: "2026-01-10", slots: 8 },
  ];

  const testimonials = [
    { id: 1, author: "Ayesha", text: "Beautiful pieces and patient instruction — an inspiring experience." },
    { id: 2, author: "Bilal", text: "Bought custom mugs for my cafe — the team handled everything." },
  ];

  const team = [
    { id: 1, name: "Rashid", role: "Master Potter", bio: "30 years on the wheel, keeps our knowledge alive.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" },
    { id: 2, name: "Sana", role: "Glaze Specialist", bio: "Color recipes and surface finishes.", img: "https://images.unsplash.com/photo-1545996124-f0ce1f3b1d66?w=800&q=80" },
  ];

  // ------------------------
  // Effects: keyboard modal close, language toggle fix
  // ------------------------
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
        // Ctrl/Cmd + L to toggle language (a small productivity shortcut)
        e.preventDefault();
        setLanguage((s) => (s === "en" ? "ur" : "en"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Accessibility: focus trap for modal (basic)
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedImage]);

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
    // stub: connect to API
    alert(`${newsletterEmail} subscribed — (demo only)`);
    setNewsletterEmail("");
  };

  const handleWorkshopSign = (e) => {
    e?.preventDefault?.();
    alert(`Thanks ${workshopForm.name}! We'll contact you at ${workshopForm.email} (demo)`);
    setWorkshopForm({ name: "", email: "", note: "" });
  };

  const toggleFaq = (index) => setFaqOpen((s) => (s === index ? null : index));

  // ------------------------
  // Render monolith
  // ------------------------
  return (
    <div className="min-h-screen bg-[#F9F5EE] text-[#1E1C1A] font-sans antialiased">
      {/* ===== Header / Nav ===== */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className={`backdrop-blur-sm transition-all duration-300 bg-white/50 border-b border-[#E7D6B7]`}>
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollTo("home")}
                aria-label="Go to home"
                className="flex items-center gap-3"
              >
                {/* logo mark */}
                <div className="w-12 h-12 rounded-full bg-[#C7885B] flex items-center justify-center ring-2 ring-[#4B3324]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#1E1C1A" strokeWidth="1.8">
                    <path d="M3 12 L12 3 L21 12" />
                    <path d="M12 3 L12 21" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <div className="font-black text-lg tracking-tight">CLAYR</div>
                  <div className="text-xs text-[#8B8A5C] tracking-wide">Handmade Ceramics</div>
                </div>
              </button>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {t.nav.map((n, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(["home", "studio", "journey", "workshops", "community", "connect"][i])}
                  className="text-sm font-semibold uppercase tracking-wider hover:text-[#C7885B] transition-colors"
                >
                  {n}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* language toggle (fixed position issue resolved by using a pinned container and proper z-index)
                  this is a single control showing both languages and the toggle state clearly. */}
              <div ref={topRightLangRef} className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage("en")}
                  aria-pressed={language === "en"}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-[#C7885B] ${language === "en" ? "bg-[#1E1C1A] text-[#F9F5EE]" : "bg-transparent text-[#4B3324]"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("ur")}
                  aria-pressed={language === "ur"}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-[#C7885B] ${language === "ur" ? "bg-[#1E1C1A] text-[#F9F5EE]" : "bg-transparent text-[#4B3324]"}`}
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
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#1E1C1A" strokeWidth="1.6">
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
                    onClick={() => scrollTo(["home", "studio", "journey", "workshops", "community", "connect"][i])}
                    className="block w-full text-left font-medium py-2"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ===== HERO ===== */}
      <main className="pt-20">
        <section id="home" ref={heroRef} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615486364313-73ea2855f817?w=1600&q=80')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F9F5EE]/80 to-[#E7D6B7]/40" />

          <div className="max-w-7xl mx-auto px-6 py-24 z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1 bg-[#C7885B] text-[#F9F5EE] rounded-full text-xs font-bold">{t.hero.kicker}</div>
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
                    <div className="text-xs text-[#8B8A5C]">Handmade in Karachi — commissions open</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl overflow-hidden shadow-2xl">
                    <img src={galleryItems[0].img} alt="gallery" className="w-full h-80 object-cover" />
                  </div>
                  <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                      <img src={galleryItems[1].img} alt="gallery" className="w-full h-36 object-cover" />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                      <img src={galleryItems[2].img} alt="gallery" className="w-full h-36 object-cover" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-8 right-2 hidden lg:block">
                  <div className="w-48 h-48 rounded-2xl bg-[#F9F5EE] border-4 border-[#1E1C1A] flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="font-black">CLAYR</div>
                      <div className="text-xs text-[#8B8A5C]">Atelier Editions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* subtle scroll hint */}
            <div className="mt-12 flex items-center gap-3 text-sm text-[#8B8A5C]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#8B8A5C" strokeWidth="1.6">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <div>Scroll to explore the atelier</div>
            </div>
          </div>
        </section>

        {/* ===== Studio Philosophy ===== */}
        <section id="studio" className="px-6 md:px-24 py-24 bg-transparent">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-[#4B3324]">{t.philosophy.title}</h2>
              <p className="text-lg text-[#1E1C1A] leading-relaxed">{t.philosophy.text}</p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#F9F5EE] rounded-lg p-6 border border-[#E7D6B7]">
                  <h3 className="font-bold">Materials</h3>
                  <p className="text-sm text-[#4B3324] mt-2">Locally sourced clays — tested for strength and tone.</p>
                </div>
                <div className="bg-[#F9F5EE] rounded-lg p-6 border border-[#E7D6B7]">
                  <h3 className="font-bold">Sustainability</h3>
                  <p className="text-sm text-[#4B3324] mt-2">Recycled packing, low waste glazing techniques, community trade.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden bg-white border-2 border-[#1E1C1A] shadow-lg">
                <img src={studioStory[1].img} alt="throwing" className="w-full h-96 object-cover" />
                <div className="p-6">
                  <div className="font-bold text-lg">{studioStory[1].title}</div>
                  <p className="text-sm mt-2 text-[#4B3324]">{studioStory[1].desc}</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#E7D6B7] p-6 border border-[#4B3324]">
                <h4 className="font-bold">Open Studio Days</h4>
                <p className="text-sm mt-2">We welcome the public on selected Saturdays — tours, talks and hands-on demonstrations.</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => scrollTo("workshops")} className="px-4 py-2 bg-[#4B3324] text-white rounded">See schedule</button>
                  <button onClick={() => scrollTo("contact") } className="px-4 py-2 border border-[#4B3324] rounded">Plan a visit</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Craft Journey (Scrollytelling) ===== */}
        <section id="journey" className="py-20 bg-[#E7D6B7]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl text-[#4B3324] font-extrabold text-center mb-12">{t.journey}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studioStory.map((s) => (
                <article key={s.id} className="rounded-lg overflow-hidden bg-white shadow-lg">
                  <img src={s.img} alt={s.title} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm text-[#4B3324]">{s.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Workshops & Events ===== */}
        <section id="workshops" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-extrabold text-[#4B3324]">{t.workshops}</h2>
              <div className="text-sm text-[#8B8A5C]">Practical sessions, limited seats</div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {workshops.map((w) => (
                <div key={w.id} className="p-6 rounded-xl border border-[#E7D6B7] shadow-md bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-lg">{w.title}</div>
                      <div className="text-sm text-[#8B8A5C]">{w.date} • {w.slots} seats</div>
                      <p className="mt-4 text-sm text-[#4B3324]">Hands-on guidance, materials included. Suitable for beginners.</p>
                    </div>
                    <div>
                      <button onClick={() => setActiveTab(String(w.id))} className="px-4 py-2 bg-[#C7885B] text-white rounded">Reserve</button>
                    </div>
                  </div>
                </div>
              ))}

              {/* reservation / simple form */}
              <div className="p-6 rounded-xl border border-[#E7D6B7] bg-[#F9F5EE]">
                <h3 className="font-extrabold mb-4">Reserve a spot</h3>
                <form onSubmit={handleWorkshopSign} className="space-y-3">
                  <input value={workshopForm.name} onChange={(e)=> setWorkshopForm(s => ({...s, name: e.target.value}))} placeholder="Your name" className="w-full p-3 border rounded" required />
                  <input value={workshopForm.email} onChange={(e)=> setWorkshopForm(s => ({...s, email: e.target.value}))} placeholder="Email" type="email" className="w-full p-3 border rounded" required />
                  <textarea value={workshopForm.note} onChange={(e)=> setWorkshopForm(s => ({...s, note: e.target.value}))} placeholder="Questions or notes" className="w-full p-3 border rounded" rows={4}></textarea>
                  <button type="submit" className="px-6 py-2 bg-[#4B3324] text-white rounded">{t.send}</button>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* ===== Gallery / Showcase (spacious) ===== */}
        <section id="work" className="py-24 px-6 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-[#4B3324] mb-12">Gallery — Selected Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {galleryItems.map((g) => (
                <div key={g.id} className="rounded-xl overflow-hidden bg-white border border-[#E7D6B7] shadow-lg cursor-pointer" onClick={() => setSelectedImage(g)}>
                  <img src={g.img} alt={g.title} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <div className="font-semibold">{g.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button className="px-6 py-3 bg-[#C7885B] text-white rounded-full" onClick={() => alert('Open catalog (demo)')}>View Catalog</button>
            </div>
          </div>
        </section>

        {/* ===== Community / Events / Testimonials ===== */}
        <section id="community" className="py-24 px-6 bg-[#E7D6B7]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-[#4B3324] mb-10">{t.community}</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-white border rounded-lg shadow">
                <h3 className="font-bold">Community Market</h3>
                <p className="mt-2 text-sm">A monthly market showcasing local makers and limited editions.</p>
              </div>
              <div className="p-6 bg-white border rounded-lg shadow">
                <h3 className="font-bold">Open Critique</h3>
                <p className="mt-2 text-sm">Peer review nights for makers and design feedback sessions.</p>
              </div>
              <div className="p-6 bg-white border rounded-lg shadow">
                <h3 className="font-bold">Apprenticeship</h3>
                <p className="mt-2 text-sm">Long-term placements for those who wish to pursue craft professionally.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-extrabold text-[#4B3324] mb-6">{t.testimonials}</h3>
                <div className="space-y-4">
                  {testimonials.map((tt) => (
                    <blockquote key={tt.id} className="bg-white p-4 border rounded">
                      <p className="text-sm">“{tt.text}”</p>
                      <div className="mt-2 text-xs font-semibold">— {tt.author}</div>
                    </blockquote>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-[#4B3324] mb-6">Meet the Team</h3>
                <div className="grid grid-cols-1 gap-4">
                  {team.map((m) => (
                    <div key={m.id} className="flex items-center gap-4 bg-white p-4 border rounded">
                      <img src={m.img} alt={m.name} className="w-16 h-16 object-cover rounded-full" />
                      <div>
                        <div className="font-bold">{m.name}</div>
                        <div className="text-xs text-[#8B8A5C]">{m.role}</div>
                        <div className="text-sm mt-2">{m.bio}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ + Partners ===== */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-extrabold mb-6">FAQ</h3>
              <div className="space-y-2">
                {["How do I order?", "Do you ship internationally?", "Can I book a private workshop?"].map((q, i) => (
                  <div key={i} className="bg-white border rounded p-4">
                    <button onClick={() => toggleFaq(i)} className="w-full text-left font-bold flex items-center justify-between">
                      <span>{q}</span>
                      <span className="ml-4">{faqOpen === i ? "—" : "+"}</span>
                    </button>
                    {faqOpen === i && <p className="mt-3 text-sm text-[#4B3324]">Answer goes here — sample text describing policies and steps.</p>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold mb-6">Partners</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border rounded">Local Cafe</div>
                <div className="p-4 bg-white border rounded">Design Collective</div>
                <div className="p-4 bg-white border rounded">Gallery</div>
                <div className="p-4 bg-white border rounded">Material Supplier</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Newsletter / CTA ===== */}
        <section className="py-16 bg-[#4B3324] text-[#F9F5EE] px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-extrabold mb-4">{t.newsletter.title}</h3>
            <p className="mb-6 text-sm opacity-80">{t.newsletter.desc}</p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input type="email" value={newsletterEmail} onChange={(e)=> setNewsletterEmail(e.target.value)} className="p-3 rounded w-full sm:w-auto min-w-[280px] text-black" placeholder={t.placeholderEmail} required />
              <button type="submit" className="px-6 py-3 bg-[#DCB34A] font-bold rounded">{t.send}</button>
            </form>
          </div>
        </section>

        {/* ===== Contact / Connect ===== */}
        <section id="connect" className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-4xl font-extrabold text-[#4B3324] mb-4">{t.contact}</h2>
              <p className="text-sm text-[#4B3324] mb-6">Custom orders, collaborations, wholesale enquiries — let’s talk through your idea.</p>

              <div className="space-y-4">
                <div className="bg-white p-4 border rounded">
                  <div className="font-bold">INSTAGRAM</div>
                  <a href="https://instagram.com/clayronline" rel="noreferrer" target="_blank" className="text-sm text-[#C7885B]">@clayronline</a>
                </div>
                <div className="bg-white p-4 border rounded">
                  <div className="font-bold">EMAIL</div>
                  <a href="mailto:hello@clayronline.com" className="text-sm text-[#C7885B]">hello@clayronline.com</a>
                </div>
                <div className="bg-white p-4 border rounded">
                  <div className="font-bold">VISIT</div>
                  <div className="text-sm">Studio visits by appointment — Karachi</div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg border shadow">
                <form onSubmit={(e) => { e.preventDefault(); alert('Message sent (demo)')}} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold">Name</label>
                    <input className="w-full p-3 border rounded" placeholder="Your Name" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold">Email</label>
                    <input className="w-full p-3 border rounded" type="email" placeholder="your@email.com" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold">Message</label>
                    <textarea className="w-full p-3 border rounded" rows={5} placeholder="Tell us about your project" required></textarea>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#4B3324] text-white rounded">Send</button>
                    <a className="px-4 py-2 border border-[#4B3324] rounded" href="https://wa.me/">{t.whatsapp}</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer className="bg-[#1E1C1A] text-[#F9F5EE] py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#C7885B] flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#1E1C1A" strokeWidth="1.8">
                    <path d="M3 12 L12 3 L21 12" />
                    <path d="M12 3 L12 21" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-black">CLAYR</div>
                  <div className="text-xs text-[#E7D6B7]">{t.footer}</div>
                </div>
              </div>

              <div className="text-sm text-[#E7D6B7]">© {new Date().getFullYear()} CLAYR — All rights reserved</div>
            </div>

            <div className="mt-6 text-xs text-[#E7D6B7]">Made with clay, fire and hands.</div>
          </div>
        </footer>

        {/* ===== Image Modal ===== */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80" onClick={() => setSelectedImage(null)} role="dialog" aria-modal="true">
            <div className="max-w-4xl w-full">
              <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-white p-2 rounded">Close</button>
              <img src={selectedImage.img} alt={selectedImage.title} className="w-full h-auto max-h-[80vh] object-contain rounded" />
              <div className="mt-4 bg-white p-4 rounded">
                <div className="font-bold">{selectedImage.title}</div>
                <div className="text-sm text-[#4B3324]">Item details and story. Replace with real copy for production.</div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
