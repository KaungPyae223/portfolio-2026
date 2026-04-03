"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";
import PersonalInfo from "./PersonalManagement/PersonalInfo";
import EducationInfo from "./PersonalManagement/EducationInfo";
import ExperienceInfo from "./PersonalManagement/ExperienceInfo";
import CVInfo from "./PersonalManagement/CVInfo";
import ProfilePicture from "./PersonalManagement/ProfilePicture";
import useSWR from "swr";
import { fetcher } from "@/services/fetcher";

const PersonalInfoManagementForm = () => {
  const { data, error, isLoading } = useSWR(
    "/user-side/home?language=English",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      errorRetryCount: 3,
    },
  );

  console.log(data);

  return (
    <div>
      <Card>
        <CardHeader>
          <Link href="/dashboard/home">
            <Button variant={"outline"} className="w-fit">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <CVInfo allCVs={data?.data.allCVs} />
            <PersonalInfo />
          </div>

          <div className="space-y-3">
            <ProfilePicture profileURL={data?.data.profileURL} />
            <EducationInfo />
            <ExperienceInfo />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoManagementForm;
