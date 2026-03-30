"use client";
import React, { useEffect, useState } from "react";
import { useDashboardStore } from "@/store/useDashboardStroe";
import ProjectCardList from "../components/ProjectCardList";
import ProjectTableList from "../components/ProjectTableList";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Plus, Search, Filter } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import useSWR from "swr";
import { fetcher } from "@/services/fetcher";

const ProjectPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, error, isLoading } = useSWR(
    ["project", debouncedQuery],
    () => fetcher(`/project?q=${debouncedQuery}`),
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
    },
  );

  useEffect(() => {
    setTitle("Projects Management");
    setBreadCrumbContent([]);
  }, []);

  const router = useRouter();

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and showcase your portfolio projects
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/dashboard/projects/create")}
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* View Tabs */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
            Grid View
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Table View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <ProjectCardList data={data?.data} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <ProjectTableList data={data?.data} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPage;
