"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 40,
        scale: 0.94,
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="w-full min-h-screen bg-[#1a1a1a]"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      {children}
    </motion.div>
  );
}

