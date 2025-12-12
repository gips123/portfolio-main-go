import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", hover = true, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl overflow-hidden ${
        hover ? "hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
      
      <div className="relative z-10">{children}</div>
    </div>
  );
}

