"use client";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Server,
  Palette,
  GitBranch,
  Terminal,
  Layers,
  Cpu,
  Cloud,
  Package,
  Zap,
  Layout,
  Shield,
  Box,
  GitMerge,
  Coffee,
} from "lucide-react";
import { useTranslations } from "next-intl";

const HomeSkills = () => {
  const t = useTranslations("home");

  const allSkills = [
    { name: "React", icon: <Code className="w-8 h-8" />, level: 90 },
    { name: "Next.js", icon: <Globe className="w-8 h-8" />, level: 85 },
    { name: "TypeScript", icon: <Terminal className="w-8 h-8" />, level: 80 },
    { name: "HTML/CSS", icon: <Layout className="w-8 h-8" />, level: 95 },
    { name: "JavaScript", icon: <Coffee className="w-8 h-8" />, level: 90 },
    { name: "Laravel", icon: <Server className="w-8 h-8" />, level: 85 },
    { name: "Express.js", icon: <Zap className="w-8 h-8" />, level: 80 },
    { name: "Node.js", icon: <Cpu className="w-8 h-8" />, level: 75 },
    { name: "PHP", icon: <Code className="w-8 h-8" />, level: 80 },
    { name: "MySQL", icon: <Database className="w-8 h-8" />, level: 85 },
    { name: "MongoDB", icon: <Database className="w-8 h-8" />, level: 80 },
    { name: "PostgreSQL", icon: <Database className="w-8 h-8" />, level: 75 },
    { name: "Git", icon: <GitBranch className="w-8 h-8" />, level: 85 },
    { name: "Docker", icon: <Box className="w-8 h-8" />, level: 70 },
    { name: "REST API", icon: <Globe className="w-8 h-8" />, level: 90 },
    { name: "GraphQL", icon: <GitMerge className="w-8 h-8" />, level: 75 },
    { name: "Tailwind CSS", icon: <Palette className="w-8 h-8" />, level: 90 },
    { name: "Bootstrap", icon: <Layers className="w-8 h-8" />, level: 85 },
    { name: "Webpack", icon: <Package className="w-8 h-8" />, level: 75 },
    { name: "Vite", icon: <Zap className="w-8 h-8" />, level: 80 },
    { name: "AWS", icon: <Cloud className="w-8 h-8" />, level: 70 },
    { name: "Firebase", icon: <Shield className="w-8 h-8" />, level: 75 },
    { name: "Figma", icon: <Palette className="w-8 h-8" />, level: 80 },
    { name: "VS Code", icon: <Code className="w-8 h-8" />, level: 95 },
    { name: "JWT", icon: <Shield className="w-8 h-8" />, level: 85 },
  ];

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
        ease: "easeOut",
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
        ease: "easeOut",
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
            {allSkills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <div className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-yellow-600 dark:text-yellow-400">
                    {skill.icon}
                  </div>
                  <div className="text-center">
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
