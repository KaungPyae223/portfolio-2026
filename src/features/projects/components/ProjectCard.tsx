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
} from "lucide-react";
import Link from "next/link";

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
  const projectVariants = {
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
    const techIcons: { [key: string]: JSX.Element } = {
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
      <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
        {/* Project Image with Overlay */}
        <div className="relative h-[280px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Action Buttons - Show on Hover */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">Live</span>
              </a>
            )}
            {frontendLink && (
              <Link
                href={"/projects/alpha"}
                rel="noopener noreferrer"
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Expand className="w-4 h-4" />
                <span className="text-sm font-medium">Detals</span>
              </Link>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Title */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {tech.slice(0, 4).map((techItem, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2.5 py-1 rounded-lg text-xs font-medium border border-yellow-200 dark:border-yellow-800"
              >
                {getIcon(techItem)}
                <span>{techItem}</span>
              </span>
            ))}
            {tech.length > 4 && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-lg text-xs font-medium">
                +{tech.length - 4}
              </span>
            )}
          </div>

          {/* Additional Links */}
          <div className="mt-4 flex gap-2">
            {backendLink && (
              <a
                href={backendLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Backend →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
