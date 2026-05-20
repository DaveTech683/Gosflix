"use client";
import { useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";

export default function LogoutPage() {
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#000" }}
    >
      <div className="flex items-center gap-1 mb-8">
        <span
          className="text-3xl font-black"
          style={{ fontFamily: "Poppins, sans-serif", color: "#B30000" }}
        >
          Go
        </span>
        <span
          className="text-3xl font-black text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Flix
        </span>
      </div>
      <div
        className="w-10 h-10 rounded-full border-2 border-[#B30000] border-t-transparent mb-6"
        style={{ animation: "spin 0.8s linear infinite" }}
      />
      <p
        className="text-gray-400 text-sm"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Signing you out...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
