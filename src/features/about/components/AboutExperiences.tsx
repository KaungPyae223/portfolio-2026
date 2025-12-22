import React from "react";
import { motion } from "framer-motion";

// Define the experience data with better structure and content
const experiencesData = [
  {
    title: "Frontend Development",
    icon: "🎨",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
    description:
      "Building responsive, accessible web interfaces with modern frameworks and best practices. Experienced in component-based architecture and state management.",
    level: "Advanced",
  },
  {
    title: "Styling & Design",
    icon: "🎯",
    skills: ["Tailwind CSS", "Material UI", "Styled Components", "SASS"],
    description:
      "Creating beautiful, maintainable designs using modern CSS frameworks and design systems. Proficient with utility-first CSS and component libraries.",
    level: "Intermediate",
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    skills: ["Node.js", "Express", "Laravel", "REST APIs"],
    description:
      "Developing robust server-side applications and RESTful APIs. Experience with database design and server deployment.",
    level: "Intermediate",
  },
  {
    title: "Tools & Workflow",
    icon: "🛠️",
    skills: ["Git", "VS Code", "Figma", "Webpack", "Vite"],
    description:
      "Using modern development tools and workflows for efficient code management and collaboration. Comfortable with version control and modern build tools.",
    level: "Advanced",
  },
];

const AboutExperiences = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
  };

  const headerVariants = {
    hidden: {
      y: -40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
        >
          <motion.h2
            className="text-5xl mb-10 leading-20"
            variants={headerVariants}
          >
            My{" "}
            <span className="p-3 px-6 font-medium rounded-xl  bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900">
              Experiences
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            variants={headerVariants}
          >
            A comprehensive overview of my technical skills and professional
            experience
          </motion.p>
        </motion.div>

        {/* Experience Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
        >
          {experiencesData.map((experience, index) => (
            <motion.div
              key={index}
              className="experience-card group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500"
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                  duration: 0.3,
                },
              }}
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{experience.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {experience.title}
                    </h3>
                    <span
                      className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                        experience.level === "Advanced"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                    >
                      {experience.level}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {experience.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="skill-tag px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-300 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutExperiences;
