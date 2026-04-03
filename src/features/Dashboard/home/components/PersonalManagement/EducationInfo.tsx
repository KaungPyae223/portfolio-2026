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
import React from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Trash, GraduationCap } from "lucide-react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/services/fetcher";
import Loading from "@/features/global/components/Loading";
import { api } from "@/services/api";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "name is required" })
    .max(50, { message: "name is too long" }),
  year: z
    .string()
    .min(2, { message: "title is required" })
    .max(50, { message: "title is too long" }),
});

const EducationInfo = () => {
  const { data, error, isLoading } = useSWR(
    "/user-side/home?language=English",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      errorRetryCount: 3,
    },
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      year: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/home-management/education-manage", {
        title: values.title,
        description: values.year,
      });
      mutate("/user-side/home?language=English");
      mutate("/user-side/home?language=Japanese");
      form.reset();
      toast.success("Education created successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  const deleteEducation = async (id: string) => {
    if (window.confirm("Are you sure to delete")) {
      try {
        await api.delete("/home-management/education-manage/" + id);
        mutate("/user-side/home?language=English");
        mutate("/user-side/home?language=Japanese");
        form.reset();
        toast.success("Education deleted successfully");
      } catch (error: any) {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Education Info</h2>
          <p className="text-sm text-muted-foreground">
            Add and manage your educational background
          </p>
        </div>

        {/* Existing Education Items */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Added Education</h3>

          {data?.data.educations?.length > 0 ? (
            data?.data.educations.map((education: any) => (
              <Item
                variant="muted"
                key={education.id}
                className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300 transition-colors"
              >
                <ItemContent className="flex-1">
                  <ItemTitle className="text-gray-900 font-semibold">
                    {education.title}
                  </ItemTitle>
                  <ItemDescription className="text-gray-600 text-sm">
                    {education.description}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => deleteEducation(education.id)}
                    className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </ItemActions>
              </Item>
            ))
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No education added yet
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Showcase your academic background and achievements
              </p>
              <p className="text-xs text-gray-400">
                Use the form below to add your education details
              </p>
            </div>
          )}
        </div>

        {/* Add New Education Form */}
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
            Add New Education
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Bachelor of Computer Science"
                      className="focus-visible:ring-blue-500 focus-visible:border-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Year Range
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2018 - 2022"
                      className="focus-visible:ring-blue-500 focus-visible:border-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <Button type="submit">Add Education</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EducationInfo;
