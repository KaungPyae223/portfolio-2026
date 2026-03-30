"use client";

import Container from "@/features/global/components/Container";
import ProjectDetailHero from "../components/ProjectDetailHero";
import ProjectDetailInfo from "../components/ProjectDetailInfo";
import ProjectDetailFeatures from "../components/ProjectDetailFeatures";
import ProjectDetailGallery from "../components/ProjectDetailGallery";
import useSWR from "swr";
import { fetcher } from "@/services/fetcher";
import Loading from "@/features/global/components/Loading";

const ProjectDetailsPage = ({ id }: { id: string }) => {
  // Sample project data - in a real app, this would come from props or API

  const { data, error, isLoading } = useSWR(`/project/${id}`, fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 3,
  });

  const projectData = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="space-y-12 pt-28 pb-9">
      <ProjectDetailHero
        title={projectData?.name}
        description={projectData.description}
        image={projectData.profileImage}
        demoLink={projectData.demo_url}
      />

      <ProjectDetailInfo
        role={projectData.role}
        technologies={projectData.technologies.split("/")}
        frontendLink={projectData.front_end}
        backendLink={projectData.back_end}
        docLink={projectData.doc_url}
      />

      <ProjectDetailFeatures
        features={projectData.key_feature.split("/")}
        challenges={projectData.challenge.split("/")}
        solutions={projectData.solutions.split("/")}
      />

      {/* <ProjectDetailGallery
        images={projectData.images}
        title={projectData.title}
      /> */}
    </Container>
  );
};

export default ProjectDetailsPage;
