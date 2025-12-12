"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import HeroSection from "./HeroSection";
import MainCard from "./MainCard";
import HeroContent from "./HeroContent";

export default function HomeClient() {
  return (
    <>
      <HeroSection />

      <div className="relative w-full h-full flex flex-col items-start md:items-center justify-center gap-4 sm:gap-6 overflow-hidden">
        {/* Mobile Image - Right Side - Behind Card - Full Screen */}
        <div className="absolute md:hidden right-0 top-0 bottom-0 w-[160vw] h-screen z-[1] opacity-70 pointer-events-none translate-x-[25%]">
          <Image
            src="/assets/gips2.png"
            alt="Ghifary Ahmad"
            fill
            className="object-cover object-right grayscale"
            priority
            sizes="150vw"
          />
        </div>
        
        <div className="relative flex-none md:flex-none md:max-w-[800px] z-10">
          <MainCard>
            <HeroContent />
          </MainCard>
        </div>

        <motion.div
          className="relative z-10 flex items-center justify-center w-full"
          initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a
            href="/cv/CV_GHIFARY.pdf"
            download="CV_GHIFARY.pdf"
            className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-2 sm:gap-3">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-white text-sm sm:text-base font-medium">
                Download CV
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </>
  );
}

