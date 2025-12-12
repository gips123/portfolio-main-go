"use client";

import { motion } from "framer-motion";
import NavigationCard from "../../../components/navigation/NavigationCard";

interface HeroContentProps {
}

export default function HeroContent({}: HeroContentProps) {
  return (
    <div className="w-full flex flex-col justify-center">
      {/* CREATIVE - Desktop: inline with name, Mobile: standalone */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
        <motion.div 
          className="flex items-center overflow-hidden"
          initial={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 
            className="font-normal text-white uppercase tracking-tighter leading-[0.9]" 
            style={{ 
              fontFamily: 'var(--font-anton), sans-serif',
            }}
          >
            <span className="hidden md:inline" style={{ fontSize: 'clamp(75px, 10vw, 70px)' }}>CREATIVE</span>
            <span className="md:hidden" style={{ fontSize: 'clamp(70px, 12vw, 100px)' }}>CREATIVE</span>
          </h2>
        </motion.div>
        {/* Name Card - Desktop: inline, Mobile: hidden (will show below PORTFOLIO) */}
        <motion.div 
          className="hidden sm:block group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-4 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden w-full sm:w-auto"
          initial={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative text-center sm:text-left">
            <h2 className="font-normal text-white uppercase tracking-tighter leading-[0.9]" style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(15px, 3.5vw, 48px)' }}>
              GHIFARY AHMAD ALFIRDAUSY
            </h2>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="w-full flex items-center justify-center my-2 sm:my-3 overflow-hidden"
        initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="w-full font-normal text-white uppercase tracking-tighter leading-[0.9] text-center" style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(70px, 15vw, 216px)', maxWidth: '100%' }}>
          PORTFOLIO
        </h2>
      </motion.div>

      {/* Name Card - Mobile: below PORTFOLIO */}
      <motion.div 
        className="block sm:hidden group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden w-full mb-2"
        initial={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative text-center">
          <h2 className="font-normal text-white uppercase tracking-tighter leading-[0.9]" style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(18px, 3.5vw, 48px)' }}>
            GHIFARY AHMAD ALFIRDAUSY
          </h2>
        </div>
      </motion.div>

      <div className="w-full grid grid-cols-2 sm:flex sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
        <NavigationCard
          href="/pages/about"
          title="About"
          description="Get to know me"
        />
        <NavigationCard
          href="/pages/skills"
          title="Skills"
          description="My expertise"
        />
        <NavigationCard
          href="/pages/projects"
          title="Projects"
          description="View my work"
        />
        <NavigationCard
          href="/pages/contact"
          title="Contact"
          description="Let's connect"
        />
      </div>
    </div>
  );
}

