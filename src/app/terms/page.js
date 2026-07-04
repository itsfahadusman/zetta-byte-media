// src/app/terms/page.js
"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

export default function TermsPage() {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By creating an account, or otherwise accessing or using the App, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.",
    },
    {
      title: "2. Use of the App",
      content:
        "You agree to use the App only for lawful purposes and in accordance with these Terms. You are responsible for the accuracy of any information, entries, or records you create within the App.",
    },
    {
      title: "3. User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorized use of your account.",
    },
    {
      title: "4. Intellectual Property",
      content:
        "All content, features, and functionality of the App, including but not limited to design, text, graphics, logos, and software, are the property of Zetta Byte Media and are protected by applicable intellectual property laws.",
    },
    {
      title: "5. Prohibited Activities",
      content:
        "You agree not to use the App for any unlawful or fraudulent purpose, attempt to gain unauthorized access to any part of the App or its systems, reverse engineer or decompile the App, or interfere with its integrity or performance.",
    },
    {
      title: "6. Termination",
      content:
        "We may suspend or terminate your access to the App at any time, with or without notice, if we believe you have violated these Terms or engaged in conduct harmful to the App or its users.",
    },
    {
      title: "7. Disclaimer of Warranties",
      content:
        "The App is provided \"as is\" and \"as available\" without warranties of any kind, either express or implied. We do not guarantee that the App will be uninterrupted, secure, or error-free.",
    },
    {
      title: "8. Limitation of Liability",
      content:
        "To the fullest extent permitted by law, Zetta Byte Media shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the App.",
    },
    {
      title: "9. Governing Law",
      content:
        "These Terms shall be governed by and construed in accordance with applicable local laws, without regard to conflict of law principles.",
    },
    {
      title: "10. Changes to These Terms",
      content:
        "We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page and updating the \"Last updated\" date above.",
    },
  ];

  return (
    <main className="terms-main">
      <style>{`
        .terms-main {
          position: relative;
          min-height: 100vh;
          background: #0A0D12;
          color: #E2E8F0;
          padding: 9.5rem 1.5rem 6rem;
          overflow: hidden;
          isolation: isolate;
        }

        /* ── Grid backdrop ── */
        .terms-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
          background-size: 44px 44px;
          -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 10%, #000 40%, transparent 90%);
          mask-image: radial-gradient(ellipse 70% 55% at 50% 10%, #000 40%, transparent 90%);
          z-index: 0;
        }

        /* ── Ambient glows ── */
        .terms-glow {
          position: absolute;
          top: -180px; left: -140px;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.16) 0%, transparent 70%);
          filter: blur(10px);
          z-index: 0;
          pointer-events: none;
        }
        .terms-glow-2 {
          position: absolute;
          bottom: -260px; right: -160px;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 70%);
          filter: blur(10px);
          z-index: 0;
          pointer-events: none;
        }

        .terms-inner {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .terms-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94A3B8;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 999px;
          padding: 0.45rem 0.95rem;
          margin-bottom: 1.5rem;
        }
        .terms-title {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 4vw, 2.75rem);
          line-height: 1.12;
          letter-spacing: -0.01em;
          color: #F1F5F9;
          margin: 0 0 0.9rem;
        }
        .terms-title .grad-text {
          background: linear-gradient(90deg, #22D3EE 0%, #A855F7 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .terms-updated {
          display: inline-block;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: #64748B;
          margin-bottom: 3rem;
        }

        /* ── Cards ── */
        .terms-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .terms-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 16px;
          padding: 1.5rem 1.65rem;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .terms-card:hover {
          border-color: rgba(34, 211, 238, 0.3);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-2px);
        }
        .terms-card h2 {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 600;
          font-size: 1.02rem;
          color: #F1F5F9;
          margin: 0 0 0.55rem;
        }
        .terms-card p {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          line-height: 1.7;
          color: #94A3B8;
          margin: 0;
        }

        /* ── Contact footer ── */
        .terms-contact {
          margin-top: 2.5rem;
          text-align: center;
          padding: 1.75rem;
          border-top: 1px solid rgba(148, 163, 184, 0.14);
        }
        .terms-contact p {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          color: #94A3B8;
          margin: 0;
        }
        .terms-contact strong {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-weight: 600;
          color: #22D3EE;
        }
        .terms-contact strong:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .terms-main { padding: 7rem 1.1rem 4rem; }
        }
      `}</style>

      <div className="terms-grid" aria-hidden="true" />
      <div className="terms-glow" aria-hidden="true" />
      <div className="terms-glow-2" aria-hidden="true" />

      <div className="terms-inner">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="terms-eyebrow">Legal</span>
          <h1 className="terms-title">
            Terms &amp; <span className="grad-text">Conditions</span>
          </h1>
          <span className="terms-updated">Last updated: July 2, 2026</span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={0.05}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "#94A3B8",
            marginBottom: "2.5rem",
          }}
        >
          These Terms &amp; Conditions ("Terms") govern your access to and use
          of Zetta Byte Media's applications and services (collectively, the
          "App"). By accessing or using the App, you agree to be bound by
          these Terms. If you do not agree, please do not use the App.
        </motion.p>

        <div className="terms-list">
          {terms.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={0.05 * (i + 1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="terms-card"
            >
              <h2>{t.title}</h2>
              <p>{t.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="terms-contact"
        >
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <strong>legal@zettabytemedia.com</strong>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}