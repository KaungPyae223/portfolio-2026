"use client";
import React, { useEffect } from "react";
import { useDashboardStore } from "@/store/useDashboardStroe";
import AboutEducationEditForm from "../components/AboutEducationEditForm";

const AboutEducationEditPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("About Page Education Management");
    setBreadCrumbContent([
      {
        title: "About",
        link: "/dashboard/about",
      },
      {
        title: "Education Edit",
        link: "/dashboard/about/education-edit",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <AboutEducationEditForm />
    </div>
  );
};

export default AboutEducationEditPage;
