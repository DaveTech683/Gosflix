"use client";
import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentCard from "../../components/ContentCard";
import { movieService } from "../../services/contentService";
import { GENRES } from "../../data/mockData";

const TRENDING_SEARCHES = [
  "Risen",
  "The Chosen",
  "War Room",
  "Gospel",
  "Kids Animation",
  "Live Events",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    document.title = "Search — GoPremiere";
    // Get query from URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) {
        setQuery(q);
        performSearch(q);
      } else {
        inputRef.current?.focus();
      }
    }
  }, []);

  const performSearch = async (q) => {
    if (!q?.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await movieService.search(q);
      setResults(res);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(val), 400);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
    inputRef.current?.focus();
  };

  const handleTrending = (term) => {
    setQuery(term);
    performSearch(term);
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div className="pt-24 px-4 md:px-12 max-w-screen-xl mx-auto">
        {/* Search input */}
        <div className="relative max-w-2xl mx-auto mt-8 mb-10">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search movies, series, reels..."
            className="w-full h-14 pl-12 pr-12 rounded-xl text-white text-base focus:outline-none transition-all duration-200"
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.12)",
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(179,0,0,0.5)";
              e.target.style.boxShadow = "0 0 0 3px rgba(179,0,0,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.12)";
              e.target.style.boxShadow = "none";
            }}
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Trending / Empty state */}
        {!searched && (
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-white text-lg font-bold mb-4 flex items-center gap-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <TrendingUp size={18} style={{ color: "#B30000" }} /> Trending
              Searches
            </h2>
            <div className="flex gap-2 flex-wrap">
              {TRENDING_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handleTrending(term)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "#ccc",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-10">
              <h2
                className="text-white text-lg font-bold mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Browse by Genre
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleTrending(genre)}
                    className="relative rounded-xl overflow-hidden text-left p-4 transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #1a0505, #0a0a1a)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      height: 80,
                    }}
                  >
                    <span
                      className="text-sm font-bold text-white"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {genre}
                    </span>
                    <div
                      className="absolute bottom-0 right-0 text-3xl opacity-20 pr-2 pb-1"
                      style={{ lineHeight: 1 }}
                    >
                      {genre === "Drama"
                        ? "🎭"
                        : genre === "Faith"
                          ? "✝️"
                          : genre === "Kids"
                            ? "⭐"
                            : genre === "Animation"
                              ? "🎨"
                              : "🎬"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div
              className="w-10 h-10 rounded-full border-2 border-[#B30000] border-t-transparent"
              style={{ animation: "spin 0.8s linear infinite" }}
            />
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-white text-lg font-bold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {results.length > 0
                  ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
                  : `No results for "${query}"`}
              </h2>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <p
                  className="text-gray-400 text-lg mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  We couldn't find any results.
                </p>
                <p
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Try a different keyword or browse by genre above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {results.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
