"use client";
import { useDashboardStore } from "@/store/useDashboardStroe";
import React, { useEffect } from "react";
import AboutIntroEditForm from "../components/AboutIntroEditForm";

const AboutIntroEditPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("About Page Intro Management");
    setBreadCrumbContent([
      {
        title: "About",
        link: "/dashboard/about",
      },
      {
        title: "Intro Edit",
        link: "/dashboard/about/intro-edit",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <AboutIntroEditForm />
    </div>
  );
};

export default AboutIntroEditPage;
