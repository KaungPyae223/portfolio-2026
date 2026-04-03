"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";

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
import { fetcher } from "@/services/fetcher";
import useSWR, { mutate } from "swr";
import { api } from "@/services/api";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title is required" })
    .max(50, { message: "Title is too long" }),
  subtitle: z
    .string()
    .min(2, { message: "Subtitle is required" })
    .max(100, { message: "Subtitle is too long" }),
  firstParagraph: z.string().min(10, { message: "First paragraph is required" }),
  secondParagraph: z.string().min(10, { message: "Second paragraph is required" }),
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
  const [activeTab, setActiveTab] = useState("English");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      firstParagraph: "",
      secondParagraph: "",
    },
  });

  const { data, error, isLoading } = useSWR("/about/get-all-intro", fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 3,
  });

  useEffect(() => {
    if (isLoading) return;

    const selectedData = data?.data.find(
      (item: any) => item.language === activeTab,
    );

    form.setValue("title", selectedData?.title);
    form.setValue("subtitle", selectedData?.subtitle);
    form.setValue("firstParagraph", selectedData?.first_paragraph);
    form.setValue("secondParagraph", selectedData?.second_paragraph);
  }, [data, activeTab, isLoading]);

   async function onSubmit(values: z.infer<typeof formSchema>) {
     try {
       await api.put("/about/update-intro", {
         title: values.title,
         subtitle: values.subtitle,
         first_paragraph: values.firstParagraph,
         second_paragraph: values.secondParagraph,
         language: activeTab,
       });
       mutate("/about/get-all-intro");
       mutate("/user-side/about?language=" + activeTab);
       toast.success("Updated successfully");
       // router.push("/dashboard/home");
     } catch (error: any) {
       const message = error.response?.data?.message || "Something went wrong";
       toast.error(message);
     }
   }

  console.log(data);

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

              <div className="bg-gray-200 p-3 rounded-lg">
                <div>
                  <ItemContent>
                    <ItemTitle>Notice</ItemTitle>
                    <ItemDescription>
                      Profile Image is used from the data of Personal Info
                      Section
                    </ItemDescription>
                  </ItemContent>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>

          <div className="rounded-xl border border-gray-200 h-fit flex flex-col bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Preview</h2>
                <p className="text-sm text-muted-foreground">
                  Live preview of your about introduction
                </p>
              </div>
              <Badge variant="outline">Live</Badge>
            </div>

            <div className="overflow-hidden  rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
              <div className="items-center grid grid-cols-1 gap-10">
                <div>
                  <p className="text-5xl pt-3 dark:text-white mb-10 leading-[5rem]">
                    <span className="p-3 px-6 font-medium rounded-xl bg-yellow-300 dark:bg-yellow-500 text-black dark:text-gray-900">
                      {form.watch("title") || "Introduction"}
                    </span>{" "}
                    {form.watch("subtitle") || "of My Story"}
                  </p>
                  <p className="text-justify dark:text-white mt-10 mb-5">
                    <span className="ms-16"></span>
                    {form.watch("firstParagraph") ||
                      "Your first paragraph will appear here..."}
                  </p>
                  <p className="text-justify dark:text-white mt-10 mb-5">
                    <span className="ms-16"></span>
                    {form.watch("secondParagraph") ||
                      "Your second paragraph will appear here..."}
                  </p>
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
