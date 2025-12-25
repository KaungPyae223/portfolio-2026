"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import PersonalInfo from "./PersonalManagement/PersonalInfo";
import EducationInfo from "./PersonalManagement/EducationInfo";
import ExperienceInfo from "./PersonalManagement/ExperienceInfo";
import CVInfo from "./PersonalManagement/CVInfo";
import ProfilePicture from "./PersonalManagement/ProfilePicture";

const PersonalInfoManagementForm = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
            <CVInfo />
            <PersonalInfo />
          </div>

          <div className="space-y-3">
            <ProfilePicture />
            <EducationInfo />
            <ExperienceInfo />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoManagementForm;
