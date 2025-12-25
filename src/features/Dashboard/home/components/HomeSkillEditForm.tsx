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

const formSchema = z.object({
  prefix: z
    .string()
    .min(2, { message: "prefix is required" })
    .max(4, { message: "prefix is too long" }),
  name: z
    .string()
    .min(2, { message: "name is required" })
    .max(50, { message: "name is too long" }),
  title: z
    .string()
    .min(2, { message: "title is required" })
    .max(50, { message: "title is too long" }),
  content: z
    .string()
    .min(2, { message: "content is required" })
    .max(50, { message: "content is too long" }),
});

const HomeSkillEditForm = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [skillImage, setSkillImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
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
      prefix: "I'm",
      name: "Kaung Pyae Aung",
      title: "Full stack web developer",
      content:
        "I recently finished the Bachelor of Computing and have an experience in web development with HTML, CSS, JavaScript, React, Next.js and Laravel. I have completed several projects, including portfolio websites, e-commerce, e-learning platforms, and others.",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
            <div className="bg-linear-to-br w-96 from-gray-50 to-white rounded-lg border border-gray-200 p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Add New Skill
              </h3>
              <div className="grid grid-cols-1 gap-4 ">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Skill Name
                  </label>
                  <Input placeholder="e.g., React, TypeScript, Node.js" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Skill Icon/Logo
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
                      isDragging
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {skillImage ? (
                      <div className="relative">
                        <img
                          src={skillImage}
                          alt="Skill icon"
                          className="w-16 h-16 mx-auto object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearImage();
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                          Click to change
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Drag and drop or click to upload
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, WebP, SVG (Max 2MB)
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="w-full md:w-auto">Add Skill</Button>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Current Skills (10)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {/* Sample Skill Cards */}
                {[
                  {
                    name: "HTML",
                  },
                  {
                    name: "CSS",
                  },
                  {
                    name: "JavaScript",
                  },
                  {
                    name: "React",
                  },
                  {
                    name: "TypeScript",
                  },
                  {
                    name: "Node.js",
                  },
                  {
                    name: "Next.js",
                  },
                  {
                    name: "Tailwind",
                  },
                ].map((skill, index) => (
                  <div
                    key={index}
                    className={`bg-linear-to-r from-orange-50 to-yellow-50 border-orange-200 border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group relative`}
                  >
                    <div className="aspect-square mb-3 bg-white rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {skill.name.slice(0, 2)}
                        </span>
                      </div>
                    </div>
                    <p className="text-center font-medium text-sm text-gray-800">
                      {skill.name}
                    </p>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    >
                      ×
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
