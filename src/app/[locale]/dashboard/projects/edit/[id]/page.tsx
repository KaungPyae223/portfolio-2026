import ProjectEditPage from "@/features/Dashboard/project/pages/ProjectEditPage";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <ProjectEditPage id={id} />;
}
