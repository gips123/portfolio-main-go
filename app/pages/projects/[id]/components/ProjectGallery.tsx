"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getProjectImages } from "../../../../lib/api/projects";

interface ProjectGalleryProps {
  projectId: number;
  mainImage: string;
}

export default function ProjectGallery({ projectId, mainImage }: ProjectGalleryProps) {
  const [images, setImages] = useState<string[]>([mainImage]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const fetchedImages = await getProjectImages(projectId, mainImage);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Failed to load project images:', error);
        setImages([mainImage]);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, [projectId, mainImage]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure we're on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage !== null && mounted) {
      document.body.style.overflow = 'hidden';
    } else if (mounted) {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (mounted) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [selectedImage, mounted]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage !== null) {
        closeLightbox();
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  if (images.length <= 1) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-white font-semibold text-2xl sm:text-3xl mb-8">
          Project Gallery
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative aspect-video rounded-xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 cursor-pointer group hover:scale-105 transition-transform duration-300"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image}
                alt={`Project image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      {mounted && selectedImage !== null && createPortal(
        <AnimatePresence mode="wait">
          {selectedImage !== null && (
            <>
              {/* Backdrop - Dark overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9998,
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                }}
              />

              {/* Modal Container - Fixed position, centered in viewport */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={closeLightbox}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                <div
                  className="relative w-full max-w-6xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Navigation Buttons */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>

                  {/* Image */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full overflow-y-auto"
                    style={{ maxHeight: '90vh' }}
                  >
                    <div className="relative w-full flex items-center justify-center bg-black/20 rounded-xl overflow-hidden">
                      <Image
                        src={images[selectedImage]}
                        alt={`Project image ${selectedImage + 1}`}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain rounded-xl"
                        style={{ maxHeight: '80vh' }}
                      />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-white text-sm">
                        {selectedImage + 1} / {images.length}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}


