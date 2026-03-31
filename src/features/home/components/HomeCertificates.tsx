"use client";
import React from "react";
import { motion } from "framer-motion";
import CertificateCard from "./HomeCertificateCard";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { easeOut } from "framer-motion";

const HomeCertificates = ({ certificates }: { certificates: any }) => {
  const t = useTranslations("home");

  console.log(certificates);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: easeOut,
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
              {t("my_professional")}
              <span className="bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900 p-1.5 rounded-md">
                {t("certificates")}
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
            {certificates.map((certificate: any, index: number) => (
              <CertificateCard
                key={index}
                title={certificate.title}
                issuer={certificate.lecture}
                date={certificate.complete_date}
                image={certificate.image}
                credentialUrl={certificate.url}
                skills={certificate.technologies.split(",")}
              />
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
          <div className="text-center mt-16">
            <Link
              href="/certificates"
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-gray-800 font-medium rounded-full transition-all duration-300"
            >
              {t("view_all_certificates")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCertificates;
