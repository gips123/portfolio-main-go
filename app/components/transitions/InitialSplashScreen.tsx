"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function InitialSplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (hasSeenSplash) {
      setShowSplash(false);
      setIsLoading(false);
      return;
    }

    sessionStorage.setItem("hasSeenSplash", "true");

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowSplash(false);
      }, 300);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#1a1a1a]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center flex flex-col items-center gap-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl px-4 py-1 shadow-2xl overflow-hidden"
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
              
              <div className="relative z-10">
                <h1
                  className="text-white uppercase tracking-tighter"
                  style={{ 
                    fontFamily: 'var(--font-anton), sans-serif', 
                    fontSize: 'clamp(48px, 8vw, 96px)' 
                  }}
                >
                  PORTFOLIO
                </h1>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-1.5 bg-white/10 max-w-md rounded-full overflow-hidden backdrop-blur-sm border border-white/5"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  delay: 0.4, 
                  duration: 1.8, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="h-full bg-gradient-to-r from-white/40 via-white to-white/40 rounded-full relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.3,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-1/2"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

