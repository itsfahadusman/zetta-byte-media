"use client";

import { useState } from "react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "ZB-01",
    title: "Smart SMS Book",
    desc: "A lightweight expense and ledger tracker that reads transaction SMS automatically, so budgets, outflows, and reports stay accurate without manual entry.",
    tag: "Fintech",
    stack: ["React Native", "SQLite", "SMS Parser"],
    href: "/products/smart-sms-book",
    accent: "#00E676",
    uptime: "99.8%",
  },
  {
    id: "ZB-02",
    title: "Salon Management System",
    desc: "Appointment scheduling, service catalogs, staff allocation, and checkout tools built for service-led businesses that run on tight daily schedules.",
    tag: "Management Systems",
    stack: ["Next.js", "PostgreSQL", "Stripe"],
    href: "/products/salon-management-system",
    accent: "#22D3EE",
    uptime: "99.9%",
  },
  {
    id: "ZB-03",
    title: "Zetta Arcade",
    desc: "Playable, on-brand web experiences — from light interactive moments to full session games with live leaderboards and score tracking.",
    tag: "Games",
    stack: ["Canvas", "WebSockets", "Redis"],
    href: "/products/zetta-arcade",
    accent: "#A855F7",
    uptime: "99.6%",
  },
  {
    id: "ZB-04",
    title: "Snake Xenzia",
    desc: "A classic arcade snake game rebuilt for the web — canvas-based movement, adjustable difficulty, and the same score-chasing loop everyone grew up with.",
    tag: "Games",
    stack: ["Canvas", "React", "LocalStorage"],
    href: "/products/snake-xenzia",
    accent: "#A855F7",
    uptime: "99.7%",
  },
];

