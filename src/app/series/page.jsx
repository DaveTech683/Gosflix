"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tv } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentCard from "../../components/ContentCard";
import { RowSkeleton } from "../../components/SkeletonLoader";
import { seriesService } from "../../services/contentService";

export default function SeriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["series-all"],
    queryFn: () => seriesService.getAll(),
  });

  useEffect(() => {
    document.title = "Series — GoPremiere";
  }, []);

  const seriesList = data?.data || [];

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div
        className="pt-28 pb-12 px-4 md:px-12 relative"
        style={{
          background:
            "linear-gradient(to bottom, rgba(179,0,0,0.12), transparent)",
        }}
      >
        <h1
          className="text-4xl md:text-5xl font-black text-white mb-3"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          TV Series
        </h1>
        <p
          className="text-gray-400 text-base"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Faith-driven series to binge season by season
        </p>
      </div>

      <div className="px-4 md:px-12 pb-16">
        {isLoading ? (
          <RowSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {seriesList.map((s) => (
              <ContentCard key={s.id} item={s} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
