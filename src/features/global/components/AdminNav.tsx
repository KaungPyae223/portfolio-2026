"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  User,
  FileText,
  BarChart3,
  LogOut,
  Globe,
  Award,
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
import { usePathname } from "next/navigation";

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
      title: "About",
      url: "/dashboard/about",
      icon: User,
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
              <Select>
                <SelectTrigger className="w-full">
                  <Globe strokeWidth={1} size={20} />
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="my">မြန်မာ</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
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
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
