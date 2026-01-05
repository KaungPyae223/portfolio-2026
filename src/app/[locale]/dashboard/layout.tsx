import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import AdminBreadCrumb from "@/features/global/components/AdminBreadCrumb";
import { AdminNav } from "@/features/global/components/AdminNav";
import Middleware from "@/features/global/components/Middleware";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminNav />
      <main className="w-full">
        <Middleware>
          <div className="p-3 flex items-center gap-4 border-b w-full">
            <SidebarTrigger />
            <AdminBreadCrumb />
          </div>
          {children}
          <Toaster />
        </Middleware>
      </main>
    </SidebarProvider>
  );
}
