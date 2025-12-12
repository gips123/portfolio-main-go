"use client";

import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { href: "/pages/home", label: "Home" },
    { href: "/pages/about", label: "About" },
    { href: "/pages/skills", label: "Skills" },
    { href: "/pages/projects", label: "Projects" },
    { href: "/pages/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]">
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-1/2 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
        
        <div className="relative flex items-center justify-center overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-white transition-colors text-xs sm:text-sm font-medium relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

