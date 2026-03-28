import CertificateEditPage from "@/features/Dashboard/Certificates/pages/CertificateEditPage";

export default async function EditCertificatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <CertificateEditPage id={id} />;
}
