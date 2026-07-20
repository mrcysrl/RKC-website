// src/pages/About.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Leaf, Users } from "lucide-react";
import { PageHero } from "../components/Layout";
import { ABOUT_DATA } from "../data";

// ─── Component ──────────────────────────────────────────────────

export default function About() {
  const { timeline, values, team, mission, vision } = ABOUT_DATA;

  // Map icon strings to actual Lucide components
  const getIcon = (iconName) => {
    const icons = { Shield, Zap, Leaf, Users };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent size={22} /> : null;
  };

  return (
    <>
      <PageHero
        title="About RKC Industrial Supply"
        subtitle="A decade of excellence in industrial automation and renewable energy — built on integrity, expertise, and genuine partnership."
      />

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase font-barlow text-amber mb-2">
                Who We Are
              </p>
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-bold text-deep-navy mb-6 leading-tight">
                Built for Philippine Industry
              </h2>
              <p className="text-base leading-relaxed font-barlow text-slate-gray mb-5">
                RKC Industrial Supply was founded in 2024 with a single purpose:
                to give Philippine manufacturers, engineers, and facility
                managers access to world-class automation and energy products —
                without the long lead times and markups of traditional import
                channels.
              </p>
              <p className="text-base leading-relaxed font-barlow text-slate-gray mb-8">
                Today we serve over 1,200 clients across manufacturing, food
                processing, real estate, utilities, and agriculture — providing
                everything from a single replacement contactor to full solar EPC
                projects exceeding 1 MWp.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-barlow-condensed font-bold text-sm bg-steel-blue text-white hover:bg-amber hover:text-deep-navy transition-colors"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="p-8 rounded-xl bg-steel-blue text-white">
                <p className="text-xs font-bold tracking-widest uppercase font-barlow text-amber mb-3">
                  Our Mission
                </p>
                <p className="text-base leading-relaxed font-barlow font-medium text-white/90">
                  To empower Philippine industry with reliable automation and
                  renewable energy solutions — delivered with speed, expertise,
                  and integrity.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-amber text-deep-navy">
                <p className="text-xs font-bold tracking-widest uppercase font-barlow text-steel-blue/70 mb-3">
                  Our Vision
                </p>
                <p className="text-base leading-relaxed font-barlow font-medium">
                  To be the most trusted industrial supply partner in the
                  Philippines, helping businesses compete globally through
                  smarter, greener operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase font-barlow text-amber mb-2">
              What Drives Us
            </p>
            <h2 className="font-barlow-condensed text-3xl md:text-4xl font-bold text-deep-navy">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-xl text-center bg-off-white border border-steel-blue/10 hover:bg-[#EDF4FF] hover:border-steel-blue/25 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-steel-blue text-amber">
                  {getIcon(v.icon)}
                </div>
                <h3 className="font-barlow-condensed text-xl font-bold text-deep-navy mb-2">
                  {v.title}
                </h3>
                <p className="text-sm font-barlow text-slate-gray leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase font-barlow text-amber mb-2">
              Our Journey
            </p>
            <h2 className="font-barlow-condensed text-3xl md:text-4xl font-bold text-deep-navy">
              Company History
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-steel-blue/15 -translate-x-1/2" />
            {timeline.map((t, i) => (
              <div
                key={t.year}
                className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                <div
                  className={`flex-1 ${i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:pl-10"} pl-20 sm:pl-0`}
                >
                  <div className="p-5 rounded-xl bg-white border border-steel-blue/10 shadow-sm inline-block w-full sm:w-auto text-left">
                    <p className="text-xs font-bold tracking-widest uppercase font-barlow text-amber mb-1">
                      {t.year}
                    </p>
                    <h3 className="font-barlow-condensed text-lg font-bold text-deep-navy mb-1">
                      {t.title}
                    </h3>
                    <p className="text-sm font-barlow text-slate-gray leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute left-8 sm:left-1/2 w-4 h-4 rounded-full border-2 bg-amber border-steel-blue -translate-x-1/2 top-5 z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase font-barlow text-amber mb-2">
              The People Behind RKC
            </p>
            <h2 className="font-barlow-condensed text-3xl md:text-4xl font-bold text-deep-navy">
              Our Leadership Team
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="text-center group">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-steel-blue to-primary-blue flex items-center justify-center text-amber text-2xl font-barlow-condensed font-bold border-3 border-steel-blue/15 group-hover:scale-105 transition-transform">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-barlow-condensed text-lg font-bold text-deep-navy">
                  {m.name}
                </h3>
                <p className="text-sm font-barlow text-primary-blue">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ── CTA ── */}
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

  <div className="relative max-w-3xl mx-auto px-4 text-center">
    <p className="text-xs font-bold tracking-widest uppercase mb-2 font-barlow text-amber">
      Get Started
    </p>
    <h2 className="text-white font-barlow-condensed text-3xl md:text-4xl font-bold mb-4">
      Ready to Work with <span className="text-amber">RKC</span>?
    </h2>
    <p className="text-white/60 font-barlow text-base mb-8">
      Talk to our team about your automation or energy project today.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        to="/rfq"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-barlow-condensed font-bold text-sm bg-amber text-deep-navy hover:bg-opacity-90 transition"
      >
        Request a Quote <ArrowRight size={16} />
      </Link>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-barlow-condensed font-bold text-sm border border-white/35 text-white/90 hover:border-white/70 hover:text-white transition"
      >
        Contact Us
      </Link>
    </div>
  </div>
</section>
    </>
  );
}
