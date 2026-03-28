"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, Upload } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useRouter } from "@/i18n/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { formApi } from "@/services/api";
import useSWR from "swr";
import { fetcher } from "@/services/fetcher";

const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  lecture: z.string().min(1, "Lecture is required"),
  complete_date: z.string().min(1, "Date is required"),
  url: z.string().url("Please enter a valid URL"),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB",
    )
    .optional(),
  skills: z.array(z.string()).min(1, "Skills is required"),
});

const CertificateEditForm = ({ id }: { id: string }) => {
  const [currentSkill, setCurrentSkill] = useState("");
  const [certificateImage, setCertificateImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const form = useForm<z.infer<typeof certificateSchema>>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: "",
      lecture: "",
      complete_date: "",
      url: "",
      image: undefined,
      skills: [],
    },
  });

  const skills = form.watch("skills");

  const { data, error, isLoading } = useSWR(
    id ? `/certificate/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
    },
  );

  useEffect(() => {
    if (isLoading) return;

    form.setValue("title", data?.data.title);
    form.setValue("lecture", data?.data.lecture);
    form.setValue("complete_date", data?.data.complete_date);
    form.setValue("url", data?.data.url);
    form.setValue("skills", data?.data.technologies.split("/"));
  }, [data, isLoading]);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      const newSkills = [...skills, currentSkill.trim()];
      form.setValue("skills", newSkills);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    form.setValue("skills", newSkills);
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

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
      setCertificateImage(e.target?.result as string);
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
    setCertificateImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof certificateSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("lecture", data.lecture);
    formData.append("complete_date", data.complete_date);
    formData.append("url", data.url);
    formData.append("technologies", data.skills.join("/"));

    if (data.image) {
      formData.append("image", data.image);
    }

    router.push("/dashboard/certificates");

    setIsUpdateLoading(true);

    try {
      await formApi.put(`/certificate/${id}`, formData);
      toast.success("Certificate updated successfully");
      setIsUpdateLoading(false);

    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      setIsUpdateLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Link href="/dashboard/certificates">
          <Button variant={"outline"} className="w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-xl border h-fit border-gray-200 bg-white p-6 shadow-sm max-w-3xl mx-auto"
          >
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Certificates Edit Form</h2>
              <p className="text-sm text-muted-foreground">
                Fill in certificate details
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 space-y-6 p-6 shadow-sm">
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
                  {certificateImage && !uploadLoading ? (
                    <div className="relative">
                      <img
                        src={certificateImage}
                        alt="Certificate image"
                        className="w-full mx-auto object-cover rounded-lg shadow-sm"
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
                  ) : uploadLoading ? (
                    <div className="py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-sm text-gray-600">
                        Uploading certificate image...
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={data?.data.image}
                        alt="Certificate image"
                        className="w-full mx-auto object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Click to change
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

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Certificate Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="complete_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Completion Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Completion Date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lecture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lecture</FormLabel>
                      <FormControl>
                        <Input placeholder="Lecture" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credential URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="Credential URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Skills *</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={handleSkillKeyPress}
                    placeholder="Add a skill (e.g., React, AWS, Python)"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    Add
                  </Button>
                </div>

                {skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-1 text-sm rounded-full transition-all"
                      >
                        <span>{skill}</span>

                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {form.formState.errors.skills && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.skills.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdateLoading}>
                  {isUpdateLoading ? "Editing..." : "Edit Certificate"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CertificateEditForm;
