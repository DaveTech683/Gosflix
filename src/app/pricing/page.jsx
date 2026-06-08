"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const FEATURES = [
  "Unlimited access during the free viewing period",
  "Watch gospel movies, series, reels, and selected live content",
  "No subscription required during the limited free access window",
  "Create an account and start watching instantly",
  "Subscription plans will be introduced after the free trial period",
  "Early users may receive special launch offers when subscriptions begin",
];

const FUTURE_PLANS = [
  {
    name: "Free Trial Access",
    price: "Free",
    badge: "Available Now",
    description:
      "Enjoy GoPremiere free for a limited time while we continue improving the platform and expanding our content library.",
    features: [
      "Watch available movies and series",
      "Access selected reels and live content",
      "Create and manage your account",
      "Save content to your watchlist",
      "Continue watching supported titles",
    ],
    active: true,
  },
  {
    name: "Premium Subscription",
    price: "Coming Soon",
    badge: "After Trial",
    description:
      "Subscription access will be activated after the free trial period, giving users continued access to premium GoPremiere content.",
    features: [
      "Premium gospel movies and series",
      "Exclusive content releases",
      "Improved recommendations",
      "More live events and special programmes",
      "Better streaming experience across devices",
    ],
    active: false,
  },
];

export default function Pricing() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-12 max-w-6xl mx-auto text-white">
        <section className="text-center mb-16">
          <div
            className="mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{
              width: 76,
              height: 76,
              background: "rgba(229,9,20,0.12)",
              border: "1px solid rgba(229,9,20,0.25)",
            }}
          >
            <span className="text-4xl">🎟️</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-5">
            GoPremiere Pricing
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto leading-8 text-base md:text-lg">
            GoPremiere is currently free to watch for a limited time. Enjoy access
            during our free viewing period before subscriptions are activated
            after the trial phase.
          </p>
        </section>

        <section
          className="rounded-3xl p-6 md:p-10 mb-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(179,0,0,0.28), rgba(14,14,14,1))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            className="text-sm font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: "#e50914" }}
          >
            Limited-Time Free Access
          </p>

          <h2 className="text-2xl md:text-4xl font-extrabold mb-5 leading-tight">
            Watch GoPremiere free during our launch trial.
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto leading-8 mb-8">
            We are giving viewers free access for a limited period while GoPremiere
            grows. This allows you to explore our movies, series, reels, and
            platform features before paid subscriptions are introduced.
          </p>

          <a
            href="/movies"
            className="inline-flex px-7 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #B30000, #e50914)",
            }}
          >
            Start Watching Free
          </a>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {FUTURE_PLANS.map((plan) => (
            <div
              key={plan.name}
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: plan.active
                  ? "linear-gradient(135deg, rgba(229,9,20,0.16), rgba(14,14,14,1))"
                  : "#0e0e0e",
                border: plan.active
                  ? "1px solid rgba(229,9,20,0.35)"
                  : "1px solid #1a1a1a",
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-2xl font-extrabold">{plan.name}</h2>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: plan.active
                      ? "rgba(229,9,20,0.18)"
                      : "rgba(255,255,255,0.08)",
                    color: plan.active ? "#ff6b6b" : "#aaa",
                    border: plan.active
                      ? "1px solid rgba(229,9,20,0.35)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {plan.badge}
                </span>
              </div>

              <p className="text-4xl font-black mb-4">{plan.price}</p>

              <p className="text-gray-400 leading-7 mb-6">
                {plan.description}
              </p>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span style={{ color: "#e50914" }}>✓</span>
                    <p className="text-gray-300 leading-6">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section
          className="rounded-3xl p-6 md:p-10 mb-14"
          style={{
            background: "#0e0e0e",
            border: "1px solid #1a1a1a",
          }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
            What You Get During Free Access
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature}
                className="rounded-xl px-4 py-4 text-gray-300 leading-7"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-3xl p-6 md:p-10 mb-14"
          style={{
            background:
              "linear-gradient(135deg, rgba(229,9,20,0.12), rgba(14,14,14,1))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-5">
            Subscription Coming After the Trial
          </h2>

          <p className="text-gray-400 leading-8 mb-5">
            GoPremiere will introduce subscription plans after the free trial period.
            This will help us continue improving the platform, expanding the
            content library, supporting creators, and delivering a better
            streaming experience.
          </p>

          <p className="text-gray-400 leading-8">
            Before subscriptions are activated, users will be informed about the
            available plans, pricing, billing terms, and any special launch
            offers.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
            Start Watching Before Paid Plans Begin
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto leading-8 mb-8">
            This is the best time to explore GoPremiere. Create your account, enjoy
            the free access period, and experience faith-friendly entertainment
            before subscriptions go live.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/movies"
              className="px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #B30000, #e50914)",
              }}
            >
              Watch Free Now
            </a>

            <a
              href="/account/signup"
              className="px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Create Account
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}