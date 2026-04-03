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

  const {
    data: homeData,
    error: homeError,
    isLoading: homeIsLoading,
  } = useSWR(`/user-side/home?language=${language}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    errorRetryCount: 3,
  });

  const {
    data: aboutData,
    error: aboutError,
    isLoading: aboutIsLoading,
  } = useSWR(`/user-side/about?language=${language}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  const sectionMap: Record<string, React.ReactNode> = {
    homeHero: (
      <HomeHeroSection
        prefix={homeData?.data.prefix}
        name={homeData?.data.name}
        title={homeData?.data.title}
        content={homeData?.data.content}
      />
    ),
    homePersonalInfo: (
      <HomePersonalInfo
        profileURL={homeData?.data.profileURL}
        name={homeData?.data.name}
        dob={homeData?.data.date_of_birth}
        location={homeData?.data.location}
        email={homeData?.data.email}
        phone={homeData?.data.phone}
        educations={homeData?.data.educations}
        experiences={homeData?.data.experiences}
        cvURL={homeData?.data.cvURL}
      />
    ),
    homeSkills: <HomeSkills skills={homeData?.data.skills} />,
    homeContact: (
      <HomeContact
        profileURL={homeData?.data.profileURL}
        name={homeData?.data.name}
        phone={homeData?.data.phone}
        title={homeData?.data.title}
        location={homeData?.data.location}
        email={homeData?.data.email}
        github={homeData?.data.github}
        linkedin={homeData?.data.linkedin}
        facebook={homeData?.data.facebook}
      />
    ),
    aboutIntro: (
      <AboutIntro
        title={aboutData?.data.title}
        subtitle={aboutData?.data.subtitle}
        firstParagraph={aboutData?.data.first_paragraph}
        secondParagraph={aboutData?.data.second_paragraph}
        profileURL={aboutData?.data.profileURL}
      />
    ),
    aboutExperiences: (
      <AboutExperiences experienceData={aboutData?.data.aboutExperience} />
    ),
    aboutEducation: (
      <AboutEducation educationData={aboutData?.data.aboutEducation} />
    ),
  };

  if (homeIsLoading || aboutIsLoading) return <Loading />;
  if (homeError || aboutError)
    return <div>Error: {homeError?.message || aboutError?.message}</div>;

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
