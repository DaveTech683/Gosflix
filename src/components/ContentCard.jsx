"use client";
import { useState, useRef } from "react";
import { Play, Plus, Check, ThumbsUp, ChevronRight, Tv } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { watchlistService } from "../services/userService";

function formatDuration(item) {
  if (item.duration) return item.duration;
  if (item.duration_seconds) {
    const h = Math.floor(item.duration_seconds / 3600);
    const m = Math.round((item.duration_seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }
  return null;
}


// ── Reel card (portrait) ──────────────────────────────────────────────────────
function ReelCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/reels"
      className="relative rounded-xl overflow-hidden flex-shrink-0 block"
      style={{ width: 155, height: 275 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.thumbnail || item.thumbnail_url}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        loading="eager"
      />
      {/* Gradient */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.1) 55%)",
      }} />
      {/* Live badge */}
      {item.isLive && (
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ background: "#B30000" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[10px] font-bold tracking-wide">LIVE</span>
        </div>
      )}
      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(179,0,0,0.85)", backdropFilter: "blur(4px)" }}>
          <Play size={18} fill="white" className="ml-0.5" />
        </div>
      </div>
      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-semibold leading-snug line-clamp-2 mb-0.5"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {item.title}
        </p>
        {item.duration && (
          <p className="text-gray-400 text-[10px]">{item.duration}</p>
        )}
      </div>
    </a>
  );
}

// ── Live event card ───────────────────────────────────────────────────────────
function LiveCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/live"
      className="relative rounded-xl overflow-hidden flex-shrink-0 block"
      style={{ width: 300, height: 170 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        loading="eager"
      />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%)",
      }} />
      {item.isLive ? (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: "#B30000" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[11px] font-bold uppercase tracking-wide">Live</span>
        </div>
      ) : (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.2)" }}>
          <span className="text-white text-[11px] font-semibold">Upcoming</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-sm font-semibold line-clamp-1 mb-0.5"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {item.title}
        </p>
        {item.viewers && (
          <p className="text-gray-300 text-xs">{item.viewers.toLocaleString()} watching</p>
        )}
      </div>
    </a>
  );
}

