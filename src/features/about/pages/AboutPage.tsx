"use client";
import Container from "@/features/global/components/Container";
import AboutIntro from "../components/AboutIntro";
import AboutEducation from "../components/AboutEducation";
import AboutExperiences from "../components/AboutExperiences";
import { useLocale } from "next-intl";
import useSWR from "swr";
import { fetcher } from "@/services/fetcher";
import Loading from "@/features/global/components/Loading";

const AboutPage = () => {
  const locale = useLocale();

  const language = locale == "en" ? "English" : "Japanese";

  const { data, error, isLoading } = useSWR(
    `/user-side/about?language=${language}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  if (isLoading) return <Loading />;

  return (
    <Container className="space-y-12 pt-12">
      <AboutIntro
        title={data?.data.title}
        subtitle={data?.data.subtitle}
        firstParagraph={data?.data.first_paragraph}
        secondParagraph={data?.data.second_paragraph}
        profileURL={data?.data.profileURL}
      />
      <AboutEducation educationData={data?.data.aboutEducation} />
      <AboutExperiences experienceData={data?.data.aboutExperience} />
    </Container>
  );
};

export default AboutPage;
