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
import { Trash, Briefcase } from "lucide-react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/services/fetcher";
import Loading from "@/features/global/components/Loading";
import { api } from "@/services/api";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "position is required" })
    .max(50, { message: "position is too long" }),
  year: z
    .string()
    .min(2, { message: "year is required" })
    .max(50, { message: "year is too long" }),
});

const ExperienceInfo = () => {
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
      await api.post("/home-management/experience-manage", {
        title: values.title,
        description: values.year,
      });
      mutate("/user-side/home?language=English");
      mutate("/user-side/home?language=Japanese");
      form.reset();
      toast.success("Expereince created successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  const deleteExperience = async (id: string) => {
    if (window.confirm("Are you sure to delete")) {
      try {
        await api.delete("/home-management/experience-manage/" + id);
        mutate("/user-side/home?language=English");
        mutate("/user-side/home?language=Japanese");
        form.reset();
        toast.success("Expereince deleted successfully");
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
          <h2 className="text-xl font-semibold">Experience Info</h2>
          <p className="text-sm text-muted-foreground">
            Add and manage your work experience
          </p>
        </div>

        {/* Existing Experience Items */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            Added Experience
          </h3>

          {data?.data.experiences?.length > 0 ? (
            data?.data.experiences.map((experience: any) => (
              <Item
                variant="muted"
                key={experience.id}
                className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 transition-colors"
              >
                <ItemContent className="flex-1">
                  <ItemTitle className="text-gray-900 font-semibold">
                    {experience.title}
                  </ItemTitle>
                  <ItemDescription className="text-gray-600 text-sm">
                    {experience.description}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                    onClick={() => deleteExperience(experience.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </ItemActions>
              </Item>
            ))
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No experience added yet
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Start building your profile by adding your work experience
              </p>
              <p className="text-xs text-gray-400">
                Use the form below to add your first experience
              </p>
            </div>
          )}
        </div>

        {/* Add New Experience Form */}
        <div className="rounded-lg border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
            Add New Experience
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Senior Frontend Developer"
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
                    Year
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 2022"
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
            <Button type="submit">Add Experience</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ExperienceInfo;
