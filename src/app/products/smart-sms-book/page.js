"use client";

import { useState, useMemo } from "react";

/* ── Config ── */
const AED_TO_USD = 0.2723;
const BUDGETS = { personal: 6000, business: 150000 };

const CATEGORY_COLORS = {
  Dining: { bg: "rgba(248,113,113,0.14)", text: "#F87171" },
  Groceries: { bg: "rgba(52,211,153,0.14)", text: "#34D399" },
  Utilities: { bg: "rgba(34,211,238,0.14)", text: "#22D3EE" },
  Rent: { bg: "rgba(251,191,36,0.14)", text: "#FBBF24" },
  Transport: { bg: "rgba(168,85,247,0.14)", text: "#A855F7" },
  Supplies: { bg: "rgba(96,165,250,0.14)", text: "#60A5FA" },
  Marketing: { bg: "rgba(244,114,182,0.14)", text: "#F472B6" },
  Misc: { bg: "rgba(148,163,184,0.14)", text: "#94A3B8" },
};
const CATEGORIES = Object.keys(CATEGORY_COLORS);

/* ── Mock seed data (today is 2026-07-04) ── */
const SEED_ENTRIES = [
  { id: 1, date: "2026-07-04", desc: "Grocery — Carrefour", category: "Dining", profile: "personal", subProfile: null, amount: 184.5 },
  { id: 2, date: "2026-07-02", desc: "Grid electricity bill", category: "Utilities", profile: "personal", subProfile: "Self", amount: 420 },
  { id: 3, date: "2026-06-28", desc: "Fuel top-up", category: "Transport", profile: "personal", subProfile: "Self", amount: 300 },
  { id: 4, date: "2026-06-20", desc: "Packaging supplies", category: "Supplies", profile: "business", subProfile: "Shop A", amount: 940 },
  { id: 5, date: "2026-06-14", desc: "Shop rent", category: "Rent", profile: "business", subProfile: "Shop B", amount: 4000 },
];

const SCOPE_LABELS = { daily: "Today", monthly: "This Month", yearly: "This Year", custom: "Custom Range" };

function inScope(dateStr, scope, customFrom, customTo) {
  const d = new Date(dateStr);
  const now = new Date("2026-07-04");

  if (scope === "daily") return d.toDateString() === now.toDateString();
  if (scope === "monthly") return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  if (scope === "yearly") return d.getFullYear() === now.getFullYear();
  if (scope === "custom") {
    if (!customFrom || !customTo) return true;
    return d >= new Date(customFrom) && d <= new Date(customTo);
  }
  return true;
}

function fmtAED(amount, decimals = 2) {
  const n = Number(amount);
  const formatted = n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: decimals });
  return `AED ${formatted}`;
}

