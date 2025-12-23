"use client";
import HomeHeroSection from "@/features/home/components/HomeHeroSection";

import DashboardHomeCard from "../components/DashboardHomeCard";
import HomePersonalInfo from "@/features/home/components/HomePersonalInfo";
import HomeSkills from "@/features/home/components/HomeSkills";
import HomeContact from "@/features/home/components/HomeContact";
import { useDashboardStore } from "@/store/useDashboardStroe";
import { useEffect } from "react";

const DashboardHomePage = () => {
  const { setTitle } = useDashboardStore();

  useEffect(() => {
    setTitle("Home Page Management");
  }, []);

  return (
    <div className="p-3 space-y-6 ">
      <DashboardHomeCard title="Home Hero Section" url="/homeHero" />
      <DashboardHomeCard
        title="Home Personal Info Section"
        url="/homePersonalInfo"
      />
      <DashboardHomeCard title="Home Skills Section" url="/homeSkills" />
      <DashboardHomeCard title="Home Contact Section" url="/homeContact" />
    </div>
  );
};

export default DashboardHomePage;
