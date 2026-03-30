"use client";
import Container from "@/features/global/components/Container";
import HomeHeroSection from "@/features/home/components/HomeHeroSection";
import HomePersonalInfo from "@/features/home/components/HomePersonalInfo";
import HomeProjects from "@/features/home/components/HomeProjects";
import HomeSkills from "@/features/home/components/HomeSkills";
import HomeProjectDetails from "../components/HomeProjectDetails";
import HomeContact from "../components/HomeContact";
import HomeCertificates from "../components/HomeCertificates";
import useSWR from "swr";
import { fetcher } from "@/services/fetcher";
import Loading from "@/features/global/components/Loading";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

const HomePage = () => {
  
  const locale = useLocale();

  const language = locale == "en" ? "English" : "Japanese";

  const { data, error, isLoading } = useSWR(
    `/user-side/home?language=${language}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <HomeProjectDetails />
      <Container>
        <HomeHeroSection
          prefix={data?.data.prefix}
          name={data?.data.name}
          title={data?.data.title}
          content={data?.data.content}
        />
        <HomePersonalInfo
          name={data?.data.name}
          dob={data?.data.date_of_birth}
          location={data?.data.location}
          email={data?.data.email}
          phone={data?.data.phone}
          educations={data?.data.educations}
          experiences={data?.data.experiences}
          profileURL={data?.data.profileURL}
          cvURL={data?.data.cvURL}
        />
        <HomeSkills skills={data?.data.skills} />
        <HomeProjects projects={data?.data.projects} />
        <HomeCertificates certificates={data?.data.certificates} />
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
      </Container>
    </>
  );
};

export default HomePage;
