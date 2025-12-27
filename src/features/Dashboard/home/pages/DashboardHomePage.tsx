"use client";

import DashboardHomeCard from "../components/DashboardHomeCard";
import { useDashboardStore } from "@/store/useDashboardStroe";
import { useEffect } from "react";

const DashboardHomePage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Home Page Management");
    setBreadCrumbContent([]);
  }, []);

  return (
    <div className="p-3 space-y-6 ">
      <DashboardHomeCard
        editLink="/dashboard/home/hero-edit"
        title="Home Hero Section"
        url="/homeHero"
      />
      <DashboardHomeCard
        editLink="/dashboard/home/personal-info-edit"
        title="Home Personal Info Section"
        url="/homePersonalInfo"
      />
      <DashboardHomeCard
        editLink="/dashboard/home/my-skill-edit"
        title="Home Skills Section"
        url="/homeSkills"
      />
      <DashboardHomeCard
        editLink="/dashboard/home/contact-edit"
        title="Home Contact Section"
        url="/homeContact"
      />
    </div>
  );
};

export default DashboardHomePage;
