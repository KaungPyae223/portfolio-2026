"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, Building } from "lucide-react";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  skills: string[];
}

const CertificateCard = ({
  title,
  issuer,
  date,
  image,
  credentialUrl,
  skills,
}: CertificateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
        {/* Certificate Image */}
        <div className="relative h-[300px] overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Certificate Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <Building className="w-4 h-4" />
              <span>{issuer}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Credential Link */}
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium text-sm transition-colors"
            >
              <span>View Credential</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
