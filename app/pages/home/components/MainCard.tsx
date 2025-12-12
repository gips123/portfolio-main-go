"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MainCardProps {
  children: ReactNode;
}

export default function MainCard({ children }: MainCardProps) {
  return (
    <motion.div 
      className="relative w-full max-w-[800px] md:max-w-[800px] max-h-[90vh] backdrop-blur-xl bg-[#1a1a1a]/80 border border-white/20 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4 sm:py-5 shadow-2xl overflow-hidden z-10"
      initial={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
      
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none z-0"
        animate={{
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none z-0"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut"
        }}
      >
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"></div>
      </motion.div>
      
      <div className="relative z-10 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

