"use client";
import { useState, useEffect, use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Play, Plus, Check, Star, Clock, Calendar, Users } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentCard from "../../../components/ContentCard";
import { DetailSkeleton } from "../../../components/SkeletonLoader";
import { movieService } from "../../../services/contentService";
import { watchlistService } from "../../../services/userService";
import { useAuthStore } from "../../../store/authStore";

export default function MovieDetailPage({ params }) {
  const { id } = use(params);
  const { isAuthenticated } = useAuthStore();
  const [inList, setInList] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieService.getById(id),
  });

  useEffect(() => {
    if (movie) {
      setInList(watchlistService.isInWatchlist(movie.id));
      document.title = `${movie.title} — GoFlix`;
    }
  }, [movie]);

  const handleToggleWatchlist = async () => {
    if (!isAuthenticated) {
      window.location.href = "/account/signin";
      return;
    }
    if (inList) {
      await watchlistService.removeFromWatchlist(movie.id);
    } else {
      await watchlistService.addToWatchlist(movie.id, movie);
    }
    setInList(!inList);
  };

  if (isLoading) return <DetailSkeleton />;

  if (error || !movie) {
    return (
      <div style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-40 text-center px-4">
          <p className="text-gray-400 text-lg mb-4">Movie not found.</p>
          <a
            href="/movies"
            className="px-6 py-2 rounded-full text-sm text-white"
            style={{ background: "#B30000" }}
          >
            Browse Movies
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      {/* Hero Banner */}
      <div
        className="relative w-full"
        style={{ height: "70vh", minHeight: 400 }}
      >
        <img
          src={movie.banner || movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45)" }}
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
              "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)",
          }}
        />

        {/* Play button center */}
        <a
          href={`/watch/${movie.id}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Play size={32} fill="white" className="ml-1" />
          </div>
        </a>
      </div>

      {/* Detail Content */}
      <div className="px-4 md:px-12 lg:px-16 max-w-screen-xl mx-auto -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 hidden md:block">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-48 rounded-xl shadow-2xl object-cover"
              style={{ height: 288, border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pt-0 md:pt-8">
            <h1
              className="text-3xl md:text-5xl font-black text-white mb-3"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {movie.title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-3 flex-wrap mb-5">
              <span className="text-green-400 font-semibold text-sm">
                {movie.releaseYear}
              </span>
              {movie.maturityRating && (
                <span className="text-xs font-bold px-2 py-0.5 border border-gray-500 text-gray-300 rounded">
                  {movie.maturityRating}
                </span>
              )}
              {movie.duration && (
                <span className="flex items-center gap-1 text-gray-400 text-sm">
                  <Clock size={14} /> {movie.duration}
                </span>
              )}
            </div>

            {/* Genre tags */}
            <div className="flex gap-2 flex-wrap mb-5">
              {movie.genre?.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-full text-xs font-medium"
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

            {/* CTA */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <a
                href={`/watch/${movie.id}`}
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
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {inList ? <Check size={18} /> : <Plus size={18} />}
                {inList ? "In My List" : "Add to List"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="mt-8 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {["overview", "cast", "related"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-3 text-sm font-semibold capitalize transition-colors mr-1"
              style={{
                color: activeTab === tab ? "#fff" : "#777",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #B30000"
                    : "2px solid transparent",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === "overview" && (
            <div className="max-w-2xl">
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Synopsis
              </h3>
              <p
                className="text-gray-300 text-base leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {movie.description}
              </p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Release Year", value: movie.releaseYear },
                  { label: "Runtime", value: movie.duration },
                  { label: "Rating", value: movie.maturityRating },
                  { label: "Genre", value: movie.genre?.join(", ") },
                  { label: "Views", value: movie.views?.toLocaleString() },
                ].map(
                  (item) =>
                    item.value && (
                      <div key={item.label}>
                        <p
                          className="text-gray-600 text-xs uppercase tracking-wide mb-1"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-white text-sm font-medium"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {activeTab === "cast" && (
            <div>
              <h3
                className="text-lg font-semibold text-white mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Cast & Crew
              </h3>
              <div className="flex gap-4 flex-wrap">
                {movie.cast?.map((name) => (
                  <div
                    key={name}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full mb-2 flex items-center justify-center"
                      style={{
                        background: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=222&color=fff`,
                        backgroundColor: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1a1a&color=aaa&size=64`}
                        alt={name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <p
                      className="text-white text-xs font-medium max-w-[80px] leading-tight"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "related" && movie.related?.length > 0 && (
            <div>
              <h3
                className="text-lg font-semibold text-white mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                More Like This
              </h3>
              <div className="flex gap-4 flex-wrap">
                {movie.related.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
