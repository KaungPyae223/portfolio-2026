import ProjectDetailsPage from "@/features/projectDetails/page/ProjectDetailsPage";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <ProjectDetailsPage id={id} />;
};

export default page;
