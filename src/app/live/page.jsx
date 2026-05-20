"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Radio,
  Clock,
  Users,
  Calendar,
  Play,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { liveService } from "../../services/contentService";

function Countdown({ startTime }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calc = () => {
      const diff = new Date(startTime) - new Date();
      if (diff <= 0) {
        setTimeLeft("Starting soon");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (h > 0) setTimeLeft(`${h}h ${m}m`);
      else if (m > 0) setTimeLeft(`${m}m ${s}s`);
      else setTimeLeft(`${s}s`);
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return <span>{timeLeft}</span>;
}

function LiveCard({ event }) {
  return (
    <a
      href={`/watch/${event.id}`}
      className="block relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="relative" style={{ height: 200 }}>
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 70%)",
          }}
        />

        {/* Status badge */}
        {event.isLive ? (
          <div
            className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "#B30000" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-white"
              style={{ animation: "livePulse 1.2s ease-in-out infinite" }}
            />
            <span className="text-white text-xs font-bold uppercase tracking-wide">
              Live Now
            </span>
          </div>
        ) : (
          <div
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span className="text-white text-xs font-semibold">Upcoming</span>
          </div>
        )}

        {event.viewers && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
            }}
          >
            <Users size={12} className="text-gray-300" />
            <span className="text-white text-xs">
              {event.viewers.toLocaleString()}
            </span>
          </div>
        )}

        {/* Play overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(179,0,0,0.8)",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            <Play size={22} fill="white" className="ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-4" style={{ background: "#0f0f0f" }}>
        <p
          className="text-xs text-gray-500 mb-1 uppercase tracking-wide"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {event.channel}
        </p>
        <h3
          className="text-white font-bold text-base mb-2 line-clamp-1"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {event.title}
        </h3>
        <p
          className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {event.description}
        </p>

        {event.isLive ? (
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
              <Radio size={12} /> In progress
            </span>
            <span
              className="text-xs font-semibold text-white px-3 py-1.5 rounded-full flex items-center gap-1"
              style={{ background: "#B30000" }}
            >
              Join Now <ChevronRight size={12} />
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs flex items-center gap-1">
              <Clock size={12} /> Starts in{" "}
              <span className="text-yellow-400 font-semibold ml-1">
                <Countdown startTime={event.startTime} />
              </span>
            </span>
            <span
              className="text-xs font-medium text-gray-300 px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Set Reminder
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

export default function LivePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["live-events"],
    queryFn: liveService.getAll,
  });

  useEffect(() => {
    document.title = "Live Events — GoFlix";
  }, []);

  const liveEvents = data?.live || [];
  const upcoming = data?.upcoming || [];

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div
        className="pt-28 pb-16 px-4 md:px-12 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(179,0,0,0.18), transparent)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, #B30000 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full bg-red-500"
              style={{ animation: "livePulse 1.2s ease-in-out infinite" }}
            />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
              Live Now
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Live & Upcoming Events
          </h1>
          <p
            className="text-gray-400 text-base max-w-lg mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Worship, conferences, and gospel concerts — streamed live for
            believers everywhere
          </p>
        </div>
      </div>

      <div className="px-4 md:px-12 pb-20 max-w-screen-xl mx-auto">
        {/* Live Now */}
        {liveEvents.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2.5 h-2.5 rounded-full bg-red-500"
                style={{ animation: "livePulse 1.2s ease-in-out infinite" }}
              />
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Live Now
              </h2>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: "#B30000" }}
              >
                {liveEvents.length} streams
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveEvents.map((event) => (
                <LiveCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={22} className="text-gray-400" />
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Upcoming Events
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <LiveCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ height: 320, background: "#111" }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.6s infinite",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
