"use client";
import Container from "@/features/global/components/Container";
import React from "react";
import AboutIntro from "../components/AboutIntro";
import AboutEducation from "../components/AboutEducation";
import AboutExperiences from "../components/AboutExperiences";

const AboutPage = () => {
  return (
    <Container className="space-y-12 pt-28">
      <AboutIntro />
      <AboutEducation />
      <AboutExperiences />
    </Container>
  );
};

export default AboutPage;
