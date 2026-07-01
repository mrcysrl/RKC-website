import React from "react";

const PageHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`bg-steel-blue text-white py-16 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-off-white max-w-2xl mx-auto opacity-90">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
