"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
}

export default function HeroSection({}: HeroSectionProps) {
  return (
    <>
      <motion.div 
        className="absolute left-0 bottom-0 hidden lg:block z-0"
        initial={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
        animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative" style={{ width: '30vw', height: '90vh' }}>
          <Image
            src="/assets/gips.png"
            alt="Ghifary Ahmad Alfirdausy"
            width={500}
            height={550}
            priority
            className="w-full h-full object-cover drop-shadow-2xl grayscale "
          />
        </div>
      </motion.div>

      <motion.div 
        className="absolute left-0 top-0 hidden lg:block z-10"
        style={{ transform: 'translateX(10vw)' }}
        initial={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
        animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative" style={{ width: '30vw', height: '100vh' }}>
          <Image
            src="/assets/gips3.png"
            alt="Ghifary Ahmad Alfirdausy"
            width={500}
            height={550}
            priority
            className="w-full h-full object-cover drop-shadow-2xl grayscale"
          />
        </div>
      </motion.div>

      <motion.div 
        className="absolute right-0 top-0 hidden lg:block z-0"
        initial={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
        animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative" style={{ width: '50vw', height: '100vh' }}>
          <Image
            src="/assets/gips2.png"
            alt="Ghifary Ahmad Alfirdausy"
            width={700}
            height={850}
            priority
            className="w-full h-full object-cover drop-shadow-2xl grayscale"
          />
        </div>
      </motion.div>
    </>
  );
}

