// src/components/Breadcrumb.js
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Hide breadcrumb on homepage
  if (segments.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative bg-[#0b0d14] border-b border-[rgba(148,163,184,0.12)] text-sm px-6 py-3 mt-[65px] backdrop-blur-sm font-mono"
    >
      <div className="relative max-w-7xl mx-auto flex items-center gap-2 z-10">
        {/* Home link */}
        <Link
          href="/"
          className="font-medium text-[#E5E7EB] hover:text-[#22D3EE] transition-colors duration-200"
        >
          Home
        </Link>

        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;

          return (
            <motion.div
              key={href}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * (idx + 1), duration: 0.25 }}
            >
              <span className="text-[#A855F7]">{">"}</span>
              {isLast ? (
                <span className="capitalize text-[#22D3EE] font-semibold">
                  {segment.replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  href={href}
                  className="capitalize text-[#7C8798] hover:text-[#22D3EE] transition-colors duration-200"
                >
                  {segment.replace(/-/g, " ")}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}