import DashboardDemoPage from "@/features/Dashboard/home/pages/DashboardDemoPage";

const page = async ({ params }: { params: Promise<{ section: string }> }) => {
  const { section } = await params;
  
  return <DashboardDemoPage section={section} />;
};

export default page;
