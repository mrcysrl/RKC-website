// src/pages/Services.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Settings,
  Sun,
  Package,
  Truck,
  Zap,
  Battery,
  ClipboardCheck,
} from "lucide-react";
import { PageHero } from "../components/Layout";
import { SERVICES } from "../data";

// ─── Icon Mapping ───────────────────────────────────────────────

const ICON_MAP = {
  Settings: Settings,
  Sun: Sun,
  Package: Package,
  Truck: Truck,
  Zap: Zap,
  Battery: Battery,
  ClipboardCheck: ClipboardCheck,
};

const getIcon = (iconName, size = 18) => {
  const Icon = ICON_MAP[iconName];
  return Icon ? <Icon size={size} /> : null;
};

// ─── Component ──────────────────────────────────────────────────

export default function Services() {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);
  const [isFading, setIsFading] = useState(false);
  const activeService = SERVICES.find((s) => s.id === activeTab);
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const handleTabChange = (id) => {
    if (id === activeTab) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(id);
      setIsFading(false);
    }, 150);
  };

  if (!activeService) return null;

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive automation, renewable energy, and industrial supply services — delivered by certified Philippine engineers."
      />

      <section className="py-0 bg-off-white">
        {/* ── Sticky Tab Navigation ── */}
        <div className="sticky top-16 z-40 bg-steel-blue shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex overflow-x-auto scrollbar-hide gap-0">
              {/* Sliding Indicator */}
              <div
                className="absolute bottom-0 h-0.5 bg-amber transition-all duration-300 ease-in-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />

              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  ref={(el) => (tabRefs.current[service.id] = el)}
                  onClick={() => handleTabChange(service.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ease-in-out font-barlow relative ${
                    activeTab === service.id
                      ? "text-amber"
                      : "text-white/65 hover:text-white/90"
                  }`}
                >
                  <span
                    className={`transition-colors duration-300 ${activeTab === service.id ? "text-amber" : "text-white/50"}`}
                  >
                    {getIcon(service.icon)}
                  </span>
                  <span className="hidden sm:inline">{service.title}</span>
                  <span className="inline sm:hidden">
                    {service.title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Content with Fade ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className={`transition-opacity duration-300 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Text Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest font-barlow bg-amber/15 border border-amber/30 text-amber">
                  {getIcon(activeService.icon, 13)} {activeService.title}
                </div>
                <h2 className="font-barlow-condensed text-3xl md:text-4xl font-bold text-deep-navy mb-5 leading-tight">
                  {activeService.hero}
                </h2>
                <p className="text-base font-barlow text-slate-gray leading-relaxed mb-8">
                  {activeService.tagline}
                </p>
                <Link
                  to="/rfq"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-barlow-condensed font-bold text-sm bg-amber text-deep-navy hover:bg-opacity-90 transition-colors duration-200"
                >
                  {activeService.cta} <ArrowRight size={16} />
                </Link>
              </div>

              {/* Right: Image */}
              <div className="rounded-2xl overflow-hidden aspect-video bg-[#EDF0F6] border border-steel-blue/10">
                <img
                  src={activeService.img}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ── Features & Industries ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Features */}
              <div className="lg:col-span-2 rounded-2xl p-8 bg-white border border-steel-blue/10">
                <h3 className="font-barlow-condensed text-xl font-bold text-deep-navy mb-6">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeService.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="flex-shrink-0 mt-0.5 text-primary-blue"
                      />
                      <p className="text-sm font-barlow text-deep-navy leading-snug">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industries + CTA */}
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl p-6 bg-steel-blue">
                  <h3 className="font-barlow-condensed text-lg font-bold text-white mb-4">
                    Industries Served
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeService.industries.map((industry) => (
                      <span
                        key={industry}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold font-barlow bg-white/10 text-white/85 border border-white/15"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-6 bg-amber">
                  <h3 className="font-barlow-condensed text-lg font-bold text-deep-navy mb-2">
                    Free Consultation
                  </h3>
                  <p className="text-sm font-barlow text-deep-navy/75 mb-5">
                    Not sure what you need? Our engineers will assess your
                    requirements at no cost.
                  </p>
                  <Link
                    to="/contact"
                    className="block text-center px-5 py-2.5 rounded-lg font-barlow-condensed font-bold text-sm bg-deep-navy text-white hover:bg-opacity-90 transition-colors duration-200"
                  >
                    Book Free Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
