"use client";
import React, { useEffect, useRef } from "react";
import Container from "@/features/global/components/Container";
import HomeHeroSection from "@/features/home/components/HomeHeroSection";
import HomePersonalInfo from "@/features/home/components/HomePersonalInfo";
import HomeProjects from "@/features/home/components/HomeProjects";
import HomeSkills from "@/features/home/components/HomeSkills";
import HomeProjectDetails from "../components/HomeProjectDetails";
import HomeContact from "../components/HomeContact";
import HomeCertificates from "../components/HomeCertificates";

const HomePage = () => {
  return (
    <>
      <HomeProjectDetails />
      <Container>
        <HomeHeroSection />
        <HomePersonalInfo />
        <HomeSkills />
        <HomeProjects />
        <HomeCertificates />
        <HomeContact />
      </Container>
    </>
  );
};

export default HomePage;
