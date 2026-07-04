// src/app/privacy/page.js
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

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: (
        <>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> such as your name, email
              address, and profile details provided when you register or use
              the App.
            </li>
            <li>
              <strong>Usage Data:</strong> such as entries, bookings, service
              selections, and other content you create within the App.
            </li>
            <li>
              <strong>Device Information:</strong> such as device model,
              operating system, unique device identifiers, and mobile network
              information.
            </li>
            <li>
              <strong>Log Data:</strong> such as IP address, app version, and
              access times, collected automatically when you use the App.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide, operate, and maintain the App and its features.</li>
            <li>Process and manage transactions, bookings, and records you create.</li>
            <li>Improve, personalize, and expand the App.</li>
            <li>Communicate with you, including for customer support and updates.</li>
            <li>Detect, prevent, and address technical issues, fraud, or misuse.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Data Storage & Security",
      content: (
        <p>
          We take reasonable administrative, technical, and physical measures
          to protect the information you provide from unauthorized access,
          disclosure, alteration, or destruction. However, no method of
          transmission over the internet or electronic storage is completely
          secure, and we cannot guarantee absolute security.
        </p>
      ),
    },
    {
      title: "4. Sharing of Information",
      content: (
        <>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul>
            <li>Service providers who help us operate the App (e.g. hosting, analytics).</li>
            <li>Law enforcement or regulators, where required by law.</li>
            <li>
              Other parties in connection with a merger, acquisition, or sale
              of assets, with notice to you where required.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "5. Third-Party Services",
      content: (
        <p>
          The App may contain links to or integrate with third-party
          services. We are not responsible for the privacy practices of these
          third parties, and we encourage you to review their respective
          privacy policies.
        </p>
      ),
    },
    {
      title: "6. Children's Privacy",
      content: (
        <p>
          The App is not directed to children under the age of 13, and we do
          not knowingly collect personal information from children under 13.
          If you believe a child has provided us with personal information,
          please contact us so we can remove it.
        </p>
      ),
    },
    {
      title: "7. Your Rights & Choices",
      content: (
        <p>
          Depending on your location, you may have the right to access,
          correct, update, or delete your personal information. You may also
          have the right to object to or restrict certain processing. To
          exercise these rights, please contact us using the details below.
        </p>
      ),
    },
    {
      title: "8. Data Retention",
      content: (
        <p>
          We retain personal information for as long as necessary to fulfill
          the purposes described in this policy, unless a longer retention
          period is required or permitted by law.
        </p>
      ),
    },
    {
      title: "9. Changes to This Policy",
      content: (
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new policy on this page and
          updating the "Last updated" date above.
        </p>
      ),
    },
    {
      title: "10. Contact Us",
      content: (
        <p>
          If you have any questions about this Privacy Policy, please contact
          us at <strong>privacy@zettabytemedia.com</strong>.
        </p>
      ),
    },
  ];

  return (
    <main className="privacy-main">
      <style>{`
        .privacy-main {
          position: relative;
          min-height: 100vh;
          background: #0A0D12;
          color: #E2E8F0;
          padding: 9.5rem 1.5rem 6rem;
          overflow: hidden;
          isolation: isolate;
        }

        /* ── Grid backdrop ── */
        .privacy-grid {
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
        .privacy-glow {
          position: absolute;
          top: -180px; right: -140px;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 70%);
          filter: blur(10px);
          z-index: 0;
          pointer-events: none;
        }
        .privacy-glow-2 {
          position: absolute;
          bottom: -260px; left: -160px;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.16) 0%, transparent 70%);
          filter: blur(10px);
          z-index: 0;
          pointer-events: none;
        }

        .privacy-inner {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .privacy-eyebrow {
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
        .privacy-title {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 4vw, 2.75rem);
          line-height: 1.12;
          letter-spacing: -0.01em;
          color: #F1F5F9;
          text-align: center;
          margin: 0 0 0.9rem;
        }
        .privacy-title .grad-text {
          background: linear-gradient(90deg, #22D3EE 0%, #A855F7 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .privacy-header {
          text-align: center;
        }
        .privacy-updated {
          display: inline-block;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: #64748B;
          margin-bottom: 1.75rem;
        }
        .privacy-intro {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.95rem;
          line-height: 1.75;
          color: #94A3B8;
          max-width: 62ch;
          margin: 0 auto 3rem;
          text-align: center;
        }

        /* ── Sections ── */
        .privacy-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .privacy-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 16px;
          padding: 1.5rem 1.65rem;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .privacy-card:hover {
          border-color: rgba(168, 85, 247, 0.32);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-2px);
        }
        .privacy-card h2 {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 600;
          font-size: 1.02rem;
          color: #F1F5F9;
          margin: 0 0 0.6rem;
        }
        .privacy-card p {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          line-height: 1.7;
          color: #94A3B8;
          margin: 0 0 0.5rem;
        }
        .privacy-card p:last-child { margin-bottom: 0; }
        .privacy-card ul {
          margin: 0.5rem 0 0;
          padding-left: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .privacy-card li {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          line-height: 1.65;
          color: #94A3B8;
        }
        .privacy-card li::marker { color: #22D3EE; }
        .privacy-card strong {
          color: #CBD5E1;
          font-weight: 600;
        }
        .privacy-card strong[data-contact="true"] {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          color: #A855F7;
        }

        @media (max-width: 640px) {
          .privacy-main { padding: 7rem 1.1rem 4rem; }
        }
      `}</style>

      <div className="privacy-grid" aria-hidden="true" />
      <div className="privacy-glow" aria-hidden="true" />
      <div className="privacy-glow-2" aria-hidden="true" />

      <div className="privacy-inner">
        <motion.div
          className="privacy-header"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="privacy-eyebrow">Legal</span>
          <h1 className="privacy-title">
            Privacy <span className="grad-text">Policy</span>
          </h1>
          <span className="privacy-updated">Last updated: July 2, 2026</span>
        </motion.div>

        <motion.p
          className="privacy-intro"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          This Privacy Policy describes how Zetta Byte Media ("we", "us", or
          "our") collects, uses, and protects information when you use our
          applications, including Fintech, Management Systems, and Games
          (collectively, the "App"). By using the App, you agree to the
          collection and use of information in accordance with this policy.
        </motion.p>

        <div className="privacy-list">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={i * 0.08}
              className="privacy-card"
            >
              <h2>{section.title}</h2>
              {section.content}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}