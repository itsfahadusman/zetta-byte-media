"use client";

import { Rocket, Users2, Layers, Headset } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const STATS = [
  { icon: Rocket, value: 5, suffix: "+", label: "Years Building", desc: "Shipping digital products since 2019" },
  { icon: Users2, value: 40, suffix: "+", label: "Clients Served", desc: "Startups and businesses across industries" },
  { icon: Layers, value: 3, suffix: "", label: "Product Lines", desc: "Fintech, management systems, and games" },
  { icon: Headset, value: 24, suffix: "/7", label: "Systems Monitoring", desc: "Round-the-clock uptime and support" },
];

function useCountUp(target, duration = 1600) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease out expo
            const eased = 1 - Math.pow(2, -10 * progress);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [value, ref];
}

function StatCard({ stat, index }) {
  const Icon = stat.icon;
  const [count, ref] = useCountUp(stat.value, 1400 + index * 150);

  return (
    <motion.div
      ref={ref}
      className="stats-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top gradient accent line */}
      <div className="stats-card-topbar" />

      {/* Icon */}
      <div className="stats-icon-wrap">
        <Icon style={{ width: 22, height: 22, color: "#05060a" }} />
      </div>

      {/* Number */}
      <div className="stats-number">
        {count}{stat.suffix}
      </div>

      {/* Label */}
      <div className="stats-label">{stat.label}</div>

      {/* Desc */}
      <div className="stats-desc">{stat.desc}</div>

      {/* Hover glow */}
      <div className="stats-card-glow" />
    </motion.div>
  );
}

export default function Stats() {
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
        .stats-section {
          position: relative;
          background: var(--zb-bg);
          padding: 6.5rem 0 7rem;
          overflow: hidden;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        /* Texture overlay */
        .stats-texture {
          position: absolute; inset: 0; z-index: 0;
          pointer-events: none; opacity: 0.05;
          background-image: radial-gradient(circle, #E5E7EB 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Decorative blobs */
        .stats-blob1 {
          position: absolute; top: -10rem; left: -8rem;
          width: 40rem; height: 40rem; border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.16) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .stats-blob2 {
          position: absolute; bottom: -12rem; right: -8rem;
          width: 44rem; height: 44rem; border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.16) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }

        /* Horizontal rule across top of section */
        .stats-top-rule {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--zb-cyan) 40%, var(--zb-purple) 60%, transparent);
          z-index: 1;
        }

        /* ── Container ── */
        .stats-container {
          position: relative; z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        @media (max-width: 600px) { .stats-container { padding: 0 1.25rem; } }

        /* ── Header ── */
        .stats-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          gap: 2rem;
          margin-bottom: 4rem;
        }
        @media (max-width: 768px) {
          .stats-header { grid-template-columns: 1fr; text-align: center; }
        }

        .stats-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          color: var(--zb-cyan);
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.36rem 0.9rem; border-radius: 999px;
          margin-bottom: 1.1rem;
        }
        .stats-eyebrow-pip {
          width: 6px; height: 6px; border-radius: 50%; background: var(--zb-cyan);
          animation: sPip 2.2s ease-in-out infinite;
        }
        @keyframes sPip {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.55); }
        }

        .stats-title {
          font-family: inherit;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--zb-text);
          line-height: 1.1;
          margin: 0;
        }
        .stats-title em {
          font-style: normal;
          background: linear-gradient(90deg, var(--zb-cyan) 0%, var(--zb-purple) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stats-header-right {
          padding-bottom: 0.2rem;
        }
        .stats-subtitle {
          font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          color: var(--zb-muted);
          line-height: 1.75;
          margin: 0 0 1.4rem;
        }
        .stats-header-rule {
          width: 52px; height: 2px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .stats-header-rule { margin: 0 auto; }
        }

        /* ── Grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr 1fr; gap: 1rem; } }

        /* ── Card ── */
        .stats-card {
          position: relative;
          background: var(--zb-panel);
          border: 1px solid var(--zb-border);
          border-radius: 16px;
          padding: 2rem 1.5rem 1.75rem;
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }
        .stats-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(148,163,184,0.28);
          transform: translateY(-6px);
        }

        /* Top accent bar — hidden until hover */
        .stats-card-topbar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--zb-cyan), var(--zb-purple));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.38s cubic-bezier(0.22,1,0.36,1);
          border-radius: 2px 2px 0 0;
        }
        .stats-card:hover .stats-card-topbar { transform: scaleX(1); }

        /* Icon */
        .stats-icon-wrap {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, var(--zb-cyan), var(--zb-purple));
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.4rem;
          box-shadow: 0 8px 20px rgba(34,211,238,0.22);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .stats-card:hover .stats-icon-wrap {
          transform: rotate(-6deg) scale(1.08);
          box-shadow: 0 10px 28px rgba(168,85,247,0.35);
        }

        /* Number */
        .stats-number {
          font-family: inherit;
          font-size: clamp(2.4rem, 3.5vw, 3.2rem);
          font-weight: 800;
          color: var(--zb-text);
          line-height: 1;
          margin-bottom: 0.35rem;
          letter-spacing: -0.02em;
        }

        /* Label */
        .stats-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--zb-cyan);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.65rem;
        }

        /* Desc */
        .stats-desc {
          font-size: 0.8rem;
          color: var(--zb-muted);
          line-height: 1.6;
          border-top: 1px solid var(--zb-border);
          padding-top: 0.65rem;
          margin-top: 0.1rem;
        }

        /* Hover radial glow from bottom */
        .stats-card-glow {
          position: absolute;
          bottom: -4rem; left: 50%;
          transform: translateX(-50%);
          width: 12rem; height: 8rem;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stats-card:hover .stats-card-glow { opacity: 1; }
      `}</style>

      <section className="stats-section">
        <div className="stats-top-rule" />
        <div className="stats-texture" />
        <div className="stats-blob1" />
        <div className="stats-blob2" />

        <div className="stats-container">

          {/* ── Header ── */}
          <motion.div
            className="stats-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="stats-eyebrow">
                <span className="stats-eyebrow-pip" />
                Our Track Record
              </div>
              <h2 className="stats-title">
                Trusted By<br /><em>Growing Teams</em>
              </h2>
            </div>

            <div className="stats-header-right">
              <p className="stats-subtitle">
                Solid engineering. Modern products. Dependable support —
                release after release, client after client.
              </p>
              <div className="stats-header-rule" />
            </div>
          </motion.div>

          {/* ── Cards ── */}
          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}