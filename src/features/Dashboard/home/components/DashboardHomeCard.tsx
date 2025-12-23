"use client";

import React, { useState } from "react";
import {
  Monitor,
  Moon,
  Pencil,
  Phone,
  Smartphone,
  Sun,
  Tablet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ButtonGroup } from "@/components/ui/button-group";

interface HomeCardType {
  title: string;
  url: string;
}

const DashboardHomeCard: React.FC<HomeCardType> = ({ title, url }) => {
  const [isDark, setIsDark] = useState(false);

  const devideInfo = {
    phone: "w-[450px] aspect-[9/16]",
    tablet: "w-[768px] aspect-square",
    desktop: "w-full aspect-video",
  };

  const [devide, setDevide] = useState<keyof typeof devideInfo>("desktop");

  return (
    <Card
      className={`
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-gray-100 dark:bg-gray-950
        shadow-sm
        transition-colors duration-300
        overflow-hidden
      `}
    >
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4 4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>

        <div className="flex items-center gap-5">
          <ButtonGroup>
            <Button
              onClick={() => setDevide("phone")}
              variant={devide == "phone" ? "default" : "outline"}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setDevide("tablet")}
              variant={devide == "tablet" ? "default" : "outline"}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setDevide("desktop")}
              variant={devide == "desktop" ? "default" : "outline"}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </ButtonGroup>
          <Button
            onClick={() => setIsDark((prev) => !prev)}
            size="icon"
            variant="outline"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <Button size="sm" variant={"destructive"} className="gap-2">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </CardHeader>

      <Separator />

      {/* Content */}
      <CardContent className="p-3">
        <div
          className={`${devideInfo[devide]} transform duration-300 relative  mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 `}
        >
          <iframe
            src={url + "?dark=" + isDark}
            className="absolute inset-0 w-full h-full "
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHomeCard;
