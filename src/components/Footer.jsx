// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-deep-navy text-off-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-barlow">
          &copy; {new Date().getFullYear()} RKC Industrial Supply. All rights reserved.
        </p>
        <p className="text-xs text-slate-gray mt-2 font-barlow">
          Industrial Automation &amp; Renewable Energy Solutions
        </p>
      </div>
    </footer>
  );
};

export default Footer;