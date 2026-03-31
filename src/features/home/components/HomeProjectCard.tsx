import Image from "next/image";
import { motion } from "framer-motion";
import { useDetailsStore } from "@/store/useDetailsStore";
import { easeOut } from "framer-motion";

import { useRouter } from "@/i18n/navigation";

const HomeProjectCard = ({
  title,
  description,
  keyFeature,
  tech,
  id,
  image,
}: {
  title: string;
  description: string;
  keyFeature: string[];
  tech: string[];
  id: number;
  image: string;
}) => {
  const { setDetailsContent } = useDetailsStore();

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

  const project = {
    title: title,
    description: description,
    image: image,
    technologies: tech,
    features: keyFeature,
  };

  const router = useRouter();

  return (
    <motion.div
      variants={projectVariants}
      onClick={() => router.push(`/projects/${id}`)}
    >
      <div
        onMouseEnter={() => setDetailsContent(project)}
        onMouseLeave={() => setDetailsContent(null)}
        className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
      >
        {/* Project Image with Overlay */}
        <div className="relative h-[280px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Title and Rating */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 ">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2.5 py-1 rounded-lg text-sm font-medium border border-yellow-200 dark:border-yellow-800"
              >
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeProjectCard;
