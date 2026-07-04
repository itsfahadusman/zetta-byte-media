// src/app/ClientLayoutWrapper.js

"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  return (
    <>
      <Header />
      {/* ✅ Breadcrumb visible on every page except home */}
      {pathname !== "/" && <Breadcrumb />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
