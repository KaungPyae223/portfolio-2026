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
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import HomeHeroManagementPreview from "./HomeHeroManagementPreview";
import Link from "next/link";
import { ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/services/fetcher";
import { api } from "@/services/api";
import { toast } from "sonner";

const formSchema = z.object({
  github: z
    .string()
    .min(2, { message: "github is required" })
    .max(50, { message: "github is too long" }),
  facebook: z
    .string()
    .min(2, { message: "facebook is required" })
    .max(50, { message: "facebook is too long" }),
  phone: z
    .string()
    .min(2, { message: "phone is required" })
    .max(50, { message: "phone is too long" }),
  linkedin: z
    .string()
    .min(2, { message: "linkedin is required" })
    .max(50, { message: "linkedin is too long" }),
  email: z
    .string()
    .min(2, { message: "email is required" })
    .max(50, { message: "email is too long" }),
});

const HomeContactManagementForm = () => {
  const { data, error, isLoading } = useSWR(
    "/user-side/home?language=English",
    fetcher,
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      github: "",
      facebook: "",
      linkedin: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (isLoading) return;

    form.setValue("email", data?.data.email);
    form.setValue("github", data?.data.github);
    form.setValue("facebook", data?.data.facebook);
    form.setValue("linkedin", data?.data.linkedin);
    form.setValue("phone", data?.data.phone);
  }, [data, isLoading]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.put("/home-management/meta-manage", {
        email: values.email,
        github: values.github,
        facebook: values.facebook,
        linkedin: values.linkedin,
        phone: values.phone,
      });
      mutate("/user-side/home?language=Japanese");
      mutate("/user-side/home?language=English");

      toast.success("Updated successfully");
      // router.push("/dashboard/home");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
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
                  Fill in the content information
                </p>
              </div>

              <div className="bg-gray-200 p-3 rounded-lg">
                <div>
                  <ItemContent>
                    <ItemTitle>Notice</ItemTitle>
                    <ItemDescription>
                      Name, Location, and Profile Image are used from the data
                      of Personal Info Section
                    </ItemDescription>
                  </ItemContent>
                </div>
              </div>

              {/* Name Fields */}
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input placeholder="GitHub URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="Facebook URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linkedin</FormLabel>
                    <FormControl>
                      <Input placeholder="Linkedin URL" {...field} />
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
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeContactManagementForm;
