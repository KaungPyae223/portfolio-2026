"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { fetcher } from "@/services/fetcher";
import useSWR from "swr";
import { easeOut } from "framer-motion";

const ProjectList = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // delay (ms)

    return () => clearTimeout(timer);
  }, [query]);

  const { data, error, isLoading } = useSWR(`project`, fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 3,
  });

  useEffect(() => {
    if (data) {
      setShowData(
        data.data.filter((item: any) =>
          item.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
        ),
      );
    }
  }, [data, debouncedQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search projects by name, description, or technologies..."
              className="w-full pl-12 pr-12 py-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
              </button>
            )}
          </div>

          {/* Search Results Count */}
          {query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400"
            >
              Found {data?.data.length} project
              {data?.data.length !== 1 ? "s" : ""}
              {query && ` for "${query}"`}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {showData.length > 0 ? (
            showData.map((project: any, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: easeOut,
                }}
              >
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  image={project.image}
                  title={project.name}
                  description={project.description}
                  frontendLink={project.front_end}
                  backendLink={project.back_end}
                  demoLink={project.demo_url}
                  tech={project.technologies?.split("/") || []}
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
                  {query
                    ? `No projects match your search "${query}". Try different keywords.`
                    : `No projects found.`}
                </p>
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
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
    </div>
  );
};

export default ProjectList;
