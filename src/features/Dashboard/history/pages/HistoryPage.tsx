"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/useDashboardStroe";
import {
  Calendar,
  Clock,
  Award,
  Briefcase,
  GraduationCap,
  Target,
} from "lucide-react";

const HistoryPage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();

  useEffect(() => {
    setTitle("Page Management History");
    setBreadCrumbContent([]);
  }, []);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const historyLogs = [
    {
      id: "1",
      date: "2024-01-15",
      title: "Started Portfolio Project",
      description: "Began development of personal portfolio website",
      type: "project",
      status: "completed",
    },
    {
      id: "2",
      date: "2023-12-20",
      title: "Web Development Certification",
      description: "Completed advanced web development course",
      type: "education",
      status: "completed",
    },
    {
      id: "3",
      date: "2023-10-10",
      title: "Team Lead Assignment",
      description: "Led development team for enterprise project",
      type: "work",
      status: "completed",
    },
    {
      id: "4",
      date: "2023-08-05",
      title: "Open Source Milestone",
      description: "Reached 1000+ GitHub stars",
      type: "achievement",
      status: "completed",
    },
    {
      id: "5",
      date: "2023-06-15",
      title: "Full Stack Developer Promotion",
      description: "Promoted to senior developer position",
      type: "work",
      status: "completed",
    },
  ];

  const filteredLogs = historyLogs.filter(
    (log) => selectedFilter === "all" || log.type === selectedFilter
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "education":
        return "bg-blue-100 text-blue-800";
      case "work":
        return "bg-green-100 text-green-800";
      case "achievement":
        return "bg-yellow-100 text-yellow-800";
      case "project":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-4 h-4" />;
      case "work":
        return <Briefcase className="w-4 h-4" />;
      case "achievement":
        return <Award className="w-4 h-4" />;
      case "project":
        return <Target className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">History Logs</h1>
        <p className="text-muted-foreground">View your activity history</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedFilter("all")}
        >
          All
        </Button>
        <Button
          variant={selectedFilter === "education" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedFilter("education")}
        >
          Education
        </Button>
        <Button
          variant={selectedFilter === "work" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedFilter("work")}
        >
          Work
        </Button>
        <Button
          variant={selectedFilter === "achievement" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedFilter("achievement")}
        >
          Achievements
        </Button>
        <Button
          variant={selectedFilter === "project" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedFilter("project")}
        >
          Projects
        </Button>
      </div>

      {/* Log Cards */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(log.type)}>
                      {getTypeIcon(log.type)}
                      <span className="ml-1">{log.type}</span>
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {log.date}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{log.title}</CardTitle>
                </div>
                <Badge variant="outline">{log.status}</Badge>
              </div>
              <CardDescription>{log.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <Card className="p-8 text-center">
          <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No logs found for this filter</p>
        </Card>
      )}
    </div>
  );
};

export default HistoryPage;
