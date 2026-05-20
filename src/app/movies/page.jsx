"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, SlidersHorizontal } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentCard from "../../components/ContentCard";
import { RowSkeleton } from "../../components/SkeletonLoader";
import { movieService } from "../../services/contentService";
import { GENRES } from "../../data/mockData";

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "views", label: "Most Popular" },
  { value: "year", label: "Newest First" },
];

export default function MoviesPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["movies", selectedGenre, sort],
    queryFn: () =>
      movieService.getAll({
        genre: selectedGenre || undefined,
        sort: sort !== "default" ? sort : undefined,
      }),
  });

  useEffect(() => {
    document.title = "Movies — GoFlix";
  }, []);

  const movies = data?.data || [];

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <div
        className="pt-28 pb-12 px-4 md:px-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(179,0,0,0.15), transparent)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #B30000 0%, transparent 50%)",
          }}
        />
        <h1
          className="text-4xl md:text-5xl font-black text-white mb-3"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Movies
        </h1>
        <p
          className="text-gray-400 text-base"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Moral Faith driven films for the whole family
        </p>
      </div>

      {/* Filters */}
      <div className="px-4 md:px-12 pb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
            style={{
              background: showFilters
                ? "rgba(179,0,0,0.3)"
                : "rgba(255,255,255,0.08)",
              border: showFilters
                ? "1px solid rgba(179,0,0,0.5)"
                : "1px solid rgba(255,255,255,0.1)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <SlidersHorizontal size={15} /> Filters
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-lg text-sm text-white focus:outline-none cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option
                key={o.value}
                value={o.value}
                style={{ background: "#111" }}
              >
                {o.label}
              </option>
            ))}
          </select>

          {selectedGenre && (
            <button
              onClick={() => setSelectedGenre("")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{ background: "#B30000" }}
            >
              {selectedGenre} ✕
            </button>
          )}
        </div>

        {/* Genre chips */}
        {showFilters && (
          <div className="flex gap-2 flex-wrap mt-4">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(selectedGenre === g ? "" : g)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background:
                    selectedGenre === g ? "#B30000" : "rgba(255,255,255,0.08)",
                  color: selectedGenre === g ? "#fff" : "#aaa",
                  border:
                    selectedGenre === g
                      ? "1px solid #B30000"
                      : "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="px-4 md:px-12 pb-16">
        {isLoading ? (
          <RowSkeleton count={8} />
        ) : movies.length === 0 ? (
          <div className="text-center py-24">
            <p
              className="text-gray-500 text-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No movies found for this filter.
            </p>
            <button
              onClick={() => {
                setSelectedGenre("");
                setSort("default");
              }}
              className="mt-4 px-6 py-2 rounded-full text-sm text-white"
              style={{ background: "#B30000" }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <ContentCard key={movie.id} item={movie} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
