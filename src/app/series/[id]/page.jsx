"use client";
import { useState, useEffect, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, Plus, Check, ChevronDown } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentCard from "../../../components/ContentCard";
import { DetailSkeleton } from "../../../components/SkeletonLoader";
import { seriesService } from "../../../services/contentService";
import {
  watchlistService,
  watchHistoryService,
} from "../../../services/userService";
import { useAuthStore } from "../../../store/authStore";

export default function SeriesDetailPage({ params }) {
  const { id } = use(params);
  const { isAuthenticated } = useAuthStore();
  const [inList, setInList] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);
  const [seasonOpen, setSeasonOpen] = useState(false);

  const { data: series, isLoading } = useQuery({
    queryKey: ["series", id],
    queryFn: () => seriesService.getById(id),
  });

  useEffect(() => {
    if (series) {
      setInList(watchlistService.isInWatchlist(series.id));
      document.title = `${series.title} — GoFlix`;
    }
  }, [series]);

  const handleToggleWatchlist = async () => {
    if (!isAuthenticated) {
      window.location.href = "/account/signin";
      return;
    }
    if (inList) {
      await watchlistService.removeFromWatchlist(series.id);
    } else {
      await watchlistService.addToWatchlist(series.id, series);
    }
    setInList(!inList);
  };

  if (isLoading) return <DetailSkeleton />;

  if (!series) {
    return (
      <div style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />
        <div className="flex items-center justify-center pt-40 text-center px-4">
          <p className="text-gray-400 text-lg">Series not found.</p>
        </div>
      </div>
    );
  }

  const currentSeason = series.seasonData?.[activeSeason];

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      {/* Banner */}
      <div
        className="relative w-full"
        style={{ height: "65vh", minHeight: 380 }}
      >
        <img
          src={series.banner || series.thumbnail}
          alt={series.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #000 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Info */}
      <div className="px-4 md:px-12 max-w-screen-xl mx-auto -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <img
            src={series.thumbnail}
            alt={series.title}
            className="hidden md:block w-44 rounded-xl shadow-2xl object-cover flex-shrink-0"
            style={{ height: 264, border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <div className="pt-0 md:pt-8">
            <h1
              className="text-3xl md:text-5xl font-black text-white mb-3"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {series.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span className="text-green-400 font-semibold text-sm">
                {series.releaseYear}
              </span>
              {series.maturityRating && (
                <span className="text-xs font-bold px-2 py-0.5 border border-gray-500 text-gray-300 rounded">
                  {series.maturityRating}
                </span>
              )}
              <span className="text-gray-400 text-sm">
                {series.seasons} Season{series.seasons > 1 ? "s" : ""}
              </span>
              <span className="text-gray-400 text-sm">
                {series.episodes} Episodes
              </span>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {series.genre?.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "#ccc",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
            <p
              className="text-gray-300 text-sm leading-relaxed max-w-xl mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {series.description}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={`/watch/${series.id}`}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-black text-sm hover:opacity-90 transition-all"
                style={{ background: "#fff", fontFamily: "Inter, sans-serif" }}
              >
                <Play size={18} fill="black" /> Watch Now
              </a>
              <button
                onClick={handleToggleWatchlist}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-all"
                style={{
                  background: inList
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {inList ? <Check size={18} /> : <Plus size={18} />}
                {inList ? "In My List" : "Add to List"}
              </button>
            </div>
          </div>
        </div>

        {/* Episodes */}
        {series.seasonData && series.seasonData.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-bold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Episodes
              </h2>

              {/* Season selector */}
              {series.seasonData.length > 1 && (
                <div className="relative">
                  <button
                    onClick={() => setSeasonOpen(!seasonOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    Season {activeSeason + 1}
                    <ChevronDown
                      size={16}
                      style={{
                        transform: seasonOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                  {seasonOpen && (
                    <div
                      className="absolute right-0 top-12 w-40 rounded-lg overflow-hidden shadow-2xl z-20"
                      style={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {series.seasonData.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveSeason(i);
                            setSeasonOpen(false);
                          }}
                          className="w-full px-4 py-3 text-sm text-left transition-colors hover:bg-white/5"
                          style={{
                            color: activeSeason === i ? "#fff" : "#aaa",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Season {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Episode list */}
            <div className="space-y-3">
              {currentSeason?.episodes?.map((ep) => {
                const progress = watchHistoryService.getProgress(ep.id);
                return (
                  <a
                    key={ep.id}
                    href={`/watch/${ep.id}?series=${id}&ep=${ep.number}&season=${currentSeason.season}`}
                    className="flex gap-4 p-3 rounded-xl transition-all hover:bg-white/5 group"
                    style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="relative flex-shrink-0 rounded-lg overflow-hidden"
                      style={{ width: 160, height: 90 }}
                    >
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700">
                          <div
                            className="h-full"
                            style={{
                              width: `${progress}%`,
                              background: "#B30000",
                            }}
                          />
                        </div>
                      )}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(0,0,0,0.4)" }}
                      >
                        <Play size={24} fill="white" className="text-white" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className="text-white text-sm font-semibold line-clamp-1"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {ep.number}. {ep.title}
                        </h4>
                        <span
                          className="text-gray-500 text-xs flex-shrink-0"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {ep.duration}
                        </span>
                      </div>
                      <p
                        className="text-gray-500 text-xs leading-relaxed mt-1 line-clamp-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {ep.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Related */}
        {series.related?.length > 0 && (
          <div className="mt-16">
            <h2
              className="text-xl font-bold text-white mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              More Like This
            </h2>
            <div className="flex gap-4 flex-wrap">
              {series.related.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
