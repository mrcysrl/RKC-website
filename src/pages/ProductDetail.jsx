// src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Phone, Package, CheckCircle } from "lucide-react";
import { fetchProducts } from "../services/api";
import { PageHero } from "../components/Layout";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", qty: "1", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        const found = allProducts.find((p) => p.id === id);

        if (!found) {
          setError("Product not found");
          return;
        }

        setProduct(found);

        // Get related products (same category, different product)
        const relatedProducts = allProducts
          .filter((p) => p.category === found.category && p.id !== found.id)
          .slice(0, 3);
        setRelated(relatedProducts);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", qty: "1", message: "" });
    }, 5000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center" style={{ background: "#F8F9FC" }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <>
        <PageHero title="Product Not Found" />
        <div className="min-h-[50vh] flex flex-col items-center justify-center" style={{ background: "#F8F9FC" }}>
          <p className="text-slate-gray font-barlow mb-4">{error || "Product does not exist."}</p>
          <Link to="/products" className="text-steel-blue font-barlow hover:text-amber transition">
            ← Back to Products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-20 pb-0" style={{ background: "#0F1A2E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-xs font-barlow">
            <Link
              to="/"
              className="transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#F5A800"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              Home
            </Link>
            <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
            <Link
              to="/products"
              className="transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#F5A800"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              Products
            </Link>
            <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
            <span style={{ color: "#F5A800" }}>{product.name}</span>
          </div>
        </div>
      </div>

      <section className="py-12" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold font-barlow text-steel-blue hover:text-amber transition mb-8"
          >
            <ArrowLeft size={16} /> Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <div>
              <div
                className="rounded-2xl overflow-hidden bg-[#EDF0F6] aspect-video"
                style={{ border: "1px solid rgba(26,61,110,0.1)" }}
              >
                <img
                  src={product.img || "https://via.placeholder.com/600x400"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.badge && (
                <div
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold font-barlow"
                  style={{
                    background: product.badgeColor || "#F5A800",
                    color: product.badgeColor === "#F5A800" ? "#0F1A2E" : "#ffffff",
                  }}
                >
                  {product.badge}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase font-barlow mb-2" style={{ color: "#2E6BB0" }}>
                {product.category}
              </p>
              <h1
                className="font-barlow-condensed text-3xl md:text-4xl font-bold text-deep-navy mb-2 leading-none"
              >
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-sm font-semibold font-barlow" style={{ color: "#6B7794" }}>
                  Brand: <strong style={{ color: "#1A3D6E" }}>{product.brand}</strong>
                </span>
                <span className="text-sm font-semibold font-barlow" style={{ color: "#6B7794" }}>
                  SKU: <strong style={{ color: "#1A3D6E" }}>{product.sku}</strong>
                </span>
                <span
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full font-barlow"
                  style={{ background: "rgba(26,61,110,0.08)", color: "#1A3D6E" }}
                >
                  <Package size={12} /> {product.stock}
                </span>
              </div>

              <div className="text-3xl font-black font-barlow-condensed text-steel-blue mb-6">
                ₱{product.price.toLocaleString()}
                <span className="text-sm font-normal font-barlow ml-2" style={{ color: "#6B7794" }}>/ unit (VAT excl.)</span>
              </div>

              <p className="text-sm leading-relaxed font-barlow text-slate-gray mb-8">
                {product.description}
              </p>

              {/* Specs */}
              {product.specs && product.specs.length > 0 && (
                <div className="rounded-xl overflow-hidden mb-8" style={{ border: "1px solid rgba(26,61,110,0.1)" }}>
                  <div className="px-5 py-3 bg-steel-blue">
                    <p className="text-xs font-bold tracking-widest uppercase text-white font-barlow">
                      Technical Specifications
                    </p>
                  </div>
                  <div className="divide-y divide-steel-blue/10 bg-white">
                    {product.specs.map((s, i) => (
                      <div
                        key={i}
                        className={`flex items-center px-5 py-3 ${
                          i % 2 === 0 ? "bg-off-white" : "bg-white"
                        }`}
                      >
                        <span className="w-1/2 text-sm font-semibold font-barlow" style={{ color: "#6B7794" }}>
                          {s.label}
                        </span>
                        <span className="w-1/2 text-sm font-bold font-barlow" style={{ color: "#0F1A2E" }}>
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/rfq"
                  state={{ product: product.name }}
                  className="flex-1 text-center py-3.5 rounded-lg font-bold font-barlow-condensed text-base tracking-wide bg-amber text-deep-navy hover:bg-opacity-90 transition"
                >
                  Request Full Quote
                </Link>
                <a
                  href="tel:+6328888-1234"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg font-bold font-barlow-condensed text-base bg-steel-blue text-white hover:bg-opacity-90 transition"
                >
                  <Phone size={16} /> Call Us
                </a>
              </div>
            </div>
          </div>

          {/* Quick RFQ */}
          <div
            className="mb-16 rounded-2xl overflow-hidden bg-white border border-steel-blue/10 shadow-md"
          >
            <div className="px-6 py-4 bg-steel-blue border-b border-white/10">
              <p className="text-sm font-bold text-white font-barlow-condensed tracking-wide">
                QUICK INQUIRY — {product.name}
              </p>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="flex items-center gap-3 py-6">
                  <CheckCircle size={28} style={{ color: "#2E6BB0" }} />
                  <div>
                    <p className="font-bold font-barlow-condensed text-lg text-deep-navy">
                      Inquiry Submitted!
                    </p>
                    <p className="text-sm font-barlow text-slate-gray">
                      Our team will contact you within 24 hours with pricing and availability.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {[
                      { key: "name", label: "Name", placeholder: "Juan dela Cruz" },
                      { key: "email", label: "Email", placeholder: "juan@company.com" },
                      { key: "phone", label: "Phone", placeholder: "+63 9XX XXX XXXX" },
                      { key: "qty", label: "Quantity", placeholder: "1" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs font-semibold font-barlow text-deep-navy mb-1">
                          {f.label}
                        </label>
                        <input
                          type="text"
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none font-barlow bg-off-white border border-steel-blue/15 text-deep-navy focus:border-primary-blue transition"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <textarea
                      placeholder="Additional notes or specifications..."
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg text-sm outline-none resize-none font-barlow bg-off-white border border-steel-blue/15 text-deep-navy focus:border-primary-blue transition"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg font-bold text-sm font-barlow-condensed bg-amber text-deep-navy hover:bg-opacity-90 transition whitespace-nowrap"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <h2
                className="font-barlow-condensed text-2xl font-bold text-deep-navy mb-6 leading-none"
              >
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    className="group rounded-xl overflow-hidden transition-all duration-200 no-underline bg-white border border-steel-blue/10 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="h-36 bg-[#EDF0F6] overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest font-barlow text-primary-blue">
                        {p.category}
                      </p>
                      <h3 className="font-bold font-barlow-condensed text-lg text-deep-navy leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-sm font-black font-barlow-condensed text-steel-blue">
                        ₱{p.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}