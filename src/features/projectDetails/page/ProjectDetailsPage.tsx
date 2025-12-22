import React from "react";
import Container from "@/features/global/components/Container";
import ProjectDetailHero from "../components/ProjectDetailHero";
import ProjectDetailInfo from "../components/ProjectDetailInfo";
import ProjectDetailFeatures from "../components/ProjectDetailFeatures";
import ProjectDetailGallery from "../components/ProjectDetailGallery";
import ProjectDetailTestimonials from "../components/ProjectDetailTestimonials";

const ProjectDetailsPage = () => {
  // Sample project data - in a real app, this would come from props or API
  const projectData = {
    title: "E-Commerce Platform",
    description:
      "A modern, full-featured e-commerce platform with real-time inventory management, secure payment processing, and responsive design.",
    image:
      "https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/example/ecommerce",
    category: "Web Development",
    duration: "3 months",
    teamSize: "4 developers",
    status: "completed" as const,
    role: "Full Stack Developer",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Stripe",
      "TailwindCSS",
    ],
    frontendLink: "https://github.com/example/ecommerce-frontend",
    backendLink: "https://github.com/example/ecommerce-backend",
    features: [
      "User authentication and authorization",
      "Product catalog with advanced filtering",
      "Shopping cart and wishlist functionality",
      "Secure payment integration with Stripe",
      "Real-time inventory management",
      "Order tracking and history",
      "Admin dashboard for product management",
      "Responsive design for all devices",
    ],
    challenges: [
      "Implementing real-time inventory updates",
      "Handling complex payment workflows",
      "Optimizing performance for large product catalogs",
      "Ensuring security for sensitive customer data",
    ],
    solutions: [
      "Used WebSocket connections for real-time updates",
      "Implemented Stripe with proper error handling",
      "Applied lazy loading and caching strategies",
      "Followed OWASP security guidelines and encryption",
    ],
    images: [
      "/projects/ecommerce-1.jpg",
      "/projects/ecommerce-2.jpg",
      "/projects/ecommerce-3.jpg",
      "/projects/ecommerce-4.jpg",
      "/projects/ecommerce-5.jpg",
      "/projects/ecommerce-6.jpg",
    ],
  };

  return (
    <Container className="space-y-12 pt-28 pb-9">
      <ProjectDetailHero
        title={projectData.title}
        description={projectData.description}
        image={projectData.image}
        demoLink={projectData.demoLink}
        githubLink={projectData.githubLink}
        category={projectData.category}
      />

      <ProjectDetailInfo
        duration={projectData.duration}
        teamSize={projectData.teamSize}
        status={projectData.status}
        role={projectData.role}
        technologies={projectData.technologies}
        frontendLink={projectData.frontendLink}
        backendLink={projectData.backendLink}
        demoLink={projectData.demoLink}
      />

      <ProjectDetailFeatures
        features={projectData.features}
        challenges={projectData.challenges}
        solutions={projectData.solutions}
      />

      <ProjectDetailGallery
        images={projectData.images}
        title={projectData.title}
      />
    </Container>
  );
};

export default ProjectDetailsPage;
