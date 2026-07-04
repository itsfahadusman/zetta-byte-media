// src/components/WhatsAppButton.js
"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923001234567?text=Hi%20Zetta%20Byte%20Media,%20I%20want%20to%20know%20more%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Outer Glow using branding matrix green color */}
      <span
        className="absolute inset-0 animate-ping rounded-full opacity-40"
        style={{ backgroundColor: "#00E676" }}
      />

      {/* Button using theme design tokens */}
      <div
        className="relative text-[#0A0E1A] p-4 rounded-full shadow-xl flex items-center justify-center 
                   transition-all duration-300 transform scale-100 group-hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #22D3EE 0%, #7C6CF5 55%, #A855F7 100%)",
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)"
        }}
      >
        <FaWhatsapp size={28} />
      </div>
    </a>
  );
}