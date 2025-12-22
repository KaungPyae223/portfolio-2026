import React from "react";
import Container from "@/features/global/components/Container";
import ProjectIntro from "../components/ProjectIntro";
import ProjectList from "../components/ProjectList";

const ProjectPage = () => {
  return (
    <Container>
      <ProjectIntro />
      <ProjectList />
    </Container>
  );
};

export default ProjectPage;
