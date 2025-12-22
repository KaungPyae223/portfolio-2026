"use client";
import React from "react";
import { motion } from "framer-motion";
import CertificateCard from "./HomeCertificateCard";

const HomeCertificates = () => {
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

  const certificates = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "March 2024",
      image: "",
      credentialUrl: "https://aws.amazon.com/certification/",
      skills: ["AWS", "Cloud Architecture", "Lambda", "EC2", "S3"],
    },
    {
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "February 2024",
      image: "",
      credentialUrl: "https://cloud.google.com/certification",
      skills: ["GCP", "Cloud Run", "Firestore", "Compute Engine"],
    },
    {
      title: "Meta Frontend Developer Certificate",
      issuer: "Meta",
      date: "January 2024",
      image: "",
      credentialUrl:
        "https://www.coursera.org/professional-certificates/meta-front-end-developer",
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
    },
    {
      title: "MongoDB Certified Developer",
      issuer: "MongoDB",
      date: "December 2023",
      image: "",
      credentialUrl: "https://university.mongodb.com/",
      skills: ["MongoDB", "NoSQL", "Database Design", "Mongoose"],
    },
    {
      title: "Docker Certified Associate",
      issuer: "Docker",
      date: "November 2023",
      image: "",
      credentialUrl: "https://www.docker.com/certification/",
      skills: ["Docker", "Containers", "Kubernetes", "DevOps"],
    },
    {
      title: "Advanced React and Redux",
      issuer: "Udemy",
      date: "October 2023",
      image: "",
      credentialUrl: "https://www.udemy.com/course/react-redux/",
      skills: ["React", "Redux", "Hooks", "State Management"],
    },
  ];

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
              My Professional
              <span className="bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900 p-1.5 rounded-md">
                Certificates
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
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={index}
                title={certificate.title}
                issuer={certificate.issuer}
                date={certificate.date}
                image={certificate.image}
                credentialUrl={certificate.credentialUrl}
                skills={certificate.skills}
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
            <a
              href="#"
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-gray-800 font-medium rounded-full transition-all duration-300"
            >
              View All Certificates
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCertificates;