// ── Default movie / series card ───────────────────────────────────────────────
function DefaultCard({ item, variant = "default", progress }) {
  const [hovered, setHovered] = useState(false);
  const [inList, setInList] = useState(() => watchlistService.isInWatchlist(item?.id));
  const { isAuthenticated } = useAuthStore();

  const isSeries = item.type === "series" || item.content_type === "series";
  const detailHref = isSeries ? `/series/${item.id}` : `/movies/${item.id}`;
  const watchHref = `/watch/${item.id}`;

  // Card width: wide variant = 260, default = 200
  // Portrait poster sizing — narrower width, tall enough to show full poster
  const cardW = variant === "wide" ? 180 : 150;

  const handleToggleWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { window.location.href = "/account/signin"; return; }
    if (inList) {
      await watchlistService.removeFromWatchlist(item.id);
    } else {
      await watchlistService.addToWatchlist(item.id, item);
    }
    setInList(!inList);
  };

  const thumbnail = item.thumbnail || item.thumbnail_url || item.poster_url;
  const banner    = item.banner    || item.backdrop_url  || thumbnail;
  const genres    = Array.isArray(item.genre)
    ? item.genre
    : item.genre
      ? item.genre.split(",").map((g) => g.trim())
      : [];
  const dur = formatDuration(item);
  const year = item.releaseYear || item.release_year;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: cardW, zIndex: hovered ? 40 : "auto" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/*
        ── The card itself ──
        This is a self-contained box. The hover panel slides UP from inside
        the bottom of this box — nothing bleeds outside. We grow the card
        height on hover using max-height so the parent row doesn't jump.
      */}
      <div
        className="rounded-xl overflow-hidden transition-all duration-300 shadow-lg"
        style={{
          background: "#141414",
          border: hovered ? "1px solid rgba(255,255,255,0.13)" : "1px solid transparent",
          boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.8)" : "none",
          transform: hovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
          transition: "transform 0.28s ease, box-shadow 0.28s ease, border 0.2s ease",
        }}
      >
        {/* ── Thumbnail ── */}
        <div
          className="relative overflow-hidden"
          style={{ width: "100%", aspectRatio: "2/3" }}
        >
          <img
            src={thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
            loading="eager"
          />

          {/* Vignette always present, stronger on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to top, rgba(20,20,20,0.7) 0%, transparent 55%)",
              opacity: hovered ? 1 : 0.4,
            }}
          />

          {/* Progress bar */}
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "rgba(255,255,255,0.15)" }}>
              <div className="h-full transition-all" style={{ width: `${progress}%`, background: "#B30000" }} />
            </div>
          )}

          {/* Top badges */}
          <div className="absolute top-2 left-2 flex gap-1.5 items-center">
            {item.isFeatured && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold text-white rounded-md uppercase tracking-wider"
                style={{ background: "#B30000" }}>
                Top Pick
              </span>
            )}
            {isSeries && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold text-white rounded-md"
                style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)" }}>
                <Tv size={9} />
                {item.seasons ? `S${item.seasons}` : "Series"}
              </span>
            )}
          </div>

          {/* Play button — shown on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-250"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <a
              href={watchHref}
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "rgba(179,0,0,0.9)", backdropFilter: "blur(6px)", boxShadow: "0 0 20px rgba(179,0,0,0.5)" }}
            >
              <Play size={18} fill="white" className="ml-0.5" />
            </a>
          </div>
        </div>

        {/* ── Info panel — slides in from bottom on hover ── */}
        <div
          style={{
            maxHeight: hovered ? 160 : 0,
            overflow: "hidden",
            transition: "max-height 0.28s ease",
          }}
        >
          <div className="px-3 pt-3 pb-3.5">
            {/* Title */}
            <h3
              className="text-white font-bold text-sm leading-snug line-clamp-1 mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {item.title}
            </h3>

            {/* Action row */}
            <div className="flex items-center gap-2 mb-3">
              {/* Watchlist */}
              <button
                onClick={handleToggleWatchlist}
                title={inList ? "Remove from list" : "Add to list"}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: inList ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.1)",
                  border: `1px solid ${inList ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.2)"}`,
                  color: inList ? "#22c55e" : "#aaa",
                }}
              >
                {inList ? <Check size={12} /> : <Plus size={12} />}
              </button>

              <button
                title="Rate"
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <ThumbsUp size={12} />
              </button>

              {/* Spacer + details link */}
              <a
                href={detailHref}
                className="ml-auto flex items-center gap-1 text-gray-400 hover:text-white text-xs transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
                onClick={(e) => e.stopPropagation()}
              >
                Info <ChevronRight size={13} />
              </a>
            </div>

            {/* Meta chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {year && (
                <span className="text-green-400 text-[11px] font-semibold">{year}</span>
              )}
              {item.maturityRating && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-gray-400 tabular-nums"
                  style={{ border: "1px solid rgba(255,255,255,0.22)" }}>
                  {item.maturityRating}
                </span>
              )}
              {dur && (
                <span className="text-gray-500 text-[11px]">{dur}</span>
              )}
            </div>

            {/* Genre dots */}
            {genres.length > 0 && (
              <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                {genres.slice(0, 3).map((g, i) => (
                  <span key={i} className="flex items-center gap-1 text-gray-500 text-[11px]">
                    {i > 0 && <span style={{ color: "#3a3a3a" }}>·</span>}
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Exports ───────────────────────────────────────────────────────────────────
export default function ContentCard({ item, variant = "default", progress }) {
  if (!item) return null;
  if (item.type === "reel")  return <ReelCard item={item} />;
  if (item.type === "live")  return <LiveCard item={item} />;
  return <DefaultCard item={item} variant={variant} progress={progress} />;
}