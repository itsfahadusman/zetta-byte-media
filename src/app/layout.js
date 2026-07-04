// src/app/layout.js

import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { FaWhatsapp } from "react-icons/fa";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Zetta Byte Media — Digital Media & Technology Studio",
  description:
    "Zetta Byte Media designs and builds websites, brands, and digital content for ambitious companies. Web design, brand identity, content production and digital marketing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="site-body">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/923000000000?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20a%20project%20with%20Zetta%20Byte%20Media"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="whatsapp-float"
        >
          <FaWhatsapp size={26} />
        </a>
      </body>
    </html>
  );
}