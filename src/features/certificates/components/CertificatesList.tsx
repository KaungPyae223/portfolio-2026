"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import CertificateCard from "./CertificateCard";

const CertificatesList = () => {
  type CertificateItem = {
    id: number;
    title: string;
    issuer: string;
    date: string;
    image: string;
    credentialUrl: string;
    skills: string[];
    category: string;
  };

  // Sample certificate data
  const data: CertificateItem[] = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "March 2024",
      image: "",
      credentialUrl: "https://aws.amazon.com/certification/",
      skills: ["AWS", "Cloud Architecture", "Lambda", "EC2", "S3"],
      category: "cloud",
    },
    {
      id: 2,
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "February 2024",
      image: "",
      credentialUrl: "https://cloud.google.com/certification",
      skills: ["GCP", "Cloud Run", "Firestore", "Compute Engine"],
      category: "cloud",
    },
    {
      id: 3,
      title: "Meta Frontend Developer Certificate",
      issuer: "Meta",
      date: "January 2024",
      image: "",
      credentialUrl:
        "https://www.coursera.org/professional-certificates/meta-front-end-developer",
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
      category: "frontend",
    },
    {
      id: 4,
      title: "MongoDB Certified Developer",
      issuer: "MongoDB",
      date: "December 2023",
      image: "",
      credentialUrl: "https://university.mongodb.com/",
      skills: ["MongoDB", "NoSQL", "Database Design", "Mongoose"],
      category: "database",
    },
    {
      id: 5,
      title: "Docker Certified Associate",
      issuer: "Docker",
      date: "November 2023",
      image: "",
      credentialUrl: "https://www.docker.com/certification/",
      skills: ["Docker", "Containers", "Kubernetes", "DevOps"],
      category: "devops",
    },
    {
      id: 6,
      title: "Advanced React and Redux",
      issuer: "Udemy",
      date: "October 2023",
      image: "",
      credentialUrl: "https://www.udemy.com/course/react-redux/",
      skills: ["React", "Redux", "Hooks", "State Management"],
      category: "frontend",
    },
    {
      id: 7,
      title: "Certified Kubernetes Administrator",
      issuer: "CNCF",
      date: "September 2023",
      image: "",
      credentialUrl: "https://www.cncf.io/certification/cka/",
      skills: [
        "Kubernetes",
        "Container Orchestration",
        "DevOps",
        "Cloud Native",
      ],
      category: "devops",
    },
    {
      id: 8,
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "August 2023",
      image: "",
      credentialUrl:
        "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
      skills: ["Azure", "Cloud Computing", "Virtual Machines", "Storage"],
      category: "cloud",
    },
    {
      id: 9,
      title: "Node.js Application Developer",
      issuer: "OpenJS Foundation",
      date: "July 2023",
      image: "",
      credentialUrl: "https://openjsf.org/certification/",
      skills: ["Node.js", "JavaScript", "Express", "REST APIs"],
      category: "backend",
    },
    {
      id: 10,
      title: "Python for Data Science",
      issuer: "IBM",
      date: "June 2023",
      image: "",
      credentialUrl:
        "https://www.coursera.org/professional-certificates/ibm-data-science",
      skills: ["Python", "Data Science", "Pandas", "NumPy", "Machine Learning"],
      category: "data",
    },
    {
      id: 11,
      title: "React Native Developer",
      issuer: "Meta",
      date: "May 2023",
      image: "",
      credentialUrl:
        "https://www.coursera.org/professional-certificates/meta-react-native",
      skills: [
        "React Native",
        "Mobile Development",
        "JavaScript",
        "iOS",
        "Android",
      ],
      category: "mobile",
    },
    {
      id: 12,
      title: "PostgreSQL Certified Associate",
      issuer: "EDB",
      date: "April 2023",
      image: "",
      credentialUrl: "https://www.enterprisedb.com/training/certification",
      skills: [
        "PostgreSQL",
        "SQL",
        "Database Administration",
        "Performance Tuning",
      ],
      category: "database",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get unique certificate categories from data
  const certificateCategories = useMemo(() => {
    const categories = [
      "all",
      ...new Set(data.map((certificate) => certificate.category)),
    ];
    return categories.filter(Boolean);
  }, [data]);

  // Filter and search certificates
  const filteredCertificates = useMemo(() => {
    let filtered = data;

    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (certificate: CertificateItem) => certificate.category === activeFilter
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (certificate: CertificateItem) =>
          certificate.title.toLowerCase().includes(searchLower) ||
          certificate.issuer.toLowerCase().includes(searchLower) ||
          certificate.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower)
          )
      );
    }

    return filtered;
  }, [data, activeFilter, searchTerm]);

  // Get certificate count for each filter
  const getCertificateCount = (filter: string) => {
    if (filter === "all") return data.length;
    return data.filter((certificate) => certificate.category === filter).length;
  };

  return (
    <div className="m-5 my-10 pt-20">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        {/* Search Bar */}
        <div className="mb-8">
          <div
            className={`relative max-w-2xl mx-auto transition-all duration-300 ${
              isSearchFocused ? "scale-[1.02]" : "scale-100"
            }`}
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search
                className={`w-5 h-5 transition-colors duration-300 ${
                  isSearchFocused ? "text-yellow-500" : "text-gray-400"
                }`}
              />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search certificates by title, issuer, or skills..."
              className="w-full pl-12 pr-12 py-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
              </button>
            )}
          </div>

          {/* Search Results Count */}
          {searchTerm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                Found {filteredCertificates.length} certificate
                {filteredCertificates.length !== 1 ? "s" : ""}
                {searchTerm && ` for "${searchTerm}"`}
              </div>
            </motion.div>
          )}
        </div>
        {/* Filter Pills */}

        <div className="flex justify-center">
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 flex gap-1 shadow-inner">
            {certificateCategories.map((filter) => (
              <div
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative cursor-pointer z-10 px-4 py-2 flex items-center gap-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "text-white"
                    : "text-gray-700  dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="text-sm z-50">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 z-50 rounded-full ${
                    activeFilter === filter
                      ? "bg-white/20"
                      : "bg-gray-200 dark:bg-gray-700  text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {getCertificateCount(filter)}
                </span>
                {filter === activeFilter && (
                  <motion.div
                    layoutId="switch-pill"
                    className="absolute inset-0 bg-yellow-600 dark:bg-gray-600 rounded-full z-0"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

       
      </motion.div>

      {/* Certificates Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <AnimatePresence mode="wait">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <CertificateCard
                    title={certificate.title}
                    issuer={certificate.issuer}
                    date={certificate.date}
                    image={certificate.image}
                    credentialUrl={certificate.credentialUrl}
                    skills={certificate.skills}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="col-span-full text-center py-20">
                  <div className="max-w-md mx-auto">
                    <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No certificates found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {searchTerm
                        ? `No certificates match your search "${searchTerm}". Try different keywords.`
                        : `No certificates in the "${activeFilter}" category.`}
                    </p>
                    {(searchTerm || activeFilter !== "all") && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setActiveFilter("all");
                        }}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Show more results indicator if there are many certificates */}
      {filteredCertificates.length > 6 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {Math.min(filteredCertificates.length, 6)} of{" "}
              {filteredCertificates.length} certificates
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CertificatesList;
