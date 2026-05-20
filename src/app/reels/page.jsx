"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  Share2,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Film,
  Volume2,
  VolumeX,
  Bookmark,
  MessageCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../store/authStore";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://goflix-production.up.railway.app";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("goflix_token");
}

function formatCount(n) {
  if (!n) return "0";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

// ── API helpers ───────────────────────────────────────────────────────────────

async function fetchReelsFeed(page = 1, limit = 15) {
  const res = await fetch(`${BASE_URL}/reels/?page=${page}&limit=${limit}&sort=trending`);
  if (!res.ok) throw new Error("Failed to load reels");
  return res.json(); // returns Reel[]
}

async function fetchStreamUrl(reelId) {
  const res = await fetch(`${BASE_URL}/reels/stream/${reelId}`);
  if (!res.ok) throw new Error(`Stream unavailable for reel ${reelId}`);
  return res.json(); // { hls_url, thumbnail_url, expires_at }
}

async function fetchMyState(reelId, token) {
  if (!token) return null;
  const res = await fetch(`${BASE_URL}/reels/${reelId}/my-state`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json(); // { liked, saved, likes, saves, comments_count }
}

async function postView(reelId) {
  await fetch(`${BASE_URL}/reels/${reelId}/view`, { method: "POST" }).catch(() => {});
}

async function postShare(reelId) {
  await fetch(`${BASE_URL}/reels/${reelId}/share`, { method: "POST" }).catch(() => {});
}

async function toggleLikeApi(reelId, token) {
  if (!token) return null;
  const res = await fetch(`${BASE_URL}/reels/${reelId}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json(); // { ok, liked, likes }
}

async function reportWatchProgress(reelId, watchedSeconds, completed) {
  const url = `${BASE_URL}/reels/${reelId}/watch-progress?watched_seconds=${Math.floor(watchedSeconds)}&completed=${completed}`;
  await fetch(url, { method: "POST" }).catch(() => {});
}

// ── Single reel video card ────────────────────────────────────────────────────

function ReelCard({ reel, isActive, muted, onMuteToggle }) {
  const { isAuthenticated } = useAuthStore();
  const videoRef = useRef(null);
  const watchStartRef = useRef(null);
  const viewRecorded = useRef(false);
  const progressTimer = useRef(null);

  const [streamUrl, setStreamUrl] = useState(null);
  const [streamError, setStreamError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Engagement state — seeded from reel data, refreshed from /my-state
  const [likes, setLikes] = useState(reel.likes || 0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shares, setShares] = useState(reel.shares || 0);

  // ── Load signed stream URL when this reel becomes active ─────────────────
  useEffect(() => {
    if (!isActive) return;
    let cancelled = false;

    fetchStreamUrl(reel.id)
      .then((data) => {
        if (!cancelled) setStreamUrl(data.hls_url);
      })
      .catch(() => {
        if (!cancelled) setStreamError(true);
      });

    // Load user engagement state
    const token = getToken();
    fetchMyState(reel.id, token).then((state) => {
      if (!cancelled && state) {
        setLiked(state.liked);
        setSaved(state.saved);
        setLikes(state.likes ?? reel.likes ?? 0);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isActive, reel.id]);

  // ── Play / pause based on active state ───────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      // Report accumulated watch time when leaving
      if (watchStartRef.current !== null) {
        const watched = (Date.now() - watchStartRef.current) / 1000;
        reportWatchProgress(reel.id, watched, false);
        watchStartRef.current = null;
      }
    }
  }, [isActive, streamUrl, reel.id]);

  // ── Mute sync ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // ── Video event handlers ──────────────────────────────────────────────────
  const handlePlay = () => {
    setIsPlaying(true);
    if (watchStartRef.current === null) {
      watchStartRef.current = Date.now();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleWaiting = () => setIsBuffering(true);
  const handleCanPlay = () => setIsBuffering(false);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Record view after 2 seconds of play
    if (!viewRecorded.current && video.currentTime >= 2) {
      viewRecorded.current = true;
      postView(reel.id);
    }
  }, [reel.id]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    if (watchStartRef.current !== null) {
      const watched = (Date.now() - watchStartRef.current) / 1000;
      reportWatchProgress(reel.id, watched, true);
      watchStartRef.current = null;
    }
    // Loop
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [reel.id]);

  // ── Engagement actions ────────────────────────────────────────────────────
  const handleLike = async (e) => {
    e.stopPropagation();
    const token = getToken();
    if (!token) return; // could show a login nudge here

    const prev = liked;
    setLiked(!prev);
    setLikes((l) => l + (prev ? -1 : 1));

    const result = await toggleLikeApi(reel.id, token);
    if (result) {
      setLiked(result.liked);
      setLikes(result.likes);
    } else {
      // Rollback
      setLiked(prev);
      setLikes((l) => l + (prev ? 1 : -1));
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: reel.title, text: reel.caption, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
    setShares((s) => s + 1);
    postShare(reel.id);
  };

  const toggleVideoPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const thumbnailUrl =
    reel.thumbnail_url ||
    reel.poster_url ||
    `https://videodelivery.net/${reel.cf_video_uid}/thumbnails/thumbnail.jpg`;

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ background: "#000" }}>
      {/* Video element */}
      {streamUrl && !streamError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={streamUrl}
          poster={thumbnailUrl}
          playsInline
          loop
          preload="metadata"
          muted={muted}
          onPlay={handlePlay}
          onPause={handlePause}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onClick={toggleVideoPlay}
          style={{ cursor: "pointer" }}
        />
      )}

      {/* Thumbnail placeholder while stream loads */}
      {(!streamUrl || !isActive) && !streamError && (
        <img
          src={thumbnailUrl}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        />
      )}

      {/* Stream error state */}
      {streamError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: "#0a0a0a" }}>
          <AlertCircle size={36} className="text-[#B30000]" />
          <p className="text-gray-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            Video unavailable
          </p>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.35) 100%)",
      }} />

      {/* Buffering spinner */}
      {isBuffering && isActive && streamUrl && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Loader2 size={36} className="text-white animate-spin opacity-70" />
        </div>
      )}

      {/* Paused indicator */}
      {!isPlaying && !isBuffering && isActive && streamUrl && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.55)", border: "2px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}>
            <Play size={28} fill="white" className="ml-1" />
          </div>
        </div>
      )}

      {/* ── Right action rail ── */}
      <div
        className="absolute right-3 bottom-36 flex flex-col items-center gap-5 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Like */}
        <button onClick={handleLike} className="flex flex-col items-center gap-1.5 group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-active:scale-95"
            style={{
              background: liked ? "rgba(179,0,0,0.35)" : "rgba(255,255,255,0.12)",
              border: `1px solid ${liked ? "rgba(179,0,0,0.6)" : "rgba(255,255,255,0.18)"}`,
              backdropFilter: "blur(8px)",
            }}>
            <Heart size={20} fill={liked ? "#B30000" : "none"} color={liked ? "#ff2b2b" : "#fff"} />
          </div>
          <span className="text-white text-[11px] font-semibold tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>
            {formatCount(likes)}
          </span>
        </button>

        {/* Share */}
        <button onClick={handleShare} className="flex flex-col items-center gap-1.5 group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-95"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}>
            <Share2 size={18} color="white" />
          </div>
          <span className="text-white text-[11px] font-semibold tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>
            {formatCount(shares)}
          </span>
        </button>

        {/* Mute toggle */}
        <button onClick={(e) => { e.stopPropagation(); onMuteToggle(); }} className="flex flex-col items-center gap-1.5 group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-95"
            style={{
              background: muted ? "rgba(255,200,0,0.15)" : "rgba(255,255,255,0.12)",
              border: `1px solid ${muted ? "rgba(255,200,0,0.4)" : "rgba(255,255,255,0.18)"}`,
              backdropFilter: "blur(8px)",
            }}>
            {muted ? <VolumeX size={18} color="#ffd700" /> : <Volume2 size={18} color="white" />}
          </div>
          <span className="text-white text-[11px] font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
            {muted ? "Muted" : "Sound"}
          </span>
        </button>
      </div>

      {/* ── Bottom info ── */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 z-20" onClick={(e) => e.stopPropagation()}>
        {/* Creator */}
        {reel.creator_name && (
          <div className="flex items-center gap-2 mb-2">
            {reel.creator_avatar ? (
              <img src={reel.creator_avatar} alt={reel.creator_name}
                className="w-7 h-7 rounded-full object-cover border border-white/20" />
            ) : (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "#B30000" }}>
                {reel.creator_name[0].toUpperCase()}
              </div>
            )}
            <span className="text-white text-sm font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
              {reel.creator_name}
            </span>
          </div>
        )}

        {/* Badge row */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wide"
            style={{ background: "#B30000" }}>
            GoFlix Reel
          </span>
          {reel.duration_seconds && (
            <span className="text-gray-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              {Math.floor(reel.duration_seconds / 60)}:{String(reel.duration_seconds % 60).padStart(2, "0")}
            </span>
          )}
          {reel.genre && (
            <span className="text-gray-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              · {reel.genre.split(",")[0].trim()}
            </span>
          )}
        </div>

        <h2 className="text-white font-bold text-base leading-snug mb-1"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {reel.title}
        </h2>

        {(reel.caption || reel.description) && (
          <p className="text-gray-300 text-sm line-clamp-2 mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}>
            {reel.caption || reel.description}
          </p>
        )}

        {/* Audio ticker */}
        {reel.audio_title && (
          <div className="flex items-center gap-2 mb-3 overflow-hidden">
            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: "#B30000" }}>
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
            <p className="text-gray-300 text-xs whitespace-nowrap overflow-hidden"
              style={{ fontFamily: "Inter, sans-serif", textOverflow: "ellipsis" }}>
              {reel.audio_title}{reel.audio_artist ? ` · ${reel.audio_artist}` : ""}
            </p>
          </div>
        )}

        {/* CTA */}
        {reel.category && (
          <a href={`/search?q=${encodeURIComponent(reel.genre || reel.category || "")}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "rgba(179,0,0,0.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(179,0,0,0.5)" }}>
            <Film size={14} />
            More {reel.category} Content
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  // Fetch paginated reels feed
  const { data: reels = [], isLoading, isError } = useQuery({
    queryKey: ["reels-feed"],
    queryFn: () => fetchReelsFeed(1, 20),
    staleTime: 60_000,
  });

  useEffect(() => {
    document.title = "Reels — GoFlix";
  }, []);

  const goTo = useCallback((index) => {
    if (index < 0 || index >= reels.length) return;
    setCurrentIndex(index);
  }, [reels.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "j") goTo(currentIndex + 1);
      if (e.key === "ArrowUp" || e.key === "k") goTo(currentIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, goTo]);

  // Touch swipe
  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };
  const onTouchMove = (e) => {
    if (touchStartY.current === null) return;
    if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
      isDragging.current = true;
    }
  };
  const onTouchEnd = (e) => {
    if (!isDragging.current || touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
    touchStartY.current = null;
    isDragging.current = false;
  };

  // Wheel scroll (desktop)
  const wheelLock = useRef(false);
  const onWheel = useCallback((e) => {
    if (wheelLock.current) return;
    wheelLock.current = true;
    goTo(e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1);
    setTimeout(() => { wheelLock.current = false; }, 700);
  }, [currentIndex, goTo]);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div style={{ background: "#000", height: "100vh" }} className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={40} className="text-[#B30000] animate-spin" />
          <p className="text-gray-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Loading reels…</p>
        </div>
      </div>
    );
  }

  if (isError || reels.length === 0) {
    return (
      <div style={{ background: "#000", height: "100vh" }} className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center px-8">
          <AlertCircle size={40} className="text-[#B30000]" />
          <p className="text-white font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
            {isError ? "Couldn't load reels" : "No reels yet"}
          </p>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            {isError ? "Check your connection and try again." : "Come back soon for new content."}
          </p>
        </div>
      </div>
    );
  }

  const current = reels[currentIndex];

  return (
    <div
      style={{ background: "#000", height: "100vh", overflow: "hidden", position: "relative" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <Navbar />
      </div>

      {/* Reel viewport — centred, max 430px like TikTok */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{ maxWidth: 430, margin: "0 auto" }}
      >
        {/* Only render current + adjacent reels for perf */}
        {reels.map((reel, i) => {
          if (Math.abs(i - currentIndex) > 1) return null;
          return (
            <div
              key={reel.id}
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{ transform: `translateY(${(i - currentIndex) * 100}%)` }}
            >
              <ReelCard
                reel={reel}
                isActive={i === currentIndex}
                muted={muted}
                onMuteToggle={() => setMuted((m) => !m)}
              />
            </div>
          );
        })}

        {/* Nav arrows */}
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 disabled:opacity-25"
            style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}
          >
            <ChevronUp size={18} />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex >= reels.length - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 disabled:opacity-25"
            style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(6px)" }}
          >
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Dot progress bar */}
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30">
          {reels.slice(0, 15).map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: 3,
                height: i === currentIndex ? 22 : 3,
                background: i === currentIndex ? "#B30000" : "rgba(255,255,255,0.28)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Desktop side panel */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden lg:flex flex-col justify-center px-8 z-20 pointer-events-none"
        style={{ width: "calc((100vw - 430px) / 2)" }}
      >
        <div style={{ maxWidth: 260 }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 text-white"
            style={{ background: "#B30000" }}>
            GoFlix Reels
          </div>
          <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            {current?.title}
          </h3>
          <p className="text-gray-500 text-sm mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
            {current?.caption || current?.description || ""}
          </p>
          <p className="text-gray-600 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {currentIndex + 1} / {reels.length}
          </p>
          <p className="text-gray-700 text-xs mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
            ↑ ↓ arrow keys or scroll to navigate
          </p>
        </div>
      </div>
    </div>
  );
}