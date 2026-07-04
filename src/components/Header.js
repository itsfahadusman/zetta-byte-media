"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/", view: "home" },
  { label: "Products", href: "/products", view: "products" },
  { label: "About", href: "/about", view: "about" },
  { label: "Contact", href: "/contact", view: "contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <style>{`
        /* ── Header wrapper ── */
        .site-header {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 50;
          background: #0A0D12;
          border-bottom: 1px solid rgba(148, 163, 184, 0.14);
          transition: background 0.35s, box-shadow 0.35s, border-color 0.35s;
        }
        .site-header.scrolled {
          background: rgba(10, 13, 18, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
          border-bottom-color: rgba(148, 163, 184, 0.22);
        }

        /* ── Inner bar ── */
        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        /* ── Brand ── */
        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .z-mark {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.35));
        }
        .z-mark svg { width: 100%; height: 100%; display: block; }
        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: 0.92rem;
          letter-spacing: 0.06em;
          color: #F1F5F9;
          white-space: nowrap;
        }
        .brand-text span {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-weight: 500;
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          color: #64748B;
          margin-top: 3px;
        }

        /* ── Tabs nav ── */
        .tabs {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 999px;
          padding: 0.3rem;
        }
        .tabs a {
          appearance: none;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #94A3B8;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          transition: color 0.25s, background 0.25s;
          text-decoration: none;
          display: inline-block;
        }
        .tabs a:hover {
          color: #E2E8F0;
        }
        .tabs a.active {
          color: #0A0D12;
          background: linear-gradient(90deg, #22D3EE 0%, #A855F7 100%);
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.35);
        }

        /* ── Status readout ── */
        .navstatus {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #64748B;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .dot-live {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ADE80;
          box-shadow: 0 0 0 rgba(74, 222, 128, 0.6);
          animation: pulse-dot 2s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%   { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.55); }
          70%  { box-shadow: 0 0 0 7px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }

        /* ── Mobile trigger ── */
        .menu-trigger {
          display: none;
          appearance: none;
          border: 1px solid rgba(148, 163, 184, 0.18);
          background: rgba(255, 255, 255, 0.03);
          color: #E2E8F0;
          border-radius: 10px;
          padding: 0.5rem;
          cursor: pointer;
        }

        /* ── Mobile panel ── */
        .mobile-panel {
          display: none;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem 1.25rem 1.5rem;
          border-top: 1px solid rgba(148, 163, 184, 0.14);
          background: #0A0D12;
        }
        .mobile-panel a {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #CBD5E1;
          text-decoration: none;
          padding: 0.85rem 0.25rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-panel a.active { color: #22D3EE; }
        .mobile-panel .navstatus {
          margin-top: 0.75rem;
          padding: 0.25rem;
        }

        @media (max-width: 860px) {
          .tabs { display: none; }
          .navstatus { display: none; }
          .menu-trigger { display: inline-flex; }
          .mobile-panel.open { display: flex; }
          .header-inner { height: 64px; padding: 0 1.25rem; }
        }
      `}</style>

      <header className={`site-header ${scrolled ? "scrolled" : "top"}`}>
        <div className="header-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <span className="z-mark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="zg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
                <path
                  d="M15 20 H85 L45 48 H85 V60 H55 L15 80 V68 L55 48 H15 Z"
                  fill="url(#zg)"
                />
              </svg>
            </span>
            <span className="brand-text">
              ZETTA BYTE MEDIA
              <span>DIGITAL &amp; TECHNOLOGY STUDIO</span>
            </span>
          </Link>

          <nav className="tabs">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.view}
                href={link.href}
                className={isActive(link.href) ? "active" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="navstatus">
            <span className="dot-live" /> SYSTEMS NOMINAL
          </div>

          <button
            className="menu-trigger"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={`mobile-panel ${open ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.view}
              href={link.href}
              className={isActive(link.href) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="navstatus">
            <span className="dot-live" /> SYSTEMS NOMINAL
          </div>
        </div>
      </header>
    </>
  );
}