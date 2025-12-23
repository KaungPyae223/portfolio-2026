import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminBreadCrumb from "@/features/global/components/AdminBreadCrumb";
import { AdminNav } from "@/features/global/components/AdminNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminNav />
      <main className="w-full">
        <div className="p-3 flex items-center gap-4 border-b w-full">
          <SidebarTrigger />
          <AdminBreadCrumb />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
