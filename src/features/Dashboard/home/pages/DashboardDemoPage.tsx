"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import HomeHeroSection from "@/features/home/components/HomeHeroSection";
import HomePersonalInfo from "@/features/home/components/HomePersonalInfo";
import HomeSkills from "@/features/home/components/HomeSkills";
import HomeContact from "@/features/home/components/HomeContact";

type Props = {
  section: string;
};

const DashboardDemoPage: React.FC<Props> = ({ section }) => {
  const searchParams = useSearchParams();
  const darkMode = searchParams.get("dark") === "true";

  const sectionMap: Record<string, React.ReactNode> = {
    homeHero: <HomeHeroSection />,
    homePersonalInfo: <HomePersonalInfo />,
    homeSkills: <HomeSkills />,
    homeContact: <HomeContact />,
  };

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900" : "" + "transition-colors duration-300"
      }
    >
      {sectionMap[section] ?? null}
    </div>
  );
};

export default DashboardDemoPage;
