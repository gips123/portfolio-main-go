import Link from "next/link";
import { ReactNode } from "react";

interface NavigationCardProps {
  href: string;
  title: string;
  description: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export default function NavigationCard({ href, title, description, onClick, className = "" }: NavigationCardProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden flex-1 ${className}`}
    >
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative">
        <h3 className="text-white font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">{title}</h3>
        <p className="text-white/70 text-xs sm:text-sm">{description}</p>
      </div>
    </Link>
  );
}

