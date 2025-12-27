"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Upload, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title is required" })
    .max(50, { message: "Title is too long" }),
  subtitle: z
    .string()
    .min(2, { message: "Subtitle is required" })
    .max(100, { message: "Subtitle is too long" }),
  firstParagraph: z
    .string()
    .min(10, { message: "First paragraph is required" })
    .max(500, { message: "First paragraph is too long" }),
  secondParagraph: z
    .string()
    .min(10, { message: "Second paragraph is required" })
    .max(500, { message: "Second paragraph is too long" }),
});

interface ProfileImageFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  url: string;
  file: File;
}

type FormValues = z.infer<typeof formSchema>;

const AboutIntroEditForm = () => {
  const [profileImage, setProfileImage] = useState<ProfileImageFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Introduction",
      subtitle: "of My Story",
      firstParagraph: "Hi my name is Kaung Pyae Aung and currently finished the Bachelor of Computing in University of Greenwich. I also have completed the NCC Level 5, Level 4. I have focused on full stack web development, starting my studies at MMSIT, 2023. I also have an work experience from MMSIT work shop program under the control of Sayar Hein Htet Zan.",
      secondParagraph: "Throughout my developer journey, I have worked on various assignments, self-initiated projects, workshop programs and gaining practical experience in HTML, CSS, JavaScript, Tailwind CSS, React, Next.js and Laravel. While I acknowledge that my current coding practices need refinement to meet real-world standards, I am eager to improve through junior positions or internships. I am passionate about learning and tackling new challenges, continually striving to create and innovate.",
    },
  });

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPEG, PNG, or WebP image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newProfileImage: ProfileImageFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadDate: new Date().toLocaleDateString(),
        url: e.target?.result as string,
        file: file,
      };
      setProfileImage(newProfileImage);
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
    handleFileUpload(e.dataTransfer.files);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event.target.files);
  };

  const removeImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  function onSubmit(values: FormValues) {
    const formData = {
      ...values,
      profileImage: profileImage?.file,
    };
    console.log(formData);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <Link href="/dashboard/about">
            <Button variant={"outline"} className="w-fit">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 rounded-xl border h-fit border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">About Introduction</h2>
                <p className="text-sm text-muted-foreground">
                  Edit the introduction content for your about page
                </p>
              </div>

              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                <button className="rounded-md bg-white px-4 py-1.5 text-sm font-medium shadow">
                  English
                </button>
                <button className="rounded-md px-4 py-1.5 text-sm text-gray-600 hover:text-black">
                  Myanmar
                </button>
                <button className="rounded-md px-4 py-1.5 text-sm text-gray-600 hover:text-black">
                  Japanese
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Introduction" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Input placeholder="of My Story" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="firstParagraph"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Paragraph</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] resize-none"
                        placeholder="Enter your first paragraph..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondParagraph"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Second Paragraph</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] resize-none"
                        placeholder="Enter your second paragraph..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>Profile Image</FormLabel>
                
                {/* Current Profile Image */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Current Image</h3>
                  
                  {profileImage ? (
                    <Item
                      variant="muted"
                      className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300 transition-colors"
                    >
                      <ItemContent className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={profileImage.url}
                              alt="Profile"
                              className="w-16 h-16 rounded-lg object-cover border-2 border-white shadow-sm"
                            />
                          </div>
                          <div>
                            <ItemTitle className="text-gray-900 font-semibold">
                              {profileImage.name}
                            </ItemTitle>
                            <ItemDescription className="text-gray-600 text-sm">
                              {profileImage.size} • Uploaded {profileImage.uploadDate}
                            </ItemDescription>
                          </div>
                        </div>
                      </ItemContent>
                      <ItemActions>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </ItemActions>
                    </Item>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p>No profile image uploaded</p>
                    </div>
                  )}
                </div>

                {/* Upload Area */}
                <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
                    {profileImage ? "Change Profile Image" : "Upload Profile Image"}
                  </h3>

                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragging
                        ? "border-purple-400 bg-purple-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your image here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      JPEG, PNG, or WebP (Max 5MB, Recommended: 400x400px)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="mb-2"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>

          <div className="rounded-xl border border-gray-200 h-full flex flex-col bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Preview</h2>
                <p className="text-sm text-muted-foreground">
                  Live preview of your about introduction
                </p>
              </div>
              <Badge variant="outline">Live</Badge>
            </div>

            <div className="overflow-hidden h-full rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
              <div className="min-h-screen items-center grid grid-cols-1 gap-10">
                <div>
                  <p className="text-5xl pt-3 dark:text-white mb-10 leading-[5rem]">
                    <span className="p-3 px-6 font-medium rounded-xl bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900">
                      {form.watch("title") || "Introduction"}
                    </span>{" "}
                    {form.watch("subtitle") || "of My Story"}
                  </p>
                  <p className="text-justify dark:text-white mt-10 mb-5">
                    <span className="ms-16"></span>
                    {form.watch("firstParagraph") || "Your first paragraph will appear here..."}
                  </p>
                  <p className="text-justify dark:text-white mt-10 mb-5">
                    <span className="ms-16"></span>
                    {form.watch("secondParagraph") || "Your second paragraph will appear here..."}
                  </p>
                </div>
                <div className="flex justify-center">
                  {profileImage ? (
                    <img
                      className="rounded-2xl shadow-xl w-full max-w-sm object-cover"
                      src={profileImage.url}
                      alt="Profile"
                      width={500}
                      height={500}
                    />
                  ) : (
                    <div className="rounded-2xl shadow-xl w-full max-w-sm h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutIntroEditForm;