"use client";

import { useState, useMemo } from "react";

/* ══════════════════════════════
   CONFIG / MOCK DATA
══════════════════════════════ */
const SLOT_TIMES = ["09:00", "11:00", "14:00", "16:00"];

// Bookings keyed by date -> { [time]: { name, service } }
const INITIAL_BOOKINGS = {
  "2026-07-04": { "09:00": { name: "Fatima R.", service: "Signature Cut" } },
  "2026-07-06": { "11:00": { name: "Sara K.", service: "Spa Package" } },
  "2026-07-07": { "14:00": { name: "Amina T.", service: "Basic Cut" } },
};

const SERVICES = [
  { id: "basic-cut", name: "Basic Cut", duration: "30 min", price: 60, desc: "Quick trim and style for everyday upkeep." },
  { id: "signature-cut", name: "Signature Cut", duration: "50 min", price: 120, desc: "Full consultation, wash, cut, and blow-dry finish." },
  { id: "color-gloss", name: "Color & Gloss", duration: "90 min", price: 220, desc: "Full color service with a glossing treatment." },
  { id: "spa-package", name: "Spa Package", duration: "120 min", price: 350, desc: "Hair spa, scalp massage, and deep conditioning." },
  { id: "bridal-updo", name: "Bridal Updo", duration: "75 min", price: 280, desc: "Occasion styling with trial consultation included." },
  { id: "manicure", name: "Manicure", duration: "40 min", price: 80, desc: "Classic manicure with polish of your choice." },
];

const STAFF = [
  { id: 1, name: "Fatima R.", role: "Senior Stylist", status: "available", today: 3 },
  { id: 2, name: "Sara K.", role: "Colorist", status: "busy", today: 5 },
  { id: 3, name: "Amina T.", role: "Junior Stylist", status: "available", today: 2 },
  { id: 4, name: "Layla M.", role: "Nail Technician", status: "available", today: 4 },
  { id: 5, name: "Noor H.", role: "Spa Therapist", status: "off", today: 0 },
];

