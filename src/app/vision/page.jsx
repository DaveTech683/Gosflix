"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const VISION_POINTS = [
  {
    title: "A Global Home for Faith-Based Entertainment",
    body: "Our vision is for GoPremiere to become a trusted destination where people around the world can discover gospel movies, inspirational series, uplifting reels, live events, and family-conscious stories in one place.",
    icon: "🌍",
  },
  {
    title: "A Platform That Inspires Generations",
    body: "We want GoPremiere to be more than a streaming app. We want it to become a platform that inspires faith, strengthens families, encourages communities, and helps meaningful stories live beyond the screen.",
    icon: "✨",
  },
  {
    title: "A Stronger Future for Christian Creators",
    body: "We envision a future where gospel filmmakers, ministries, churches, writers, actors, and creators have a powerful platform to share their work with audiences who value their message.",
    icon: "🎬",
  },
  {
    title: "Safe, Purposeful, and Modern Streaming",
    body: "Our vision is to combine the quality and convenience of modern streaming with content that reflects purpose, hope, values, and positive impact.",
    icon: "🛡️",
  },
];

const FUTURE_GOALS = [
  "Expand access to gospel and inspirational entertainment across countries and communities.",
  "Build a strong content library of movies, series, reels, documentaries, live programmes, and original productions.",
  "Create opportunities for Christian creatives, ministries, and storytellers to reach wider audiences.",
  "Support families with a safer and more value-conscious streaming experience.",
  "Use technology to make content discovery, playback, recommendations, and mobile viewing simple and enjoyable.",
  "Become one of the leading platforms for faith-friendly digital entertainment.",
];

const IMPACT_AREAS = [
  {
    title: "For Families",
    body: "A place where households can find meaningful content for movie nights, conversations, learning, and encouragement.",
  },
  {
    title: "For Creators",
    body: "A platform that helps creators distribute stories, reach viewers, and build a stronger gospel entertainment ecosystem.",
  },
  {
    title: "For Communities",
    body: "A digital space where churches, ministries, groups, and communities can connect through uplifting stories and live experiences.",
  },
];

export default function Vision() {
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
            <span className="text-4xl">🚀</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-5">
            Our Vision
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto leading-8 text-base md:text-lg">
            Our vision is to make GoPremiere a leading home for faith-friendly,
            inspirational, and family-conscious entertainment — a platform where
            stories of hope, purpose, and faith can reach people everywhere.
          </p>
        </section>

        <section
          className="rounded-3xl p-6 md:p-10 mb-14"
          style={{
            background:
              "linear-gradient(135deg, rgba(179,0,0,0.25), rgba(14,14,14,1))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            className="text-sm font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: "#e50914" }}
          >
            The Future We See
          </p>

          <h2 className="text-2xl md:text-4xl font-extrabold mb-5 leading-tight">
            A world where meaningful stories are easier to find, watch, and share.
          </h2>

          <p className="text-gray-300 leading-8 mb-5">
            We imagine a future where viewers do not have to search endlessly to
            find entertainment that aligns with their values. GoPremiere is being
            built to become a trusted digital home for content that encourages,
            teaches, entertains, and uplifts.
          </p>

          <p className="text-gray-400 leading-8">
            Our vision is to connect audiences with powerful stories and give
            creators a platform where faith-based and inspirational content can
            grow, travel, and make lasting impact.
          </p>
        </section>

        <section className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              What We Are Building Toward
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-7">
              GoPremiere is focused on building a future where entertainment is not
              only accessible, but also meaningful, safe, and purpose-driven.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VISION_POINTS.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl p-6"
                style={{
                  background: "#0e0e0e",
                  border: "1px solid #1a1a1a",
                }}
              >
                <div className="text-3xl mb-4">{point.icon}</div>
                <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                <p className="text-gray-400 leading-7">{point.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-3xl p-6 md:p-10 mb-14"
          style={{
            background: "#0e0e0e",
            border: "1px solid #1a1a1a",
          }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
            Our Long-Term Goals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FUTURE_GOALS.map((goal) => (
              <div
                key={goal}
                className="rounded-xl px-4 py-4 text-gray-300 leading-7"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {goal}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              The Impact We Want to Make
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-7">
              Our vision reaches beyond the screen. We want GoPremiere to serve
              viewers, families, creators, and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {IMPACT_AREAS.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(229,9,20,0.10), rgba(14,14,14,1))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                <p className="text-gray-400 leading-7">{area.body}</p>
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
            A Digital Future for Gospel Entertainment
          </h2>

          <p className="text-gray-400 leading-8 mb-5">
            We believe gospel and inspirational entertainment deserves a strong
            digital future. GoPremiere is part of that future — a platform designed
            to help valuable stories reach more people through technology,
            creativity, and intentional distribution.
          </p>

          <p className="text-gray-400 leading-8">
            As GoPremiere grows, our vision is to keep improving the viewing
            experience, expanding the content library, supporting creators, and
            building a platform that people trust.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
            The Vision Is Bigger Than Streaming
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto leading-8 mb-8">
            We are building GoPremiere to become a movement for meaningful media —
            a place where faith, creativity, technology, and storytelling work
            together to inspire people across the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/movies"
              className="px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #B30000, #e50914)",
              }}
            >
              Explore GoPremiere
            </a>

            <a
              href="/mission"
              className="px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Read Our Mission
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}