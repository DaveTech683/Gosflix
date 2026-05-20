"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  BookmarkCheck,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Series", href: "/series" },
  { label: "Kids", href: "/kids" },
  { label: "Live", href: "/live" },
  { label: "Reels", href: "/reels" },
  { label: "Get Mobile App", href: "#mobile-app" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuthStore();
  const currentPath = usePathname();
  const [appModalOpen, setAppModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "linear-gradient(to bottom, #000000f0, #000000cc)"
            : "linear-gradient(to bottom, #000000cc, transparent)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div
              className="flex items-center gap-1"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span
                className="text-2xl md:text-3xl font-black tracking-tight"
                style={{ color: "#B30000" }}
              >
                Go
              </span>
              <span className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Flix
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 ml-8">
            {NAV_LINKS.map((link) => {
            const isMobileApp = link.label === "Get Mobile App";

            return isMobileApp ? (
              <button
                key={link.href}
                onClick={() => setAppModalOpen(true)}
                className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium transition-colors duration-200 rounded"
                style={{
                  color: currentPath === link.href ? "#ffffff" : "#AAAAAA",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.target.style.color =
                    currentPath === link.href ? "#ffffff" : "#AAAAAA")
                }
              >
                {link.label}
              </a>
            );
          })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search */}
            <div ref={searchRef} className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles..."
                    className="w-48 md:w-64 h-8 px-3 text-sm bg-black border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                  <button
                    type="submit"
                    className="ml-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Search size={18} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="hidden md:flex p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ background: "#B30000" }}
              />
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 group"
                >
                  <img
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=B30000&color=fff&size=32`
                    }
                    alt={user?.name}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                  <ChevronDown
                    size={14}
                    className="text-gray-400 hidden md:block transition-transform duration-200"
                    style={{
                      transform: profileOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>
                {profileOpen && (
                  <div
                    className="absolute right-0 top-12 w-52 rounded-lg overflow-hidden shadow-2xl border"
                    style={{
                      background: "#1a1a1a",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      className="px-4 py-3 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <p className="text-white text-sm font-semibold truncate">
                        {user?.name}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {user?.email}
                      </p>
                      <span
                        className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide text-white"
                        style={{ background: "#B30000" }}
                      >
                        {user?.plan}
                      </span>
                    </div>
                    <div className="py-1">
                      <a
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <User size={15} /> My Profile
                      </a>
                      <a
                        href="/watchlist"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <BookmarkCheck size={15} /> My List
                      </a>
                      <a
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Settings size={15} /> Settings
                      </a>
                      <div
                        className="border-t my-1"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      />
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/account/signin"
                  className="hidden md:block px-4 py-1.5 text-sm font-medium text-white hover:text-gray-300 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  className="px-4 py-1.5 text-sm font-semibold text-white rounded transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "#B30000",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Join Free
                </a>
              </div>
            )}

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
{mobileOpen && (
  <div
    className="md:hidden border-t"
    style={{
      background: "#0a0a0a",
      borderColor: "rgba(255,255,255,0.08)",
    }}
  >
    <div className="px-4 py-3 space-y-1">
      {NAV_LINKS.map((link) => {
        const isMobileApp = link.label === "Get Mobile App";

        return isMobileApp ? (
          <button
            key={link.href}
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setAppModalOpen(true);
            }}
            className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
            style={{
              color: "#AAAAAA",
              background: "transparent",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {link.label}
          </button>
        ) : (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: currentPath === link.href ? "#ffffff" : "#AAAAAA",
              background:
                currentPath === link.href
                  ? "rgba(179,0,0,0.15)"
                  : "transparent",
              fontFamily: "Inter, sans-serif",
            }}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  </div>
)}
        {appModalOpen && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="bg-[#111] border border-gray-700 rounded-xl p-6 w-[90%] max-w-sm text-center">
      
      <h2 className="text-white text-lg font-semibold mb-4">
        Download Mobile App
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        Choose your device
      </p>

      <div className="flex flex-col gap-3">
        
        {/* Android Button */}
        <button
          onClick={() => {
            const apkUrl = "https://github.com/DaveTech683/Goflix_website/releases/download/v1.0.0/goflix.apk"; // 🔥 CHANGE THIS
            window.location.href = apkUrl;
            setAppModalOpen(false);
          }}
          className="w-full py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Android
        </button>

        {/* iPhone Button */}
        <button
          onClick={() => {
            alert("Will be available soon, Check back in 6 months");
            setAppModalOpen(false);
          }}
          className="w-full py-2 rounded bg-gray-700 text-white font-semibold hover:bg-gray-600 transition"
        >
          iPhone
        </button>

        {/* Cancel */}
        <button
          onClick={() => setAppModalOpen(false)}
          className="text-gray-400 text-sm mt-2 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
      </nav>
    </>
  );
}