const TABS = [
  { key: "schedule", label: "Scheduler" },
  { key: "catalog", label: "Service Catalog" },
  { key: "staff", label: "Staff Allocation" },
  { key: "checkout", label: "Checkout" },
];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function fmtDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const AED = (n) => `AED ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function SalonManagementSystemPage() {
  const [activeTab, setActiveTab] = useState("schedule");

  /* ── Scheduler state ── */
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(6); // July (0-indexed)
  const [selectedDate, setSelectedDate] = useState("2026-07-04");
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [clientName, setClientName] = useState("");
  const [chosenSlot, setChosenSlot] = useState(SLOT_TIMES[1]);

  /* ── Checkout state ── */
  const [checkedServices, setCheckedServices] = useState([]);
  const [invoiceMsg, setInvoiceMsg] = useState("");

  const monthCells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const dayBookings = bookings[selectedDate] || {};
  const openSlots = SLOT_TIMES.filter((t) => !dayBookings[t]);

  const goPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const goNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const handleBook = () => {
    if (!clientName.trim() || !chosenSlot) return;
    setBookings((prev) => ({
      ...prev,
      [selectedDate]: { ...(prev[selectedDate] || {}), [chosenSlot]: { name: clientName.trim(), service: "Signature Cut" } },
    }));
    setClientName("");
  };

  const toggleService = (id) => {
    setCheckedServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const invoice = useMemo(() => {
    const subtotal = checkedServices.reduce((sum, id) => sum + (SERVICES.find((s) => s.id === id)?.price || 0), 0);
    const tax = subtotal * 0.05;
    return { subtotal, tax, total: subtotal + tax };
  }, [checkedServices]);

  const handleGenerateInvoice = () => {
    if (checkedServices.length === 0) {
      setInvoiceMsg("Select at least one service first.");
      return;
    }
    setInvoiceMsg(`Invoice generated — ${AED(invoice.total)} due.`);
  };

  return (
    <>
      <style>{`
        :root {
          --cyan: #22D3EE;
          --bg-dark: #05060a;
          --panel-bg: #0b0d14;
          --border: rgba(148, 163, 184, 0.1);
          --text: #E5E7EB;
          --muted: #7C8798;
          --muted-2: #55606f;
          --font-mono: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
        }

        .theme-salon {
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
          background: var(--cyan);
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

        /* ── Tabs ── */
        .pillrow { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .pill {
          background: var(--panel-bg);
          border: 1px solid var(--border);
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.65rem 1.2rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .pill.active {
          background: var(--cyan);
          border-color: var(--cyan);
          color: #0A0E1A;
        }
        .pill:hover:not(.active) {
          background: rgba(255,255,255,0.05);
          color: var(--text);
        }

        .module-body { padding-bottom: 2.5rem; }

        .panel {
          background: var(--panel-bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
        }
        .panel h4 {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text);
          margin: 0 0 1.2rem;
        }

        /* ── Scheduler layout ── */
        .salon-layout {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .salon-layout { grid-template-columns: 1fr; }
        }

        .cal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }
        .cal-head h4 {
          margin: 0;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text);
        }
        .navbtn {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .navbtn:hover { background: rgba(255,255,255,0.07); border-color: rgba(148,163,184,0.3); }

        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }
        .cal-weekday {
          text-align: center;
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--muted);
          padding-bottom: 0.5rem;
        }
        .cal-cell {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 9px;
          background: rgba(255,255,255,0.02);
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .cal-cell.empty { visibility: hidden; cursor: default; }
        .cal-cell:hover:not(.empty) { background: rgba(255,255,255,0.06); color: var(--text); }
        .cal-cell.selected {
          border-color: var(--cyan);
          color: var(--text);
          background: rgba(34,211,238,0.08);
        }
        .cal-dot {
          position: absolute;
          bottom: 6px;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--cyan);
        }

        /* ── Slot list ── */
        .slot-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.2rem;
        }
        .slot-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.8rem 1.1rem;
        }
        .slot-time {
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text);
          width: 60px;
          flex-shrink: 0;
        }
        .slot-name { flex: 1; font-size: 0.85rem; color: var(--text); }
        .slot-name.open { color: var(--muted); }
        .slot-service { font-size: 0.78rem; color: var(--cyan); font-weight: 600; }

        .book-mini {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .book-mini input,
        .book-mini select {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.6rem 0.8rem;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--text);
          outline: none;
        }
        .book-mini input { flex: 1; min-width: 140px; }
        .book-mini input:focus, .book-mini select:focus { border-color: var(--cyan); }
        .book-mini button {
          background: var(--cyan);
          color: #0A0E1A;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.2s, transform 0.2s;
        }
        .book-mini button:hover { filter: brightness(1.08); transform: translateY(-1px); }

        /* ── Service catalog ── */
        .svc-catalog {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 900px) { .svc-catalog { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .svc-catalog { grid-template-columns: 1fr; } }

        .svc-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .svc-card:hover { border-color: rgba(34,211,238,0.35); transform: translateY(-3px); }
        .svc-name { font-weight: 700; font-size: 0.95rem; color: var(--text); margin-bottom: 0.4rem; }
        .svc-duration { font-size: 0.72rem; color: var(--muted); margin-bottom: 0.8rem; }
        .svc-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; margin-bottom: 1rem; }
        .svc-price { font-size: 1.1rem; font-weight: 800; color: var(--cyan); }

        /* ── Staff grid ── */
        .staff-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 900px) { .staff-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .staff-grid { grid-template-columns: 1fr; } }

        .staff-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
        }
        .staff-name { font-weight: 700; font-size: 0.92rem; color: var(--text); margin-bottom: 0.25rem; }
        .staff-role { font-size: 0.75rem; color: var(--muted); margin-bottom: 0.9rem; }
        .staff-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0.7rem;
        }
        .staff-status.available { background: rgba(52,211,153,0.14); color: #34D399; }
        .staff-status.busy      { background: rgba(251,191,36,0.14); color: #FBBF24; }
        .staff-status.off       { background: rgba(148,163,184,0.14); color: var(--muted); }
        .staff-today { font-size: 0.75rem; color: var(--muted); }

        /* ── Checkout ── */
        .checkout-panel {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 860px) { .checkout-panel { grid-template-columns: 1fr; } }

        .svc-check-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .svc-check-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.85rem 1.1rem;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .svc-check-row.checked { border-color: rgba(34,211,238,0.4); background: rgba(34,211,238,0.06); }
        .svc-check-left { display: flex; align-items: center; gap: 0.7rem; }
        .svc-checkbox {
          width: 18px; height: 18px;
          border-radius: 5px;
          border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .svc-check-row.checked .svc-checkbox { background: var(--cyan); border-color: var(--cyan); }
        .svc-check-name { font-size: 0.85rem; color: var(--text); font-weight: 600; }
        .svc-check-price { font-size: 0.85rem; color: var(--muted); font-weight: 700; }

        .invoice-box { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 0.5rem; }
        .invoice-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--muted);
        }
        .invoice-row.total {
          border-top: 1px solid var(--border);
          padding-top: 0.7rem;
          margin-top: 0.3rem;
          font-size: 1rem;
          font-weight: 800;
          color: var(--text);
        }
        .btn-arcade {
          border: none;
          border-radius: 9px;
          padding: 0.8rem 1.2rem;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: transform 0.2s, filter 0.2s;
        }
        .btn-arcade:hover { transform: translateY(-2px); filter: brightness(1.08); }
        .game-msg { margin-top: 0.9rem; font-size: 0.82rem; font-weight: 600; min-height: 1.2em; }

        /* ── WhatsApp float ── */
        .whatsapp-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(34,211,238,0.35);
          z-index: 200;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .whatsapp-float:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 14px 36px rgba(34,211,238,0.5);
        }
        .whatsapp-float svg { width: 28px; height: 28px; }
      `}</style>

      <section className="theme-salon" id="view-salon">
        <div className="wrap module-head">
          <div>
            <div className="eyebrow" style={{ color: "var(--cyan)" }}>
              <span className="eyebrow-dash" aria-hidden="true" />
              Management Systems
            </div>
            <h2 className="section-title">Elegance Salon — Bookings, Services &amp; Staff</h2>
          </div>
          <div className="pillrow" id="salonTabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`pill ${activeTab === t.key ? "active" : ""}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="wrap module-body">

          {/* ── Scheduler ── */}
          {activeTab === "schedule" && (
            <div id="salon-schedule">
              <div className="salon-layout">
                <div className="panel">
                  <div className="cal-head">
                    <button className="navbtn" onClick={goPrevMonth} aria-label="Previous month">‹</button>
                    <h4>{MONTH_NAMES[viewMonth]} {viewYear}</h4>
                    <button className="navbtn" onClick={goNextMonth} aria-label="Next month">›</button>
                  </div>
                  <div className="cal-grid">
                    {WEEKDAYS.map((w, i) => (
                      <div className="cal-weekday" key={`${w}-${i}`}>{w}</div>
                    ))}
                    {monthCells.map((day, idx) => {
                      if (day === null) return <div key={`empty-${idx}`} className="cal-cell empty" />;
                      const dateStr = fmtDate(viewYear, viewMonth, day);
                      const hasBooking = Object.keys(bookings[dateStr] || {}).length > 0;
                      const isSelected = dateStr === selectedDate;
                      return (
                        <div
                          key={dateStr}
                          className={`cal-cell ${isSelected ? "selected" : ""}`}
                          onClick={() => setSelectedDate(dateStr)}
                        >
                          {day}
                          {hasBooking && <span className="cal-dot" aria-hidden="true" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="panel">
                  <h4>Slots — {selectedDate}</h4>
                  <div className="slot-list">
                    {SLOT_TIMES.map((time) => {
                      const b = dayBookings[time];
                      return (
                        <div className="slot-row" key={time}>
                          <span className="slot-time">{time}</span>
                          <span className={`slot-name ${b ? "" : "open"}`}>{b ? b.name : "Open slot"}</span>
                          {b && <span className="slot-service">{b.service}</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div className="book-mini">
                    <input
                      type="text"
                      placeholder="Client name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                    <select value={chosenSlot} onChange={(e) => setChosenSlot(e.target.value)}>
                      {(openSlots.length ? openSlots : SLOT_TIMES).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <button onClick={handleBook}>Book</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Service Catalog ── */}
          {activeTab === "catalog" && (
            <div id="salon-catalog">
              <div className="panel">
                <h4>Service Tier Catalog</h4>
                <div className="svc-catalog">
                  {SERVICES.map((s) => (
                    <div className="svc-card" key={s.id}>
                      <div className="svc-name">{s.name}</div>
                      <div className="svc-duration">{s.duration}</div>
                      <p className="svc-desc">{s.desc}</p>
                      <div className="svc-price">{AED(s.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Staff Allocation ── */}
          {activeTab === "staff" && (
            <div id="salon-staff">
              <div className="panel">
                <h4>Specialist Availability</h4>
                <div className="staff-grid">
                  {STAFF.map((s) => (
                    <div className="staff-card" key={s.id}>
                      <div className="staff-name">{s.name}</div>
                      <div className="staff-role">{s.role}</div>
                      <div className={`staff-status ${s.status}`}>{s.status}</div>
                      <div className="staff-today">{s.today} appointments today</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Checkout ── */}
          {activeTab === "checkout" && (
            <div id="salon-checkout">
              <div className="checkout-panel">
                <div className="panel">
                  <h4>Select Services</h4>
                  <div className="svc-check-list">
                    {SERVICES.map((s) => {
                      const checked = checkedServices.includes(s.id);
                      return (
                        <div
                          key={s.id}
                          className={`svc-check-row ${checked ? "checked" : ""}`}
                          onClick={() => toggleService(s.id)}
                        >
                          <div className="svc-check-left">
                            <span className="svc-checkbox">{checked ? "✓" : ""}</span>
                            <span className="svc-check-name">{s.name}</span>
                          </div>
                          <span className="svc-check-price">{AED(s.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="panel">
                  <h4>Invoice</h4>
                  <div className="invoice-box">
                    <div className="invoice-row"><span>Subtotal</span><span>{AED(invoice.subtotal)}</span></div>
                    <div className="invoice-row"><span>VAT (5%)</span><span>{AED(invoice.tax)}</span></div>
                    <div className="invoice-row total"><span>Total</span><span>{AED(invoice.total)}</span></div>
                  </div>
                  <button
                    className="btn-arcade"
                    style={{ width: "100%", marginTop: 14, background: "var(--cyan)", color: "#0A0E1A" }}
                    onClick={handleGenerateInvoice}
                  >
                    Generate Invoice
                  </button>
                  <div className="game-msg" style={{ color: "var(--cyan)" }}>{invoiceMsg}</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Floating WhatsApp contact button (Salon / cyan theme) ── */}
      <a
        className="whatsapp-float"
        href="https://wa.me/971500000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 3C9.4 3 4 8.4 4 15c0 2.2.6 4.3 1.7 6.1L4 29l8.1-1.6c1.7.9 3.7 1.4 5.9 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3Z"
            fill="#0A0E1A"
          />
          <path
            d="M22.4 18.8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z"
            fill="#0A0E1A"
          />
        </svg>
      </a>
    </>
  );
}