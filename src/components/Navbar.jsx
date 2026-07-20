// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on route change (navigation)
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (isMenuOpen && event.key === "Escape") {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ─── Check if link is active ──────────────────────────────────
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // ─── Navigation Links ──────────────────────────────────────────
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/products", label: "Products" },
    { to: "/news", label: "News" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-deep-navy text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-20 relative">
          
          {/* Left: Logo / Company Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight font-barlow-condensed">
                RKC<span className="text-amber"> Industrial</span>
              </span>
            </Link>
          </div>

          {/* Center: Navigation Pages - Absolutely Centered (Desktop) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors font-barlow text-xs md:text-sm lg:text-base xl:text-base font-semibold whitespace-nowrap ${
                  isActive(link.to)
                    ? "text-amber"
                    : "text-white hover:text-amber"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Phone Number + RFQ Button (Desktop) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 ml-auto flex-shrink-0">
            <span className="hidden xl:inline text-sm xl:text-base text-off-white font-barlow whitespace-nowrap">
              📞 +63 2 8888-1234
            </span>
            <Link
              to="/rfq"
              className="bg-amber text-deep-navy font-semibold px-3 md:px-4 lg:px-5 xl:px-6 py-1.5 md:py-2 rounded-md hover:bg-opacity-90 transition shadow-md hover:shadow-lg font-barlow text-xs md:text-sm lg:text-base whitespace-nowrap"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Hamburger Button – with Smooth Icon Transition */}
          <div className="md:hidden ml-auto">
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="text-white focus:outline-none p-2 hover:text-amber transition-colors relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                    isMenuOpen
                      ? "opacity-0 scale-75 rotate-90"
                      : "opacity-100 scale-100 rotate-0"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                    isMenuOpen
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-75 rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu (Dropdown) ── */}
        <div
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 pt-2 border-t border-white/10 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={`px-3 py-2.5 rounded-lg transition-colors font-barlow text-sm font-semibold ${
                  isActive(link.to)
                    ? "bg-white/10 text-amber"
                    : "hover:bg-white/10 text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="my-2 h-px bg-white/10" />

            {/* Phone Number (Mobile) */}
            <div className="px-3 py-2 font-barlow text-sm text-off-white">
              📞 +63 2 8888-1234
            </div>

            {/* RFQ Button (Mobile) */}
            <Link
              to="/rfq"
              onClick={closeMenu}
              className="mx-3 mt-1 bg-amber text-deep-navy font-semibold px-5 py-2.5 rounded-md hover:bg-opacity-90 transition text-center font-barlow text-sm"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;