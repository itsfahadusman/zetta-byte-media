"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURES = [
  { icon: "⚡", label: "Fast Turnaround" },
  { icon: "🛡️", label: "Reliable Engineering" },
  { icon: "🧩", label: "Modern Stack" },
  { icon: "📞", label: "24/7 Support" },
];

export default function CTABanner() {
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

        /* ── Section ── */
        .cta-section {
          position: relative;
          padding: 5.5rem 1.5rem;
          background: var(--zb-bg);
          overflow: hidden;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        /* Grid texture */
        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image:
            linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%);
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* Cyan radial glow top-left */
        .cta-glow-1 {
          position: absolute;
          top: -6rem; left: -8rem;
          width: 40rem; height: 40rem;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.16) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        /* Purple glow bottom-right */
        .cta-glow-2 {
          position: absolute;
          bottom: -8rem; right: -6rem;
          width: 36rem; height: 36rem;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.16) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }

        /* Diagonal accent stripe */
        .cta-stripe {
          position: absolute;
          top: 0; bottom: 0;
          left: 55%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(34,211,238,0.3) 40%, rgba(168,85,247,0.15) 70%, transparent);
          transform: skewX(-14deg);
          pointer-events: none; z-index: 0;
        }

        /* ── Inner wrapper ── */
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }

        /* Eyebrow */
        .cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          color: var(--zb-cyan);
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.35rem 0.95rem;
          border-radius: 999px;
          margin-bottom: 1.4rem;
          opacity: 0;
          animation: ctaUp 0.65s 0.1s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .cta-eyebrow-dash {
          display: inline-block;
          width: 16px; height: 1.5px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 2px;
        }

        /* Headline */
        .cta-h2 {
          font-family: inherit;
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 800;
          color: var(--zb-text);
          line-height: 1.1;
          margin: 0 0 1.2rem;
          opacity: 0;
          animation: ctaUp 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .cta-h2 span {
          position: relative;
          display: inline-block;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        /* Animated underline on accent word */
        .cta-h2 span::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 3px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          animation: lineGrow 0.5s 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes lineGrow { to { transform: scaleX(1); } }

        /* Sub text */
        .cta-sub {
          font-size: clamp(0.92rem, 1.3vw, 1.05rem);
          color: var(--zb-muted);
          line-height: 1.75;
          max-width: 520px;
          margin: 0 auto 2.5rem;
          opacity: 0;
          animation: ctaUp 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* Feature chips */
        .cta-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.7rem;
          margin-bottom: 2.8rem;
          opacity: 0;
          animation: ctaUp 0.7s 0.42s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .cta-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          color: var(--zb-muted);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          transition: background 0.22s, border-color 0.22s, color 0.22s;
          cursor: default;
        }
        .cta-chip:hover {
          background: rgba(34,211,238,0.1);
          border-color: rgba(34,211,238,0.4);
          color: var(--zb-cyan);
        }
        .cta-chip-icon { font-size: 0.9rem; }

        /* CTA buttons */
        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          animation: ctaUp 0.7s 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          color: #05060a !important;
          text-decoration: none;
          padding: 0.9rem 2.1rem;
          border-radius: 10px;
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          box-shadow: 0 8px 28px rgba(34,211,238,0.25);
          transition: transform 0.22s, box-shadow 0.25s, filter 0.25s;
        }
        .cta-btn-primary:hover {
          filter: brightness(1.08);
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(168,85,247,0.4);
        }

        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: transparent;
          color: var(--zb-text) !important;
          text-decoration: none;
          padding: 0.88rem 2.1rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          border: 1.5px solid var(--zb-border);
          transition: background 0.25s, border-color 0.25s, transform 0.22s;
        }
        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(148,163,184,0.4);
          transform: translateY(-3px);
        }

        /* Bottom divider line */
        .cta-bottom-rule {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--zb-cyan) 40%, var(--zb-purple) 60%, transparent);
          z-index: 1;
        }

        @keyframes ctaUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-glow-1" aria-hidden="true" />
        <div className="cta-glow-2" aria-hidden="true" />
        <div className="cta-stripe" aria-hidden="true" />

        <div className="cta-inner">

          <div className="cta-eyebrow">
            <span className="cta-eyebrow-dash" aria-hidden="true" />
            Ready to Build Something?
            <span className="cta-eyebrow-dash" aria-hidden="true" />
          </div>

          <h2 className="cta-h2">
            Turning Ideas into<br />
            <span>Digital Products</span>
          </h2>

          <p className="cta-sub">
            From fintech tools to management systems and games, our team
            engineers and ships products that people actually use.
          </p>

          {/* Feature chips */}
          <div className="cta-chips">
            {FEATURES.map(({ icon, label }) => (
              <div key={label} className="cta-chip">
                <span className="cta-chip-icon" aria-hidden="true">{icon}</span>
                {label}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="cta-buttons">
            <Link href="/contact" className="cta-btn-primary">
              Contact Sales
              <ArrowRight size={17} />
            </Link>
            <Link href="/services" className="cta-btn-secondary">
              Explore Services
            </Link>
          </div>

        </div>

        <div className="cta-bottom-rule" aria-hidden="true" />
      </section>
    </>
  );
}