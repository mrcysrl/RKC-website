// src/pages/Home.jsx
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Sun,
  Package,
  Truck,
  Settings,
  Star,
  Users,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { PRODUCTS, NEWS } from "../data";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";

// ❌ REMOVED serviceBadges array (no longer needed)

const services = [
  { icon: <Settings size={18} />, label: "Industrial Automation" },
  { icon: <Sun size={18} />, label: "Renewable Energy" },
  { icon: <Package size={18} />, label: "Installation Services" },
  { icon: <Truck size={18} />, label: "Pick-up & Delivery" },
  { icon: <Zap size={18} />, label: "Electrical Supply" },
];

const servicesList = [
  {
    icon: <Settings size={20} />,
    title: "Industrial Automation",
    desc: "Complete PLC programming, VFD installation, motor control, SCADA systems, and panel fabrication.",
  },
  {
    icon: <Sun size={20} />,
    title: "Renewable Energy",
    desc: "On-grid and off-grid solar PV systems, battery storage, and energy monitoring solutions.",
  },
  {
    icon: <Package size={20} />,
    title: "Installation & Commissioning",
    desc: "Expert site surveys, professional installation, testing, and after-sales support by certified engineers.",
  },
  {
    icon: <Truck size={20} />,
    title: "Pick-up & Delivery",
    desc: "Nationwide logistics for industrial components — from Metro Manila to provincial job sites.",
  },
];

const stats = [
  { icon: <Star size={22} />, value: "500+", label: "Products in Stock" },
  { icon: <Users size={22} />, value: "1,200+", label: "Clients Served" },
  { icon: <Globe size={22} />, value: "18+", label: "Brand Partners" },
  { icon: <Award size={22} />, value: "10+", label: "Years in Industry" },
];

