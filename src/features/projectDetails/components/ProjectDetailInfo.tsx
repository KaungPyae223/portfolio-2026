"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Clock,
  Tag,
  ExternalLink,
  Github,
  Globe,
} from "lucide-react";

interface ProjectDetailInfoProps {
  duration: string;
  teamSize: string;
  status: "completed" | "in-progress" | "maintenance";
  client?: string;
  role: string;
  technologies: string[];
  frontendLink?: string;
  backendLink?: string;
  demoLink?: string;
}

const ProjectDetailInfo = ({
  duration,
  teamSize,
  status,
  client,
  role,
  technologies,
  frontendLink,
  backendLink,
  demoLink,
}: ProjectDetailInfoProps) => {
  const infoVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
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
        ease: "easeOut",
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800";
      case "in-progress":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800";
      case "maintenance":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600";
    }
  };

  return (
    <motion.div
      variants={infoVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Project Information */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Project Information
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Duration
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {duration}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Team Size
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {teamSize}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Status
              </p>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                  status
                )}`}
              >
                {status.replace("-", " ").charAt(0).toUpperCase() +
                  status.slice(1).replace("-", " ")}
              </span>
            </div>
          </div>

          {client && (
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Client
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {client}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                My Role
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Technologies Used
        </h3>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full border border-yellow-200 dark:border-yellow-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
            Project Links
          </h4>

          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}

          {frontendLink && (
            <a
              href={frontendLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              Frontend Code
            </a>
          )}

          {backendLink && (
            <a
              href={backendLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              Backend Code
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailInfo;
