"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function RefreshOnBack() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const refreshClientData = () => {
      queryClient.invalidateQueries({
        refetchType: "active",
      });
    };

    const handlePopState = () => {
      refreshClientData();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [queryClient]);

  return null;
}