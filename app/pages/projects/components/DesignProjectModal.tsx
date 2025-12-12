"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../../lib/types";

interface DesignProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DesignProjectModal({
  project,
  isOpen,
  onClose,
}: DesignProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure we're on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && mounted) {
      document.body.style.overflow = 'hidden';
    } else if (mounted) {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (mounted) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, mounted]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
            onClick={onClose}
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
              className="relative w-full max-w-4xl overflow-y-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl"
              style={{ 
                position: 'relative',
                maxHeight: '90vh',
                maxWidth: '56rem',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Image */}
                <div className="relative w-full rounded-xl overflow-hidden bg-black/20">
                  <div className="relative w-full flex items-center justify-center">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain rounded-xl"
                      style={{ maxHeight: '80vh' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at document body level
  if (!mounted || !project) return null;

  return createPortal(modalContent, document.body);
}

