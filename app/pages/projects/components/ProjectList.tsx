"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project, Category } from "../../../lib/types";
import GlassButton from "../../../components/ui/GlassButton";
import TechTag from "../../../components/ui/TechTag";
import GlassCard from "../../../components/ui/GlassCard";
import DesignProjectModal from "./DesignProjectModal";

interface ProjectListProps {
  selectedCategory: string;
  projects: Project[];
  categories: Category[];
  onCategoryChange: (categoryId: string) => void;
  onProjectClick: (index: number) => void;
}

export default function ProjectList({
  selectedCategory,
  projects,
  categories,
  onCategoryChange,
  onProjectClick,
}: ProjectListProps) {
  const [selectedDesignProject, setSelectedDesignProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDesignProjectClick = (project: Project) => {
    setSelectedDesignProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDesignProject(null);
  };

  return (
    <>
      <section className="relative w-full px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20 md:py-24">
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((category, index) => (
            <GlassButton
              key={`category-${category.id}-${index}`}
              onClick={() => onCategoryChange(category.id)}
              active={selectedCategory === category.id}
            >
              {category.name}
            </GlassButton>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {projects.map((project) => {
              if (project.category === "desain-grafis") {
                return (
                  <GlassCard
                    key={project.id}
                    onClick={() => handleDesignProjectClick(project)}
                    className="cursor-pointer"
                  >
                    <div className="p-3 sm:p-4 md:p-6">
                      <div className="relative w-full h-40 sm:h-48 mb-3 sm:mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDesignProjectClick(project);
                          }}
                          className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-medium hover:bg-white/30 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-1.5 sm:gap-2"
                        >
                          View Detail
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                );
              }

              return (
                <Link
                  key={project.id}
                  href={`/pages/projects/${project.id}`}
                  className="block"
                >
                  <GlassCard className="cursor-pointer h-full">
                    <div className="p-3 sm:p-4 md:p-6">
                      <div className="relative w-full h-40 sm:h-48 mb-3 sm:mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold text-sm sm:text-lg md:text-xl mb-1.5 sm:mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="hidden sm:flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {project.techStack.slice(0, 2).map((tech, techIndex) => (
                            <TechTag key={techIndex} tech={tech} className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs" />
                          ))}
                          {project.techStack.length > 2 && (
                            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/10 border border-white/20 rounded-lg text-white/70 text-xs font-medium backdrop-blur-sm">
                              +{project.techStack.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-medium hover:bg-white/30 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-1.5 sm:gap-2">
                          View Detail
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-2xl p-12 text-center">
            <p className="text-white/70 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>

    <DesignProjectModal
      project={selectedDesignProject}
      isOpen={isModalOpen}
      onClose={closeModal}
    />
    </>
  );
}

