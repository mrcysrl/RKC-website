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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h1 
          className="text-white leading-tight mb-3 font-barlow-condensed"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm md:text-base max-w-2xl mx-auto font-barlow" 
             style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};