// src/components/ui/Button.jsx
import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  asLink = false,
  to = "#",
  onClick,
  type = "button",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-barlow-condensed font-bold transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-amber text-deep-navy hover:bg-opacity-90 focus:ring-amber",
    secondary:
      "bg-steel-blue text-white hover:bg-opacity-90 focus:ring-steel-blue",
    outline:
      "border-2 border-steel-blue text-steel-blue hover:bg-steel-blue hover:text-white focus:ring-steel-blue",
    ghost: "text-steel-blue hover:bg-off-white focus:ring-steel-blue",
    gold: "bg-amber text-deep-navy hover:bg-opacity-90 focus:ring-amber",
    dark: "bg-deep-navy text-white hover:bg-opacity-90 focus:ring-deep-navy",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  if (asLink) {
    return (
      <Link
        to={to}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
