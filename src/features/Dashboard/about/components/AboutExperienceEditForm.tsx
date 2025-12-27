"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Edit, Save } from "lucide-react";
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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const experienceItemSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Title is required" }).max(100),
  company: z.string().min(2, { message: "Company is required" }).max(100),
  description: z
    .string()
    .min(10, { message: "Description is required" })
    .max(500),
  isNew: z.boolean().optional(),
  isEditing: z.boolean().optional(),
});

const formSchema = z.object({
  experienceItems: z.array(experienceItemSchema).min(1, {
    message: "At least one experience item is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;
type ExperienceItem = z.infer<typeof experienceItemSchema>;
type Language = "english" | "myanmar" | "japanese";

const AboutExperienceEditForm = () => {
  const [editingStates, setEditingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experienceItems: [
        {
          id: "1",
          title: "",
          company: "",
          description: "",
          isNew: true,
          isEditing: true,
        },
      ],
    },
  });

  const addExperienceItem = () => {
    const currentItems = form.getValues("experienceItems");
    const newId = Date.now().toString();
    const newItem: ExperienceItem = {
      id: newId,
      title: "",
      company: "",
      description: "",
      isNew: true,
      isEditing: true,
    };
    form.setValue("experienceItems", [...currentItems, newItem]);
    setEditingStates((prev) => ({ ...prev, [newId]: true }));
  };

  const removeExperienceItem = (index: number) => {
    const currentItems = form.getValues("experienceItems");
    if (currentItems.length > 1) {
      const newItems = currentItems.filter((_, i) => i !== index);
      form.setValue("experienceItems", newItems);
    }
  };

  const toggleEdit = (itemId: string) => {
    setEditingStates((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const saveExperienceItem = (itemId: string) => {
    // Mark as not new and not editing
    const currentItems = form.getValues("experienceItems");
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, isNew: false, isEditing: false } : item
    );
    form.setValue("experienceItems", updatedItems);
    setEditingStates((prev) => ({ ...prev, [itemId]: false }));
  };

  function onSubmit(values: FormValues) {
    console.log("Experience data:", values);
    // Here you would typically save to your backend
    alert("Experience data saved successfully!");
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
          <div className="space-y-1 mt-3">
            <h2 className="text-xl font-semibold">Experience Data</h2>
            <p className="text-sm text-muted-foreground">
              Add and manage your experience information
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Language Tabs */}
                <div className="inline-flex rounded-lg bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setSelectedLanguage("english")}
                    className={`rounded-md px-4 py-1.5 text-sm font-medium shadow transition-colors ${
                      selectedLanguage === "english"
                        ? "bg-white text-gray-900"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLanguage("myanmar")}
                    className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                      selectedLanguage === "myanmar"
                        ? "bg-white text-gray-900"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Myanmar
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLanguage("japanese")}
                    className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                      selectedLanguage === "japanese"
                        ? "bg-white text-gray-900"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    Japanese
                  </button>
                </div>

                {/* Experience Items */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-base font-medium">
                      Experience Items (
                      {selectedLanguage.charAt(0).toUpperCase() +
                        selectedLanguage.slice(1)}
                      )
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addExperienceItem}
                      className="shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Experience
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {form.watch("experienceItems").map((item, index) => {
                      const isEditing =
                        editingStates[item.id] || item.isEditing;
                      const isNew = item.isNew;

                      return (
                        <div
                          key={item.id}
                          className="rounded-lg border border-gray-200 bg-white p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              Experience {index + 1}
                              {isNew && (
                                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                                  New
                                </span>
                              )}
                            </h4>
                            <div className="flex items-center gap-2">
                              {isEditing ? (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => saveExperienceItem(item.id)}
                                  className="text-green-600 hover:text-green-700 hover:border-green-300 hover:bg-green-50 transition-colors"
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleEdit(item.id)}
                                  className="text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              {form.watch("experienceItems").length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeExperienceItem(index)}
                                  className="text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>

                          {isEditing ? (
                            <>
                              <FormField
                                control={form.control}
                                name={`experienceItems.${index}.title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                      Title
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., Senior Frontend Developer"
                                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`experienceItems.${index}.company`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                      Company
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., Tech Company Inc."
                                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`experienceItems.${index}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                      Description
                                    </FormLabel>
                                    <FormControl>
                                      <Textarea
                                        className="min-h-[120px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                                        placeholder="Describe your role, responsibilities, and achievements..."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </>
                          ) : (
                            <div className="space-y-4">
                              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div>
                                  <FormLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                  </FormLabel>
                                  <p className="text-sm font-medium text-gray-900 mt-1">
                                    {item.title || "No title provided"}
                                  </p>
                                </div>
                                <div>
                                  <FormLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company
                                  </FormLabel>
                                  <p className="text-sm font-medium text-gray-900 mt-1">
                                    {item.company || "No company provided"}
                                  </p>
                                </div>
                                <div>
                                  <FormLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                  </FormLabel>
                                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                                    {item.description ||
                                      "No description provided"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sticky top-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Preview</h2>
                  <p className="text-sm text-muted-foreground">
                    Live preview of your experience
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  {selectedLanguage.charAt(0).toUpperCase() +
                    selectedLanguage.slice(1)}
                </Badge>
              </div>

              <div className="space-y-4">
                {form.watch("experienceItems").map((item, index) => (
                  <div
                    key={item.id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {item.title || "Experience Title"}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      {item.company || "Company Name"}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description ||
                        "Experience description will appear here..."}
                    </p>
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

export default AboutExperienceEditForm;
