import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import { z } from "zod";

const educationItemSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Title is required" }).max(100),
  description: z
    .string()
    .min(10, { message: "Description is required" })
    .max(500),
  language: z.string().optional(),
});

type EducationItem = z.infer<typeof educationItemSchema>;

const AboutEducationForm = ({
  data,
  index,
  onRemove,
}: {
  data: EducationItem & { isNew?: boolean; isEditing?: boolean };
  index: number;
  onRemove: (index: number) => void;
}) => {
  const [isNew, setIsNew] = useState(data?.isNew);
  const [isEditing, setIsEditing] = useState(data?.isEditing);

  const form = useForm<EducationItem>({
    resolver: zodResolver(educationItemSchema),
    defaultValues: {
      id: data.id.toString(),
      title: data.title,
      description: data.description,
      language: data.language,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const createEducation = async (payload: any) => {
    try {
      await api.post("/about/create-education", {
        title: payload.title,
        description: payload.description,
        language: payload.language,
      });
      mutate("/about/get-all-education");
      mutate("/user-side/about?language=" + payload.language);
      toast.success("Education created successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const updateEducation = async (id: string, payload: any) => {
    try {
      await api.put("/about/update-education/" + id, {
        title: payload.title,
        description: payload.description,
        language: payload.language,
      });
      mutate("/about/get-all-education");
      mutate("/user-side/about?language=" + payload.language);
      toast.success("Education updated successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const deleteEducation = async (id: string) => {
    if (isNew) {
      onRemove(index);
      return;
    } else {
      if (!window.confirm("Are you sure you want to delete this education?")) {
        return;
      }

      try {
        await api.delete("/home-management/education-manage/" + id);
        mutate("/about/get-all-education");
        mutate("/user-side/about?language=" + data.language);
        toast.success("Deleted successfully");
      } catch (error: any) {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    }
  };

  const onSubmit = async (data: EducationItem) => {
    const payload = {
      title: data.title,
      description: data.description,
      language: data.language,
    };

    if (isNew) {
      await createEducation(payload);
    } else {
      await updateEducation(data.id, payload);
    }

    setIsEditing(false);
    setIsNew(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          key={data.id}
          className="rounded-lg border border-gray-200 bg-white p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Education {index + 1}
              {data.isNew && (
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                  New
                </span>
              )}
            </h4>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="text-green-600 hover:text-green-700 hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <Save className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleEdit();
                  }}
                  className="text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  deleteEducation(data.id);
                }}
                className="text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isEditing ? (
            <>
              <FormField
                control={form.control}
                name={`title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Bachelor of Computing, University of Greenwich"
                        className="border-gray-200 focus:border-green-400 focus:ring-green-100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] resize-none border-gray-200 focus:border-green-400 focus:ring-green-100"
                        placeholder="Describe your education experience, achievements, and what you learned..."
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
                    {data.title || "No title provided"}
                  </p>
                </div>
                <div>
                  <FormLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </FormLabel>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                    {data.description || "No description provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AboutEducationForm;
