import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Code,
  Smartphone,
  Globe,
  Star,
  Expand,
  Edit,
  Trash2,
  Eye,
  Heart,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  frontendLink?: string;
  backendLink?: string;
  demoLink?: string;
  tech: string[];
}

const ProjectCard = ({
  image,
  title,
  description,
  frontendLink,
  backendLink,
  demoLink,
  tech,
}: ProjectCardProps) => {
  const projectVariants: any = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const getIcon = (techName: string) => {
    const techIcons: Record<string, React.ReactNode> = {
      React: <Code className="w-4 h-4" />,
      "Next.js": <Code className="w-4 h-4" />,
      "Vue.js": <Code className="w-4 h-4" />,
      Angular: <Code className="w-4 h-4" />,
      "Nuxt.js": <Code className="w-4 h-4" />,
      "Node.js": <Globe className="w-4 h-4" />,
      Express: <Globe className="w-4 h-4" />,
      Django: <Globe className="w-4 h-4" />,
      Python: <Code className="w-4 h-4" />,
      MongoDB: <Globe className="w-4 h-4" />,
      PostgreSQL: <Globe className="w-4 h-4" />,
      MySQL: <Globe className="w-4 h-4" />,
      Redis: <Globe className="w-4 h-4" />,
      Firebase: <Star className="w-4 h-4" />,
      AWS: <Globe className="w-4 h-4" />,
      Docker: <Code className="w-4 h-4" />,
      Kubernetes: <Code className="w-4 h-4" />,
      "Socket.io": <Globe className="w-4 h-4" />,
      WebRTC: <Smartphone className="w-4 h-4" />,
      "React Native": <Smartphone className="w-4 h-4" />,
      Stripe: <Star className="w-4 h-4" />,
      TailwindCSS: <Code className="w-4 h-4" />,
      "Framer-Motion": <Code className="w-4 h-4" />,
      "Three.js": <Code className="w-4 h-4" />,
      "D3.js": <Code className="w-4 h-4" />,
      "Chart.js": <Code className="w-4 h-4" />,
      Strapi: <Globe className="w-4 h-4" />,
      FastAPI: <Code className="w-4 h-4" />,
    };
    return techIcons[techName] || <Code className="w-4 h-4" />;
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

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-2">
                {demoLink && (
                  <Button size="sm" variant="secondary" className="h-8 px-3">
                    <Eye className="w-3 h-3 mr-1" />
                    Demo
                  </Button>
                )}
                {frontendLink && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </Button>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Project Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-black/50 text-white border-none"
            >
              Featured
            </Badge>
          </div>

          {/* Options Menu */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/50 text-white hover:bg-black/70"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
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
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>1.2k</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
