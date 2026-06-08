"use client";
import { useEffect, useState } from "react";
import { BookmarkCheck, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentCard from "../../components/ContentCard";
import { useAuthStore } from "../../store/authStore";
import { watchlistService } from "../../services/userService";

export default function WatchlistPage() {
  const { isAuthenticated } = useAuthStore();
  const [watchlist, setWatchlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = "My List — GoPremiere";
    useAuthStore.getState().initialize();

    if (!isAuthenticated) {
      window.location.href = "/account/signin?callbackUrl=/watchlist";
      return;
    }

    setWatchlist(watchlistService.getWatchlist());
    setLoaded(true);
  }, [isAuthenticated]);

  if (!loaded) {
    return (
      <div
        style={{ background: "#000", minHeight: "100vh" }}
        className="flex items-center justify-center"
      >
        <div
          className="w-10 h-10 rounded-full border-2 border-[#B30000] border-t-transparent"
          style={{ animation: "spin 0.8s linear infinite" }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div className="pt-28 pb-6 px-4 md:px-12 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookmarkCheck size={28} style={{ color: "#B30000" }} />
          <h1
            className="text-3xl font-black text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            My List
          </h1>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: "#B30000" }}
          >
            {watchlist.length}
          </span>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-32">
            <BookmarkCheck size={64} className="mx-auto mb-4 text-gray-800" />
            <h2
              className="text-white text-2xl font-bold mb-3"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Your list is empty
            </h2>
            <p
              className="text-gray-500 text-base mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Save movies, series, and events to watch later
            </p>
            <a
              href="/movies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#B30000", fontFamily: "Inter, sans-serif" }}
            >
              Browse Movies <ArrowRight size={16} />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-16">
            {watchlist.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
