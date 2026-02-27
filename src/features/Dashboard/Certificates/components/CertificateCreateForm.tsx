"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, Upload } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  credentialUrl: z.string().url("Please enter a valid URL"),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB",
    )
    .optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  category: z.string().min(1, "Category is required"),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

interface CertificateFormProps {
  onSave?: (data: CertificateFormData) => void;
  isLoading?: boolean;
}

export function CertificateCreateForm({
  onSave,
  isLoading = false,
}: CertificateFormProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [categories] = useState<string[]>([
    "Cloud Computing",
    "Frontend Development",
    "Backend Development",
    "Database",
    "DevOps",
    "Mobile Development",
    "Data Science",
    "Other",
  ]);
  const [certificateImage, setCertificateImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: "",
      issuer: "",
      date: "",
      credentialUrl: "",
      image: undefined,
      skills: [],
      category: "",
    },
  });

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      const newSkills = [...skills, currentSkill.trim()];
      setSkills(newSkills);
      form.setValue("skills", newSkills);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
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

  const onSubmit = async (data: CertificateFormData) => {
    if (onSave) {
      await onSave({ ...data, skills });
    }
  };

  return (
    <Card>
      <CardHeader>
        <Link href="/dashboard/home">
          <Button variant={"outline"} className="w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-xl border h-fit border-gray-200 bg-white p-6 shadow-sm max-w-3xl mx-auto"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Certificates Create Form</h2>
            <p className="text-sm text-muted-foreground">
              Fill in certificate details
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 space-y-6 p-6 shadow-sm">
            <div className="space-y-2">
              <Label>Certificate Image *</Label>
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
                ) : uploadLoading ? (
                  <div className="py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600">
                      Uploading certificate image...
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
              {form.formState.errors.image && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.image.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Certificate Title *</Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="AWS Certified Solutions Architect"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuer">Issuer *</Label>
                <Input
                  id="issuer"
                  {...form.register("issuer")}
                  placeholder="Amazon Web Services"
                />
                {form.formState.errors.issuer && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.issuer.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  {...form.register("date")}
                  placeholder="March 2024"
                />
                {form.formState.errors.date && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.date.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={form.watch("category")}
                  onValueChange={(value) => form.setValue("category", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Credential URL *</Label>
              <Input
                id="credentialUrl"
                type="url"
                {...form.register("credentialUrl")}
                placeholder="https://aws.amazon.com/certification/"
              />
              {form.formState.errors.credentialUrl && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.credentialUrl.message}
                </p>
              )}
            </div>

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

              {skills.length > 0 && (
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Certificate"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
