"use client";
import React from "react";
import HomeSkillEditForm from "../components/HomeSkillEditForm";
import { useDashboardStore } from "@/store/useDashboardStroe";
import { useEffect } from "react";

const MySkillEditPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Home Page Skill Management");
    setBreadCrumbContent([
      {
        title: "Home",
        link: "/dashboard/home",
      },
      {
        title: "Skill Edit",
        link: "/dashboard/home/my-skill-edit",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <HomeSkillEditForm />
    </div>
  );
};

export default MySkillEditPage;
