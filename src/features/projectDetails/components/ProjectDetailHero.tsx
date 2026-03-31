"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { easeOut } from "framer-motion";

interface ProjectDetailHeroProps {
  title: string;
  description: string;
  image: string;
  demoLink?: string;
}

const ProjectDetailHero = ({
  title,
  description,
  image,
  demoLink,
}: ProjectDetailHeroProps) => {
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between min-h-[600px]">
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Projects</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailHero;
