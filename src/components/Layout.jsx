// src/components/Layout.jsx
import React from 'react';

export const PageHero = ({ title, subtitle, imgUrl }) => {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0F1A2E" }}>
      {imgUrl && (
        <div className="absolute inset-0 opacity-30">
          <img src={imgUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h1 
          className="text-white leading-tight mb-4 font-barlow-condensed"
          style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg max-w-2xl mx-auto font-barlow" 
             style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <StripeBar />
    </section>
  );
};