// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Phone, Mail, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-deep-navy to-steel-blue text-white/80">
      {/* Subtle diagonal pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
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

      {/* Large blurry glow in corner */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl pointer-events-none" />

      {/* Gold stripe at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-amber" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand + Contact */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight font-barlow-condensed text-white">
                RKC<span className="text-amber"> Industrial</span>
              </span>
            </Link>
            <p className="text-sm font-barlow text-white/60 leading-relaxed max-w-xs">
              Your trusted partner for industrial automation and renewable energy solutions across the Philippines.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-sm font-barlow text-white/60 hover:text-white/90 transition-colors">
                <Phone size={16} className="text-amber flex-shrink-0" />
                <span>+63 2 8888-1234</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-barlow text-white/60 hover:text-white/90 transition-colors">
                <Mail size={16} className="text-amber flex-shrink-0" />
                <span>sales@rkcindustrial.ph</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-barlow-condensed text-lg font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber rounded-full" />
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Products", to: "/products" },
                { label: "News & Updates", to: "/news" },
                { label: "Contact Us", to: "/contact" },
                { label: "Request for Quotation", to: "/rfq" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-barlow text-white/60 hover:text-amber transition-colors hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-barlow-condensed text-lg font-bold mb-4 relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber rounded-full" />
            </h3>
            <ul className="space-y-2.5">
              {[
                "Industrial Automation",
                "Renewable Energy",
                "Installation & Commissioning",
                "Pick-up & Delivery",
                "Electrical Supply",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm font-barlow text-white/60 hover:text-amber transition-colors hover:translate-x-1 inline-block duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Business Hours + Social */}
          <div>
            <h3 className="text-white font-barlow-condensed text-lg font-bold mb-4 relative inline-block">
              Business Hours
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber rounded-full" />
            </h3>
            <div className="space-y-2 text-sm font-barlow">
              <div className="flex justify-between">
                <span className="text-white/60">Mon – Fri</span>
                <span className="text-white/80">8:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Saturday</span>
                <span className="text-white/80">8:00 AM – 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Sunday</span>
                <span className="text-white/40">Closed</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6">
              <h4 className="text-xs font-bold tracking-widest uppercase font-barlow text-white/40 mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 bg-white/5 border border-white/10 text-white/60 hover:bg-amber hover:text-deep-navy hover:border-amber hover:scale-110 hover:shadow-lg hover:shadow-amber/20"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 pb-4">
          <p className="text-xs font-barlow text-white/40">
            &copy; {currentYear} RKC Industrial Supply. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-barlow text-white/40">
            <Link to="#" className="hover:text-amber transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-amber transition-colors">
              Terms of Use
            </Link>
            <Link to="#" className="hover:text-amber transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;