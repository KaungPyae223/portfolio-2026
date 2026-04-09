import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { easeOut } from "framer-motion";

interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  frontendLink?: string;
  backendLink?: string;
  demoLink?: string;
  tech: string[];
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
}: ProjectCardProps) => {
  const projectVariants = {
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
              <Link
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">View Live</span>
              </Link>
            )}

            <Link
              href={`/projects/${id}`}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">View Details</span>
            </Link>
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
          <div className="mt-4 flex gap-6">
            {frontendLink && (
              <a
                href={frontendLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Frontend →
              </a>
            )}
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
