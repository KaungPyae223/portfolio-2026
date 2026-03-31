"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Smartphone, Globe } from "lucide-react";
import Image from "next/image";
import ProjectCard from "./HomeProjectCard";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { easeOut } from "framer-motion";

const HomeProjects = ({ projects }: { projects: any[] }) => {
  const t = useTranslations("home");

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
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold flex flex-wrap items-center justify-center gap-3 text-gray-900 dark:text-white">
              {t("my")}
              <span className="bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900 p-1.5 rounded-md">
                {t("projects")}
              </span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.name}
                description={project.description}
                keyFeature={project.key_feature.split("/")}
                tech={project.technologies.split("/")}
                id={project.id}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-gray-800 font-medium rounded-full transition-all duration-300"
            >
              {t("view_all_projects")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProjects;
