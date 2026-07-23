// src/pages/RFQ.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Phone, Mail, MapPin, Clock, CheckCircle, Plus, Trash2, 
  Send, ArrowRight 
} from "lucide-react";
import { PageHero } from "../components/Layout";
import { RFQ_DATA, CONTACT } from "../data";

export default function RFQ() {
  // ─── State ──────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "",
    roofType: "",
    avgBill: "",
    interest: "",
    timeline: "",
    hearAbout: "",
    notes: "",
  });

  const [items, setItems] = useState([
    { id: Date.now(), product: "", brand: "", qty: "1", unit: "pcs" },
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ─── Handlers ──────────────────────────────────────────────────
  const addItem = () => {
    setItems([...items, { id: Date.now(), product: "", brand: "", qty: "1", unit: "pcs" }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // ─── Format items for email ──────────────────────────────────
    const itemSummary = items
      .filter(item => item.product || item.brand)
      .map(item => {
        const product = item.product || "Unspecified product";
        const brand = item.brand || "Unspecified brand";
        return `${product} (${brand}) x${item.qty} ${item.unit}`;
      })
      .join('; ') || "No items requested";

    // ─── Prepare form data for Formspree ────────────────────────
    const formData = {
      name: form.name || "Not provided",
      company: form.company || "Not provided",
      email: form.email || "Not provided",
      phone: form.phone || "Not provided",
      address: form.address || "Not provided",
      propertyType: form.propertyType || "Not selected",
      roofType: form.roofType || "Not selected",
      avgBill: form.avgBill || "Not selected",
      interest: form.interest || "Not selected",
      timeline: form.timeline || "Not selected",
      hearAbout: form.hearAbout || "Not selected",
      notes: form.notes || "None provided",
      items: itemSummary,
    };

    console.log('📤 Sending to Formspree:', formData);

    try {
      const response = await fetch(RFQ_DATA.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          address: "",
          propertyType: "",
          roofType: "",
          avgBill: "",
          interest: "",
          timeline: "",
          hearAbout: "",
          notes: "",
        });
        setItems([{ id: Date.now(), product: "", brand: "", qty: "1", unit: "pcs" }]);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to submit. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
  };

  const { contactInfo } = RFQ_DATA;
  const { phone, phoneAlt, email, emailSupport, address, hours } = CONTACT;

  // ─── Field Styles ──────────────────────────────────────────────
  const fieldStyle = {
    fontFamily: "'Barlow',sans-serif",
    background: "#F8F9FC",
    border: "1.5px solid rgba(26,61,110,0.15)",
    color: "#0F1A2E",
    borderRadius: "0.5rem",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
  };

  const labelStyle = {
    fontFamily: "'Barlow',sans-serif",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#0F1A2E",
    display: "block",
    marginBottom: "0.375rem",
  };

  // ─── Render ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <PageHero title="Request for Quotation" />
        <section className="py-24 bg-off-white">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary-blue/10">
              <CheckCircle size={40} className="text-primary-blue" />
            </div>
            <h2 className="font-barlow-condensed text-3xl font-bold text-deep-navy mb-3">
              RFQ Received!
            </h2>
            <p className="text-lg font-barlow text-deep-navy mb-2">
              Thank you for your inquiry.
            </p>
            <p className="text-base font-barlow text-slate-gray mb-8">
              Our sales team will review your requirements and respond within <strong>24 business hours</strong> with a detailed quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-lg font-barlow-condensed font-bold text-sm bg-amber text-deep-navy hover:bg-opacity-90 transition"
              >
                Submit Another RFQ
              </button>
              <Link
                to="/products"
                className="px-6 py-3 rounded-lg font-barlow-condensed font-bold text-sm bg-white text-steel-blue border border-steel-blue/20 hover:border-steel-blue/40 transition"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Request for Quotation"
        subtitle="Fill out the form below and our team will respond within 24 business hours with competitive pricing."
      />

      <section className="py-12 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ─── Form ───────────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 font-barlow text-sm">
                    {error}
                  </div>
                )}

                {/* Contact Information */}
                <div className="rounded-2xl p-6 sm:p-8 mb-6 bg-white border border-steel-blue/10 shadow-sm">
                  <h2 className="font-barlow-condensed text-xl font-bold text-deep-navy mb-6">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {RFQ_DATA.fields.contact.map((f) => (
                      <div key={f.key}>
                        <label style={labelStyle}>{f.label} {f.required && <span className="text-amber">*</span>}</label>
                        <input
                          type={f.key === "email" ? "email" : "text"}
                          placeholder={f.placeholder}
                          required={f.required}
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          style={fieldStyle}
                          onFocus={(e) => (e.target.style.borderColor = "#2E6BB0")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(26,61,110,0.15)")}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="rounded-2xl p-6 sm:p-8 mb-6 bg-white border border-steel-blue/10 shadow-sm">
                  <h2 className="font-barlow-condensed text-xl font-bold text-deep-navy mb-6">
                    Project Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {RFQ_DATA.fields.project.map((f) => (
                      <div key={f.key}>
                        <label style={labelStyle}>{f.label}</label>
                        <select
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          style={fieldStyle}
                        >
                          <option value="">Select {f.label}</option>
                          {f.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Line Items */}
                <div className="rounded-2xl p-6 sm:p-8 mb-6 bg-white border border-steel-blue/10 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-barlow-condensed text-xl font-bold text-deep-navy">
                      Items Requested
                    </h2>
                    <button
                      type="button"
                      onClick={addItem}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold font-barlow bg-steel-blue/10 text-steel-blue hover:bg-steel-blue hover:text-white transition"
                    >
                      <Plus size={14} /> Add Item
                    </button>
                  </div>

                  {/* Header */}
                  <div className="hidden sm:grid sm:grid-cols-12 gap-3 mb-3 px-1">
                    <div className="col-span-6"><span className="text-xs font-bold uppercase tracking-widest font-barlow text-slate-gray">Product / Description</span></div>
                    <div className="col-span-2"><span className="text-xs font-bold uppercase tracking-widest font-barlow text-slate-gray">Brand</span></div>
                    <div className="col-span-2"><span className="text-xs font-bold uppercase tracking-widest font-barlow text-slate-gray">Qty</span></div>
                    <div className="col-span-2"><span className="text-xs font-bold uppercase tracking-widest font-barlow text-slate-gray">Unit</span></div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-3">
                    {items.map((item, idx) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center">
                        <div className="col-span-12 sm:col-span-6">
                          <input
                            type="text"
                            placeholder={`Product ${idx + 1} (e.g. Solar Panel)`}
                            value={item.product}
                            onChange={(e) => updateItem(item.id, "product", e.target.value)}
                            style={fieldStyle}
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <input
                            type="text"
                            placeholder="Brand"
                            value={item.brand}
                            onChange={(e) => updateItem(item.id, "brand", e.target.value)}
                            style={fieldStyle}
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-2">
                          <input
                            type="number"
                            min="1"
                            placeholder="1"
                            value={item.qty}
                            onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                            style={fieldStyle}
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <select
                            value={item.unit}
                            onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                            style={fieldStyle}
                          >
                            <option value="pcs">pcs</option>
                            <option value="sets">sets</option>
                            <option value="lots">lots</option>
                            <option value="m">m</option>
                            <option value="m²">m²</option>
                            <option value="kWp">kWp</option>
                          </select>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="rounded-2xl p-6 sm:p-8 mb-6 bg-white border border-steel-blue/10 shadow-sm">
                  <h2 className="font-barlow-condensed text-xl font-bold text-deep-navy mb-4">
                    Additional Notes
                  </h2>
                  <textarea
                    rows={4}
                    placeholder="Delivery location, special requirements, site conditions, or any other details..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="resize-none outline-none w-full"
                    style={fieldStyle}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-barlow-condensed font-bold text-lg tracking-wide bg-amber text-deep-navy hover:bg-opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request for Quotation"}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            </div>

            {/* ─── Sidebar ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-5">
              {/* Contact Us Directly */}
              <div className="rounded-2xl p-6" style={{ background: "#1A3D6E" }}>
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'Barlow',sans-serif", color: "#F5A800" }}
                >
                  Contact Us Directly
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Sales & Quotation", value: phone },
                    { label: "Technical Support", value: phoneAlt },
                    { label: "Email (General)", value: email },
                  ].map((d) => (
                    <div key={d.label}>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          color: "rgba(255,255,255,0.45)",
                        }}
                      >
                        {d.label}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          color: "rgba(255,255,255,0.88)",
                        }}
                      >
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="rounded-2xl p-6 bg-white border border-steel-blue/10 shadow-sm">
                <p className="text-xs font-bold tracking-widest uppercase mb-4 font-barlow text-amber">
                  Business Hours
                </p>
                <Clock size={20} className="mb-3 text-steel-blue" />
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold font-barlow text-deep-navy">Mon – Fri</span>
                    <span className="text-sm font-barlow text-slate-gray">{hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold font-barlow text-deep-navy">Saturday</span>
                    <span className="text-sm font-barlow text-slate-gray">{hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold font-barlow text-deep-navy">Sunday</span>
                    <span className="text-sm font-barlow text-slate-gray/50">{hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Response Guarantee */}
              <div className="rounded-2xl p-6 bg-amber">
                <p className="font-barlow-condensed text-lg font-bold text-deep-navy mb-2">
                  Response Guarantee
                </p>
                <p className="text-sm font-barlow text-deep-navy/75 leading-relaxed">
                  All RFQs submitted before 5PM are responded to within the same business day. After 5PM, we respond by 10AM the next business day.
                </p>
              </div>

              {/* Our Process */}
              <div className="rounded-2xl p-6 bg-white border border-steel-blue/10 shadow-sm">
                <p className="text-xs font-bold tracking-widest uppercase mb-4 font-barlow text-slate-gray">
                  Our Process
                </p>
                {[
                  "Submit your RFQ below",
                  "Receive quote within 24 hours",
                  "Review and approve",
                  "Delivery or installation scheduled",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black font-barlow-condensed bg-steel-blue text-amber">
                      {i + 1}
                    </div>
                    <p className="text-sm font-barlow text-deep-navy">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}