"use client";
import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

export default function SignInPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const redirected = useRef(false); // guard against double-navigation

  const { login, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  // If already authenticated (e.g. user navigated back to /signin), redirect away
  useEffect(() => {
    if (redirected.current || !isAuthenticated) return;
    redirected.current = true;
    const params = new URLSearchParams(window.location.search);
    window.location.href = params.get("callbackUrl") || "/";
  }, [isAuthenticated]);

  useEffect(() => {
    document.title = "Sign In — GoFlix";
    clearError();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || redirected.current) return;

    const result = await login(email, password);
    if (result.success && !redirected.current) {
      redirected.current = true;
      const params = new URLSearchParams(window.location.search);
      window.location.href = params.get("callbackUrl") || "/";
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ background: "#000" }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=60"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(0,0,0,0.95), rgba(10,0,0,0.85))",
          }}
        />
      </div>

      {/* Logo */}
      <a href="/" className="absolute top-8 left-8 flex items-center gap-1">
        <span
          className="text-2xl font-black"
          style={{ fontFamily: "Poppins, sans-serif", color: "#B30000" }}
        >
          Go
        </span>
        <span
          className="text-2xl font-black text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Flix
        </span>
      </a>

      {/* Form card */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8 md:p-10"
        style={{
          background: "rgba(10,10,10,0.92)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="mb-8">
          <h1
            className="text-3xl font-black text-white mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Welcome back
          </h1>
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Sign in to continue watching
          </p>
        </div>

        {error && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-red-300 mb-6"
            style={{
              background: "rgba(179,0,0,0.15)",
              border: "1px solid rgba(179,0,0,0.3)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full h-12 pl-11 pr-4 rounded-xl text-white text-sm focus:outline-none transition-all"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "Inter, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(179,0,0,0.6)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full h-12 pl-11 pr-12 rounded-xl text-white text-sm focus:outline-none transition-all"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "Inter, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(179,0,0,0.6)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* <div className="flex justify-end mt-1">
              <a
                href="/account/reset-password"
                className="text-xs text-gray-500 hover:text-white transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Forgot password?
              </a>
            </div> */}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "#B30000", fontFamily: "Inter, sans-serif" }}
          >
            {isLoading ? (
              <div
                className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                style={{ animation: "spin 0.7s linear infinite" }}
              />
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Sign up link */}
        <p
          className="mt-6 text-center text-sm text-gray-500"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Don't have an account?{" "}
          <a
            href="/account/signup"
            className="text-white font-semibold hover:underline"
          >
            Join GoFlix free
          </a>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}