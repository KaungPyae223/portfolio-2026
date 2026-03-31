"use client";

import { useEffect } from "react";
import CertificateEditForm from "../components/CertificateEditForm";
import { useDashboardStore } from "@/store/useDashboardStroe";

const CertificateEditPage = ({ id }: { id: string }) => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Certificate Edit");
    setBreadCrumbContent([
      {
        title: "Certificates",
        link: "/dashboard/certificates",
      },
      {
        title: "Edit",
        link: `/dashboard/certificates/edit/${id}`,
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <CertificateEditForm id={id} />
    </div>
  );
};

export default CertificateEditPage;
