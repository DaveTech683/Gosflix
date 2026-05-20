"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  return <>{children}</>;
}