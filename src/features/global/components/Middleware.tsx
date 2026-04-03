"use client";
import { api } from "@/services/api";
import { fetcher } from "@/services/fetcher";
import React from "react";
import useSWR from "swr";

const Middleware = ({ children }: { children: React.ReactNode }) => {
  const data = useSWR("/auth/check-auth", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    dedupingInterval: 60 * 1000,
  });

  return <>{children}</>;
};

export default Middleware;