export default function SmartSmsBookPage() {
  const [profile, setProfile] = useState("personal");
  const [scope, setScope] = useState("daily");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [entries, setEntries] = useState(SEED_ENTRIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ date: "", desc: "", category: CATEGORIES[0], amount: "" });

  const budget = BUDGETS[profile];

  const filtered = useMemo(() => {
    return entries
      .filter((e) => e.profile === profile)
      .filter((e) => inScope(e.date, scope, customFrom, customTo))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [entries, profile, scope, customFrom, customTo]);

  const stats = useMemo(() => {
    const total = filtered.reduce((sum, e) => sum + e.amount, 0);
    const count = filtered.length;
    const avg = count ? total / count : 0;
    const percentUsed = Math.min(Math.round((total / budget) * 100), 100);
    const remaining = Math.round(budget - total);
    const usd = (total * AED_TO_USD).toFixed(2);

    return { total, count, avg, percentUsed, remaining, usd };
  }, [filtered, budget]);

  const handleLogEntry = (e) => {
    e.preventDefault();
    if (!form.date || !form.desc || !form.amount) return;
    setEntries((prev) => [
      ...prev,
      { id: Date.now(), date: form.date, desc: form.desc, category: form.category, profile, subProfile: null, amount: Number(form.amount) },
    ]);
    setModalOpen(false);
    setForm({ date: "", desc: "", category: CATEGORIES[0], amount: "" });
  };

  const circumference = 2 * Math.PI * 15.9155;
  const dash = `${(stats.percentUsed / 100) * circumference} ${circumference}`;

  return (
    <>
      <style>{`
        :root {
          --matrix: #00E676;
          --bg-dark: #05060a;
          --panel-bg: #0b0d14;
          --border: rgba(148, 163, 184, 0.1);
          --text: #E5E7EB;
          --muted: #7C8798;
          --muted-2: #55606f;
          --font-mono: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        .theme-ledger {
          background: var(--bg-dark);
          color: var(--text);
          min-height: 100dvh;
          font-family: var(--font-mono);
        }

        .wrap { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        @media (max-width: 600px) { .wrap { padding: 0 1.25rem; } }

        /* ── Head ── */
        .module-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding: 1.5rem 0 1.25rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.5rem;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 0.7rem;
        }
        .eyebrow-dash {
          display: inline-block;
          width: 14px; height: 2px;
          background: var(--matrix);
          border-radius: 2px;
        }
        .section-title {
          font-size: clamp(1.4rem, 2.6vw, 2rem);
          font-weight: 800;
          color: var(--text);
          margin: 0;
          line-height: 1.25;
          max-width: 640px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          border-radius: 9px;
          padding: 0.8rem 1.4rem;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: transform 0.2s, filter 0.2s;
          white-space: nowrap;
        }
        .btn-primary:hover { transform: translateY(-2px); filter: brightness(1.08); }

        /* ── Body layout ── */
        .module-body { padding-bottom: 5rem; }

        .ledger-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .ledger-grid { grid-template-columns: 1fr; }
        }

        /* ── Panel ── */
        .panel {
          background: var(--panel-bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.4rem;
        }
        .panel h4 {
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 0.9rem;
        }

        /* Segmented control */
        .seg {
          display: flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 4px;
          gap: 4px;
        }
        .seg button {
          flex: 1;
          background: transparent;
          border: none;
          border-radius: 999px;
          padding: 0.55rem 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .seg button.active {
          background: var(--matrix);
          color: #05060a;
        }

        /* Pill row */
        .pillrow {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .pill {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .pill.active {
          background: var(--matrix);
          border-color: var(--matrix);
          color: #05060a;
        }
        .pill:hover:not(.active) {
          background: rgba(255,255,255,0.06);
          color: var(--text);
        }

        .field { margin-top: 0.7rem; }
        .field label {
          display: block;
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.35rem;
        }
        .field input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 0.55rem 0.7rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s;
        }
        .field input:focus { border-color: var(--matrix); }

        /* ── KPI row ── */
        .kpi-row {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 700px) { .kpi-row { grid-template-columns: 1fr; } }

        .kpi-card {
          background: var(--panel-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.1rem 1.3rem;
        }
        .kpi-card.gauge-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .gauge-wrap {
          position: relative;
          width: 56px; height: 56px;
          flex-shrink: 0;
        }
        .gauge-wrap svg { transform: rotate(-90deg); }
        .gauge-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text);
        }

        .kpi-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.4rem;
        }
        .kpi-value {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text);
          line-height: 1;
        }
        .kpi-sub {
          font-size: 0.72rem;
          color: var(--muted);
          margin-top: 0.5rem;
        }
        .kpi-sub.positive { color: var(--matrix); font-weight: 600; }

        /* ── Ledger table ── */
        .ledger-table-wrap {
          background: var(--panel-bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .ledger-table-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.3rem;
          border-bottom: 1px solid var(--border);
        }
        .ledger-table-head-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text);
        }
        table.ledger {
          width: 100%;
          border-collapse: collapse;
        }
        table.ledger thead th {
          text-align: left;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          padding: 0.9rem 1.3rem;
          border-bottom: 1px solid var(--border);
        }
        table.ledger tbody td {
          padding: 0.95rem 1.3rem;
          font-size: 0.85rem;
          color: var(--text);
          border-bottom: 1px solid var(--border);
        }
        table.ledger tbody tr:last-child td { border-bottom: none; }
        table.ledger tbody tr:hover { background: rgba(255,255,255,0.02); }
        .ledger-empty {
          padding: 2.5rem 1.3rem;
          text-align: center;
          color: var(--muted);
          font-size: 0.85rem;
        }
        .date-cell { color: var(--muted); }
        .subprofile-cell { color: var(--muted-2); }
        .amount-cell {
          text-align: right;
          font-weight: 700;
          color: var(--text);
          font-family: var(--font-mono);
          font-size: 0.92rem;
        }
        .cat-chip {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
        }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2,3,6,0.7);
          backdrop-filter: blur(3px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .modal-box {
          background: var(--panel-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          width: 100%;
          max-width: 440px;
          padding: 1.8rem;
        }
        .modal-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 1.2rem;
        }
        .modal-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--muted);
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.05); color: var(--text); }
        select.field-select {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 0.55rem 0.7rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text);
          outline: none;
        }
      `}</style>

      <section className="theme-ledger" id="view-ledger">
        <div className="wrap module-head">
          <div>
            <div className="eyebrow" style={{ color: "var(--matrix)" }}>
              <span className="eyebrow-dash" aria-hidden="true" />
              Fintech
            </div>
            <h2 className="section-title">Ledger Grid Pro — Outflow &amp; Budget Control</h2>
          </div>
          <button
            className="btn btn-primary"
            style={{ background: "var(--matrix)", color: "#0A0E1A" }}
            onClick={() => setModalOpen(true)}
          >
            + Log Outflow Entry
          </button>
        </div>

        <div className="wrap module-body">
          <div className="ledger-grid">
            {/* ── Left column: filters ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="panel">
                <h4>Profile</h4>
                <div className="seg">
                  <button className={profile === "personal" ? "active" : ""} onClick={() => setProfile("personal")}>
                    Personal
                  </button>
                  <button className={profile === "business" ? "active" : ""} onClick={() => setProfile("business")}>
                    Business
                  </button>
                </div>
              </div>

              <div className="panel">
                <h4>TimeScope</h4>
                <div className="pillrow">
                  {["daily", "monthly", "yearly", "custom"].map((s) => (
                    <button key={s} className={`pill ${scope === s ? "active" : ""}`} onClick={() => setScope(s)}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
                {scope === "custom" && (
                  <div style={{ marginTop: 12 }}>
                    <div className="field">
                      <label>From</label>
                      <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
                    </div>
                    <div className="field">
                      <label>To</label>
                      <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right column: KPIs + table ── */}
            <div>
              <div className="kpi-row">
                {/* Budget gauge card */}
                <div className="kpi-card gauge-card">
                  <div className="gauge-wrap">
                    <svg width="56" height="56" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="var(--matrix)" strokeWidth="3" strokeLinecap="round"
                        strokeDasharray={dash}
                      />
                    </svg>
                    <div className="gauge-label">{stats.percentUsed}%</div>
                  </div>
                  <div>
                    <div className="kpi-label">Budget Used</div>
                    <div className="kpi-value">{fmtAED(Math.round(stats.total), 0)}</div>
                    <div className="kpi-sub positive">▲ {fmtAED(stats.remaining, 0)} remaining</div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-label">Total Outflow (Scope)</div>
                  <div className="kpi-value">{fmtAED(stats.total)}</div>
                  <div className="kpi-sub">USD {stats.usd}</div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-label">Avg / Entry</div>
                  <div className="kpi-value">{fmtAED(stats.avg)}</div>
                  <div className="kpi-sub">{stats.count} entries in scope</div>
                </div>
              </div>

              <div className="ledger-table-wrap">
                <div className="ledger-table-head">
                  <div className="ledger-table-head-title">Ledger Stream — {SCOPE_LABELS[scope]}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-2)" }}>
                    {filtered.length} entries
                  </div>
                </div>

                <table className="ledger">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Sub-Profile</th>
                      <th style={{ textAlign: "right" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((e) => {
                      const cat = CATEGORY_COLORS[e.category] || CATEGORY_COLORS.Misc;
                      return (
                        <tr key={e.id}>
                          <td className="date-cell">{e.date}</td>
                          <td>{e.desc}</td>
                          <td>
                            <span className="cat-chip" style={{ background: cat.bg, color: cat.text }}>
                              {e.category}
                            </span>
                          </td>
                          <td className="subprofile-cell">{e.subProfile || "—"}</td>
                          <td className="amount-cell">{fmtAED(e.amount)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filtered.length === 0 && (
                  <div className="ledger-empty">No entries match the current filters.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Log Outflow Modal ── */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Log Outflow Entry</h3>
            <form onSubmit={handleLogEntry}>
              <div className="field">
                <label>Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div className="field">
                <label>Description</label>
                <input
                  type="text"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="e.g. Grocery — Carrefour"
                  required
                />
              </div>
              <div className="field">
                <label>Category</label>
                <select className="field-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Amount (AED)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: "var(--matrix)", color: "#0A0E1A", flex: 1 }}>
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}