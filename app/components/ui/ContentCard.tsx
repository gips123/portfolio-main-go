import { ReactNode } from "react";

interface ContentCardProps {
  children: ReactNode;
  className?: string;
}

export default function ContentCard({ children, className = "" }: ContentCardProps) {
  return (
    <div className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl px-8 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16 shadow-2xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 rounded-3xl bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

