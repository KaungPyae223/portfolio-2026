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

interface ProjectTableListProps {
  searchQuery?: string;
}

const ProjectTableList = ({ searchQuery = "" }: ProjectTableListProps) => {
  type ProjectItem = {
    id: number;
    image: string;
    name: string;
    description: string;
    frontend: string;
    backend: string;
    demo: string;
    tech: string;
    type: string;
  };

  // Sample project data
  const data: ProjectItem[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      name: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with modern UI/UX design, secure payment processing, and comprehensive admin dashboard.",
      frontend: "https://github.com/example/ecommerce-frontend",
      backend: "https://github.com/example/ecommerce-backend",
      demo: "https://ecommerce-demo.com",
      tech: "React/Node.js/MongoDB/Stripe/TailwindCSS",
      type: "fullstack",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      name: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      frontend: "https://github.com/example/taskmanager-frontend",
      backend: "https://github.com/example/taskmanager-backend",
      demo: "https://taskmanager-demo.com",
      tech: "Next.js/Express/PostgreSQL/Socket.io",
      type: "fullstack",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1592210454359-801627e67647?w=800&h=600&fit=crop",
      name: "Weather Dashboard",
      description:
        "A beautiful weather dashboard with real-time data, interactive maps, and detailed forecasts for multiple locations.",
      frontend: "https://github.com/example/weather-frontend",
      backend: "https://github.com/example/weather-api",
      demo: "https://weather-demo.com",
      tech: "Vue.js/Node.js/Redis/Chart.js",
      type: "frontend",
    },
  ];

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "frontend":
        return <Code className="w-4 h-4" />;
      case "backend":
        return <Globe className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "frontend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "backend":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "mobile":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

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
                Type
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Technologies
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Links
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
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
                    <Badge
                      variant="secondary"
                      className={`flex items-center gap-1 w-fit ${getTypeBadgeVariant(
                        project.type
                      )}`}
                    >
                      {getTypeIcon(project.type)}
                      {project.type}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {project.tech
                        .split("/")
                        .slice(0, 3)
                        .map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      {project.tech.split("/").length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tech.split("/").length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      {project.demo && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-2"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      )}
                      {project.frontend && (
                        <Button size="sm" variant="ghost" className="h-8 px-2">
                          <Github className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
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
                    <Button size="sm">Create New Project</Button>
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
