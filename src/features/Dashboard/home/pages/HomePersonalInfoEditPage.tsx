"use client";
import { useDashboardStore } from "@/store/useDashboardStroe";
import React, { useEffect } from "react";
import HomePersonalManagementForm from "../components/HomePersonalManagementForm";

const HomePersonalInfoEditPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Home Page Personal Info Management");
    setBreadCrumbContent([
      {
        title: "Home",
        link: "/dashboard/home",
      },
      {
        title: "Personal Info Edit",
        link: "/dashboard/home/personal-info-edit",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <HomePersonalManagementForm />
    </div>
  );
};

export default HomePersonalInfoEditPage;
