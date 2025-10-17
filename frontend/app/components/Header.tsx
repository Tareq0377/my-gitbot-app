"use client"
import React, { useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import Theme from "./ThemeToggle"


const STUDENT_NUMBER = "21396516";


export default function Header() {
  const [open, setOpen] = useState(false);
  const activeTab = Cookie.get("activeTab") || "home";


  function setTab(name: string) {
    Cookie.set("activeTab", name, { expires: 30 });
  }


  return (
    <header className="bg-indigo-600 text-white dark:bg-fuchsia-600">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="font-mono text-sm"><Link href="/" onClick={() => setTab("home")} className="">{STUDENT_NUMBER} </Link></div>
        <nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 focus:outline-none" aria-label="Toggle menu">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <ul className={`md:flex space-x-6 ${open ? "block" : "hidden"}`}>
            <li><Link href="/" onClick={() => setTab("home")} className="hover:underline">Home </Link></li>
            <li><Link href="/about" onClick={() => setTab("about")} className="hover:underline">About </Link></li>
            <li><Link href="/docker" onClick={() => setTab("docker")} className="hover:underline">Docker </Link></li>
            <li><Link href="/prisma" onClick={() => setTab("prisma")} className="hover:underline">Prisma/Sequelize </Link></li>
            <li><Link href="/tests" onClick={() => setTab("tests")} className="hover:underline">Tests </Link></li>
            <Theme/>
          </ul>
          
        </nav>
        
      </div>
      
    </header>
  );
}