"use client";

import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "FAQs", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIAL_LINKS = [
  { icon: <FaFacebook size={18} />, href: "https://www.facebook.com/zettabytemedia", label: "Facebook" },
  { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/zettabytemedia", label: "Instagram" },
  { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/company/zettabytemedia", label: "LinkedIn" },
];

const TAGS = ["Fintech", "Management Systems", "Games", "Web Apps"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "ok" | "err"

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("err"); return;
    }
    setStatus("ok");
    setEmail("");
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <>
      <style>{`
        /* ══════════════════════════════
           DESIGN TOKENS (shared)
        ══════════════════════════════ */
        :root {
          --zb-bg: #05060a;
          --zb-panel: #0b0d14;
          --zb-border: rgba(148, 163, 184, 0.12);
          --zb-cyan: #22D3EE;
          --zb-purple: #A855F7;
          --zb-text: #E5E7EB;
          --zb-muted: #7C8798;
        }

        /* ══════════════════════════
           FOOTER
        ══════════════════════════ */
        .footer-root {
          background: var(--zb-bg);
          color: var(--zb-text);
          position: relative;
          overflow: hidden;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        /* Grid texture */
        .footer-root::before {
          content: '';
          position: absolute; inset: 0;
          opacity: 0.05;
          background-image:
            linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 100%);
          pointer-events: none; z-index: 0;
        }

        /* Glow top-right */
        .footer-glow {
          position: absolute;
          top: -8rem; right: -8rem;
          width: 36rem; height: 36rem;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }

        /* ── Top rule ── */
        .footer-top-rule {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--zb-cyan) 30%, var(--zb-purple) 70%, transparent);
        }

        /* ══ Main grid ══ */
        .footer-grid {
          position: relative; z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 2rem 3rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.6fr;
          gap: 3rem;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; padding: 3rem 1.25rem 2rem; gap: 2rem; }
        }

        /* ── Brand col ── */
        .footer-brand-name {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          background: linear-gradient(90deg, #F1F5F9 0%, #CBD5E1 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 0 0 0.25rem;
        }
        .footer-brand-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--zb-cyan);
          margin-bottom: 1rem;
        }
        .footer-brand-desc {
          font-size: 0.88rem;
          color: var(--zb-muted);
          line-height: 1.75;
          margin: 0 0 1.2rem;
          max-width: 380px;
        }
        /* Product tags */
        .footer-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .footer-tag {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--zb-muted);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          padding: 0.28rem 0.75rem;
          border-radius: 999px;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          cursor: default;
        }
        .footer-tag:hover {
          background: rgba(34,211,238,0.1);
          color: var(--zb-cyan);
          border-color: rgba(34,211,238,0.4);
        }

        /* ── Nav cols ── */
        .footer-nav-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--zb-cyan);
          margin: 0 0 1.2rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-nav-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--zb-border);
          border-radius: 2px;
        }
        .footer-nav-list {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.86rem;
          color: var(--zb-muted);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s, gap 0.2s;
        }
        .footer-nav-link::before {
          content: '›';
          opacity: 0;
          transition: opacity 0.2s;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-size: 1rem;
        }
        .footer-nav-link:hover {
          color: var(--zb-text);
          gap: 10px;
        }
        .footer-nav-link:hover::before { opacity: 1; }

        /* ── Newsletter col ── */
        .footer-newsletter-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 420px) {
          .footer-newsletter-form { flex-direction: column; }
        }
        .footer-email-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1.5px solid var(--zb-border);
          border-radius: 8px;
          padding: 0.65rem 1rem;
          font-size: 0.85rem;
          color: var(--zb-text);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          min-width: 0;
          font-family: inherit;
        }
        .footer-email-input::placeholder { color: var(--zb-muted); }
        .footer-email-input:focus {
          border-color: var(--zb-cyan);
          background: rgba(255,255,255,0.05);
        }
        .footer-subscribe-btn {
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          color: #05060a;
          border: none;
          border-radius: 8px;
          padding: 0.65rem 1.2rem;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          white-space: nowrap;
          font-family: inherit;
          transition: filter 0.22s, transform 0.2s;
        }
        .footer-subscribe-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        /* Feedback messages */
        .footer-msg {
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 1rem;
          padding: 0.45rem 0.85rem;
          border-radius: 7px;
        }
        .footer-msg.ok  { background: rgba(52,211,153,0.12); color: #34D399; border: 1px solid rgba(52,211,153,0.3); }
        .footer-msg.err { background: rgba(220,60,60,0.12);  color: #f87171; border: 1px solid rgba(220,60,60,0.25); }

        /* Social icons */
        .footer-socials {
          display: flex;
          gap: 0.65rem;
        }
        .footer-social-btn {
          width: 38px; height: 38px;
          border-radius: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          color: var(--zb-muted);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: background 0.22s, border-color 0.22s, color 0.22s, transform 0.2s;
        }
        .footer-social-btn:hover {
          background: rgba(34,211,238,0.12);
          border-color: rgba(34,211,238,0.4);
          color: var(--zb-cyan);
          transform: translateY(-2px);
        }

        /* ══ Bottom bar ══ */
        .footer-bottom {
          position: relative; z-index: 1;
          border-top: 1px solid var(--zb-border);
          padding: 1.2rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 600px) {
          .footer-bottom { justify-content: center; text-align: center; padding: 1.2rem 1.25rem; }
        }
        .footer-copy {
          font-size: 0.76rem;
          color: var(--zb-muted);
          font-weight: 500;
        }
        .footer-copy strong { color: var(--zb-text); }
        .footer-bottom-links {
          display: flex;
          gap: 1.4rem;
        }
        .footer-bottom-link {
          font-size: 0.75rem;
          color: var(--zb-muted);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .footer-bottom-link:hover { color: var(--zb-cyan); }
      `}</style>

      <footer className="footer-root">
        <div className="footer-glow" aria-hidden="true" />
        <div className="footer-top-rule" />

        {/* Main grid */}
        <div className="footer-grid">

          {/* ── Brand ── */}
          <div>
            <h2 className="footer-brand-name">Zetta Byte Media</h2>
            <p className="footer-brand-tag">Digital &amp; Technology Studio</p>
            <p className="footer-brand-desc">
              We handle the engineering, design, and operations needed to turn
              digital ideas into products people actually use — from fintech
              tools to management systems and games.
            </p>
            <div className="footer-tags">
              {TAGS.map((t) => (
                <span key={t} className="footer-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* ── Company ── */}
          <nav aria-label="Company links">
            <div className="footer-nav-title">Company</div>
            <ul className="footer-nav-list">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="footer-nav-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Support ── */}
          <nav aria-label="Support links">
            <div className="footer-nav-title">Support</div>
            <ul className="footer-nav-list">
              {SUPPORT_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="footer-nav-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Newsletter ── */}
          <div>
            <div className="footer-nav-title">Stay Updated</div>

            {status === "ok" && (
              <div className="footer-msg ok">✓ Subscribed! Welcome aboard.</div>
            )}
            {status === "err" && (
              <div className="footer-msg err">Please enter a valid email.</div>
            )}

            <form onSubmit={handleSubscribe} className="footer-newsletter-form" aria-label="Newsletter signup">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus(null); }}
                className="footer-email-input"
                aria-label="Email address"
              />
              <button type="submit" className="footer-subscribe-btn">
                Subscribe
              </button>
            </form>

            <div className="footer-socials">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <strong>Zetta Byte Media</strong>. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link href="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <Link href="/terms" className="footer-bottom-link">Terms</Link>
          </div>
        </div>
      </footer>
    </>
  );
}