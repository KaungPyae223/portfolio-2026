"use client";
import { useEffect } from "react";
import { useDashboardStore } from "@/store/useDashboardStroe";
import ProjectCreateForm from "../components/ProjectCreateForm";

const ProjectCreatePage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Project Create");
    setBreadCrumbContent([
      {
        title: "Certificates",
        link: "/dashboard/projects",
      },
      {
        title: "Create",
        link: "/dashboard/projects/create",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <ProjectCreateForm />
    </div>
  );
};

export default ProjectCreatePage;