export default function ProductsPage() {
  const [openId, setOpenId] = useState(PRODUCTS[0].id);

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

        .prod-page {
          min-height: 100dvh;
          background: var(--zb-bg);
          color: var(--zb-text);
          overflow: hidden;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        /* ══════════════════
           HERO HEADER
        ══════════════════ */
        .prod-hero {
          position: relative;
          background: var(--zb-bg);
          padding: 8rem 1.5rem 5rem;
          text-align: center;
          overflow: hidden;
        }
        .prod-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--zb-cyan) 35%, var(--zb-purple) 65%, transparent);
        }
        .prod-hero::after {
          content: '';
          position: absolute;
          inset: 0; opacity: 0.05;
          background-image:
            linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 20%, #000 30%, transparent 100%);
          mask-image: radial-gradient(ellipse 70% 70% at 50% 20%, #000 30%, transparent 100%);
          pointer-events: none; z-index: 0;
        }
        .prod-hero-glow {
          position: absolute;
          top: -8rem; left: 50%;
          transform: translateX(-50%);
          width: 50rem; height: 30rem;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(34,211,238,0.16) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .prod-hero-inner {
          position: relative; z-index: 1;
          max-width: 680px; margin: 0 auto;
        }
        .prod-hero-eyebrow {
          display: inline-flex;
          align-items: center; gap: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          color: var(--zb-cyan);
          font-size: 0.67rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.35rem 0.95rem; border-radius: 999px;
          margin-bottom: 1.3rem;
          opacity: 0; animation: pUp 0.65s 0.1s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .prod-hero-eyebrow span {
          display: inline-block; width: 16px; height: 1.5px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 2px;
        }
        .prod-hero-h1 {
          font-family: inherit;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800; color: var(--zb-text);
          line-height: 1.1; margin: 0 0 1rem;
          opacity: 0; animation: pUp 0.7s 0.22s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .prod-hero-h1 em {
          font-style: normal;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .prod-hero-sub {
          font-size: clamp(0.92rem, 1.3vw, 1.05rem);
          color: var(--zb-muted); line-height: 1.75;
          margin: 0;
          opacity: 0; animation: pUp 0.7s 0.34s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        .prod-count-bar {
          position: relative; z-index: 1;
          display: flex; justify-content: center; gap: 2rem;
          margin-top: 2.5rem; flex-wrap: wrap;
          opacity: 0; animation: pUp 0.65s 0.46s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .prod-count-item { text-align: center; }
        .prod-count-num {
          font-family: inherit;
          font-size: 1.7rem; font-weight: 800; color: var(--zb-text); line-height: 1;
        }
        .prod-count-label {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--zb-muted); margin-top: 3px;
        }
        .prod-count-div {
          width: 1px; background: var(--zb-border); align-self: stretch;
        }

        /* ══════════════════
           PRODUCT DIRECTORY (terminal process list)
        ══════════════════ */
        .prod-dir {
          max-width: 980px;
          margin: 0 auto;
          padding: 4rem 2rem 5rem;
        }
        @media (max-width: 600px) {
          .prod-dir { padding: 3rem 1.25rem 3.5rem; }
        }

        .prod-dir-head {
          display: grid;
          grid-template-columns: 70px 1fr 140px 90px 32px;
          gap: 1rem;
          padding: 0 1.25rem 0.9rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--zb-muted);
          border-bottom: 1px solid var(--zb-border);
        }
        @media (max-width: 700px) {
          .prod-dir-head { display: none; }
        }

        .prod-row {
          border-bottom: 1px solid var(--zb-border);
          opacity: 0;
          animation: pUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .prod-row:nth-child(1) { animation-delay: 0.05s; }
        .prod-row:nth-child(2) { animation-delay: 0.12s; }
        .prod-row:nth-child(3) { animation-delay: 0.18s; }
        .prod-row:nth-child(4) { animation-delay: 0.24s; }

        .prod-row-head {
          --accent: #22D3EE;
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr 140px 90px 32px;
          align-items: center;
          gap: 1rem;
          padding: 1.4rem 1.25rem;
          cursor: pointer;
          background: transparent;
          transition: background 0.25s;
        }
        .prod-row-head::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .prod-row-head:hover,
        .prod-row.open .prod-row-head {
          background: rgba(255,255,255,0.02);
        }
        .prod-row-head:hover::before,
        .prod-row.open .prod-row-head::before {
          transform: scaleY(1);
        }

        @media (max-width: 700px) {
          .prod-row-head {
            grid-template-columns: 1fr 32px;
            grid-template-areas:
              "id     toggle"
              "title  toggle"
              "meta   meta";
            row-gap: 0.4rem;
          }
          .prod-row-id { grid-area: id; }
          .prod-row-title { grid-area: title; }
          .prod-row-meta-mobile { grid-area: meta; display: flex !important; }
          .prod-row-toggle { grid-area: toggle; }
        }

        .prod-row-id {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--zb-muted);
          letter-spacing: 0.05em;
        }

        .prod-row-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          min-width: 0;
        }
        .prod-row-title {
          font-family: inherit;
          font-size: clamp(1.05rem, 1.8vw, 1.35rem);
          font-weight: 800;
          color: var(--zb-text);
          margin: 0;
          letter-spacing: -0.01em;
          transition: color 0.25s;
        }
        .prod-row.open .prod-row-title,
        .prod-row-head:hover .prod-row-title {
          color: var(--accent);
        }
        .prod-row-tag {
          font-size: 0.68rem;
          color: var(--zb-muted);
          letter-spacing: 0.04em;
        }
        .prod-row-tag::before {
          content: '// ';
          color: var(--accent);
        }

        .prod-row-status {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--zb-muted);
        }
        .prod-row-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 rgba(0,0,0,0);
          animation: pulse-row 2s infinite;
        }
        @keyframes pulse-row {
          0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 55%, transparent); }
          70%  { box-shadow: 0 0 0 6px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }

        .prod-row-uptime {
          font-size: 0.75rem;
          color: var(--zb-muted);
          text-align: right;
        }
        .prod-row-uptime b { color: var(--zb-text); font-weight: 700; }

        .prod-row-meta-mobile { display: none; gap: 1rem; }

        .prod-row-toggle {
          width: 28px; height: 28px;
          border-radius: 6px;
          border: 1px solid var(--zb-border);
          background: rgba(255,255,255,0.02);
          color: var(--zb-muted);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), color 0.25s, border-color 0.25s;
          flex-shrink: 0;
        }
        .prod-row.open .prod-row-toggle {
          transform: rotate(45deg);
          color: var(--accent);
          border-color: var(--accent);
        }

        /* Expandable body */
        .prod-row-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .prod-row.open .prod-row-body {
          grid-template-rows: 1fr;
        }
        .prod-row-body-inner {
          overflow: hidden;
        }
        .prod-row-body-content {
          padding: 0 1.25rem 2rem 1.25rem;
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 1rem;
        }
        @media (max-width: 700px) {
          .prod-row-body-content { grid-template-columns: 1fr; }
        }
        .prod-row-desc {
          font-size: 0.9rem;
          color: var(--zb-muted);
          line-height: 1.8;
          margin: 0 0 1.25rem;
          max-width: 60ch;
        }
        .prod-row-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .prod-row-chip {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: var(--zb-text);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          padding: 0.3rem 0.7rem;
          border-radius: 5px;
        }
        .prod-row-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--accent);
          color: #05060a !important;
          text-decoration: none;
          padding: 0.7rem 1.5rem;
          border-radius: 7px;
          font-weight: 700; font-size: 0.82rem;
          letter-spacing: 0.03em;
          transition: transform 0.22s, filter 0.22s, box-shadow 0.22s;
        }
        .prod-row-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
          box-shadow: 0 10px 28px color-mix(in srgb, var(--accent) 40%, transparent);
        }
        .prod-row-cta svg { transition: transform 0.22s; }
        .prod-row-cta:hover svg { transform: translateX(3px); }

        /* ══════════════════
           BOTTOM CTA
        ══════════════════ */
        .prod-bottom-cta {
          background: var(--zb-bg);
          position: relative; overflow: hidden;
          padding: 5.5rem 2rem;
          text-align: center;
          border-top: 1px solid var(--zb-border);
        }
        .prod-bottom-cta::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--zb-cyan) 35%, var(--zb-purple) 65%, transparent);
        }
        .prod-bottom-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 40rem; height: 20rem; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(168,85,247,0.14) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .prod-bottom-inner {
          position: relative; z-index: 1;
          max-width: 600px; margin: 0 auto;
        }
        .prod-bottom-h2 {
          font-family: inherit;
          font-size: clamp(1.7rem, 3vw, 2.5rem);
          font-weight: 800; color: var(--zb-text);
          line-height: 1.2; margin: 0 0 0.9rem;
        }
        .prod-bottom-h2 em {
          font-style: normal;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .prod-bottom-p {
          font-size: 0.95rem;
          color: var(--zb-muted);
          line-height: 1.75; margin: 0 0 2rem;
        }
        .prod-bottom-btn {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          color: #05060a !important;
          text-decoration: none;
          padding: 0.9rem 2.2rem; border-radius: 10px;
          font-weight: 800; font-size: 0.9rem; letter-spacing: 0.04em;
          box-shadow: 0 8px 28px rgba(34,211,238,0.25);
          transition: transform 0.22s, box-shadow 0.25s, filter 0.25s;
        }
        .prod-bottom-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(168,85,247,0.4);
        }

        @keyframes pUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="prod-page">

        {/* ── Hero header ── */}
        <div className="prod-hero">
          <div className="prod-hero-glow" aria-hidden="true" />
          <div className="prod-hero-inner">
            <div className="prod-hero-eyebrow">
              <span aria-hidden="true" />
              Zetta Byte Media Product Range
              <span aria-hidden="true" />
            </div>
            <h1 className="prod-hero-h1">
              Our Digital<br /><em>Products</em>
            </h1>
            <p className="prod-hero-sub">
              Fully working products built and maintained by our engineering
              team — each one solving a real problem for real users.
            </p>

            <div className="prod-count-bar">
              <div className="prod-count-item">
                <div className="prod-count-num">4</div>
                <div className="prod-count-label">Product Lines</div>
              </div>
              <div className="prod-count-div" aria-hidden="true" />
              <div className="prod-count-item">
                <div className="prod-count-num">40+</div>
                <div className="prod-count-label">Clients Served</div>
              </div>
              <div className="prod-count-div" aria-hidden="true" />
              <div className="prod-count-item">
                <div className="prod-count-num">5+</div>
                <div className="prod-count-label">Years Building</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product directory ── */}
        <div className="prod-dir">
          <div className="prod-dir-head">
            <span>ID</span>
            <span>Process</span>
            <span>Status</span>
            <span style={{ textAlign: "right" }}>Uptime</span>
            <span />
          </div>

          {PRODUCTS.map((product) => {
            const isOpen = openId === product.id;
            return (
              <div
                key={product.id}
                className={`prod-row ${isOpen ? "open" : ""}`}
              >
                <div
                  className="prod-row-head"
                  style={{ "--accent": product.accent }}
                  onClick={() => setOpenId(isOpen ? null : product.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenId(isOpen ? null : product.id);
                    }
                  }}
                >
                  <span className="prod-row-id">{product.id}</span>

                  <div className="prod-row-title-wrap">
                    <h2 className="prod-row-title">{product.title}</h2>
                    <span className="prod-row-tag">{product.tag}</span>
                  </div>

                  <div className="prod-row-status">
                    <span className="prod-row-dot" aria-hidden="true" />
                    Active
                  </div>

                  <div className="prod-row-uptime">
                    <b>{product.uptime}</b>
                  </div>

                  <div className="prod-row-meta-mobile">
                    <div className="prod-row-status">
                      <span className="prod-row-dot" aria-hidden="true" />
                      Active
                    </div>
                    <div className="prod-row-uptime"><b>{product.uptime}</b> uptime</div>
                  </div>

                  <div className="prod-row-toggle" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="prod-row-body">
                  <div className="prod-row-body-inner">
                    <div className="prod-row-body-content">
                      <span />
                      <div>
                        <p className="prod-row-desc">{product.desc}</p>
                        <div className="prod-row-stack">
                          {product.stack.map((s) => (
                            <span key={s} className="prod-row-chip">{s}</span>
                          ))}
                        </div>
                        <Link
                          href={product.href}
                          className="prod-row-cta"
                          style={{ "--accent": product.accent }}
                        >
                          <span>View {product.title}</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="prod-bottom-cta">
          <div className="prod-bottom-glow" aria-hidden="true" />
          <div className="prod-bottom-inner">
            <h2 className="prod-bottom-h2">
              Have an idea for<br />a <em>Product</em>?
            </h2>
            <p className="prod-bottom-p">
              Tell us what you're building and we'll help you engineer,
              design, and ship it.
            </p>
            <Link href="/contact" className="prod-bottom-btn">
              Contact Us Today
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}