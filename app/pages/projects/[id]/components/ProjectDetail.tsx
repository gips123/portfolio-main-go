"use client";

import { ArrowLeft, Tag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Project } from "../../../../lib/types";
import TechTag from "../../../../components/ui/TechTag";
import ProjectGallery from "./ProjectGallery";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();

  // Get all images for gallery (you can expand this based on your needs)
  const galleryImages = [project.imageUrl];

  return (
    <div className="relative min-h-screen w-full bg-[#1a1a1a]">
      {/* Back Button */}
      <div className="sticky top-0 z-[60] backdrop-blur-xl bg-[#1a1a1a]/80 border-b border-white/10 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Projects</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h1 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed mb-6 sm:mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.techStack.map((tech, index) => (
                <TechTag key={index} tech={tech} />
              ))}
            </div>
          </motion.div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl mb-12"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
              <h2 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl mb-3 leading-tight">
                {project.imageTitle}
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
                {project.imageDescription}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="relative w-full px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <ProjectGallery projectId={project.id} mainImage={project.imageUrl} />
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="relative w-full px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-50"></div>
            
            <div className="relative z-10">
              <h3 className="text-white font-semibold text-2xl sm:text-3xl mb-6">
                Project Overview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <Tag className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">
                      Category
                    </h4>
                    <p className="text-white font-medium">{project.category}</p>
                  </div>
                </div>

              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-white font-semibold text-lg mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 backdrop-blur-sm"
                    >
                      <span className="text-white text-sm font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


