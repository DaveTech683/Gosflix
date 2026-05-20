"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { use } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
  ArrowLeft,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import ContentCard from "../../../components/ContentCard";
import { MOVIES, SERIES } from "../../../data/mockData";
import { useAuthStore } from "../../../store/authStore";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://goflix-production.up.railway.app";

function formatTime(secs) {
  if (!secs || isNaN(secs)) return "00:00";
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(secs % 60)
    .toString()
    .padStart(2, "0");
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

// ── Token helper ──────────────────────────────────────────────────────────────
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("goflix_token");
}

// ── API helpers ───────────────────────────────────────────────────────────────
async function fetchStreamUrls(movieId) {
  const res = await fetch(`${BASE_URL}/movies/stream/${movieId}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Stream fetch failed: ${res.status}`);
  return res.json();
  // Returns: { hls_url, dash_url, thumbnail_url, expires_at, cf_video_uid }
}

async function fetchMovieDetail(movieId) {
  const res = await fetch(`${BASE_URL}/movies/${movieId}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Detail fetch failed: ${res.status}`);
  return res.json();
}

async function fetchResumePosition(movieId, token) {
  if (!token) return 0;
  try {
    const res = await fetch(`${BASE_URL}/movies/${movieId}/resume`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.resume_from || 0;
  } catch {
    return 0;
  }
}

async function saveProgress(movieId, progressSeconds, completed, token) {
  if (!token) return;
  try {
    await fetch(
      `${BASE_URL}/movies/progress?movie_id=${movieId}&progress_seconds=${Math.floor(progressSeconds)}&completed=${completed}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch {
    // silently fail — progress saving is non-critical
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WatchPage({ params }) {
  const { id } = use(params);
  const { isAuthenticated } = useAuthStore();

  // Stream state
  const [streamData, setStreamData] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [streamError, setStreamError] = useState(null);
  const [isLoadingStream, setIsLoadingStream] = useState(true);

  // Player state
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [quality, setQuality] = useState("Auto");

  // Related content
  const [related, setRelated] = useState([]);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeout = useRef(null);
  const progressSaveTimer = useRef(null);

  // ── Fetch stream + movie detail on mount ─────────────────────────────────
  useEffect(() => {
    if (!id) return;
    document.title = "Loading… — GoFlix";

    const token = getToken();

    Promise.all([
      fetchStreamUrls(id),
      fetchMovieDetail(id),
      fetchResumePosition(id, token),
    ])
      .then(([stream, detail, resumeFrom]) => {
        setStreamData(stream);
        setMovieDetail(detail);

        // Build related from same genre (from local mock while we load)
        const allContent = [...MOVIES, ...SERIES];
        const genres = detail?.genre ? detail.genre.split(",").map((g) => g.trim()) : [];
        const rel = allContent
          .filter(
            (c) =>
              c.id !== Number(id) &&
              c.genre?.some((g) => genres.includes(g))
          )
          .slice(0, 6);
        setRelated(rel);

        document.title = `Watch ${detail?.title || ""} — GoFlix`;

        // Seek to resume position once video loads
        if (resumeFrom > 0) {
          setCurrentTime(resumeFrom);
        }
      })
      .catch((err) => {
        setStreamError(err.message);
      })
      .finally(() => {
        setIsLoadingStream(false);
      });
  }, [id]);

  // ── Sync volume / mute to video element ──────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = muted;
  }, [volume, muted]);

  // ── Seek to resume position once metadata is loaded ───────────────────────
  const hasSeekedToResume = useRef(false);
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration || 0);
    setIsVideoLoading(false);
    if (!hasSeekedToResume.current && currentTime > 0) {
      videoRef.current.currentTime = currentTime;
      hasSeekedToResume.current = true;
    }
  };

  // ── Video event handlers ──────────────────────────────────────────────────
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);

    // Update buffered
    if (video.buffered.length > 0) {
      setBuffered(video.buffered.end(video.buffered.length - 1));
    }
  }, []);

  const handleVideoError = () => {
    setVideoError("Failed to load video stream. Please try again.");
    setIsVideoLoading(false);
  };

  const handleWaiting = () => setIsVideoLoading(true);
  const handleCanPlay = () => setIsVideoLoading(false);

  const handleEnded = () => {
    setPlaying(false);
    const token = getToken();
    saveProgress(id, duration, true, token);
  };

  // ── Periodic progress saving (every 15s while playing) ───────────────────
  useEffect(() => {
    if (playing) {
      progressSaveTimer.current = setInterval(() => {
        const video = videoRef.current;
        if (!video) return;
        const token = getToken();
        const pct = video.duration > 0 ? video.currentTime / video.duration : 0;
        saveProgress(id, video.currentTime, pct >= 0.95, token);
      }, 15000);
    } else {
      clearInterval(progressSaveTimer.current);
    }
    return () => clearInterval(progressSaveTimer.current);
  }, [playing, id]);

  // ── Controls auto-hide ────────────────────────────────────────────────────
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3000);
  }, []);

  useEffect(() => () => clearTimeout(controlsTimeout.current), []);

  // ── Fullscreen listener ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ── Player controls ───────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setVideoError("Playback blocked. Tap play to start."));
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pct * duration;
    setCurrentTime(pct * duration);
  };

  const seek = (delta) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + delta));
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const retryStream = () => {
    setVideoError(null);
    setStreamError(null);
    setIsLoadingStream(true);
    fetchStreamUrls(id)
      .then((stream) => setStreamData(stream))
      .catch((err) => setStreamError(err.message))
      .finally(() => setIsLoadingStream(false));
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;
  const content = movieDetail;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      {/* ── Video Player ── */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          background: "#050505",
          aspectRatio: "16/9",
          maxHeight: "85vh",
        }}
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => playing && setShowControls(false)}
      >
        {/* Actual HLS video element */}
        {streamData?.hls_url && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-contain"
            src={streamData.hls_url}
            poster={streamData.thumbnail_url || content?.backdrop_url || content?.poster_url}
            preload="metadata"
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onWaiting={handleWaiting}
            onCanPlay={handleCanPlay}
            onError={handleVideoError}
            onEnded={handleEnded}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={togglePlay}
            style={{ cursor: "pointer" }}
          />
        )}

        {/* Loading skeleton — initial stream fetch */}
        {isLoadingStream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: "linear-gradient(135deg, #0a0a0a, #0d0d0d)" }}>
            <Loader2 size={40} className="text-[#B30000] animate-spin" />
            <p className="text-gray-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Loading stream…
            </p>
          </div>
        )}

        {/* Video buffering spinner */}
        {!isLoadingStream && isVideoLoading && !videoError && streamData && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
              <Loader2 size={28} className="text-[#B30000] animate-spin" />
            </div>
          </div>
        )}

        {/* Stream fetch error */}
        {(streamError || videoError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ background: "rgba(0,0,0,0.9)" }}>
            <AlertCircle size={48} className="text-[#B30000]" />
            <p className="text-white font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
              Stream unavailable
            </p>
            <p className="text-gray-400 text-sm text-center max-w-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              {streamError || videoError}
            </p>
            <button
              onClick={retryStream}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "#B30000", fontFamily: "Inter, sans-serif" }}>
              <RotateCcw size={16} /> Retry
            </button>
          </div>
        )}

        {/* Big play button when paused and video is ready */}
        {!playing && !isVideoLoading && !streamError && !videoError && streamData && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
            style={{ pointerEvents: showControls ? "auto" : "none" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "2px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Play size={34} fill="white" className="ml-1" />
            </div>
          </div>
        )}

        {/* Controls overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-between transition-opacity duration-300"
          style={{
            opacity: showControls ? 1 : 0,
            pointerEvents: showControls ? "auto" : "none",
          }}
          onMouseMove={resetControlsTimeout}
        >
          {/* Top bar */}
          <div
            className="flex items-center gap-3 p-4 pt-5"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
            }}
          >
            <a
              href={`/movies/${id}`}
              className="flex items-center gap-1.5 text-white hover:text-gray-300 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <ArrowLeft size={20} />
            </a>
            {content && (
              <div>
                <p className="text-white font-semibold text-sm leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif" }}>
                  {content.title}
                </p>
                <p className="text-gray-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  {content.release_year}
                  {content.duration_seconds
                    ? ` · ${Math.round(content.duration_seconds / 60)} min`
                    : ""}
                </p>
              </div>
            )}
          </div>

          {/* Bottom controls */}
          <div
            className="p-4 pb-5"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
            }}
          >
            {/* Progress / seek bar */}
            <div
              className="w-full mb-4 cursor-pointer group"
              style={{ height: 18, display: "flex", alignItems: "center" }}
              onClick={handleProgressClick}
            >
              <div className="relative w-full h-1 rounded-full group-hover:h-1.5 transition-all"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                {/* Buffered */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ width: `${bufferedPct}%`, background: "rgba(255,255,255,0.25)" }}
                />
                {/* Played */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ width: `${progressPct}%`, background: "#B30000" }}
                />
                {/* Scrubber thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progressPct}% - 7px)` }}
                />
              </div>
            </div>

            {/* Button row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="text-white hover:text-gray-200 transition-colors">
                  {playing ? <Pause size={24} /> : <Play size={24} fill="white" />}
                </button>
                <button onClick={() => seek(-10)} className="text-white hover:text-gray-200 transition-colors">
                  <SkipBack size={20} />
                </button>
                <button onClick={() => seek(10)} className="text-white hover:text-gray-200 transition-colors">
                  <SkipForward size={20} />
                </button>
                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button onClick={() => setMuted(!muted)} className="text-white hover:text-gray-200 transition-colors">
                    {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVolume(v);
                      setMuted(v === 0);
                    }}
                    className="w-20 accent-[#B30000] cursor-pointer"
                    style={{ height: 3 }}
                  />
                </div>
                {/* Time */}
                <span className="text-white text-xs tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>
                  {formatTime(currentTime)}{" "}
                  <span className="text-gray-500">/</span>{" "}
                  {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="text-white text-xs bg-transparent border-0 focus:outline-none cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {["Auto", "1080p", "720p", "480p"].map((q) => (
                    <option key={q} value={q} style={{ background: "#111" }}>{q}</option>
                  ))}
                </select>
                <button onClick={toggleFullscreen} className="text-white hover:text-gray-200 transition-colors">
                  {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info section ── */}
      <div className="px-4 md:px-12 py-8 max-w-screen-xl mx-auto">
        {content ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h1
                className="text-2xl md:text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {content.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <span className="text-green-400 text-sm font-semibold">{content.release_year}</span>
                {content.genre && (
                  <span className="text-xs px-2 py-0.5 rounded-full text-gray-400"
                    style={{ background: "rgba(255,255,255,0.07)", fontFamily: "Inter, sans-serif" }}>
                    {content.genre.split(",")[0].trim()}
                  </span>
                )}
                {content.duration_seconds && (
                  <span className="text-gray-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                    {Math.floor(content.duration_seconds / 3600)}h{" "}
                    {Math.round((content.duration_seconds % 3600) / 60)}m
                  </span>
                )}
              </div>
              <p
                className="text-gray-300 text-sm leading-relaxed max-w-2xl"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {content.description || content.overview}
              </p>
            </div>

            {/* Progress widget */}
            <div
              className="flex-shrink-0 p-4 rounded-xl"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                minWidth: 200,
              }}
            >
              <p className="text-gray-400 text-xs mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                Watch Progress
              </p>
              <div className="h-1.5 rounded-full mb-1" style={{ background: "#222" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progressPct}%`, background: "#B30000" }}
                />
              </div>
              <p className="text-white text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                {Math.round(progressPct)}% completed
              </p>
              {!isAuthenticated && (
                <p className="text-yellow-600 text-xs mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  Sign in to save progress
                </p>
              )}
            </div>
          </div>
        ) : isLoadingStream ? (
          // Skeleton
          <div className="animate-pulse flex flex-col gap-3">
            <div className="h-8 w-64 rounded" style={{ background: "#1a1a1a" }} />
            <div className="h-4 w-40 rounded" style={{ background: "#1a1a1a" }} />
            <div className="h-4 w-full max-w-xl rounded" style={{ background: "#1a1a1a" }} />
            <div className="h-4 w-3/4 max-w-xl rounded" style={{ background: "#1a1a1a" }} />
          </div>
        ) : null}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
              More Like This
            </h2>
            <div className="flex gap-4 flex-wrap">
              {related.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}