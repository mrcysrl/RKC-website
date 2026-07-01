import React from "react";

const SectionContainer = ({ children, className = "", bg = "white" }) => {
  const bgClasses = {
    white: "bg-white",
    offWhite: "bg-off-white",
    navy: "bg-deep-navy text-white",
    steel: "bg-steel-blue text-white",
  };

  return (
    <section
      className={`py-12 md:py-16 ${bgClasses[bg] || bgClasses.white} ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};

export default SectionContainer;
