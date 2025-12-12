"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function SplashScreen() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [splashText, setSplashText] = useState("PORTFOLIO");
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    let newSplashText = "PORTFOLIO";
    if (pathname === "/pages/home" || pathname === "/" || pathname === "/pages/home") {
      newSplashText = "PORTFOLIO";
    } else if (pathname === "/pages/about" || pathname === "/about") {
      newSplashText = "ABOUT";
    } else if (pathname === "/pages/skills" || pathname === "/skills") {
      newSplashText = "SKILLS";
    } else if (pathname.startsWith("/pages/projects/") || pathname.startsWith("/projects/")) {
      // Check if it's a project detail page (has ID in path)
      if (pathname.match(/\/pages\/projects\/\d+/) || pathname.match(/\/projects\/\d+/)) {
        newSplashText = "DETAIL PROJECT";
      } else {
        newSplashText = "PROJECTS";
      }
    } else if (pathname === "/pages/projects" || pathname === "/projects") {
      newSplashText = "PROJECTS";
    } else if (pathname === "/pages/contact" || pathname === "/contact") {
      newSplashText = "CONTACT";
    }
    
    setSplashText(newSplashText);
    
    setShowSplash(true);
    setIsLoading(true);
    
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowSplash(false);
      }, 150);
    }, 2000);
    
    return () => {
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1a1a1a]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center flex flex-col items-center gap-8"
          >
            <motion.div
              key={splashText}
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
                  {splashText}
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
                  duration: 1.6, 
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

