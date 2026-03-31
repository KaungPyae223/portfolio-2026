import { useEffect } from "react";
import CertificateCreateForm from "../components/CertificateCreateForm";
import { useDashboardStore } from "@/store/useDashboardStroe";

const CertificateCreatePage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Certificate Create");
    setBreadCrumbContent([
      {
        title: "Certificates",
        link: "/dashboard/certificates",
      },
      {
        title: "Create",
        link: "/dashboard/certificates/create",
      },
    ]);
  }, []);

  return (
    <div className="p-3">
      <CertificateCreateForm />
    </div>
  );
};

export default CertificateCreatePage;