export default function Home() {
  const featured = PRODUCTS.slice(0, 3);
  const latestNews = NEWS.slice(0, 3);

  if (!PRODUCTS || PRODUCTS.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-steel-blue font-barlow-condensed">
            Loading...
          </h1>
          <p className="text-slate-gray font-barlow">
            Please check your data file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1628]">
          <img
            src="https://images.unsplash.com/photo-1720036236697-018370867320?w=1920&h=1080&fit=crop&auto=format"
            alt="Industrial automation facility"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg,rgba(245,168,0,0.06) 0%,transparent 50%,rgba(26,61,110,0.12) 100%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-36 lg:-mt-28">
          {/* Pill Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-semibold tracking-widest uppercase font-barlow"
            style={{
              fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
              background: "rgba(245,168,0,0.15)",
              border: "1px solid rgba(245,168,0,0.35)",
              color: "#F5A800",
            }}
          >
            <Zap size={11} /> Industrial Automation & Renewable Energy
          </div>

          {/* Hero Headline */}
          <h1
            className="text-white mb-5 font-barlow-condensed"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
          >
            Powering <span style={{ color: "#F5A800" }}>Industry</span>
            <br />
            Energizing <span style={{ color: "#F5A800" }}>Tomorrow</span>
          </h1>

          {/* Hero Paragraph */}
          <p
            className="mx-auto mb-10 max-w-2xl font-barlow"
            style={{
              fontSize: "clamp(0.9rem, 2.2vw, 1.25rem)",
              color: "rgba(255,255,255,0.68)",
              fontWeight: 400,
            }}
          >
            Your trusted partner for industrial automation components and
            renewable energy solutions — delivering quality products, expert
            installation, and reliable support across the Philippines.
          </p>

          {/* Buttons */}
          <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 mb-12">
            <Link
              to="/products"
              className="flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-3.5 rounded font-bold tracking-wide transition-all duration-150 font-barlow-condensed text-xs sm:text-sm md:text-base whitespace-nowrap"
              style={{
                letterSpacing: "0.05em",
                background: "#F5A800",
                color: "#0F1A2E",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e69900";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F5A800";
              }}
            >
              Browse Products <ArrowRight size={16} />
            </Link>
            <Link
              to="/rfq"
              className="flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-3.5 rounded font-bold tracking-wide transition-all duration-150 font-barlow-condensed text-xs sm:text-sm md:text-base whitespace-nowrap"
              style={{
                letterSpacing: "0.05em",
                border: "1.5px solid rgba(255,255,255,0.4)",
                color: "rgba(255,255,255,0.9)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#F5A800";
                e.currentTarget.style.color = "#F5A800";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Strip – Responsive ── */}
      <section className="relative py-8 md:py-12 overflow-hidden bg-gradient-to-br from-deep-navy to-steel-blue">
        {/* Subtle diagonal pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
        45deg,
        rgba(255,255,255,0.05) 0px,
        rgba(255,255,255,0.05) 2px,
        transparent 2px,
        transparent 8px
      )`,
          }}
        />
        {/* Accent stripe at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-xs font-bold tracking-widest uppercase font-barlow text-amber">
              Explore Our Services
            </p>
          </div>

          {/* Horizontal Scroll (smaller screens) */}
          <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {services.map((s, i) => (
                <Link
                  to="/services"
                  key={s.label}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber/50 hover:scale-105 hover:shadow-lg min-w-[140px]"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-amber group-hover:text-deep-navy"
                    style={{
                      background: i === 0 ? "#F5A800" : "rgba(255,255,255,0.1)",
                      color: i === 0 ? "#0F1A2E" : "#F5A800",
                    }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xs font-semibold font-barlow text-center text-white/90 group-hover:text-amber transition-colors">
                    {s.label}
                  </span>
                  <span className="text-amber opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-1">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Centered Grid (lg and above) */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <Link
                to="/services"
                key={s.label}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber/50 hover:scale-105 hover:shadow-lg"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-amber group-hover:text-deep-navy"
                  style={{
                    background: i === 0 ? "#F5A800" : "rgba(255,255,255,0.1)",
                    color: i === 0 ? "#0F1A2E" : "#F5A800",
                  }}
                >
                  {s.icon}
                </div>
                <span className="text-sm font-semibold font-barlow text-center text-white/90 group-hover:text-amber transition-colors">
                  {s.label}
                </span>
                <span className="text-amber opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          {/* Scroll Hint (only visible below lg) */}
          <div className="text-center mt-2 lg:hidden">
            <span className="text-[10px] text-white/40 font-barlow animate-pulse tracking-widest">
              ← SWIPE TO EXPLORE →
            </span>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-widest uppercase font-barlow text-amber">
                Our Catalog
              </p>
              <h2
                className="font-barlow-condensed"
                style={{
                  fontSize: "clamp(1.9rem,4vw,2.8rem)",
                  fontWeight: 800,
                  color: "#0F1A2E",
                  letterSpacing: "-0.02em",
                }}
              >
                Featured Products
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1.5 text-sm sm:text-base font-semibold font-barlow text-steel-blue hover:text-amber transition-colors"
            >
              View All Products <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services + News ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 font-barlow text-amber">
                What We Do
              </p>
              <h2
                className="mb-8 font-barlow-condensed"
                style={{
                  fontSize: "clamp(1.9rem,3.5vw,2.5rem)",
                  fontWeight: 800,
                  color: "#0F1A2E",
                  letterSpacing: "-0.02em",
                }}
              >
                Our Services
              </h2>
              <div className="flex flex-col gap-4">
                {servicesList.map((s) => (
                  <Link
                    to="/services"
                    key={s.title}
                    className="flex gap-4 p-5 rounded-xl transition-all duration-150 no-underline border border-steel-blue/10 bg-off-white hover:bg-[#EDF4FF] hover:border-steel-blue/25"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-steel-blue text-amber">
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="font-bold font-barlow-condensed text-lg sm:text-xl text-deep-navy">
                        {s.title}
                      </h3>
                      <p className="text-sm sm:text-base font-barlow text-slate-gray leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 font-barlow text-amber">
                Stay Informed
              </p>
              <h2
                className="mb-8 font-barlow-condensed"
                style={{
                  fontSize: "clamp(1.9rem,3.5vw,2.5rem)",
                  fontWeight: 800,
                  color: "#0F1A2E",
                  letterSpacing: "-0.02em",
                }}
              >
                Latest News
              </h2>
              <div className="flex flex-col border-t border-steel-blue/10">
                {latestNews.map((article) => (
                  <Link
                    to={`/news/${article.id}`}
                    key={article.id}
                    className="py-5 group no-underline block border-b border-steel-blue/10"
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded font-barlow bg-[#EDF0F6] text-steel-blue">
                        {article.category}
                      </span>
                      <span className="text-xs font-barlow text-slate-gray">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-bold font-barlow-condensed text-lg sm:text-xl text-deep-navy mb-1.5 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm sm:text-base font-barlow text-slate-gray leading-relaxed">
                      {article.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
              <Link
                to="/news"
                className="mt-4 inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold font-barlow text-primary-blue hover:text-steel-blue transition-colors"
              >
                View All News <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose RKC ── */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-deep-navy to-steel-blue">
        {/* Subtle diagonal pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
        45deg,
        rgba(255,255,255,0.05) 0px,
        rgba(255,255,255,0.05) 2px,
        transparent 2px,
        transparent 8px
      )`,
          }}
        />

        {/* Large blurry glow in the corner */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl pointer-events-none" />

        {/* Accent stripe at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber" />

        {/* Accent stripe at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 font-barlow text-amber">
              Our Track Record
            </p>
            <h2
              className="text-white font-barlow-condensed"
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Why Choose <span className="text-amber">RKC</span>?
            </h2>
            <div className="w-16 h-1 bg-amber/50 mx-auto mt-4 rounded-full" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group text-center p-6 md:p-8 rounded-2xl transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber/30 hover:scale-105 hover:shadow-2xl hover:shadow-amber/10"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 bg-gradient-to-br from-amber to-yellow-400 text-deep-navy shadow-lg shadow-amber/30 group-hover:shadow-amber/50 group-hover:scale-110">
                  {s.icon}
                </div>

                {/* Value */}
                <div className="text-white font-black font-barlow-condensed text-3xl md:text-5xl leading-none mb-1 tracking-tight">
                  {s.value}
                </div>

                {/* Label */}
                <div className="text-sm md:text-base font-barlow text-white/70 group-hover:text-white/90 transition-colors">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              "Authorized distributor for leading global brands",
              "Certified engineers for installation & commissioning",
              "Fast nationwide delivery with reliable logistics",
            ].map((pt) => (
              <div
                key={pt}
                className="group flex items-start gap-4 px-5 py-4 rounded-xl transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber/30 hover:shadow-xl hover:shadow-amber/5"
              >
                <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 bg-amber text-deep-navy shadow-lg shadow-amber/20 group-hover:shadow-amber/40 group-hover:scale-110">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1.5"
                      stroke="#0F1A2E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-barlow text-white/80 group-hover:text-white transition-colors">
                  {pt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RFQ Mini-Form ── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden bg-white border border-steel-blue/10 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 p-10 flex flex-col justify-center bg-steel-blue">
                <p className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 font-barlow text-amber">
                  Quick Inquiry
                </p>
                <h2 className="text-white mb-4 font-barlow-condensed text-2xl sm:text-3xl font-bold">
                  Request for Quotation
                </h2>
                <p className="text-sm sm:text-base font-barlow text-white/60 mb-8">
                  Tell us what you need and our team will respond within 24
                  hours.
                </p>
                {[
                  { icon: <Phone size={14} />, text: "+63 2 8888-1234" },
                  { icon: <Mail size={14} />, text: "sales@rkcindustrial.ph" },
                  {
                    icon: <MapPin size={14} />,
                    text: "Quezon City, Metro Manila",
                  },
                ].map((c) => (
                  <div
                    key={c.text}
                    className="flex items-center gap-3 mb-3 font-barlow text-sm sm:text-base text-white/75"
                  >
                    <span className="text-amber">{c.icon}</span>
                    {c.text}
                  </div>
                ))}
              </div>
              <div className="lg:col-span-3 p-8 lg:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { label: "Full Name", placeholder: "Juan dela Cruz" },
                    { label: "Email Address", placeholder: "juan@company.com" },
                    { label: "Phone Number", placeholder: "+63 9XX XXX XXXX" },
                    {
                      label: "Product / Service",
                      placeholder: "e.g. VFD Drive 7.5kW",
                    },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs sm:text-sm font-semibold mb-1.5 font-barlow text-deep-navy">
                        {f.label}
                      </label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm sm:text-base outline-none font-barlow bg-off-white border border-steel-blue/15 text-deep-navy focus:border-primary-blue transition"
                      />
                    </div>
                  ))}
                </div>
                <textarea
                  rows={3}
                  placeholder="Quantity, specs, delivery location..."
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm sm:text-base outline-none resize-none mb-5 font-barlow bg-off-white border border-steel-blue/15 text-deep-navy focus:border-primary-blue transition"
                />
                <button className="w-full py-3.5 rounded-lg font-bold font-barlow-condensed text-lg tracking-wide bg-amber text-deep-navy hover:bg-opacity-90 transition">
                  Submit Request for Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
