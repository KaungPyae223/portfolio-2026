import Image from "next/image";
import { Star, Edit, Trash2, Eye, MoreVertical } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { api } from "@/services/api";
import { useSWRConfig } from "swr";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  frontendLink?: string;
  backendLink?: string;
  demoLink?: string;
  tech: string[];
  id: string;
  is_featured?: boolean;
  documentLink?: string;
}

const ProjectCard = ({
  id,
  image,
  title,
  description,
  frontendLink,
  backendLink,
  demoLink,
  tech,
  is_featured,
  documentLink,
}: ProjectCardProps) => {
  const projectVariants: any = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const { mutate } = useSWRConfig();

  const handleToggleFeatured = async () => {
    try {
      await api.put(`/project/featured/${id}`);
      toast.success("Project featured status updated successfully");
      mutate((key: any) => Array.isArray(key) && key[0] === "project");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const deleteProject = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    try {
      await api.delete(`/project/${id}`);
      toast.success("Project deleted successfully");
      mutate((key: any) => Array.isArray(key) && key[0] === "project");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <motion.div variants={projectVariants}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
        {/* Project Image with Overlay */}
        <div className="relative h-[200px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="flex gap-2">
              {demoLink && (
                <Link href={demoLink} target="_blank">
                  <Button size="sm" variant="secondary" className="h-8 px-3">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 rounded-full shadow-lg transition-all duration-300 ${
                is_featured
                  ? "bg-yellow-400 text-white hover:bg-yellow-500 scale-110"
                  : "bg-black/50 text-white hover:bg-black/70"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFeatured();
              }}
            >
              <Star
                className={`w-4 h-4 ${is_featured ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          {/* Options Menu */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/50 text-white hover:bg-black/70 z-10"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/projects/${id}`}>
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/projects/edit/${id}`}>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Project
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={deleteProject}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-5">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tech.slice(0, 3).map((techItem, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {techItem}
              </Badge>
            ))}
            {tech.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{tech.length - 3}
              </Badge>
            )}
          </div>

          {/* Project Links */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex gap-3">
              {frontendLink && (
                <a
                  href={frontendLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Frontend
                </a>
              )}
              {backendLink && (
                <a
                  href={backendLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Backend
                </a>
              )}
              {documentLink && (
                <a
                  href={documentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Document
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
