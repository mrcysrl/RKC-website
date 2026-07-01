// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Sun, Package, Truck, Settings, Star, Users, Award, Globe, Phone, Mail, MapPin } from "lucide-react";
import { PRODUCTS, NEWS } from "../data";
import { PageHero, StripeBar } from "../components/Layout";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";

const services = [
  { icon: <Settings size={15} />, label: "Industrial Automation" },
  { icon: <Sun size={15} />, label: "Renewable Energy" },
  { icon: <Package size={15} />, label: "Installation Services" },
  { icon: <Truck size={15} />, label: "Pick-up & Delivery" },
  { icon: <Zap size={15} />, label: "Electrical Supply" },
];

const servicesList = [
  { icon: <Settings size={20} />, title: "Industrial Automation", desc: "Complete PLC programming, VFD installation, motor control, SCADA systems, and panel fabrication." },
  { icon: <Sun size={20} />, title: "Renewable Energy", desc: "On-grid and off-grid solar PV systems, battery storage, and energy monitoring solutions." },
  { icon: <Package size={20} />, title: "Installation & Commissioning", desc: "Expert site surveys, professional installation, testing, and after-sales support by certified engineers." },
  { icon: <Truck size={20} />, title: "Pick-up & Delivery", desc: "Nationwide logistics for industrial components — from Metro Manila to provincial job sites." },
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

  // Safety check - if no data, show loading
  if (!PRODUCTS || PRODUCTS.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-steel-blue font-barlow-condensed">Loading...</h1>
          <p className="text-slate-gray font-barlow">Please check your data file.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-navy">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1720036236697-018370867320?w=1920&h=1080&fit=crop&auto=format"
            alt="Industrial automation"
            className="w-full h-full object-cover opacity-35"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0"><StripeBar count={50} /></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 pb-16">
          <div className="inline-block px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase font-barlow"
            style={{ background: "rgba(245,168,0,0.15)", border: "1px solid rgba(245,168,0,0.35)", color: "#F5A800" }}
          >
            <Zap size={11} className="inline mr-2" /> Industrial Automation & Renewable Energy
          </div>

          <h1 className="text-white mb-5 font-barlow-condensed"
            style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Powering <span className="text-amber">Industry</span>
            <br />Energizing <span className="text-amber">Tomorrow</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg font-barlow"
            style={{ color: "rgba(255,255,255,0.68)" }}
          >
            Your trusted partner for industrial automation components and renewable energy solutions — delivering quality products, expert installation, and reliable support across the Philippines.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="primary" size="lg" asLink to="/products">
              Browse Products <ArrowRight size={16} />
            </Button>
            <Button variant="outline" size="lg" asLink to="/rfq"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.9)", background: "transparent" }}
            >
              Request a Quote
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {services.slice(0, 4).map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium font-barlow"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.82)" }}
              >
                <span className="text-amber">{s.icon}</span>{s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="py-5 relative overflow-hidden bg-steel-blue">
        <div className="absolute inset-y-0 right-0 w-64 pointer-events-none overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute h-full w-3"
              style={{ left: `${i * 24}px`, background: "rgba(245,168,0,0.1)", transform: "skewX(-20deg)" }} />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {services.map((s, i) => (
              <Link to="/services" key={s.label}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-barlow text-sm font-semibold transition-all duration-150
                  ${i === 0 
                    ? 'bg-amber text-deep-navy border-2 border-amber' 
                    : 'text-white bg-white/10 border border-white/15 hover:bg-white/20'
                  }`}
              >
                <span className={i === 0 ? 'text-deep-navy' : 'text-amber'}>{s.icon}</span>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase font-barlow text-amber">Our Catalog</p>
              <h2 className="font-barlow-condensed" 
                  style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, color: "#0F1A2E", letterSpacing: "-0.02em" }}
              >
                Featured Products
              </h2>
            </div>
            <Link to="/products" className="flex items-center gap-1.5 text-sm font-semibold font-barlow text-steel-blue hover:text-amber transition-colors">
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

      {/* Services + News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-2 font-barlow text-amber">What We Do</p>
              <h2 className="mb-8 font-barlow-condensed"
                style={{ fontSize: "clamp(1.9rem,3.5vw,2.5rem)", fontWeight: 800, color: "#0F1A2E", letterSpacing: "-0.02em" }}>
                Our Services
              </h2>
              <div className="flex flex-col gap-4">
                {servicesList.map((s) => (
                  <Link to="/services" key={s.title}
                    className="flex gap-4 p-5 rounded-xl transition-all duration-150 no-underline border border-steel-blue/10 bg-off-white hover:bg-[#EDF4FF] hover:border-steel-blue/25"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-steel-blue text-amber">
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="font-bold font-barlow-condensed text-lg text-deep-navy">{s.title}</h3>
                      <p className="text-sm font-barlow text-slate-gray leading-relaxed">{s.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-2 font-barlow text-amber">Stay Informed</p>
              <h2 className="mb-8 font-barlow-condensed"
                style={{ fontSize: "clamp(1.9rem,3.5vw,2.5rem)", fontWeight: 800, color: "#0F1A2E", letterSpacing: "-0.02em" }}>
                Latest News
              </h2>
              <div className="flex flex-col border-t border-steel-blue/10">
                {latestNews.map((article) => (
                  <Link to={`/news/${article.id}`} key={article.id}
                    className="py-5 group no-underline block border-b border-steel-blue/10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded font-barlow bg-[#EDF0F6] text-steel-blue">{article.category}</span>
                      <span className="text-xs font-barlow text-slate-gray">{article.date}</span>
                    </div>
                    <h3 className="font-bold font-barlow-condensed text-lg text-deep-navy mb-1.5 leading-snug">{article.title}</h3>
                    <p className="text-sm font-barlow text-slate-gray leading-relaxed">{article.excerpt}</p>
                  </Link>
                ))}
              </div>
              <Link to="/news" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold font-barlow text-primary-blue hover:text-steel-blue transition-colors">
                View All News <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose RKC */}
      <section className="relative overflow-hidden py-16 bg-steel-blue">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 w-12"
              style={{ left: `${i * 80 - 20}px`, background: "rgba(245,168,0,0.04)", transform: "skewX(-25deg)" }} />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-2 font-barlow text-amber">Our Track Record</p>
            <h2 className="text-white font-barlow-condensed"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Why Choose RKC?
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-amber text-deep-navy">
                  {s.icon}
                </div>
                <div className="text-white font-black font-barlow-condensed text-3xl leading-none mb-1">
                  {s.value}
                </div>
                <div className="text-sm font-barlow text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              "Authorized distributor for leading global brands", 
              "Certified engineers for installation & commissioning", 
              "Fast nationwide delivery with reliable logistics"
            ].map((pt) => (
              <div key={pt} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-white/5">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-amber">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#0F1A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm font-barlow text-white/75">{pt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ Mini-Form */}
      <section className="py-20 bg-off-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden bg-white border border-steel-blue/10 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 p-10 flex flex-col justify-center relative overflow-hidden bg-steel-blue">
                <div className="absolute bottom-0 left-0 right-0 h-1"><StripeBar count={20} /></div>
                <p className="text-xs font-bold tracking-widest uppercase mb-3 font-barlow text-amber">Quick Inquiry</p>
                <h2 className="text-white mb-4 font-barlow-condensed text-3xl font-bold">Request for Quotation</h2>
                <p className="text-sm font-barlow text-white/60 mb-8">Tell us what you need and our team will respond within 24 hours.</p>
                {[
                  { icon: <Phone size={14} />, text: "+63 2 8888-1234" },
                  { icon: <Mail size={14} />, text: "sales@rkcindustrial.ph" },
                  { icon: <MapPin size={14} />, text: "Quezon City, Metro Manila" }
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-3 mb-3 font-barlow text-sm text-white/75">
                    <span className="text-amber">{c.icon}</span>{c.text}
                  </div>
                ))}
              </div>
              <div className="lg:col-span-3 p-8 lg:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { label: "Full Name", placeholder: "Juan dela Cruz" },
                    { label: "Email Address", placeholder: "juan@company.com" },
                    { label: "Phone Number", placeholder: "+63 9XX XXX XXXX" },
                    { label: "Product / Service", placeholder: "e.g. VFD Drive 7.5kW" }
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs font-semibold mb-1.5 font-barlow text-deep-navy">{f.label}</label>
                      <input type="text" placeholder={f.placeholder}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none font-barlow bg-off-white border border-steel-blue/15 text-deep-navy focus:border-primary-blue transition"
                      />
                    </div>
                  ))}
                </div>
                <textarea rows={3} placeholder="Quantity, specs, delivery location..."
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none resize-none mb-5 font-barlow bg-off-white border border-steel-blue/15 text-deep-navy focus:border-primary-blue transition"
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