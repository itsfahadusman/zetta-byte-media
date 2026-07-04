"use client";

import { useEffect, useState, useRef } from "react";

const STATS = [
  { value: "40+", label: "Clients Served", suffix: "+" },
  { value: "99%", label: "Client Satisfaction", suffix: "%" },
  { value: "5+", label: "Years of Experience", suffix: "+" },
  { value: "24/7", label: "Systems Monitoring", suffix: "/7" },
];

const FEATURES = [
  { title: "Innovation Driven", desc: "Modern engineering practices applied to every product we ship — from fintech to games.", icon: "💡" },
  { title: "Client-Focused", desc: "Transparent, collaborative partnerships built on trust with startups and businesses alike.", icon: "🤝" },
  { title: "Expert Team", desc: "Engineers and designers delivering production-grade software, support, and iteration.", icon: "🧠" },
  { title: "End-to-End Delivery", desc: "Complete support from concept to deployment for every digital product we build.", icon: "🚀" },
];

const TIMELINE = [
  { year: "2019", event: "Zetta Byte Media founded as a small engineering studio" },
  { year: "2021", event: "Shipped Ledger Grid Pro, our first fintech product" },
  { year: "2023", event: "Launched Elegance Salon, our first management system" },
  { year: "2024", event: "Zetta Arcade goes live — our games division begins" },
  { year: "2026", event: "40+ clients served across fintech, systems, and games" },
];

function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

function StatCard({ stat, started }) {
  const numeric = parseInt(stat.value.replace(/[^\d]/g, "")) || 0;
  const isSpecial = stat.value === "24/7";
  const count = useCountUp(numeric, 1600, started);
  const display = isSpecial ? "24/7" : `${count}${stat.suffix}`;

  return (
    <div className="about-stat-card">
      <div className="about-stat-num">{display}</div>
      <div className="about-stat-label">{stat.label}</div>
    </div>
  );
}

