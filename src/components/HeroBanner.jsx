"use client";
import { useState, useEffect } from "react";
import { Play, Plus, Check, Info, Volume2, VolumeX } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { watchlistService } from "../services/userService";

export default function HeroBanner({ content }) {
  const [muted, setMuted] = useState(true);
  const [inList, setInList] = useState(false);
  const [visible, setVisible] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (content) {
      setInList(watchlistService.isInWatchlist(content.id));
      const t = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(t);
    }
  }, [content]);

  if (!content) {
    return (
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: "88vh", minHeight: 520, background: "#0a0a0a" }}
      >
        <div
          className="w-10 h-10 rounded-full border-2 border-[#B30000] border-t-transparent"
          style={{ animation: "spin 0.8s linear infinite" }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const handleToggleWatchlist = async () => {
    if (!isAuthenticated) { window.location.href = "/account/signin"; return; }
    if (inList) {
      await watchlistService.removeFromWatchlist(content.id);
    } else {
      await watchlistService.addToWatchlist(content.id, content);
    }
    setInList(!inList);
  };

  const detailHref = content.type === "series" ? `/series/${content.id}` : `/movies/${content.id}`;

  const posterSrc   = content.poster_url || content.poster || content.thumbnail;
  const backdropSrc = content.banner || content.backdrop_url || content.thumbnail;

  const genres = Array.isArray(content.genre)
    ? content.genre
    : content.genre
      ? content.genre.split(",").map((g) => g.trim())
      : [];
  const year = content.releaseYear || content.release_year;

  return (
    <section
      className="hero-section relative w-full overflow-hidden"
      style={{ height: "88vh", minHeight: 520, maxHeight: 780 }}
    >
      {/* ── Layer 1: blurred backdrop fills the whole section ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={backdropSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(28px) brightness(0.28) saturate(1.4)", transform: "scale(1.08)" }}
        />
        {/* Desktop: darken left side more for text legibility */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)",
        }} />
        {/* Mobile: darken top-to-bottom more uniformly */}
        <div className="absolute inset-0 hero-mobile-gradient" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.98) 0%, transparent 35%)",
        }} />
      </div>

      {/* ── Layer 2: poster — right side on desktop, top dimmed on mobile ── */}
      <div
        className="hero-poster-wrap absolute"
        aria-hidden="true"
        style={{
          top: 0, bottom: 0, right: 0,
          width: "42%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        <img
          src={posterSrc}
          alt={content.title}
          className="h-full w-full"
          style={{
            objectFit: "contain",
            objectPosition: "center right",
            maskImage: "linear-gradient(to right, transparent 0%, black 22%, black 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%, black 100%)",
          }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 30%)",
        }} />
      </div>

      {/* ── Layer 3: text content ── */}
      <div
        className="hero-content absolute inset-0 flex px-6 md:px-14 lg:px-20"
        style={{
          alignItems: "flex-end", /* mobile: pin to bottom above buttons */
          paddingBottom: "8rem",  /* space for the CTA row */
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="hero-text-inner w-full">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
              style={{
                background: "rgba(179,0,0,0.18)",
                color: "#ff7070",
                border: "1px solid rgba(179,0,0,0.38)",
              }}
            >
              {content.isFeatured
                ? "✦ Featured Film"
                : content.type === "series"
                  ? "✦ Featured Series"
                  : "✦ Now Streaming"}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-bold text-white leading-tight mb-2"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(1.5rem, 3.2vw, 3rem)",
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            {content.title}
          </h1>

          {content.subtitle && (
            <p className="text-gray-300 text-sm mb-2 italic" style={{ fontFamily: "Inter, sans-serif" }}>
              {content.subtitle}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {year && (
              <span className="text-green-400 font-semibold text-sm">{year}</span>
            )}
            {content.maturityRating && (
              <span className="text-xs font-bold px-1.5 py-0.5 border border-gray-600 text-gray-300 rounded">
                {content.maturityRating}
              </span>
            )}
            {(content.duration || content.duration_seconds) && (
              <span className="text-gray-400 text-sm">
                {content.duration || (() => {
                  const s = content.duration_seconds;
                  return `${Math.floor(s/3600)}h ${Math.round((s%3600)/60)}m`;
                })()}
              </span>
            )}
            {content.seasons && (
              <span className="text-gray-400 text-sm">{content.seasons} Seasons</span>
            )}
            {genres.slice(0, 3).map((g, i) => (
              <span key={i} className="text-gray-500 text-sm flex items-center gap-1">
                {i > 0 && <span style={{ color: "#444" }}>•</span>}
                {g}
              </span>
            ))}
          </div>

          {/* Description — hidden on mobile to keep layout clean */}
          <p
            className="hero-description text-gray-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-3"
            style={{ fontFamily: "Inter, sans-serif", maxWidth: "38ch" }}
          >
            {content.description || content.overview}
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`/watch/${content.id}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-black text-sm transition-all hover:opacity-90 hover:scale-[1.03]"
              style={{ background: "#ffffff", fontFamily: "Inter, sans-serif" }}
            >
              <Play size={16} fill="black" />
              Watch Now
            </a>

            <button
              onClick={handleToggleWatchlist}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:scale-[1.03]"
              style={{
                background: inList ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.1)",
                border: `1px solid ${inList ? "rgba(34,197,94,0.45)" : "rgba(255,255,255,0.22)"}`,
                backdropFilter: "blur(10px)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {inList ? <Check size={16} /> : <Plus size={16} />}
              {inList ? "In My List" : "My List"}
            </button>

            <a
              href={detailHref}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:scale-[1.03]"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(10px)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Info size={16} />
              More Info
            </a>

            {/* Mobile App CTA — inline with buttons on mobile */}
            <button
              onClick={() => setAppModalOpen(true)}
              className="hero-app-btn-inline flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-white text-sm transition-all hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, #B30000, #ff3b3b)",
                fontFamily: "Inter, sans-serif",
                display: "none", /* shown only on mobile via CSS */
              }}
            >
              📱 Get App
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom controls row: mute (left) + mobile app CTA (right) — desktop only ── */}
      <div
        className="hero-bottom-controls absolute bottom-7 left-6 right-5 md:left-14 md:right-10 lg:left-20 flex items-center justify-between z-20"
      >
        {/* Desktop Mobile App CTA */}
        <button
          onClick={() => setAppModalOpen(true)}
          className="hero-app-btn-desktop px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #B30000, #ff3b3b)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          📱 Get Mobile App
        </button>

        {/* Mute toggle */}
        <button
          onClick={() => setMuted(!muted)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          style={{
            border: "1.5px solid rgba(255,255,255,0.35)",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
          }}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      {/* ── Bottom fade into page ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000)" }}
      />

      {/* ── Responsive overrides ── */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Mobile (< 768px) ── */
        @media (max-width: 767px) {
          /* Hide the right-side poster; let blurred backdrop do the atmosphere work */
          .hero-poster-wrap { display: none !important; }

          /* Text block: full width, pinned to bottom, above the controls row */
          .hero-content {
            align-items: flex-end !important;
            padding-bottom: 5.5rem !important;
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
          .hero-text-inner {
            max-width: 100% !important;
          }

          /* Hide long description on small screens */
          .hero-description { display: none !important; }

          /* Show the inline "Get App" button inside the CTA row */
          .hero-app-btn-inline { display: flex !important; }

          /* Hide the separate desktop bottom controls row */
          .hero-bottom-controls { display: none !important; }

          /* Tighter vertical section height on small screens */
          .hero-section {
            height: 80vh !important;
            min-height: 480px !important;
          }

          /* Stronger full-bleed backdrop gradient on mobile */
          .hero-mobile-gradient {
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.97) 0%,
              rgba(0,0,0,0.65) 45%,
              rgba(0,0,0,0.15) 100%
            ) !important;
          }
        }

        /* ── Tablet (768px – 1023px) ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-content {
            align-items: center !important;
            padding-bottom: 0 !important;
          }
          .hero-text-inner { max-width: 52% !important; }
          .hero-poster-wrap { width: 46% !important; }
        }

        /* ── Desktop (≥ 1024px) ── */
        @media (min-width: 1024px) {
          .hero-content {
            align-items: center !important;
            padding-bottom: 0 !important;
          }
          .hero-text-inner { max-width: 56% !important; }
        }
      `}</style>

      {/* ── App modal ── */}
      {appModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setAppModalOpen(false); }}
        >
          <div
            className="w-[90%] max-w-sm rounded-2xl p-6 text-center"
            style={{
              background: "#141414",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2
              className="text-white text-lg font-semibold mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Get GoPremiere Mobile App
            </h2>
            <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              Choose your device
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  window.location.href = "https://github.com/DaveTech683/Goflix_website/releases/download/v1.0.0/goflix.apk";
                  setAppModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "#16a34a", fontFamily: "Inter, sans-serif" }}
              >
                Android
              </button>
              <button
                onClick={() => { alert("Coming soon — check back in a few months!"); setAppModalOpen(false); }}
                className="w-full py-2.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "#2a2a2a", fontFamily: "Inter, sans-serif" }}
              >
                iPhone
              </button>
              <button
                onClick={() => setAppModalOpen(false)}
                className="text-gray-500 text-sm mt-1 hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}