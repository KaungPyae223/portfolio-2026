"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, Upload } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
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

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  teamSize: z.string().min(1, "Team size is required"),
  status: z.string().min(1, "Status is required"),
  role: z.string().min(1, "Role is required"),
  demoLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  frontendLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  backendLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  challenges: z.array(z.string()).optional(),
  solutions: z.array(z.string()).optional(),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB",
    ),
  images: z.array(z.instanceof(File)).optional(),
});

const MultiTextInput = ({
  label,
  placeholder,
  items,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  items: string[];
  onChange: (items: string[]) => void;
  error?: string;
}) => {
  const [current, setCurrent] = useState("");

  const add = () => {
    if (current.trim() && !items.includes(current.trim())) {
      onChange([...items, current.trim()]);
      setCurrent("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };

  const remove = (itemToRemove: string) => {
    onChange(items.filter((item) => item !== itemToRemove));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="button" onClick={add} variant="outline">
          Add
        </Button>
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {items.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="flex items-center gap-2 px-3 py-1 text-sm rounded-full transition-all"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => remove(item)}
                className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

const ProjectCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [galleryPreviews, setGalleryPreviews] = useState<{ url: string; file: File; id: number }[]>([]);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
      teamSize: "",
      status: "completed",
      role: "",
      demoLink: "",
      githubLink: "",
      frontendLink: "",
      backendLink: "",
      technologies: [],
      features: [],
      challenges: [],
      solutions: [],
      image: undefined,
      images: [],
    },
  });

  const handleImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

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
      setProjectImage(e.target?.result as string);
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
    setProjectImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGalleryUpload = (files: FileList | null) => {
    if (!files) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    const currentFiles = form.getValues("images") || [];
    const newPreviews = [...galleryPreviews];
    const newFiles = [...currentFiles];

    Array.from(files).forEach((file) => {
      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}`);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`File too large: ${file.name}`);
        return;
      }

      newFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setGalleryPreviews((prev) => [
          ...prev,
          { url: e.target?.result as string, file, id: Date.now() + Math.random() },
        ]);
      };
      reader.readAsDataURL(file);
    });

    form.setValue("images", newFiles);
  };

  const removeGalleryImage = (idToRemove: number) => {
    const previewToRemove = galleryPreviews.find((p) => p.id === idToRemove);
    if (!previewToRemove) return;

    const currentFiles = form.getValues("images") || [];
    const newFiles = currentFiles.filter((f) => f !== previewToRemove.file);
    form.setValue("images", newFiles);
    
    setGalleryPreviews((prev) => prev.filter((p) => p.id !== idToRemove));
    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("duration", data.duration);
    formData.append("teamSize", data.teamSize);
    formData.append("status", data.status);
    formData.append("role", data.role);
    if (data.demoLink) formData.append("demoLink", data.demoLink);
    if (data.githubLink) formData.append("githubLink", data.githubLink);
    if (data.frontendLink) formData.append("frontendLink", data.frontendLink);
    if (data.backendLink) formData.append("backendLink", data.backendLink);
    formData.append("technologies", data.technologies.join("/"));
    formData.append("features", JSON.stringify(data.features));
    formData.append("features", JSON.stringify(data.features));
    if (data.challenges) formData.append("challenges", JSON.stringify(data.challenges));
    if (data.solutions) formData.append("solutions", JSON.stringify(data.solutions));
    formData.append("image", data.image);

    if (data.images && data.images.length > 0) {
      data.images.forEach((img) => {
        formData.append("images", img);
      });
    }

    setIsLoading(true);

    try {
      await formApi.post("/projects", formData);
      toast.success("Project created successfully");
      form.reset();
      setProjectImage(null);
      setGalleryPreviews([]);
      setIsLoading(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Link href="/dashboard/projects">
          <Button variant={"outline"} className="w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-xl border h-fit border-gray-200 bg-white p-6 shadow-sm max-w-4xl mx-auto"
          >
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Project Create Form</h2>
              <p className="text-sm text-muted-foreground">
                Fill in project details
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 space-y-6 p-6 shadow-sm">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Project Cover Image
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
                  {projectImage ? (
                    <div className="relative">
                      <img
                        src={projectImage}
                        alt="Project cover"
                        className="w-full mx-auto max-h-64 object-cover rounded-lg shadow-sm"
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
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-base text-gray-600 mb-2">
                        Drag and drop or click to upload cover image
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, WebP (Max 2MB)
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
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. E-Commerce Platform" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed explanation of the project..."
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Web Development" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 3 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 4 developers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Status</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. completed, in-progress" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Full Stack Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="demoLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Demo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="githubLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Source URL (Optional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://github.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="frontendLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frontend Repository URL (Optional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://github.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="backendLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Backend Repository URL (Optional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://github.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-8 pt-4 border-t">
                <MultiTextInput
                  label="Technologies Used *"
                  placeholder="Add a tech (e.g. React, MongoDB)"
                  items={form.watch("technologies")}
                  onChange={(items) => form.setValue("technologies", items)}
                  error={form.formState.errors.technologies?.message}
                />
                <MultiTextInput
                  label="Key Features *"
                  placeholder="Add a feature"
                  items={form.watch("features")}
                  onChange={(items) => form.setValue("features", items)}
                  error={form.formState.errors.features?.message}
                />
                <MultiTextInput
                  label="Challenges (Optional)"
                  placeholder="What challenges did you face?"
                  items={form.watch("challenges") || []}
                  onChange={(items) => form.setValue("challenges", items)}
                />
                <MultiTextInput
                  label="Solutions (Optional)"
                  placeholder="How did you solve them?"
                  items={form.watch("solutions") || []}
                  onChange={(items) => form.setValue("solutions", items)}
                />
              </div>

              <div className="pt-4 border-t space-y-4">
                <label className="text-sm font-medium text-gray-700 block">
                  Project Gallery Images (Optional)
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                    isGalleryDragging
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsGalleryDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsGalleryDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsGalleryDragging(false);
                    handleGalleryUpload(e.dataTransfer.files);
                  }}
                  onClick={() => galleryInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Drag and drop multiple images or click to upload
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WebP (Max 2MB per image)
                  </p>
                </div>
                
                <input
                  ref={galleryInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleGalleryUpload(e.target.files)}
                  className="hidden"
                />

                {galleryPreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {galleryPreviews.map((preview) => (
                      <div key={preview.id} className="relative group rounded-lg overflow-hidden border">
                        <img
                          src={preview.url}
                          alt="Gallery preview"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeGalleryImage(preview.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectCreateForm;