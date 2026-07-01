// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-steel-blue text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight font-barlow-condensed">
              RKC<span className="text-amber"> Industrial</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-amber transition-colors font-barlow text-sm font-semibold">Home</Link>
            <Link to="/products" className="hover:text-amber transition-colors font-barlow text-sm font-semibold">Products</Link>
            <Link to="/services" className="hover:text-amber transition-colors font-barlow text-sm font-semibold">Services</Link>
            <Link to="/news" className="hover:text-amber transition-colors font-barlow text-sm font-semibold">News</Link>
            <Link to="/about" className="hover:text-amber transition-colors font-barlow text-sm font-semibold">About</Link>
            <Link to="/contact" className="hover:text-amber transition-colors font-barlow text-sm font-semibold">Contact</Link>
            <span className="text-sm text-off-white border-l border-slate-gray pl-6 font-barlow">
              📞 +63 2 8888-1234
            </span>
            <Link to="/rfq" className="bg-amber text-deep-navy font-semibold px-5 py-2 rounded-md hover:bg-opacity-90 transition shadow-md hover:shadow-lg font-barlow text-sm">
              Request Quote
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;