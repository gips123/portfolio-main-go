"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "../../../lib/types";
import GlassButton from "../../../components/ui/GlassButton";
import ProjectCarousel from "./ProjectCarousel";

interface ProjectsSectionProps {
  projects: Project[];
}

const projectsPageData = {
  title: "PROJECTS",
  subtitle: "Explore my portfolio of creative projects and innovative solutions. Each project represents my passion for building beautiful digital experiences.",
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter out design projects from carousel
  // Also filter out duplicate ifortepay entries (only show ID 5 in "all" category)
  const filteredProjects = projects
    .filter(project => project.category !== "desain-grafis")
    .filter(project => {
      // Only show original ifortepay (ID 5) in "all" category, exclude frontend/backend variants
      if (selectedCategory === "all" && project.title.toLowerCase().includes("ifortepay") && project.id !== 5) {
        return false;
      }
      return selectedCategory === "all" || project.category === selectedCategory;
    });

  const nextProject = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const goToProject = (index: number) => {
    if (index >= 0 && index < filteredProjects.length) {
      setCurrentIndex(index);
    }
  };

  const safeIndex = filteredProjects.length > 0 
    ? Math.min(currentIndex, filteredProjects.length - 1) 
    : 0;
  const currentProject = filteredProjects[safeIndex];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl px-4 sm:px-6 py-3 shadow-2xl overflow-hidden w-full sm:w-auto"
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
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <h2 className="text-white font-normal uppercase tracking-tight text-center sm:text-left" style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(28px, 5vw, 56px)' }}>
              {projectsPageData.title}
            </h2>
            <div className="hidden sm:block h-12 w-px bg-white/20"></div>
            <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl text-center sm:text-left">
              {projectsPageData.subtitle}
            </p>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <GlassButton 
            onClick={() => {
              const projectListSection = document.getElementById('project-list-section');
              if (projectListSection) {
                projectListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="flex-1 sm:flex-initial"
          >
            See All Project
          </GlassButton>
          <div className="bg-white/10 border border-white/20 rounded-lg px-2.5 py-1.5 backdrop-blur-sm flex-shrink-0">
            <span className="text-white text-xs font-medium">
              {filteredProjects.length > 0 ? String(safeIndex + 1).padStart(2, '0') : '00'}
            </span>
          </div>
        </div>
      </div>

      <ProjectCarousel
        currentProject={currentProject}
        currentIndex={safeIndex}
        totalProjects={filteredProjects.length}
        onPrev={prevProject}
        onNext={nextProject}
        onGoTo={goToProject}
      />
    </>
  );
}

