"use client";

import { useDashboardStore } from "@/store/useDashboardStroe";
import React, { useEffect } from "react";
import HomeHeroManagementForm from "../components/HomeHeroManagementForm";

const HeroEditPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Home Page Hero Management");
    setBreadCrumbContent([
      {
        title: "Home",
        link: "/dashboard/home",
      },
      {
        title: "Hero Edit",
        link: "/dashboard/home/hero-edit",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <HomeHeroManagementForm />
    </div>
  );
};

export default HeroEditPage;
