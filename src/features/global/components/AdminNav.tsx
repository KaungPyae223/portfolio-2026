"use client";

import {
  Home,
  Settings,
  User,
  FileText,
  BarChart3,
  LogOut,
  Globe,
  Award,
  Logs,
  Key,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { api } from "@/services/api";

export function AdminNav() {
  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Home",
      url: "/dashboard/home",
      icon: Home,
    },
    {
      title: "About",
      url: "/dashboard/about",
      icon: User,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FileText,
    },
    {
      title: "Certificates",
      url: "/dashboard/certificates",
      icon: Award,
    },
    {
      title: "Change Password",
      url: "/dashboard/change-password",
      icon: Key,
    },
  ];

  const settingsItems = [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  const pathname = usePathname();

  const router = useRouter();

  const param = useSearchParams();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">P</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              Portfolio
            </span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground">
            Language
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              <Select
                defaultValue={param.get("language") || "en"}
                onValueChange={(value) => router.push("?language=" + value)}
              >
                <SelectTrigger className="w-full">
                  <Globe strokeWidth={1} size={20} />
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="jp">Japanese</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <Link
                      href={item.url}
                      className={`${
                        (
                          item.url === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.url)
                        )
                          ? "bg-gray-800 text-gray-100"
                          : ""
                      } relative hover:bg-gray-800 hover:text-gray-100 rounded-lg transition-colors`}
                    >
                      <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
