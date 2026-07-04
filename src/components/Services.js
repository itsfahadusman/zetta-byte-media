const SERVICES = [
  {
    key: "ledger",
    className: "c-ledger",
    title: "Fintech",
    description:
      "Outflow tracking, budget controls, and reporting for people and businesses who need clarity over where money moves.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
          stroke="#00E676"
          strokeWidth="1.6"
        />
        <path d="M3 10h18M7 14h4" stroke="#00E676" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "salon",
    className: "c-salon",
    title: "Management Systems",
    description:
      "Appointment scheduling, service catalogs, staff allocation, and checkout tools built for service-led businesses.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke="#22D3EE" strokeWidth="1.6" />
        <path d="M3 9h18M8 2v4M16 2v4" stroke="#22D3EE" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "arcade",
    className: "c-arcade",
    title: "Games",
    description:
      "Playable, on-brand web experiences — from light interactive moments to full session games with live leaderboards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="12" rx="3" stroke="#A855F7" strokeWidth="1.6" />
        <path
          d="M7 12h4M9 10v4M15.5 11.5h.01M17.5 13.5h.01"
          stroke="#A855F7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Services() {
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
          --zb-green: #00E676;
          --zb-text: #E5E7EB;
          --zb-muted: #7C8798;
        }

        .services-section {
          position: relative;
          background: var(--zb-bg);
          padding: 6rem 2rem 7rem;
          font-family: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        @media (max-width: 600px) {
          .services-section { padding: 4.5rem 1.25rem 5rem; }
        }

        .wrap { max-width: 1280px; margin: 0 auto; }

        /* ── Head ── */
        .services-head {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 3.5rem;
        }
        .eyebrow {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--zb-cyan);
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: clamp(1.9rem, 3.6vw, 2.7rem);
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--zb-text);
          margin: 0 0 1rem;
        }
        .services-head .lede {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--zb-muted);
          margin: 0;
        }

        /* ── Card grid ── */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 960px) {
          .card-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
        }

        /* ── Card ── */
        .app-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--zb-panel);
          border: 1px solid var(--zb-border);
          border-radius: 16px;
          padding: 1.8rem 1.6rem;
          text-align: left;
          overflow: hidden;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), border-color 0.28s, box-shadow 0.28s;
        }
        .app-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--card-accent, var(--zb-cyan));
          opacity: 0.7;
          transition: opacity 0.28s;
        }
        .app-card::after {
          content: '';
          position: absolute;
          top: -40%; right: -30%;
          width: 60%;
          height: 80%;
          background: radial-gradient(circle, var(--card-accent, var(--zb-cyan)) 0%, transparent 70%);
          opacity: 0.08;
          pointer-events: none;
          transition: opacity 0.28s;
        }
        .app-card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--card-accent, var(--zb-cyan)) 45%, var(--zb-border));
          box-shadow: 0 20px 44px rgba(0,0,0,0.4);
        }
        .app-card:hover::after { opacity: 0.16; }

        .c-ledger { --card-accent: #00E676; }
        .c-salon  { --card-accent: #22D3EE; }
        .c-arcade { --card-accent: #A855F7; }

        /* ── Icon ── */
        .app-icon {
          width: 46px; height: 46px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--zb-border);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.3rem;
        }
        .app-icon svg { width: 22px; height: 22px; }

        .app-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--zb-text);
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
        }
        .app-card p {
          font-size: 0.85rem;
          line-height: 1.7;
          color: var(--zb-muted);
          margin: 0;
        }
      `}</style>

      <div className="wrap services-section" id="services">
        <div className="services-head">
          <div className="eyebrow">What We Do</div>
          <h2 className="section-title">Our Services</h2>
          <p className="lede">
            Three focused disciplines, one engineering team — each one backed
            by fully working products.
          </p>
        </div>

        <div className="card-grid">
          {SERVICES.map(({ key, className, title, description, icon }) => (
            <div key={key} className={`app-card ${className}`}>
              <div className="app-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}