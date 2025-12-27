"use client";
import React, { useEffect, useState } from "react";
import { useDashboardStore } from "@/store/useDashboardStroe";
import ProjectCardList from "../components/ProjectCardList";
import ProjectTableList from "../components/ProjectTableList";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Plus, Search, Filter } from "lucide-react";

const ProjectPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTitle("Projects Management");
    setBreadCrumbContent([]);
  }, []);

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
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
          <ProjectCardList searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <ProjectTableList searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPage;
