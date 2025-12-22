"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { Search, Filter, X } from "lucide-react";

const ProjectList = () => {
  type ProjectItem = {
    id: number;
    image: string;
    name: string;
    description: string;
    frontend: string;
    backend: string;
    demo: string;
    tech: string;
    type: string;
  };

  // Sample project data
  const data: ProjectItem[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      name: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with modern UI/UX design, secure payment processing, and comprehensive admin dashboard.",
      frontend: "https://github.com/example/ecommerce-frontend",
      backend: "https://github.com/example/ecommerce-backend",
      demo: "https://ecommerce-demo.com",
      tech: "React/Node.js/MongoDB/Stripe/TailwindCSS",
      type: "fullstack",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      name: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      frontend: "https://github.com/example/taskmanager-frontend",
      backend: "https://github.com/example/taskmanager-backend",
      demo: "https://taskmanager-demo.com",
      tech: "Next.js/Express/PostgreSQL/Socket.io",
      type: "fullstack",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1592210454359-801627e67647?w=800&h=600&fit=crop",
      name: "Weather Dashboard",
      description:
        "A beautiful weather dashboard with real-time data, interactive maps, and detailed forecasts for multiple locations.",
      frontend: "https://github.com/example/weather-frontend",
      backend: "https://github.com/example/weather-api",
      demo: "https://weather-demo.com",
      tech: "Vue.js/Node.js/Redis/Chart.js",
      type: "frontend",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      name: "Social Media App",
      description:
        "A modern social media platform with real-time messaging, story features, and advanced user interaction capabilities.",
      frontend: "https://github.com/example/social-frontend",
      backend: "https://github.com/example/social-backend",
      demo: "https://social-demo.com",
      tech: "React Native/Firebase/WebRTC",
      type: "mobile",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=800&h=600&fit=crop",
      name: "API Management System",
      description:
        "A comprehensive API management system with authentication, rate limiting, analytics, and developer portal.",
      frontend: "https://github.com/example/api-portal",
      backend: "https://github.com/example/api-gateway",
      demo: "https://api-demo.com",
      tech: "Python/FastAPI/Docker/Kubernetes",
      type: "backend",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      name: "Portfolio Website",
      description:
        "A stunning portfolio website with smooth animations, dark mode support, and optimized performance.",
      frontend: "https://github.com/example/portfolio",
      backend: "https://github.com/example/portfolio-api",
      demo: "https://portfolio-demo.com",
      tech: "Next.js/Framer-Motion/Three.js",
      type: "frontend",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      name: "Learning Management System",
      description:
        "An educational platform with video streaming, quizzes, progress tracking, and certificate generation.",
      frontend: "https://github.com/example/lms-frontend",
      backend: "https://github.com/example/lms-backend",
      demo: "https://lms-demo.com",
      tech: "Angular/Django/PostgreSQL/AWS",
      type: "fullstack",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1618494689939-ed406910a7a8?w=800&h=600&fit=crop",
      name: "Real-time Analytics Dashboard",
      description:
        "A powerful analytics dashboard with real-time data visualization, custom reports, and business intelligence features.",
      frontend: "https://github.com/example/analytics-frontend",
      backend: "https://github.com/example/analytics-backend",
      demo: "https://analytics-demo.com",
      tech: "React/D3.js/Node.js/MongoDB",
      type: "frontend",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      name: "Content Management System",
      description:
        "A flexible CMS with multi-language support, SEO optimization, and customizable content types.",
      frontend: "https://github.com/example/cms-frontend",
      backend: "https://github.com/example/cms-backend",
      demo: "https://cms-demo.com",
      tech: "Nuxt.js/Strapi/MySQL/Docker",
      type: "backend",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get unique project types from data
  const projectTypes = useMemo(() => {
    const types = ["all", ...new Set(data.map((project) => project.type))];
    return types.filter(Boolean);
  }, [data]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = data;

    // Apply type filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (project: ProjectItem) => project.type === activeFilter
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project: ProjectItem) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.tech.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [data, activeFilter, searchTerm]);

  // Get project count for each filter
  const getProjectCount = (filter: string) => {
    if (filter === "all") return data.length;
    return data.filter((project) => project.type === filter).length;
  };

  return (
    <div className="  m-5 my-10 pt-20">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        {/* Search Bar */}
        <div className="mb-8">
          <div
            className={`relative max-w-2xl mx-auto transition-all duration-300 ${
              isSearchFocused ? "scale-[1.02]" : "scale-100"
            }`}
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search
                className={`w-5 h-5 transition-colors duration-300 ${
                  isSearchFocused ? "text-yellow-500" : "text-gray-400"
                }`}
              />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search projects by name, description, or technologies..."
              className="w-full pl-12 pr-12 py-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
              </button>
            )}
          </div>

          {/* Search Results Count */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400"
            >
              Found {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
              {searchTerm && ` for "${searchTerm}"`}
            </motion.div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center">
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 flex gap-1 shadow-inner">
            {projectTypes.map((filter) => (
              <div
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative cursor-pointer z-10 px-4 py-2 flex items-center gap-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "text-white"
                    : "text-gray-700  dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="text-sm z-50">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 z-50 rounded-full ${
                    activeFilter === filter
                      ? "bg-white/20"
                      : "bg-gray-200 dark:bg-gray-700  text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {getProjectCount(filter)}
                </span>
                {filter === activeFilter && (
                  <motion.div
                    layoutId="switch-pill"
                    className="absolute inset-0 bg-yellow-600 dark:bg-gray-600 rounded-full z-0"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  title={project.name}
                  description={project.description}
                  frontendLink={project.frontend}
                  backendLink={project.backend}
                  demoLink={project.demo}
                  tech={project.tech?.split("/") || []}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <Filter className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm
                    ? `No projects match your search "${searchTerm}". Try different keywords.`
                    : `No projects in the "${activeFilter}" category.`}
                </p>
                {(searchTerm || activeFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("all");
                    }}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Show more results indicator if there are many projects */}
      {filteredProjects.length > 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {Math.min(filteredProjects.length, 6)} of{" "}
            {filteredProjects.length} projects
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectList;
