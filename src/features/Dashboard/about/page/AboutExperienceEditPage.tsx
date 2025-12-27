"use client";
import { useDashboardStore } from "@/store/useDashboardStroe";
import React, { useEffect } from "react";
import AboutExperienceEditForm from "../components/AboutExperienceEditForm";

const AboutExperienceEditPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("About Page Experience Management");
    setBreadCrumbContent([
      {
        title: "About",
        link: "/dashboard/about",
      },
      {
        title: "Experience Edit",
        link: "/dashboard/about/experience-edit",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <AboutExperienceEditForm />
    </div>
  );
};

export default AboutExperienceEditPage;
