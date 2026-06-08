"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import ContentRow from "../components/ContentRow";
import Footer from "../components/Footer";
import { HeroSkeleton, RowSkeleton } from "../components/SkeletonLoader";
import { movieService, homepageService } from "../services/contentService";

const FEATURED_CACHE_KEY = "goflix_featured_cache";
const ROWS_CACHE_KEY = "goflix_homepage_rows_cache";

function readSessionCache(key) {
  if (typeof window === "undefined") return undefined;

  try {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
}

function writeSessionCache(key, data) {
  if (typeof window === "undefined") return;

  try {
    if (data) {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  } catch {
    // ignore storage errors
  }
}

function preloadImage(src) {
  if (!src || typeof window === "undefined") return;

  const img = new Image();
  img.src = src;
}

function preloadHomepageImages(featured, rows) {
  preloadImage(featured?.thumbnail);
  preloadImage(featured?.banner);

  rows?.forEach((row) => {
    row.items?.forEach((item) => {
      preloadImage(item.thumbnail);
      preloadImage(item.banner);
    });
  });
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [cachedFeatured, setCachedFeatured] = useState(undefined);
  const [cachedRows, setCachedRows] = useState(undefined);

  useEffect(() => {
    setMounted(true);

    setCachedFeatured(readSessionCache(FEATURED_CACHE_KEY));
    setCachedRows(readSessionCache(ROWS_CACHE_KEY));

    document.title = "GoPremiere — Faith, Family, Entertainment";
  }, []);

  const {
    data: featured,
    isLoading: heroLoading,
    isFetching: heroFetching,
  } = useQuery({
    queryKey: ["featured"],
    queryFn: movieService.getFeatured,
    enabled: mounted,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const {
    data: rows,
    isLoading: rowsLoading,
    isFetching: rowsFetching,
  } = useQuery({
    queryKey: ["homepage-rows"],
    queryFn: homepageService.getRows,
    enabled: mounted,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const displayFeatured = featured || cachedFeatured;
  const displayRows = rows || cachedRows;

  useEffect(() => {
    if (featured) {
      writeSessionCache(FEATURED_CACHE_KEY, featured);
      setCachedFeatured(featured);
    }
  }, [featured]);

  useEffect(() => {
    if (rows) {
      writeSessionCache(ROWS_CACHE_KEY, rows);
      setCachedRows(rows);
    }
  }, [rows]);

  useEffect(() => {
    preloadHomepageImages(displayFeatured, displayRows);
  }, [displayFeatured, displayRows]);

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      {!mounted || (heroLoading && !displayFeatured) ? (
        <HeroSkeleton />
      ) : (
        <HeroBanner content={displayFeatured} />
      )}

      <div className="relative z-10 -mt-8">
        {!mounted || (rowsLoading && !displayRows) ? (
          <>
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </>
        ) : (
          displayRows?.map((row) => (
            <ContentRow
              key={row.id}
              title={row.title}
              items={row.items}
              type={row.type}
            />
          ))
        )}
      </div>

      {mounted && (heroFetching || rowsFetching) && (
        <div className="fixed bottom-4 right-4 z-50 rounded-full bg-black/70 border border-white/10 px-3 py-1 text-xs text-gray-400">
          Updating...
        </div>
      )}

      <Footer />
    </div>
  );
}