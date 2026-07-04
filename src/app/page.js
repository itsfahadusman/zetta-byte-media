"use client";

import Hero from "../components/Hero";
import Products from "../components/Services";
import Stats from "../components/Stats";
import CTABanner from "../components/CTABanner";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#05060a] text-[#E5E7EB] overflow-x-hidden">
      <Hero />
      <Products />
      <Stats />
      <CTABanner />
    </main>
  );
}