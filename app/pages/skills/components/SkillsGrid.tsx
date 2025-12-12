"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import GlassCard from "../../../components/ui/GlassCard";
import AnimatedCounter from "./AnimatedCounter";
import { SkillCategory } from "../../../lib/types";
import { Monitor, Server, Palette, Code, Database, PenTool, Users, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Palette,
  Code,
  Database,
  PenTool,
  Users,
};

interface SkillsGridProps {
  categories: SkillCategory[];
}

export default function SkillsGrid({ categories }: SkillsGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // On mobile, immediately trigger animation
        setShouldAnimate(true);
      } else {
        // On desktop, use scroll-based animation
        setShouldAnimate(isInView);
      }
    }
  }, [isInView]);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {categories.map((category, index) => {
        const IconComponent = iconMap[category.icon] || Monitor;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col h-full"
          >
            <GlassCard className="rounded-3xl p-6 sm:p-8 flex flex-col h-full">

              <div className="flex flex-col h-full">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black/40 border border-white/30 rounded-2xl flex items-center justify-center ">
                    <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                </div>

                <h3 className="text-white font-semibold text-2xl sm:text-3xl mb-3 text-center">
                  {category.title}
                </h3>

                <p className="text-white/70 text-sm sm:text-base mb-6 text-center leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-4 mt-auto">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = iconMap[skill.icon] || Code;
                    return (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) + 0.3 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <SkillIcon className="w-4 h-4 text-white/80" />
                            <span className="text-white text-sm sm:text-base font-medium">{skill.name}</span>
                          </div>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) + 0.5 }}
                            className="text-white/80 text-sm font-medium"
                          >
                            <AnimatedCounter value={skill.percentage} delay={(index * 0.2) + (skillIndex * 0.1) + 0.3} isInView={shouldAnimate} />%
                          </motion.span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={shouldAnimate ? { width: `${skill.percentage}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: (index * 0.2) + (skillIndex * 0.1) + 0.3, ease: "easeOut" }}
                            className="h-full bg-white/40 rounded-full"
                          ></motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}

