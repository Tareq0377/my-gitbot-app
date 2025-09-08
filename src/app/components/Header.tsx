// components/Header.tsx
'use client'
import React, { useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";

const STUDENT_NUMBER = "1234"; // <-- replace with your student number

export default function Header() {
  const [open, setOpen] = useState(false);
  const activeTab = Cookie.get("activeTab") || "home";

  function setTab(name: string) {
    Cookie.set("activeTab", name, { expires: 30 });
  }

  return (
    <header className="p-4 flex items-center justify-between" role="banner">
      <div className="flex items-center gap-4">
        <div className="text-sm font-mono" aria-label="Student number">
          {STUDENT_NUMBER}
        </div>
        <h1 className="sr-only">Robot Git Team Member</h1>
      </div>

      <nav role="navigation" aria-label="Main menu">
        <button aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)} className="p-2" aria-label="Toggle menu">
          {/* hamburger */}
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" stroke="currentColor"/></svg>
        </button>

        <ul id="main-menu" className={`md:flex ${open ? "block" : "hidden"}`} role="menubar">
          <li role="none"><Link href="/" role="menuitem" onClick={() => setTab("home")}>Home</Link></li>
          <li role="none"><Link href="/about" role="menuitem" onClick={() => setTab("about")}>About</Link></li>
          <li role="none"><Link href="/docker" role="menuitem" onClick={() => setTab("docker")}>Docker</Link></li>
          <li role="none"><Link href="/prisma" role="menuitem" onClick={() => setTab("prisma")}>Prisma/Sequelize</Link></li>
          <li role="none"><Link href="/tests" role="menuitem" onClick={() => setTab("tests")}>Tests</Link></li>
        </ul>
      </nav>
    </header>
  );
}
