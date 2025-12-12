"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <div className={`text-center mb-12 sm:mb-16 ${className}`}>
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl px-6 py-4 shadow-2xl overflow-hidden inline-block"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-1/2 rounded-3xl bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
        
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0"
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
          className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0"
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
        
        <div className="relative z-10 flex flex-row items-center gap-4 flex-wrap justify-center">
          <h2
            className="text-white font-normal uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(48px, 6vw, 72px)' }}
          >
            {title}
          </h2>
          {description && (
            <>
              <div className="h-12 w-px bg-white/20"></div>
              <p className="text-white/70 text-base sm:text-lg max-w-2xl text-left">
                {description}
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

