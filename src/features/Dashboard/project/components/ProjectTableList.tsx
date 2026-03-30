import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLink,
  Github,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Code,
  Globe,
  Smartphone,
  Star,
} from "lucide-react";

import { Link, useRouter } from "@/i18n/navigation";
import { Switch } from "@/components/ui/switch";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

interface ProjectTableListProps {
  data: any[];
  isLoading: boolean;
}

const ProjectTableList = ({ data, isLoading }: ProjectTableListProps) => {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const handleToggleFeatured = async (id: string) => {
    try {
      await api.put(`/project/featured/${id}`);
      toast.success("Project featured status updated successfully");
      mutate((key: any) => Array.isArray(key) && key[0] === "project");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    try {
      await api.delete(`/project/${id}`);
      toast.success("Project deleted successfully");
      mutate((key: any) => Array.isArray(key) && key[0] === "project");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="h-40 flex items-center justify-center">
        Loading Projects...
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Project
              </th>

              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Technologies
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Links
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Is Featured
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((project) => (
                <tr
                  key={project.id}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1 max-w-[300px]">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies
                        ?.split("/")
                        .slice(0, 3)
                        .map((tech: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      {project.tech?.split("/").length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tech.split("/").length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Demo
                          </Button>
                        </a>
                      )}
                      {project.front_end && (
                        <a href={project.front_end} target="_blank">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2"
                          >
                            Frontend
                          </Button>
                        </a>
                      )}
                      {project.back_end && (
                        <a href={project.back_end} target="_blank">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2"
                          >
                            Backend
                          </Button>
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Switch
                      checked={project.is_featured}
                      onCheckedChange={() => handleToggleFeatured(project.id)}
                    />
                  </td>
                  <td className="p-4 align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/projects/${project.id}`}>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No projects found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Try adjusting your search criteria or create a new
                      project.
                    </p>
                    <Button
                      onClick={() => router.push("/dashboard/projects/create")}
                      size="sm"
                    >
                      Add Project
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTableList;
