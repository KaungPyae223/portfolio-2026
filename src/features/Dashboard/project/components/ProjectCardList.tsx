import React, { useMemo } from "react";
import { useRouter } from "@/i18n/navigation";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProjectCardListProps {
  data: any;
  isLoading: boolean;
}

const ProjectCardList = ({ data, isLoading }: ProjectCardListProps) => {
  const router = useRouter();

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


  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="h-[200px] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-5">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {data?.length > 0 ? (
        data.map((project: any) => (
          
          <ProjectCard
            key={project.id}
            image={project.image}
            title={project.name}
            description={project.description}
            frontendLink={project.front_end}
            backendLink={project.back_end}
            demoLink={project.demo_url}
            tech={project.technologies?.split("/") || []}
            id={project.id}
            is_featured={project.is_featured}
            documentLink={project.document_url}
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
            <Button
              onClick={() => router.push("/dashboard/projects/create")}
              size="sm"
            >
              Add Project
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCardList;
