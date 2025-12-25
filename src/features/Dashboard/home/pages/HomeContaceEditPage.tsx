
"use client";
import React, { useEffect } from "react";
import HomeContaceManagementForm from "../components/HomeContaceManagementForm";
import { useDashboardStore } from "@/store/useDashboardStroe";

const HomeContaceEditPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Home Page Contact Management");
    setBreadCrumbContent([
      {
        title: "Home",
        link: "/dashboard/home",
      },
      {
        title: "Contact Edit",
        link: "/dashboard/home/contact-edit",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <HomeContaceManagementForm />
    </div>
  );
};

export default HomeContaceEditPage;
