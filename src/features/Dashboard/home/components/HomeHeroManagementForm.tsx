"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import HomeHeroManagementPreview from "./HomeHeroManagementPreview";
import Link from "next/link";

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

const HomeHeroManagementForm = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
        <CardContent className="grid grid-cols-2 gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 rounded-xl border h-fit border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Header */}
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Content</h2>
                <p className="text-sm text-muted-foreground">
                  Fill in the content details for each language
                </p>
              </div>

              {/* Language Tabs */}
              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                <button className="rounded-md bg-white px-4 py-1.5 text-sm font-medium shadow">
                  Myanmar
                </button>
                <button className="rounded-md px-4 py-1.5 text-sm text-gray-600 hover:text-black">
                  English
                </button>
                <button className="rounded-md px-4 py-1.5 text-sm text-gray-600 hover:text-black">
                  Japanese
                </button>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="prefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prefix</FormLabel>
                      <FormControl>
                        <Input placeholder="I'm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
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
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content Field */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[180px] resize-none"
                        placeholder="Write your content here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
          <div className="rounded-xl border border-gray-200 h-full flex flex-col bg-white p-4 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Preview</h2>
                <p className="text-sm text-muted-foreground">
                  Live preview of how this content will appear
                </p>
              </div>

              <Badge variant="outline">Live</Badge>
            </div>

            {/* Preview Content */}
            <div className="overflow-hidden h-full rounded-lg  border border-dashed border-gray-300 bg-gray-50 p-3">
              <HomeHeroManagementPreview form={form} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeHeroManagementForm;
