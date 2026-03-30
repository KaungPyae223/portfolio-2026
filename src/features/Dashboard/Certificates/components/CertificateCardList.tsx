import React, { useMemo } from "react";
import CertificateCard from "./CertificateCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

interface CertificateCardListProps {
  data: any[];
  isLoading: boolean;
}

const CertificateCardList = ({ data, isLoading }: CertificateCardListProps) => {
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

  const router = useRouter();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {data?.length > 0 ? (
        data.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            id={certificate.id}
            image={certificate.image}
            title={certificate.title}
            lecture={certificate.lecture}
            url={certificate.url}
            complete_date={certificate.complete_date}
            technologies={certificate.technologies}
            is_featured={certificate.is_featured}
          />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No certificates found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or add a new certificate.
            </p>
            <Button
              onClick={() => router.push("/dashboard/certificates/create")}
              size="sm"
            >
              Add Certificate
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CertificateCardList;
