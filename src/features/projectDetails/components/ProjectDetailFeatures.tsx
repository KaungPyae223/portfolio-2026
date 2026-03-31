"use client";
import React from "react";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

interface ProjectDetailFeaturesProps {
  features: string[];
  challenges: string[];
  solutions: string[];
}

const ProjectDetailFeatures = ({
  features,
  challenges,
  solutions,
}: ProjectDetailFeaturesProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Key Features */}
      <motion.div
        variants={sectionVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Key Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              variants={sectionVariants}
              className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {feature}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Challenges & Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Challenges */}
        <motion.div
          variants={sectionVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Challenges
          </h3>

          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge}
                variants={sectionVariants}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {challenge}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solutions */}
        <motion.div
          variants={sectionVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Solutions
          </h3>

          <div className="space-y-4">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution}
                variants={sectionVariants}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {solution}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailFeatures;
