"use client";
import { useEffect } from "react";
import { useDashboardStore } from "@/store/useDashboardStroe";
import ProjectEditForm from "../components/ProjectEditForm";

const ProjectEditPage = ({ id }: { id: string }) => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Project Edit");
    setBreadCrumbContent([
      {
        title: "Projects",
        link: "/dashboard/projects",
      },
      {
        title: "Edit",
        link: "/dashboard/projects/edit",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <ProjectEditForm id={id} />
    </div>
  );
};

export default ProjectEditPage;
