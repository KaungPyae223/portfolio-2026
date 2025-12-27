import React, { useMemo } from "react";
import CertificateCard from "./CertificateCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CertificateCardListProps {
  searchQuery?: string;
}

const CertificateCardList = ({
  searchQuery = "",
}: CertificateCardListProps) => {
  type CertificateItem = {
    id: number;
    image: string;
    title: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    verificationUrl?: string;
    skills: string[];
    status: "active" | "expired" | "pending";
  };

  // Sample certificate data
  const data: CertificateItem[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      credentialId: "AWS-ASA-123456",
      credentialUrl: "https://aws.amazon.com/verification",
      verificationUrl: "https://verify.aws.amazon.com/cert/123456",
      skills: ["Cloud Computing", "AWS", "Architecture", "DevOps"],
      status: "active",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud Platform",
      issueDate: "2023-08-20",
      expiryDate: "2025-08-20",
      credentialId: "GCP-PD-789012",
      credentialUrl: "https://cloud.google.com/credentials",
      verificationUrl: "https://cloud.google.com/verify/789012",
      skills: ["Google Cloud", "Development", "Kubernetes", "APIs"],
      status: "active",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1592210454359-801627e67647?w=800&h=600&fit=crop",
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      issueDate: "2022-12-10",
      expiryDate: "2024-12-10",
      credentialId: "MS-AZ-345678",
      credentialUrl: "https://learn.microsoft.com/certifications",
      verificationUrl: "https://learn.microsoft.com/verify/345678",
      skills: ["Azure", "Cloud Basics", "Networking", "Security"],
      status: "expired",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      title: "React Developer Certification",
      issuer: "Meta",
      issueDate: "2023-09-05",
      expiryDate: "2025-09-05",
      credentialId: "META-RD-901234",
      credentialUrl: "https://developers.facebook.com/certificates",
      verificationUrl: "https://developers.facebook.com/verify/901234",
      skills: ["React", "JavaScript", "Frontend", "Hooks"],
      status: "active",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=800&h=600&fit=crop",
      title: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      issueDate: "2023-07-12",
      expiryDate: "2025-07-12",
      credentialId: "CKA-567890",
      credentialUrl: "https://www.cncf.io/certification/cka",
      verificationUrl: "https://www.cncf.io/verify/567890",
      skills: [
        "Kubernetes",
        "Container Orchestration",
        "DevOps",
        "Cloud Native",
      ],
      status: "active",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      title: "Python for Data Science",
      issuer: "IBM",
      issueDate: "2023-04-18",
      expiryDate: "2025-04-18",
      credentialId: "IBM-PDS-234567",
      credentialUrl: "https://www.coursera.org/verify/234567",
      verificationUrl: "https://www.coursera.org/verify/234567",
      skills: ["Python", "Data Science", "Machine Learning", "Analytics"],
      status: "active",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      title: "Docker Certified Associate",
      issuer: "Docker Inc.",
      issueDate: "2023-05-22",
      expiryDate: "2025-05-22",
      credentialId: "DCA-890123",
      credentialUrl: "https://www.docker.com/certification",
      verificationUrl: "https://www.docker.com/verify/890123",
      skills: ["Docker", "Containers", "DevOps", "Microservices"],
      status: "active",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1618494689939-ed406910a7a8?w=800&h=600&fit=crop",
      title: "CompTIA Security+",
      issuer: "CompTIA",
      issueDate: "2023-03-10",
      expiryDate: "2026-03-10",
      credentialId: "SEC-456789",
      credentialUrl: "https://www.comptia.org/certifications/security",
      verificationUrl: "https://www.comptia.org/verify/456789",
      skills: ["Security", "Network Security", "Risk Management", "Compliance"],
      status: "active",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      issueDate: "2023-11-08",
      expiryDate: "2025-11-08",
      credentialId: "TF-DC-012345",
      credentialUrl: "https://www.tensorflow.org/certificate",
      verificationUrl: "https://www.tensorflow.org/verify/012345",
      skills: ["TensorFlow", "Deep Learning", "Neural Networks", "AI"],
      status: "pending",
    },
  ];

  // Filter certificates based on search query
  const filteredCertificates = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(
      (certificate) =>
        certificate.title.toLowerCase().includes(query) ||
        certificate.issuer.toLowerCase().includes(query) ||
        certificate.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        ) ||
        certificate.status.toLowerCase().includes(query) ||
        (certificate.credentialId &&
          certificate.credentialId.toLowerCase().includes(query))
    );
  }, [searchQuery]);

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {filteredCertificates.length > 0 ? (
        filteredCertificates.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            image={certificate.image}
            title={certificate.title}
            issuer={certificate.issuer}
            issueDate={certificate.issueDate}
            expiryDate={certificate.expiryDate}
            credentialId={certificate.credentialId}
            credentialUrl={certificate.credentialUrl}
            verificationUrl={certificate.verificationUrl}
            skills={certificate.skills}
            status={certificate.status}
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
            <Button size="sm">Add Certificate</Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CertificateCardList;
