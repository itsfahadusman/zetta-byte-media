"use client";

import { useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const WHATSAPP_NUMBER = "923451037028";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, message } = form;
    const text = [
      `Hello Zetta Byte Media! 👋`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      ``,
      `*Message:*`,
      message,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const isValid = form.name.trim() && form.phone.trim() && form.message.trim();

  return (
    <>
      <style>{`
        :root {
          --zb-bg: #05060a;
          --zb-panel: #0b0d14;
          --zb-border: rgba(148, 163, 184, 0.12);
          --zb-cyan: #22D3EE;
          --zb-purple: #A855F7;
          --zb-text: #E5E7EB;
          --zb-muted: #7C8798;
        }

        .cp {
          min-height: 100dvh;
          background: var(--zb-bg);
          color: var(--zb-text);
          display: flex;
          flex-direction: column;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        /* ── Page header ── */
        .cp-header {
          padding: 7rem 2rem 4rem;
          text-align: center;
          border-bottom: 1px solid var(--zb-border);
        }
        .cp-header-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--zb-cyan);
          margin-bottom: 1rem;
          display: block;
        }
        .cp-header-h1 {
          font-family: inherit;
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 800;
          color: var(--zb-text);
          line-height: 1.1;
          margin: 0 0 1rem;
        }
        .cp-header-sub {
          font-size: 1rem;
          color: var(--zb-muted);
          line-height: 1.75;
          max-width: 440px;
          margin: 0 auto;
        }

        /* ── Main layout ── */
        .cp-main {
          flex: 1;
          max-width: 980px;
          margin: 0 auto;
          width: 100%;
          padding: 4rem 2rem 5rem;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 760px) {
          .cp-main {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 3rem 1.25rem 4rem;
          }
        }

        /* ══ FORM ══ */
        .cp-form-title {
          font-family: inherit;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--zb-text);
          margin: 0 0 1.8rem;
        }

        .cp-field { margin-bottom: 1.3rem; }

        .cp-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--zb-muted);
          margin-bottom: 0.5rem;
        }

        .cp-input-wrap { position: relative; }

        .cp-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--zb-muted);
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 0.2s;
        }
        .cp-input-wrap.active .cp-icon { color: var(--zb-cyan); }

        .cp-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.6rem;
          background: var(--zb-panel);
          border: 1.5px solid var(--zb-border);
          border-radius: 10px;
          font-size: 0.9rem;
          color: var(--zb-text);
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cp-input::placeholder { color: var(--zb-muted); }
        .cp-input:focus {
          border-color: var(--zb-cyan);
          box-shadow: 0 0 0 3px rgba(34,211,238,0.12);
        }

        .cp-textarea {
          width: 100%;
          padding: 0.85rem 1rem;
          background: var(--zb-panel);
          border: 1.5px solid var(--zb-border);
          border-radius: 10px;
          font-size: 0.9rem;
          color: var(--zb-text);
          outline: none;
          resize: none;
          box-sizing: border-box;
          font-family: inherit;
          line-height: 1.7;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cp-textarea::placeholder { color: var(--zb-muted); }
        .cp-textarea:focus {
          border-color: var(--zb-cyan);
          box-shadow: 0 0 0 3px rgba(34,211,238,0.12);
        }

        .cp-count {
          text-align: right;
          font-size: 0.68rem;
          color: var(--zb-muted);
          margin-top: 4px;
        }

        .cp-btn {
          width: 100%;
          margin-top: 0.4rem;
          padding: 0.95rem;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          color: #05060a;
          border: none;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
          transition: filter 0.22s, transform 0.2s;
        }
        .cp-btn:hover:not(:disabled) {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .cp-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ══ INFO SIDE ══ */
        .cp-info-title {
          font-family: inherit;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--zb-text);
          margin: 0 0 0.5rem;
        }
        .cp-info-sub {
          font-size: 0.86rem;
          color: var(--zb-muted);
          line-height: 1.72;
          margin: 0 0 2rem;
        }

        /* Contact items */
        .cp-info-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid var(--zb-border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--zb-panel);
          margin-bottom: 2rem;
        }
        .cp-info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 1.3rem;
          border-bottom: 1px solid var(--zb-border);
          text-decoration: none;
          color: inherit;
          transition: background 0.18s;
        }
        .cp-info-item:last-child { border-bottom: none; }
        .cp-info-item:hover { background: rgba(34,211,238,0.05); }

        .cp-info-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          color: var(--zb-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cp-info-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--zb-muted);
          margin-bottom: 2px;
        }
        .cp-info-value {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--zb-text);
        }

        /* Divider */
        .cp-divider {
          height: 1px;
          background: var(--zb-border);
          margin-bottom: 2rem;
        }

        /* Hours */
        .cp-hours-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--zb-muted);
          margin-bottom: 0.9rem;
        }
        .cp-hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.86rem;
          padding: 0.45rem 0;
          border-bottom: 1px solid var(--zb-border);
        }
        .cp-hours-row:last-child { border-bottom: none; }
        .cp-hours-day { color: var(--zb-text); font-weight: 600; }
        .cp-hours-time { color: var(--zb-cyan); font-weight: 700; }
        .cp-hours-off { color: var(--zb-muted); font-weight: 600; }
      `}</style>

      <div className="cp">

        {/* Header */}
        <div className="cp-header">
          <span className="cp-header-label">Get in Touch</span>
          <h1 className="cp-header-h1">Contact Zetta Byte Media</h1>
          <p className="cp-header-sub">
            Have a project in mind or a question about one of our products?
            Send us a message and our team will get back to you promptly.
          </p>
        </div>

        {/* Main */}
        <div className="cp-main">

          {/* Form */}
          <div>
            <h2 className="cp-form-title">Send a Message</h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="cp-field">
                <label className="cp-label" htmlFor="cp-name">Full Name</label>
                <div className={`cp-input-wrap ${focused === "name" ? "active" : ""}`}>
                  <span className="cp-icon"><FaUser size={13} /></span>
                  <input
                    id="cp-name" type="text" name="name"
                    value={form.name} onChange={handleChange}
                    placeholder="e.g. Rana Ahmed" required className="cp-input"
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div className="cp-field">
                <label className="cp-label" htmlFor="cp-phone">Phone Number</label>
                <div className={`cp-input-wrap ${focused === "phone" ? "active" : ""}`}>
                  <span className="cp-icon"><FaPhone size={13} /></span>
                  <input
                    id="cp-phone" type="tel" name="phone"
                    value={form.phone} onChange={handleChange}
                    placeholder="e.g. +92 300 1234567" required className="cp-input"
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div className="cp-field">
                <label className="cp-label" htmlFor="cp-message">Message</label>
                <textarea
                  id="cp-message" name="message"
                  value={form.message} onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your project or which product you're interested in..."
                  required className="cp-textarea" maxLength={500}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                />
                <div className="cp-count">{form.message.length} / 500</div>
              </div>

              <button type="submit" disabled={!isValid} className="cp-btn">
                Send Message
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M2.5 7.5h10M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="cp-info-title">Contact Info</h2>
            <p className="cp-info-sub">
              Reach us directly through any of the channels below.
            </p>

            <div className="cp-info-list">
              {[
                { icon: <FaMapMarkerAlt size={15} />, label: "Location", value: "Lahore, Punjab, Pakistan", href: null },
                { icon: <FaPhone size={15} />, label: "Phone", value: "+92 345 1037028", href: "tel:+923451037028" },
                { icon: <FaEnvelope size={15} />, label: "Email", value: "hello@zettabytemedia.com", href: "mailto:hello@zettabytemedia.com" },
              ].map(({ icon, label, value, href }) => {
                const Tag = href ? "a" : "div";
                return (
                  <Tag
                    key={label}
                    className="cp-info-item"
                    {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <div className="cp-info-icon" aria-hidden="true">{icon}</div>
                    <div>
                      <div className="cp-info-label">{label}</div>
                      <div className="cp-info-value">{value}</div>
                    </div>
                  </Tag>
                );
              })}
            </div>

            <div className="cp-divider" />

            <div className="cp-hours-title">Office Hours</div>
            {[
              { day: "Mon – Fri", time: "9:00 AM – 6:00 PM" },
              { day: "Saturday", time: "9:00 AM – 3:00 PM" },
              { day: "Sunday", time: null },
            ].map(({ day, time }) => (
              <div key={day} className="cp-hours-row">
                <span className="cp-hours-day">{day}</span>
                {time
                  ? <span className="cp-hours-time">{time}</span>
                  : <span className="cp-hours-off">Closed</span>}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}