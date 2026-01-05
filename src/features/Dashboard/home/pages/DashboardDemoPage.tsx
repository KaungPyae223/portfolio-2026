"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import HomeHeroSection from "@/features/home/components/HomeHeroSection";
import HomePersonalInfo from "@/features/home/components/HomePersonalInfo";
import HomeSkills from "@/features/home/components/HomeSkills";
import HomeContact from "@/features/home/components/HomeContact";
import AboutIntro from "@/features/about/components/AboutIntro";
import AboutEducation from "@/features/about/components/AboutEducation";
import AboutExperiences from "@/features/about/components/AboutExperiences";
import useSWR from "swr";
import { fetcher } from "@/services/fetcher";
import Loading from "@/features/global/components/Loading";
import { useLocale } from "next-intl";

type Props = {
  section: string;
};

const DashboardDemoPage: React.FC<Props> = ({ section }) => {
  const locale = useLocale();
  const searchParams = useSearchParams();

  const language = locale == "en" ? "English" : "Japanese";

  const darkMode = searchParams.get("dark") === "true";

  const { data, error, isLoading } = useSWR(
    `/user-side/home?language=${language}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  const sectionMap: Record<string, React.ReactNode> = {
    homeHero: (
      <HomeHeroSection
        prefix={data?.data.prefix}
        name={data?.data.name}
        title={data?.data.title}
        content={data?.data.content}
      />
    ),
    homePersonalInfo: (
      <HomePersonalInfo
        profileURL={data?.data.profileURL}
        name={data?.data.name}
        dob={data?.data.date_of_birth}
        location={data?.data.location}
        email={data?.data.email}
        phone={data?.data.phone}
        educations={data?.data.educations}
        experiences={data?.data.experiences}
        cvURL={data?.data.cvURL}
      />
    ),
    homeSkills: <HomeSkills skills={data?.data.skills} />,
    homeContact: (
      <HomeContact
        profileURL={data?.data.profileURL}
        name={data?.data.name}
        phone={data?.data.phone}
        title={data?.data.title}
        location={data?.data.location}
        email={data?.data.email}
        github={data?.data.github}
        linkedin={data?.data.linkedin}
        facebook={data?.data.facebook}
      />
    ),
    aboutIntro: <AboutIntro />,
    aboutExperiences: <AboutExperiences />,
    aboutEducation: <AboutEducation />,
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

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
