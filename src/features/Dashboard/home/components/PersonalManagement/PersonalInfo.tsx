import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/services/fetcher";
import { api } from "@/services/api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name is required" })
    .max(50, { message: "name is too long" }),
  dob: z
    .string()
    .min(2, { message: "title is required" })
    .max(50, { message: "title is too long" }),
  location: z
    .string()
    .min(2, { message: "content is required" })
    .max(50, { message: "content is too long" }),
  email: z
    .string()
    .min(2, { message: "content is required" })
    .max(50, { message: "content is too long" }),
  phone: z
    .string()
    .min(2, { message: "content is required" })
    .max(50, { message: "content is too long" }),
});

const PersonalInfo = () => {
  const { data, error, isLoading } = useSWR(
    "/home-management/get-all-home",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      errorRetryCount: 3,
    },
  );

  const [activeTab, setActiveTab] = useState("English");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "",
      location: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (isLoading) return;

    const selectedData = data?.data.find(
      (item: any) => item.language === activeTab
    );

    form.setValue("name", selectedData?.name);
    form.setValue("dob", selectedData?.date_of_birth);
    form.setValue("location", selectedData?.location);
    form.setValue("email", selectedData?.email);
    form.setValue("phone", selectedData?.phone);
  }, [data, activeTab, isLoading]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.put("/home-management/about-manage", {
        language: activeTab,
        name: values.name,
        date_of_birth: values.dob,
        email: values.email,
        location: values.location,
        phone: values.phone,
      });
      mutate("/home-management/get-all-home");
      mutate("/user-side/home?language=" + activeTab);
      toast.success("Updated successfully");
      // router.push("/dashboard/home");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border h-fit border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Personal Info</h2>
          <p className="text-sm text-muted-foreground">
            Fill in the personal info details for each language
          </p>
        </div>

        {/* Language Tabs */}
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("English");
            }}
            className={`${
              activeTab == "English"
                ? "bg-white shadow font-medium"
                : "text-gray-600 hover:text-black"
            } rounded-md px-4 py-1.5 text-sm `}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("Japanese");
            }}
            className={`${
              activeTab == "Japanese"
                ? "bg-white shadow font-medium"
                : "text-gray-600 hover:text-black"
            } rounded-md px-4 py-1.5 text-sm `}
          >
            Japanese
          </button>
        </div>

        {/* Name Fields */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                If you change the name, it will also change on the Hero
                section's name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Field */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                Email and Phone are do not need to update to different language
              </ItemDescription>
            </ItemContent>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfo;
