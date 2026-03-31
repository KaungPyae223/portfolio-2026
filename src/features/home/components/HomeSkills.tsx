"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { easeOut } from "framer-motion";

const HomeSkills = ({ skills }: { skills: any }) => {
  const t = useTranslations("home");



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden  ">
      {/* Background decorative elements */}

      <div className="relative z-10 container mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold flex flex-wrap items-center justify-center gap-3 text-gray-900 dark:text-white">
              {t("my")}
              <span className="bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900 p-1.5 rounded-md">
                {t("skills")}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {skills.map((skill: any) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <div className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={100}
                    height={100}
                    
                  />
                  <div className="text-center mt-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSkills;
