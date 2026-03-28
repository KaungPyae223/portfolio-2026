"use client";
import React, { useEffect, useState } from "react";
import { useDashboardStore } from "@/store/useDashboardStroe";
import { useRouter } from "@/i18n/navigation";
import CertificateCardList from "../components/CertificateCardList";
import CertificateTable from "../components/CertificateTable";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Plus, Search, Filter } from "lucide-react";
import { fetcher } from "@/services/fetcher";
import useSWR from "swr";

const CertificatePage = () => {
  const { setTitle, setBreadCrumbContent } = useDashboardStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // delay (ms)

    return () => clearTimeout(timer);
  }, [query]);

  const { data, error, isLoading } = useSWR(
    `/certificate?q=${debouncedQuery}`,
    fetcher,
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
    },
  );

  useEffect(() => {
    setTitle("Certificates Management");
    setBreadCrumbContent([]);
  }, []);

  const handleAddCertificate = () => {
    router.push("/dashboard/certificates/create");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground">
            Manage and showcase your portfolio certificates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleAddCertificate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Certificate
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search certificates..."
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
          <CertificateCardList data={data?.data} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <CertificateTable data={data?.data} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificatePage;
