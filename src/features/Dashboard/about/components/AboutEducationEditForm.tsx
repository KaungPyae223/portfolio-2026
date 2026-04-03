"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Plus, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { fetcher } from "@/services/fetcher";
import useSWR from "swr";
import { Label } from "@/components/ui/label";
import AboutEducationForm from "./AboutEducationForm";

type Language = "English" | "Japanese";

const AboutEducationEditForm = () => {
  const [activeTab, setActiveTab] = useState<Language>("English");
  const [educationData, setEducationData] = useState<any>([]);

  const { data, error, isLoading } = useSWR(
    `/about/get-all-education`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  console.log(data);

  useEffect(() => {
    if (data) {
      const educationItems = data.data
        .filter((item: any) => item.language === activeTab)
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          language: item.language,
          isNew: false,
          isEditing: false,
        }));

      setEducationData(educationItems);
    }
  }, [data, activeTab]);

  const addEducationItem = () => {
    setEducationData((prev: any) => [
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        language: activeTab,
        isNew: true,
        isEditing: true,
      },
      ...prev,
    ]);
  };

  const removeEducationItem = (index: number) => {
    const newEducationData = educationData.filter((_, i) => i !== index);
    setEducationData(newEducationData);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <Link href="/dashboard/about">
            <Button variant={"outline"} className="w-fit">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="space-y-1 mt-3">
            <h2 className="text-xl font-semibold">Education Data</h2>
            <p className="text-sm text-muted-foreground">
              Add and manage your education information
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("English")}
                className={`rounded-md px-4 py-1.5 text-sm font-medium ${
                  activeTab === "English"
                    ? "bg-white shadow"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                English
              </button>

              <button
                onClick={() => setActiveTab("Japanese")}
                className={`rounded-md px-4 py-1.5 text-sm font-medium ${
                  activeTab === "Japanese"
                    ? "bg-white shadow"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Japanese
              </button>
            </div>
            {/* Education Items */}
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">
                  Education Items ({activeTab})
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEducationItem}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Education
                </Button>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-32 w-full animate-pulse bg-gray-100 rounded-lg"
                    />
                  ))
                ) : educationData.length > 0 ? (
                  educationData.map((item: any, index: number) => (
                    <AboutEducationForm
                      key={item.id}
                      data={item}
                      index={index}
                      onRemove={removeEducationItem}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-4">
                      <GraduationCap className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      No education items
                    </h3>
                    <p className="text-sm text-gray-500 text-center max-w-xs mt-1">
                      You haven&apos;t added any education details for this
                      language yet. Click the button above to get started.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addEducationItem}
                      className="mt-6"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add your first education
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sticky top-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Preview</h2>
                  <p className="text-sm text-muted-foreground">
                    Live preview of your education
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {activeTab}
                </Badge>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-20 w-full animate-pulse bg-gray-100 rounded-lg"
                    />
                  ))
                ) : educationData.length > 0 ? (
                  educationData.map((item: any, index: number) => (
                    <div
                      key={item.id}
                      className="border-l-4 border-green-500 pl-4 py-2"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {item.title || "Education Title"}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mt-2 whitespace-pre-wrap">
                        {item.description ||
                          "Education description will appear here..."}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="py-12 px-4 text-center border-2 border-dashed border-gray-100 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      Preview will appear here once you add education items.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutEducationEditForm;
