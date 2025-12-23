"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "About", href: "/about", icon: User },
  { name: "Certificates", href: "/certificates", icon: Award },
];

const languages = [
  { code: "en", label: "English" },
  { code: "my", label: "မြန်မာ" },
  { code: "ja", label: "日本語" },
];

const HomeNav = () => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  // Sync initial state from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialMode = storedTheme || (prefersDark ? "dark" : "light");

    setDarkMode(initialMode === "dark");

    // Load saved language
    const storedLang = localStorage.getItem("language") || "en";
    setCurrentLanguage(storedLang);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newMode);
    document.documentElement.classList.toggle("dark", newMode === "dark");
  };

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value);
    localStorage.setItem("language", value);
    // Add your actual language change logic here
  };

  return (
    <DrawerContent className="w-[280px] sm:w-[320px] p-0">
      <div className="h-full flex flex-col">
        <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
          <DrawerTitle className="text-gray-900 dark:text-gray-100">
            Menu
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
              Settings
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
                  Language
                </span>
              </div>
              <Select
                value={currentLanguage}
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
