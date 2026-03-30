"use client";
import React from "react";
import { motion } from "framer-motion";
import { Tag, Github, File } from "lucide-react";

interface ProjectDetailInfoProps {
  role: string;
  technologies: string[];
  frontendLink?: string;
  backendLink?: string;
  docLink?: string;
}

const ProjectDetailInfo = ({
  role,
  technologies,
  frontendLink,
  backendLink,
  docLink,
}: ProjectDetailInfoProps) => {
  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 space-y-8"
    >
      {/* Technologies */}
      <motion.div variants={item}>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Tech Stack
        </h3>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm font-medium rounded-full 
              bg-gradient-to-r from-yellow-100 to-yellow-50 
              dark:from-yellow-900/30 dark:to-yellow-800/20 
              text-yellow-800 dark:text-yellow-200 
              border border-yellow-200/60 dark:border-yellow-700/40
              hover:scale-105 transition-transform"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Role */}
      <motion.div variants={item} className="flex items-start gap-4">
        <div className="p-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
          <Tag className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            My Role
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
            {role}
          </p>
        </div>
      </motion.div>

      {/* Links */}
      <motion.div variants={item}>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Project Links
        </h4>

        <div className="flex flex-col gap-3">
          {docLink && (
            <a
              href={docLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl 
              bg-gray-50 dark:bg-gray-900 
              hover:bg-yellow-50 dark:hover:bg-yellow-900/20 
              transition-all group"
            >
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-500 group-hover:text-yellow-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Documentation
                </span>
              </div>
            </a>
          )}

          {frontendLink && (
            <a
              href={frontendLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl 
              bg-gray-50 dark:bg-gray-900 
              hover:bg-yellow-50 dark:hover:bg-yellow-900/20 
              transition-all group"
            >
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-gray-500 group-hover:text-yellow-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Frontend Code
                </span>
              </div>
            </a>
          )}

          {backendLink && (
            <a
              href={backendLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl 
              bg-gray-50 dark:bg-gray-900 
              hover:bg-yellow-50 dark:hover:bg-yellow-900/20 
              transition-all group"
            >
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-gray-500 group-hover:text-yellow-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Backend Code
                </span>
              </div>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailInfo;
