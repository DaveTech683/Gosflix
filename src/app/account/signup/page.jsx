"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

const PLAN_OPTIONS = [
  { id: "free", label: "Free", desc: "Limited access + ads", price: "$0/mo" },
  // {
  //   id: "standard",
  //   label: "Standard",
  //   desc: "Full HD · 2 screens",
  //   price: "$6.99/mo",
  // },
  // {
  //   id: "premium",
  //   label: "Premium",
  //   desc: "4K · 4 screens · Downloads",
  //   price: "$12.99/mo",
  // },
];

const BENEFITS = [
  "Gospel movies & series",
  "Live worship events",
  "Kids animations",
  "Faith-inspired reels",
  "Cancel anytime",
];

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const { register, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  useEffect(() => {
    document.title = "Join GoFlix — Faith, Family, Entertainment";
    clearError();
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      window.location.href = "/";
    }
  };

  const passwordStrength = () => {
    if (password.length === 0) return null;
    if (password.length < 6)
      return { label: "Weak", color: "#ef4444", width: "33%" };
    if (password.length < 10)
      return { label: "Fair", color: "#f97316", width: "66%" };
    return { label: "Strong", color: "#22c55e", width: "100%" };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen flex relative" style={{ background: "#000" }}>
      {/* Left Panel — Benefits */}
      <div
        className="hidden lg:flex lg:w-2/5 flex-col justify-center px-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0000, #1a0000)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #B30000 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <a href="/" className="flex items-center gap-1 mb-16">
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
          </a>
          <h2
            className="text-3xl font-black text-white mb-3"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Join the GoFlix family.
          </h2>
          <p
            className="text-gray-400 text-sm mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Stream Moral driven, faith-driven, family-safe content anywhere, anytime.
          </p>
          <div className="space-y-4">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(179,0,0,0.2)",
                    border: "1px solid rgba(179,0,0,0.4)",
                  }}
                >
                  <Check size={12} style={{ color: "#ff6666" }} />
                </div>
                <span
                  className="text-gray-300 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div
            className="mt-12 p-5 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-gray-300 text-sm italic leading-relaxed mb-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              "GoFlix transformed our family movie nights. Finally, content we
              trust."
            </p>
            <div className="flex items-center gap-2">
              <img
                src="https://ui-avatars.com/api/?name=Sarah+M&background=B30000&color=fff&size=32"
                alt="Sarah M"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p
                  className="text-white text-xs font-semibold"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Sarah M.
                </p>
                <p
                  className="text-gray-600 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  GoFlix Premium Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 md:py-8">
        {/* Mobile logo */}
        <a
          href="/"
          className="absolute top-6 left-6 flex items-center gap-1 lg:hidden"
        >
          <span
            className="text-xl font-black"
            style={{ fontFamily: "Poppins, sans-serif", color: "#B30000" }}
          >
            Go
          </span>
          <span
            className="text-xl font-black text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Flix
          </span>
        </a>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1
              className="text-2xl md:text-3xl font-black text-white mb-1"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Create your account
            </h1>
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Start streaming in minutes. No credit card required for free plan.
            </p>
          </div>

          {error && (
            <div
              className="px-4 py-3 rounded-lg text-sm text-red-300 mb-5"
              style={{
                background: "rgba(179,0,0,0.12)",
                border: "1px solid rgba(179,0,0,0.25)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Plan selector */}
          <div className="mb-6">
            <p
              className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Choose Your Plan
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PLAN_OPTIONS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className="rounded-xl p-3 text-left transition-all"
                  style={{
                    background:
                      selectedPlan === plan.id ? "rgba(179,0,0,0.2)" : "#111",
                    border:
                      selectedPlan === plan.id
                        ? "1px solid #B30000"
                        : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    className="text-white text-xs font-bold mb-0.5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {plan.label}
                  </p>
                  <p
                    className="text-gray-500 text-[10px] mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {plan.desc}
                  </p>
                  <p
                    className="font-bold text-xs"
                    style={{
                      color: selectedPlan === plan.id ? "#ff6666" : "#777",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {plan.price}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Username"
                className="w-full h-12 pl-11 pr-4 rounded-xl text-white text-sm focus:outline-none"
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

            {/* Email */}
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
                placeholder="Email address"
                className="w-full h-12 pl-11 pr-4 rounded-xl text-white text-sm focus:outline-none"
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

            {/* Password */}
            <div>
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
                  minLength={6}
                  placeholder="Password (min. 6 characters)"
                  className="w-full h-12 pl-11 pr-12 rounded-xl text-white text-sm focus:outline-none"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {strength && (
                <div className="mt-2">
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: "#222" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: strength.width,
                        background: strength.color,
                      }}
                    />
                  </div>
                  <p
                    className="text-xs mt-1"
                    style={{
                      color: strength.color,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {strength.label} password
                  </p>
                </div>
              )}
            </div>

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
                  Start Watching <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p
            className="mt-4 text-center text-xs text-gray-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            .
          </p>

          <p
            className="mt-5 text-center text-sm text-gray-500"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Already have an account?{" "}
            <a
              href="/account/signin"
              className="text-white font-semibold hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
