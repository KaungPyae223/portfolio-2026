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
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface HomeCardType {
  title: string;
  url: string;
  editLink: string;
}

const DashboardHomeCard: React.FC<HomeCardType> = ({
  title,
  url,
  editLink,
}) => {
  const [isDark, setIsDark] = useState(false);

  const devideInfo = {
    phone: "w-[450px] aspect-[9/16]",
    tablet: "w-[768px] aspect-square",
    desktop: "w-full aspect-video",
  };

  const [devide, setDevide] = useState<keyof typeof devideInfo>("desktop");

  const param = useSearchParams();

  const language = param.get("language") ?? "en";

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
              size={"icon"}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setDevide("tablet")}
              variant={devide == "tablet" ? "default" : "outline"}
              size={"icon"}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setDevide("desktop")}
              variant={devide == "desktop" ? "default" : "outline"}
              size={"icon"}
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

          <Link href={editLink}>
            <Button size={"sm"} variant={"destructive"} className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </CardHeader>

      <Separator />

      {/* Content */}
      <CardContent className="p-3">
        <div
          className={`${devideInfo[devide]}  dark:bg-gray-800 transform duration-300 relative  mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 `}
        >
          <iframe
            src={"/" + language + "/demo/" + url + "?dark=" + isDark}
            className="absolute  inset-0 w-full h-full "
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHomeCard;
