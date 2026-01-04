"use client";

import Link from "next/link";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  FolderKanban,
  User,
  Award,
  Sun,
  Moon,
  Globe,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";

interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

const languages = [
  { code: "en", label: "English" },
  { code: "jp", label: "日本語" },
];

const HomeNav = ({
  currentLanguage,
  darkMode,
  toggleDarkMode,
}: {
  currentLanguage: any;
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const t = useTranslations("navigation");

  const navLinks: NavLink[] = [
    { name: t("home"), href: "/", icon: Home },
    { name: t("projects"), href: "/projects", icon: FolderKanban },
    { name: t("about"), href: "/about", icon: User },
    { name: t("certificates"), href: "/certificates", icon: Award },
  ];

  const pathname = usePathname();

  const router = useRouter();

  const handleLanguageChange = (language: string) => {
    router.replace(pathname, { locale: language });
  };

  return (
    <DrawerContent className="w-[280px] sm:w-[320px] p-0">
      <div className="h-full flex flex-col">
        <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
          <DrawerTitle className="text-gray-900 dark:text-gray-100">
            {t("menu")}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 p-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <DrawerClose key={link.href} asChild>
                  <Button
                    asChild
                    variant={isActive ? "default" : "ghost"}
                    className={
                      isActive
                        ? "justify-start bg-yellow-600 hover:bg-yellow-700 text-white"
                        : "justify-start"
                    }
                  >
                    <Link href={link.href} scroll={false}>
                      <Icon className="mr-2 h-4 w-4" />
                      {link.name}
                    </Link>
                  </Button>
                </DrawerClose>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

          {/* Settings Section */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">
              {t("setting")}
            </p>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              onClick={toggleDarkMode}
              className="w-full justify-start"
            >
              {darkMode ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark Mode
                </>
              )}
            </Button>

            {/* Language Selector */}
            <div className="px-2">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("languages")}
                </span>
              </div>
              <Select
                value={currentLanguage.code}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </div>
      </div>
    </DrawerContent>
  );
};

export default HomeNav;