export default function AboutPage() {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

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

        /* ══════════════════════
           ABOUT PAGE
        ══════════════════════ */
        .about-page {
          background: var(--zb-bg);
          color: var(--zb-text);
          overflow: hidden;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        /* ══ HERO ══ */
        .about-hero {
          position: relative;
          background: var(--zb-bg);
          padding: 8rem 1.5rem 6rem;
          text-align: center;
          overflow: hidden;
        }
        .about-hero::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--zb-cyan) 35%, var(--zb-purple) 65%, transparent);
        }
        .about-hero::after {
          content: '';
          position: absolute; inset: 0; opacity: 0.05;
          background-image:
            linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 20%, #000 30%, transparent 100%);
          mask-image: radial-gradient(ellipse 70% 70% at 50% 20%, #000 30%, transparent 100%);
          pointer-events: none; z-index: 0;
        }
        .about-hero-glow {
          position: absolute; top: -10rem; left: 50%; transform: translateX(-50%);
          width: 52rem; height: 32rem; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(34,211,238,0.16) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .about-hero-inner {
          position: relative; z-index: 1;
          max-width: 720px; margin: 0 auto;
        }
        .about-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--zb-border);
          color: var(--zb-cyan); font-size: 0.67rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          padding: 0.35rem 0.95rem; border-radius: 999px; margin-bottom: 1.3rem;
          opacity: 0; animation: aUp 0.65s 0.1s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .about-hero-eyebrow span {
          display: inline-block; width: 16px; height: 1.5px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 2px;
        }
        .about-hero-h1 {
          font-family: inherit;
          font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800;
          color: var(--zb-text); line-height: 1.1; margin: 0 0 1.2rem;
          opacity: 0; animation: aUp 0.7s 0.22s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .about-hero-h1 em {
          font-style: normal;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .about-hero-sub {
          font-size: clamp(0.95rem, 1.4vw, 1.1rem);
          color: var(--zb-muted); line-height: 1.78; margin: 0;
          opacity: 0; animation: aUp 0.7s 0.34s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* ══ STATS ══ */
        .about-stats-section {
          background: var(--zb-bg);
          padding: 4.5rem 2rem;
        }
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1000px; margin: 0 auto;
        }
        @media (max-width: 760px) { .about-stats-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 420px) { .about-stats-grid { grid-template-columns: 1fr; } }

        .about-stat-card {
          background: var(--zb-panel);
          border-radius: 16px; padding: 2rem 1.5rem;
          text-align: center;
          border: 1px solid var(--zb-border);
          transition: border-color 0.25s, transform 0.25s;
          position: relative; overflow: hidden;
        }
        .about-stat-card::before {
          content: '';
          position: absolute; top: 0; left: 20%; right: 20%; height: 2px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 0 0 4px 4px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .about-stat-card:hover {
          border-color: rgba(148,163,184,0.28);
          transform: translateY(-4px);
        }
        .about-stat-card:hover::before { transform: scaleX(1); }
        .about-stat-num {
          font-family: inherit;
          font-size: 2.6rem; font-weight: 800; color: var(--zb-text); line-height: 1; margin-bottom: 0.4rem;
        }
        .about-stat-label {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--zb-muted);
        }

        /* ══ STORY SECTION ══ */
        .about-story {
          max-width: 1200px; margin: 0 auto;
          padding: 2rem 2rem 5rem;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: start;
        }
        @media (max-width: 860px) {
          .about-story { grid-template-columns: 1fr; gap: 2.5rem; padding: 2rem 1.25rem 3.5rem; }
        }

        .about-story-left {}
        .about-story-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.67rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--zb-cyan); margin-bottom: 1rem;
        }
        .about-story-eyebrow span {
          display: inline-block; width: 18px; height: 1.5px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 2px;
        }
        .about-story-h2 {
          font-family: inherit;
          font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800;
          color: var(--zb-text); line-height: 1.15; margin: 0 0 1.2rem;
        }
        .about-story-h2 em {
          font-style: normal;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .about-story-p {
          font-size: 0.95rem; color: var(--zb-muted); line-height: 1.82; margin: 0 0 1rem;
        }

        /* Timeline */
        .about-timeline { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 0; }
        .about-tl-item {
          display: flex; gap: 1.2rem; align-items: flex-start;
          padding: 1rem 0; position: relative;
        }
        .about-tl-item:not(:last-child)::after {
          content: '';
          position: absolute; left: 38px; top: 42px; bottom: 0;
          width: 1px; background: var(--zb-border);
        }
        .about-tl-year-wrap {
          flex-shrink: 0; width: 76px; height: 36px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--zb-border);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .about-tl-year {
          font-size: 0.72rem; font-weight: 700; color: var(--zb-cyan); letter-spacing: 0.06em;
        }
        .about-tl-event {
          font-size: 0.88rem; color: var(--zb-muted); line-height: 1.55; padding-top: 0.5rem;
        }

        /* ══ FEATURES ══ */
        .about-features-section {
          background: var(--zb-bg);
          padding: 5rem 2rem; position: relative; overflow: hidden;
          border-top: 1px solid var(--zb-border);
        }
        .about-features-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--zb-cyan) 35%, var(--zb-purple) 65%, transparent);
        }
        .about-features-glow {
          position: absolute; bottom: -10rem; right: -8rem;
          width: 40rem; height: 40rem; border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .about-features-inner {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
        }
        .about-features-header {
          text-align: center; margin-bottom: 3rem;
        }
        .about-features-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--zb-border);
          color: var(--zb-cyan); font-size: 0.67rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.35rem 0.95rem; border-radius: 999px; margin-bottom: 1rem;
        }
        .about-features-eyebrow span {
          display: inline-block; width: 16px; height: 1.5px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 2px;
        }
        .about-features-title {
          font-family: inherit;
          font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 800;
          color: var(--zb-text); line-height: 1.15; margin: 0;
        }
        .about-features-title em {
          font-style: normal;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .about-features-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem;
        }
        @media (max-width: 900px) { .about-features-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 500px) { .about-features-grid { grid-template-columns: 1fr; } }

        .about-feature-card {
          background: var(--zb-panel);
          border: 1px solid var(--zb-border);
          border-radius: 16px; padding: 2rem 1.6rem;
          display: flex; flex-direction: column; align-items: flex-start;
          transition: background 0.28s, border-color 0.28s, transform 0.28s;
        }
        .about-feature-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(148,163,184,0.3);
          transform: translateY(-4px);
        }
        .about-feature-icon {
          font-size: 1.8rem; margin-bottom: 1rem;
          width: 52px; height: 52px; border-radius: 12px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--zb-border);
          display: flex; align-items: center; justify-content: center;
        }
        .about-feature-title {
          font-family: inherit;
          font-size: 1.02rem; font-weight: 700; color: var(--zb-text); margin: 0 0 0.6rem;
        }
        .about-feature-desc {
          font-size: 0.85rem; color: var(--zb-muted); line-height: 1.72; margin: 0 0 1.2rem;
        }
        .about-feature-line {
          width: 32px; height: 2px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple)); border-radius: 2px;
          transition: width 0.3s ease;
        }
        .about-feature-card:hover .about-feature-line { width: 56px; }

        /* ══ CTA ══ */
        .about-cta-section {
          padding: 5.5rem 2rem; background: var(--zb-bg); text-align: center;
        }
        .about-cta-box {
          max-width: 680px; margin: 0 auto;
          background: var(--zb-panel); border: 1px solid var(--zb-border);
          border-radius: 20px;
          padding: 3.5rem 3rem; position: relative; overflow: hidden;
        }
        @media (max-width: 600px) { .about-cta-box { padding: 2.5rem 1.75rem; } }
        .about-cta-glow {
          position: absolute; top: -6rem; right: -6rem;
          width: 26rem; height: 26rem; border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.16) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .about-cta-box-inner { position: relative; z-index: 1; }
        .about-cta-h2 {
          font-family: inherit;
          font-size: clamp(1.6rem, 3vw, 2.3rem); font-weight: 800;
          color: var(--zb-text); line-height: 1.15; margin: 0 0 0.9rem;
        }
        .about-cta-h2 em {
          font-style: normal;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .about-cta-p {
          font-size: 0.93rem; color: var(--zb-muted); line-height: 1.75; margin: 0 0 2rem;
        }
        .about-cta-btns {
          display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;
        }
        .about-cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          color: #05060a !important; text-decoration: none;
          padding: 0.88rem 2rem; border-radius: 10px; font-weight: 800;
          font-size: 0.9rem; letter-spacing: 0.04em;
          box-shadow: 0 8px 28px rgba(34,211,238,0.25);
          transition: transform 0.22s, filter 0.22s, box-shadow 0.25s;
        }
        .about-cta-btn-primary:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(168,85,247,0.4);
        }
        .about-cta-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--zb-text) !important; text-decoration: none;
          padding: 0.86rem 2rem; border-radius: 10px; font-weight: 700;
          font-size: 0.9rem; letter-spacing: 0.04em;
          border: 1.5px solid var(--zb-border);
          transition: background 0.25s, border-color 0.25s, transform 0.22s;
        }
        .about-cta-btn-secondary:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(148,163,184,0.4); transform: translateY(-2px);
        }

        @keyframes aUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="about-page">

        {/* ── Hero ── */}
        <div className="about-hero">
          <div className="about-hero-glow" aria-hidden="true" />
          <div className="about-hero-inner">
            <div className="about-hero-eyebrow">
              <span aria-hidden="true" />
              Our Story
              <span aria-hidden="true" />
            </div>
            <h1 className="about-hero-h1">
              About <em>Zetta Byte Media</em><br />Digital &amp; Technology Studio
            </h1>
            <p className="about-hero-sub">
              We handle the engineering, design, and operations needed to turn
              digital ideas into products people actually use — across fintech,
              management systems, and games.
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="about-stats-section" ref={statsRef}>
          <div className="about-stats-grid">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} started={statsStarted} />
            ))}
          </div>
        </div>

        {/* ── Story + Timeline ── */}
        <div className="about-story">
          <div className="about-story-left">
            <div className="about-story-eyebrow">
              <span aria-hidden="true" />
              Who We Are
            </div>
            <h2 className="about-story-h2">
              Built on a Foundation of<br /><em>Digital Craftsmanship</em>
            </h2>
            <p className="about-story-p">
              Founded in 2019, Zetta Byte Media started as a small engineering
              studio with a simple mission — build software that people can
              rely on every day. Over the years we've grown from a handful of
              side projects into a studio trusted by dozens of clients.
            </p>
            <p className="about-story-p">
              Today we design, build, and support a complete range of digital
              products — from fintech tools and management systems to
              browser-based games — all engineered to perform reliably at scale.
            </p>
          </div>

          <div>
            <div className="about-story-eyebrow">
              <span aria-hidden="true" />
              Our Journey
            </div>
            <div className="about-timeline">
              {TIMELINE.map((item) => (
                <div key={item.year} className="about-tl-item">
                  <div className="about-tl-year-wrap">
                    <span className="about-tl-year">{item.year}</span>
                  </div>
                  <p className="about-tl-event">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Features ── */}
        <div className="about-features-section">
          <div className="about-features-glow" aria-hidden="true" />
          <div className="about-features-inner">
            <div className="about-features-header">
              <div className="about-features-eyebrow">
                <span aria-hidden="true" />
                Why Choose Us
                <span aria-hidden="true" />
              </div>
              <h2 className="about-features-title">
                The <em>Zetta Byte Media</em> Difference
              </h2>
            </div>
            <div className="about-features-grid">
              {FEATURES.map((f) => (
                <div key={f.title} className="about-feature-card">
                  <div className="about-feature-icon" aria-hidden="true">{f.icon}</div>
                  <h3 className="about-feature-title">{f.title}</h3>
                  <p className="about-feature-desc">{f.desc}</p>
                  <div className="about-feature-line" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="about-cta-section">
          <div className="about-cta-box">
            <div className="about-cta-glow" aria-hidden="true" />
            <div className="about-cta-box-inner">
              <h2 className="about-cta-h2">
                Ready to Build<br />Something <em>Great</em>?
              </h2>
              <p className="about-cta-p">
                Join the growing list of clients who trust Zetta Byte Media
                for reliable, well-engineered digital products.
              </p>
              <div className="about-cta-btns">
                <a href="/contact" className="about-cta-btn-primary">
                  Contact Us
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="mailto:hello@zettabytemedia.com" className="about-cta-btn-secondary">
                  ✉️ hello@zettabytemedia.com
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}