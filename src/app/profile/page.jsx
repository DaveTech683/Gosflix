"use client";
import { useState, useEffect } from "react";
import {
  BookmarkCheck,
  History,
  Settings,
  Star,
  Play,
  Trash2,
  LogOut,
  User,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContentCard from "../../components/ContentCard";
import { useAuthStore } from "../../store/authStore";
import {
  watchlistService,
  watchHistoryService,
} from "../../services/userService";

const TABS = ["watchlist", "history", "settings"];
const TAB_LABELS = {
  watchlist: "My List",
  history:   "Continue Watching",
  settings:  "Account",
};
const TAB_ICONS = {
  watchlist: BookmarkCheck,
  history:   History,
  settings:  Settings,
};

// ─── Avatar component with image fallback ─────────────────────────────────────
function Avatar({ src, name, size = 96 }) {
  const [failed, setFailed] = useState(false);
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (!src || failed) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl font-black text-white shadow-2xl flex-shrink-0"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #B30000, #7a0000)",
          border: "2px solid rgba(179,0,0,0.4)",
          fontSize: size * 0.32,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="rounded-2xl object-cover shadow-2xl flex-shrink-0"
      style={{
        width: size,
        height: size,
        border: "2px solid rgba(179,0,0,0.4)",
      }}
      onError={() => setFailed(true)}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user, isAuthenticated, isInitializing, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("watchlist");
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory]     = useState([]);

  useEffect(() => {
    document.title = "My Profile — GoFlix";

    // Don't redirect until initialize() has settled
    if (isInitializing) return;

    if (!isAuthenticated) {
      window.location.href = "/account/signin?callbackUrl=/profile";
      return;
    }

    setWatchlist(watchlistService.getWatchlist());
    setHistory(watchHistoryService.getHistory());
  }, [isAuthenticated, isInitializing]);

  const handleRemoveWatchlist = async (id) => {
    const updated = await watchlistService.removeFromWatchlist(id);
    setWatchlist(updated);
  };

  // Loading — either still initializing or auth confirmed but user object not yet set
  if (isInitializing || (!isAuthenticated && !user)) {
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

  // Authenticated but user object somehow null (shouldn't happen, safety net)
  if (!user) return null;

  // Safe formatted join date
  const joinedLabel = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString("en-US", {
        month: "long",
        year:  "numeric",
      })
    : null;

  // Capitalise plan
  const planLabel =
    user.plan.charAt(0).toUpperCase() + user.plan.slice(1).toLowerCase();

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      {/* ── Profile Header ─────────────────────────────────────────────── */}
      <div
        className="pt-24 pb-12 px-4 md:px-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(179,0,0,0.1), transparent)",
        }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-end gap-6">
          <Avatar src={user.avatar} name={user.name} size={96} />

          <div>
            <h1
              className="text-3xl font-black text-white mb-1"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {user.name}
            </h1>
            <p
              className="text-gray-400 text-sm mb-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {user.email}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide"
                style={{ background: "#B30000" }}
              >
                <Star size={10} /> {planLabel} Plan
              </span>
              {joinedLabel && (
                <span
                  className="text-gray-600 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Member since {joinedLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "My List",  value: watchlist.length, icon: BookmarkCheck },
            { label: "Watched",  value: history.length,   icon: History },
            { label: "Plan",     value: planLabel,        icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl p-4 text-center"
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Icon size={20} className="mx-auto mb-2 text-gray-500" />
              <p
                className="text-white font-bold text-xl"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {typeof value === "number" ? value : value}
              </p>
              <p
                className="text-gray-600 text-xs mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────── */}
        <div
          className="flex border-b mb-8"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {TABS.map((tab) => {
            const Icon = TAB_ICONS[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors mr-2"
                style={{
                  color: activeTab === tab ? "#fff" : "#666",
                  borderBottom:
                    activeTab === tab
                      ? "2px solid #B30000"
                      : "2px solid transparent",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Icon size={15} /> {TAB_LABELS[tab]}
              </button>
            );
          })}
        </div>

        {/* ── Tab Content ──────────────────────────────────────────────── */}
        <div className="pb-16">

          {/* Watchlist */}
          {activeTab === "watchlist" && (
            <div>
              {watchlist.length === 0 ? (
                <div className="text-center py-20">
                  <BookmarkCheck size={48} className="mx-auto mb-4 text-gray-700" />
                  <p className="text-gray-500 text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                    Your list is empty
                  </p>
                  <p className="text-gray-700 text-sm mt-2 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                    Add movies and series to watch later
                  </p>
                  <a
                    href="/movies"
                    className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ background: "#B30000" }}
                  >
                    Browse Movies
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {watchlist.map((item) => (
                    <div key={item.id} className="relative group">
                      <ContentCard item={item} />
                      <button
                        onClick={() => handleRemoveWatchlist(item.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        style={{
                          background: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                        title="Remove from list"
                      >
                        <Trash2 size={12} className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* History */}
          {activeTab === "history" && (
            <div>
              {history.length === 0 ? (
                <div className="text-center py-20">
                  <History size={48} className="mx-auto mb-4 text-gray-700" />
                  <p className="text-gray-500 text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                    No watch history yet
                  </p>
                  <p className="text-gray-700 text-sm mt-2 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                    Start watching to track your progress
                  </p>
                  <a
                    href="/"
                    className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ background: "#B30000" }}
                  >
                    Start Watching
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <a
                      key={item.id}
                      href={`/watch/${item.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <div
                        className="relative flex-shrink-0 rounded-lg overflow-hidden"
                        style={{ width: 120, height: 68 }}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700">
                          <div
                            className="h-full"
                            style={{
                              width: `${item.progress || 0}%`,
                              background: "#B30000",
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-white font-semibold text-sm truncate"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-gray-500 text-xs mt-0.5"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {item.progress || 0}% completed
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "#B30000" }}
                      >
                        <Play size={12} fill="white" /> Resume
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div className="max-w-lg">

              {/* Account info card with live avatar */}
              <div
                className="flex items-center gap-4 p-5 rounded-xl mb-6"
                style={{
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Avatar src={user.avatar} name={user.name} size={56} />
                <div className="min-w-0">
                  <p
                    className="text-white font-bold text-base truncate"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {user.name}
                  </p>
                  <p
                    className="text-gray-500 text-xs truncate mt-0.5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {user.email}
                  </p>
                  {user.isAdmin && (
                    <span
                      className="inline-block mt-1.5 px-2 py-0.5 rounded text-xs font-bold text-white uppercase tracking-wide"
                      style={{ background: "#B30000" }}
                    >
                      Admin
                    </span>
                  )}
                </div>
              </div>

              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {[
                  { label: "Display Name",       value: user.name },
                  { label: "Email",              value: user.email },
                  { label: "Subscription Plan",  value: `${planLabel} Plan` },
                  { label: "Member Since",       value: joinedLabel || "—" },
                  { label: "Language",           value: "English" },
                  { label: "Maturity Settings",  value: "All content" },
                ].map((setting, i, arr) => (
                  <div
                    key={setting.label}
                    className="flex items-center justify-between px-5 py-4"
                    style={{
                      background: "#0f0f0f",
                      borderBottom:
                        i < arr.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                    }}
                  >
                    <div>
                      <p
                        className="text-gray-500 text-xs mb-0.5 uppercase tracking-wide"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {setting.label}
                      </p>
                      <p
                        className="text-white text-sm font-medium"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {setting.value}
                      </p>
                    </div>
                    {/* Only show Edit for editable fields */}
                    {["Display Name", "Email", "Language", "Maturity Settings"].includes(
                      setting.label
                    ) && (
                      <button
                        className="text-xs text-gray-500 hover:text-white transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
                  style={{
                    border: "1px solid rgba(239,68,68,0.2)",
                    background: "rgba(239,68,68,0.05)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <LogOut size={16} /> Sign Out of GoFlix
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}