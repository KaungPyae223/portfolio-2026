"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Expand, ChevronLeft, ChevronRight } from "lucide-react";
import { easeOut, easeIn } from "framer-motion";

interface ProjectDetailGalleryProps {
  images: any[];
  title: string;
  setSelectedImage: (index: number) => void;
}

const ProjectDetailGallery = ({
  images,
  title,
  setSelectedImage,
}: ProjectDetailGalleryProps) => {
  const galleryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={galleryVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Expand className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Gallery
          </h3>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No images available for this project.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images?.map((image: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.url}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ProjectDetailGallery;
