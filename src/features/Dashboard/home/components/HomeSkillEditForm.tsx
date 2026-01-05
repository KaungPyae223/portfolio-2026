"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import HomeHeroManagementPreview from "./HomeHeroManagementPreview";
import Link from "next/link";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/services/fetcher";
import Loading from "@/features/global/components/Loading";
import { api, formApi } from "@/services/api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name is required" })
    .max(50, { message: "name is too long" }),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB"
    ),
});

const HomeSkillEditForm = () => {
  const { data, error, isLoading } = useSWR(
    "/user-side/home?language=English",
    fetcher,
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
    }
  );

  const [skillImage, setSkillImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPEG, PNG, WebP, or SVG image");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSkillImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    form.setValue("image", file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const clearImage = () => {
    setSkillImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);

    setLoading(true);
    try {
      await formApi.post("/home-management/create-skill", formData);
      mutate("/user-side/home?language=Japanese");
      mutate("/user-side/home?language=English");

      toast.success("Skill created successfully");
      form.reset();
      setSkillImage(null);
      setLoading(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  const deleteSkill = async (id: string) => {
    if (window.confirm("Are you sure to delete")) {
      try {
        await api.delete("/home-management/delete-skill/" + id);
        mutate("/user-side/home?language=English");
        mutate("/user-side/home?language=Japanese");
        form.reset();
        toast.success("Skill deleted successfully");
      } catch (error: any) {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    }
  };

  if (isLoading) return <Loading />;

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
        <CardContent className="space-y-6">
          {/* Skills Section */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-semibold">Skills Management</h2>
              <p className="text-sm text-muted-foreground">
                Add and manage your technical skills
              </p>
            </div>

            {/* Add New Skill Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-white rounded-lg border border-gray-200 w-lg p-6 mb-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Add New Skill
                  </h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Skill Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Skill Icon/Logo
                      </label>
                      <div
                        className={`border-2 mb-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                          isDragging
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {skillImage && !loading ? (
                          <div className="relative">
                            <img
                              src={skillImage}
                              alt="Skill icon"
                              className="w-20 h-20 mx-auto object-cover rounded-lg shadow-sm"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-8 w-8 p-0 rounded-full shadow-lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearImage();
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">
                              Click to change
                            </p>
                          </div>
                        ) : loading ? (
                          <div className="py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-sm text-gray-600">
                              Uploading skill...
                            </p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                            <p className="text-base text-gray-600 mb-2">
                              Drag and drop or click to upload
                            </p>
                            <p className="text-sm text-gray-500">
                              PNG, JPG, WebP, SVG (Max 2MB)
                            </p>
                          </div>
                        )}
                      </div>
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    form.setValue("image", file);
                                    handleImageUpload(e.target.files);
                                  }
                                }}
                                className="hidden"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Adding Skill...
                        </>
                      ) : (
                        "Add Skill"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>

            {/* Skills Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Current Skills ({data?.data.skills.length})
              </h3>
              <div className="grid grid/delete-skill/:id-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {/* Sample Skill Cards */}
                {data?.data.skills.map((skill: any) => (
                  <div
                    key={skill.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group relative hover:-translate-y-1"
                  >
                    <div className="aspect-square mb-3 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Image
                        src={skill.image}
                        alt={skill.name}
                        width={120}
                        height={120}
                        className="rounded-lg object-contain p-2"
                      />
                    </div>
                    <p className="text-center font-medium text-sm text-gray-900 truncate">
                      {skill.name}
                    </p>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all h-8 w-8 p-0 rounded-full shadow-lg"
                      onClick={() => deleteSkill(skill.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeSkillEditForm;
