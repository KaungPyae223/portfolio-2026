"use client";
import { useDashboardStore } from "@/store/useDashboardStroe";
import React, { useEffect } from "react";
import DashboardHomeCard from "../../home/components/DashboardHomeCard";

const DashboardAboutPage = () => {
  const { setTitle } = useDashboardStore();

  useEffect(() => {
    setTitle("About Page Management");
  }, []);

  return (
    <div className="p-3 space-y-6 ">
      <DashboardHomeCard
        editLink="/dashboard/about/about-intro-edit"
        title="About Intro Section"
        url="/aboutIntro"
      />
      <DashboardHomeCard
        editLink="/dashboard/about/about-education-edit"
        title="About Education Section"
        url="/aboutEducation"
      />
      <DashboardHomeCard
        editLink="/dashboard/about/about-experiences-edit"
        title="About Experiences Section"
        url="/aboutExperiences"
      />
    </div>
  );
};

export default DashboardAboutPage;
