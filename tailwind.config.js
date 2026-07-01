/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // RKC Brand Colors
        "steel-blue": "#1A3D6E",
        amber: "#F5A800",
        "primary-blue": "#2E6BB0",
        "off-white": "#F8F9FC",
        white: "#FFFFFF",
        "deep-navy": "#0F1A2E",
        "slate-gray": "#6B7794",

        // shadcn Theme Variables
        background: "#ffffff",
        foreground: "oklch(0.145 0 0)",
        card: "#ffffff",
        "card-foreground": "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        "popover-foreground": "oklch(0.145 0 0)",
        primary: "#030213",
        "primary-foreground": "oklch(1 0 0)",
        secondary: "oklch(0.95 0.0058 264.53)",
        "secondary-foreground": "#030213",
        muted: "#ececf0",
        "muted-foreground": "#717182",
        accent: "#e9ebef",
        "accent-foreground": "#030213",
        destructive: "#d4183d",
        "destructive-foreground": "#ffffff",
        border: "rgba(0, 0, 0, 0.1)",
        input: "transparent",
        ring: "oklch(0.708 0 0)",
      },
      fontFamily: {
        // Match Figma design exactly
        barlow: ["Barlow", "sans-serif"],
        "barlow-condensed": ["Barlow Condensed", "sans-serif"],
        // Keep fallback
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.625rem",
        md: "calc(0.625rem - 2px)",
        sm: "calc(0.625rem - 4px)",
      },
    },
  },
  plugins: [],
};
