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

const experienceItemSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Title is required" }).max(100),
  description: z
    .string()
    .min(10, { message: "Description is required" })
    .max(5000),
  language: z.string().optional(),
});

type ExperienceItem = z.infer<typeof experienceItemSchema>;

const AboutExperienceForm = ({
  data,
  index,
  onRemove,
}: {
  data: ExperienceItem & { isNew?: boolean; isEditing?: boolean };
  index: number;
  onRemove: (index: number) => void;
}) => {
  const [isNew, setIsNew] = useState(data?.isNew);
  const [isEditing, setIsEditing] = useState(data?.isEditing);

  const form = useForm<ExperienceItem>({
    resolver: zodResolver(experienceItemSchema),
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

  const createExperience = async (payload: any) => {
    try {
      await api.post("/about/create-experience", {
        title: payload.title,
        description: payload.description,
        language: payload.language,
      });
      mutate("/about/get-all-experience");
      mutate("/user-side/about?language=" + payload.language);
      toast.success("Experience created successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const updateExperience = async (id: string, payload: any) => {
    try {
      await api.put("/about/update-experience/" + id, {
        title: payload.title,
        description: payload.description,
        language: payload.language,
      });
      mutate("/about/get-all-experience");
      mutate("/user-side/about?language=" + payload.language);
      toast.success("Experience updated successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const deleteExperience = async (id: string) => {
    if (isNew) {
      onRemove(index);
      return;
    } else {
      if (!window.confirm("Are you sure you want to delete this experience?")) {
        return;
      }

      try {
        await api.delete("/home-management/experience-manage/" + id);
        mutate("/about/get-all-experience");
        mutate("/user-side/about?language=" + data.language);
        toast.success("Deleted successfully");
      } catch (error: any) {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    }
  };

  const onSubmit = async (data: ExperienceItem) => {
    const payload = {
      title: data.title,
      description: data.description,
      language: data.language,
    };

    if (isNew) {
      await createExperience(payload);
    } else {
      await updateExperience(data.id, payload);
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
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Experience {index + 1}
              {data.isNew && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
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
                  deleteExperience(data.id);
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
                        placeholder="e.g., Senior Fullstack Developer at Tech Corp"
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
                name={`description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                        placeholder="Describe your work experience, roles, and achievements..."
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
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed whitespace-pre-wrap">
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

export default AboutExperienceForm;
