"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

export default function SectionHeader({ icon: Icon, title, className = "", iconSize = "md" }: SectionHeaderProps) {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10 sm:w-12 sm:h-12",
    lg: "w-14 h-14",
  };

  return (
    <div className={`flex items-center gap-4 mb-6 sm:mb-8 ${className}`}>
      <div className="p-3 rounded-2xl bg-[#1a1a1a]/10 border border-white/20 ">
        <Icon className={`${iconSizes[iconSize]} text-white`} />
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="text-white font-normal uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(40px, 5vw, 60px)' }}
        >
          {title}
        </h2>
      </motion.div>
    </div>
  );
}

