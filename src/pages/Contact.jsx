// src/pages/Contact.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
import { PageHero } from "../components/Layout";
import { CONTACT } from "../data";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 5000);
  };

  const { phone, phoneAlt, email, emailSupport, address, hours, mapImage } = CONTACT;

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

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have a question, project inquiry, or need technical support? We're here to help."
      />

      <section className="py-12" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Contact Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[
              { icon: <Phone size={22} />, title: "Call Us", lines: [phone, phoneAlt], color: "#1A3D6E" },
              { icon: <Mail size={22} />, title: "Email Us", lines: [email, emailSupport], color: "#2E6BB0" },
              { icon: <MapPin size={22} />, title: "Visit Us", lines: [address], color: "#1A3D6E" },
              { icon: <Clock size={22} />, title: "Business Hours", lines: [hours.weekdays, hours.saturday, hours.sunday], color: "#2E6BB0" },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-xl p-6 text-center transition-all duration-200"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(26,61,110,0.1)",
                  boxShadow: "0 2px 12px rgba(26,61,110,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(26,61,110,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(26,61,110,0.06)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: c.color, color: "#F5A800" }}
                >
                  {c.icon}
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "1.1rem",
                    color: "#0F1A2E",
                  }}
                >
                  {c.title}
                </h3>
                {c.lines.map((l) => (
                  <p
                    key={l}
                    className="text-sm"
                    style={{ fontFamily: "'Barlow',sans-serif", color: "#6B7794" }}
                  >
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ── Map + Location Info ── */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div
                className="rounded-2xl overflow-hidden flex-1 min-h-64"
                style={{
                  background: "#EDF0F6",
                  border: "1px solid rgba(26,61,110,0.1)",
                  position: "relative",
                }}
              >
                <img
                  src={mapImage}
                  alt="RKC Industrial Supply location - Biñan City, Laguna"
                  className="w-full h-full object-cover"
                />
                {/* ── Navy Blue Overlay ── */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: "rgba(15, 26, 46, 0.80)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ background: "#1A3D6E" }}
                  >
                    <MapPin size={22} style={{ color: "#F5A800" }} />
                  </div>
                  <p
                    className="text-sm font-bold text-center text-white"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "1rem",
                    }}
                  >
                    B42 L34 Evergreen Country
                  </p>
                  <p
                    className="text-xs text-center text-white/80"
                    style={{ fontFamily: "'Barlow',sans-serif" }}
                  >
                    Brgy. Zapote, 4024 Biñan City, Laguna
                  </p>
                  <a
                    href="https://www.google.com/maps/search/B42+L34+Evergreen+Country+Brgy.+Zapote+4024+Biñan+City+Laguna"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 px-4 py-2 rounded-full text-xs font-bold"
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      background: "#F5A800",
                      color: "#0F1A2E",
                    }}
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#1A3D6E" }}>
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'Barlow',sans-serif", color: "#F5A800" }}
                >
                  Reach Us By
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
            </div>

            {/* ── Contact Form ── */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(26,61,110,0.1)",
                  boxShadow: "0 4px 24px rgba(26,61,110,0.08)",
                }}
              >
                <div
                  className="px-6 sm:px-8 py-5 flex items-center gap-3"
                  style={{ borderBottom: "1px solid rgba(26,61,110,0.08)" }}
                >
                  <MessageSquare size={18} style={{ color: "#1A3D6E" }} />
                  <h2
                    className="leading-none"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: "#0F1A2E",
                    }}
                  >
                    Send Us a Message
                  </h2>
                </div>

                <div className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                        style={{ background: "rgba(46,107,176,0.1)" }}
                      >
                        <CheckCircle size={32} style={{ color: "#2E6BB0" }} />
                      </div>
                      <h3
                        className="font-bold mb-2"
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontSize: "1.4rem",
                          color: "#0F1A2E",
                        }}
                      >
                        Message Sent!
                      </h3>
                      <p
                        className="text-sm mb-6"
                        style={{ fontFamily: "'Barlow',sans-serif", color: "#6B7794" }}
                      >
                        Thank you, {form.name}. We'll get back to you shortly.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            name: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        className="px-6 py-2.5 rounded-lg font-bold text-sm"
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontSize: "1rem",
                          background: "#1A3D6E",
                          color: "#ffffff",
                        }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {[
                          { key: "name", label: "Full Name *", placeholder: "Juan dela Cruz", required: true },
                          { key: "email", label: "Email Address *", placeholder: "juan@company.com", required: true },
                          { key: "phone", label: "Phone Number", placeholder: "+63 9XX XXX XXXX", required: false },
                        ].map((f) => (
                          <div key={f.key} className={f.key === "phone" ? "sm:col-span-2" : ""}>
                            <label
                              className="block text-xs font-semibold mb-1.5"
                              style={{
                                fontFamily: "'Barlow',sans-serif",
                                color: "#0F1A2E",
                              }}
                            >
                              {f.label}
                            </label>
                            <input
                              type={f.key === "email" ? "email" : "text"}
                              placeholder={f.placeholder}
                              required={f.required}
                              value={form[f.key]}
                              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                              style={fieldStyle}
                              onFocus={(e) => {
                                e.target.style.borderColor = "#2E6BB0";
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "rgba(26,61,110,0.15)";
                              }}
                            />
                          </div>
                        ))}
                        <div className="sm:col-span-2">
                          <label
                            className="block text-xs font-semibold mb-1.5"
                            style={{
                              fontFamily: "'Barlow',sans-serif",
                              color: "#0F1A2E",
                            }}
                          >
                            Subject *
                          </label>
                          <select
                            required
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            style={fieldStyle}
                          >
                            <option value="">Select a Subject</option>
                            {[
                              "Product Inquiry",
                              "Request for Quotation",
                              "Technical Support",
                              "Installation Service",
                              "Delivery / Logistics",
                              "Partnership",
                              "Other",
                            ].map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label
                          className="block text-xs font-semibold mb-1.5"
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            color: "#0F1A2E",
                          }}
                        >
                          Message *
                        </label>
                        <textarea
                          rows={5}
                          required
                          placeholder="Describe your inquiry, project requirements, or any questions..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="resize-none outline-none"
                          style={fieldStyle}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#2E6BB0";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(26,61,110,0.15)";
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontSize: "1rem",
                          letterSpacing: "0.05em",
                          background: "#F5A800",
                          color: "#0F1A2E",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#e69900";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#F5A800";
                        }}
                      >
                        <Send size={16} /> Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}