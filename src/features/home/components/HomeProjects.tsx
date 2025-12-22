"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Smartphone, Globe } from "lucide-react";
import Image from "next/image";
import ProjectCard from "./HomeProjectCard";

const HomeProjects = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Weather Dashboard",
      image:
        "https://images.unsplash.com/photo-1592210454359-801627e67647?w=800&h=600&fit=crop",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media App",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Portfolio Website",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "API Management System",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=800&h=600&fit=crop",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Background decorative elements */}

      <div className="relative z-10 container mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold flex flex-wrap items-center justify-center gap-3 text-gray-900 dark:text-white">
              My
              <span className="bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900 p-1.5 rounded-md">
                Projects
              </span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} title={project.title} />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mt-12">
            <a
              href="#"
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-gray-800 font-medium rounded-full transition-all duration-300"
            >
              View All Projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProjects;
