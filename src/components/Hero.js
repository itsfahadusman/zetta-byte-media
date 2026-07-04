"use client";

import { memo } from "react";

function Hero() {
  return (
    <>
      <style>{`

        /* ══════════════════════════════
           DESIGN TOKENS (shared w/ header)
        ══════════════════════════════ */
        :root {
          --zb-bg: #05060a;
          --zb-panel: #0b0d14;
          --zb-border: rgba(148, 163, 184, 0.12);
          --zb-cyan: #22D3EE;
          --zb-purple: #A855F7;
          --zb-text: #E5E7EB;
          --zb-muted: #7C8798;
          --zb-live: #34D399;
        }

        /* ══════════════════════════════
           HERO SECTION
        ══════════════════════════════ */
        .hero {
          position: relative;
          min-height: 100dvh;
          background: var(--zb-bg);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 80px; /* header offset */
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        /* ── Grid backdrop ── */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%);
          z-index: 0;
          pointer-events: none;
        }

        /* ── Glows ── */
        .hero-glow {
          position: absolute;
          top: -10rem;
          left: 50%;
          transform: translateX(-60%);
          width: 46rem;
          height: 46rem;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.16) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-glow-2 {
          position: absolute;
          bottom: -14rem;
          right: -8rem;
          width: 42rem;
          height: 42rem;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Inner wrap ── */
        .wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }
        @media (max-width: 600px) {
          .wrap { padding: 0 1.25rem; }
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 4rem 0 6rem;
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          color: var(--zb-muted);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          margin-bottom: 2.2rem;
          opacity: 0;
          animation: hFadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .dot-live {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--zb-live);
          box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
          animation: pulse-live 1.8s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-live {
          0%   { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.55); }
          70%  { box-shadow: 0 0 0 7px rgba(52, 211, 153, 0); }
          100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
        }

        /* ── Display headline ── */
        .display {
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, monospace;
          font-size: clamp(2.4rem, 5.6vw, 4.6rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: var(--zb-text);
          max-width: 900px;
          margin: 0 0 1.6rem;
          opacity: 0;
          animation: hFadeUp 0.85s 0.22s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .grad-text {
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ── Lede ── */
        .lede {
          font-size: clamp(0.95rem, 1.4vw, 1.1rem);
          color: var(--zb-muted);
          line-height: 1.75;
          max-width: 560px;
          margin: 0;
          opacity: 0;
          animation: hFadeUp 0.8s 0.38s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* ── Divider ── */
        .hero-divider {
          width: 64px;
          height: 2px;
          margin-top: 2.4rem;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          opacity: 0;
          animation: hFadeUp 0.7s 0.52s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* ── Shared animation ── */
        @keyframes hFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="hero" className="hero hero-minimal">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow-2" aria-hidden="true" />

        <div className="wrap hero-inner">
          <div className="hero-badge">
            <span className="dot-live" aria-hidden="true" />
            Digital Media &amp; Technology Studio
          </div>

          <h1 className="display">
            Turning Vision into <span className="grad-text">Digital Reality</span>
          </h1>

          <p className="lede">
            Zetta Byte Media handles the engineering, design, and operations
            needed to turn your digital ideas into products people actually use.
          </p>

          <div className="hero-divider" aria-hidden="true" />
        </div>
      </section>
    </>
  );
}

export default memo(Hero);