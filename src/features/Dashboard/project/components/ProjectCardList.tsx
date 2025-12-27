import React, { useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProjectCardListProps {
  searchQuery?: string;
}

const ProjectCardList = ({ searchQuery = "" }: ProjectCardListProps) => {
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

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
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
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or create a new project.
            </p>
            <Button size="sm">Create New Project</Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCardList;
