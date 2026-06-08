"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Shield } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentCard from "../../components/ContentCard";
import { RowSkeleton } from "../../components/SkeletonLoader";
import { kidsService } from "../../services/contentService";

export default function KidsPage() {
  const { data: content, isLoading } = useQuery({
    queryKey: ["kids-content"],
    queryFn: kidsService.getAll,
  });

  useEffect(() => {
    document.title = "Kids — GoPremiere";
  }, []);

  const movies = content?.filter((c) => c.type === "movie") || [];
  const series = content?.filter((c) => c.type === "series") || [];

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Colorful kids header */}
      <div
        className="pt-28 pb-16 px-4 md:px-12 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d001a, #1a0000, #001a0d)",
        }}
      >
        {/* Floating decorative elements */}
        {["⭐", "🌟", "✨", "💫"].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-4xl pointer-events-none"
            style={{
              top: `${20 + i * 20}%`,
              left: `${5 + i * 25}%`,
              opacity: 0.3,
              animation: `float ${2 + i * 0.5}s ease-in-out infinite alternate`,
            }}
          >
            {emoji}
          </span>
        ))}
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-bold"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#aaa",
            }}
          >
            <Shield size={14} />{" "}
            <span style={{ fontFamily: "Inter, sans-serif" }}>
              100% Family Safe · Curated for Kids
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              textShadow: "0 0 60px rgba(179,0,0,0.3)",
            }}
          >
            Kids & Animation ✨
          </h1>
          <p
            className="text-gray-400 text-base max-w-lg mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Faith-filled stories, animated adventures, and Bible heroes — all
            G-rated and family safe
          </p>
        </div>
      </div>

      <div className="px-4 md:px-12 pb-16 max-w-screen-xl mx-auto">
        {isLoading ? (
          <>
            <RowSkeleton count={4} />
            <RowSkeleton count={4} />
          </>
        ) : (
          <>
            {movies.length > 0 && (
              <div className="mb-12">
                <h2
                  className="text-xl font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  🎬 Kids Movies
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movies.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            {series.length > 0 && (
              <div>
                <h2
                  className="text-xl font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  📺 Kids Series
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {series.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to { transform: translateY(-12px) rotate(8deg); }
        }
      `}</style>
    </div>
  );
}
