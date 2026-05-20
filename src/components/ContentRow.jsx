// ContentRow.jsx
"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ContentCard from "./ContentCard";

export default function ContentRow({
  title,
  items = [],
  type,
  viewAllHref,
  label,
}) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const getViewHref = () => {
    if (viewAllHref) return viewAllHref;
    if (type === "movies") return "/movies";
    if (type === "series") return "/series";
    if (type === "kids") return "/kids";
    if (type === "live") return "/live";
    if (type === "reels") return "/reels";
    return "/browse";
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-6 group/row">
      {/* Row Header */}
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 mb-4">
        <a href={getViewHref()} className="flex items-center gap-2 group/link">
          <h2
            className="text-lg md:text-xl font-bold text-white group-hover/link:text-gray-300 transition-colors"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {title}
          </h2>
          <span
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide opacity-0 group-hover/row:opacity-100 transition-all duration-300 -translate-x-2 group-hover/row:translate-x-0"
            style={{ color: "#B30000" }}
          >
            {label || "Explore all"} <ArrowRight size={12} />
          </span>
        </a>
      </div>

      {/* Scroll container */}
      <div className="relative">
        {/* Left arrow */}
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.9), transparent)",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <ChevronLeft size={18} />
            </div>
          </button>
        )}

        {/* Right arrow */}
        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.9), transparent)",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <ChevronRight size={18} />
            </div>
          </button>
        )}

        {/* Cards */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-3 overflow-x-auto px-4 md:px-8 lg:px-12 pb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <ContentCard key={item.id} item={item} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
}
