"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const VALUES = [
  {
    title: "Faith-Friendly Entertainment",
    body: "GoPremiere is built for viewers who want meaningful, uplifting, and value-driven entertainment they can enjoy alone, with friends, or with family.",
    icon: "✨",
  },
  {
    title: "Movies, Series, Reels & Live Content",
    body: "We bring together gospel movies, inspirational series, short-form reels, live events, and family-safe content in one simple streaming experience.",
    icon: "🎬",
  },
  {
    title: "Created for Modern Viewers",
    body: "GoPremiere is designed to work across web and mobile, giving users a smooth way to discover, watch, save, and continue content wherever they are.",
    icon: "📱",
  },
  {
    title: "Supporting Christian Creators",
    body: "We aim to create a platform where filmmakers, ministries, storytellers, and creators can reach audiences who value faith-based and purposeful content.",
    icon: "🤝",
  },
];

const FEATURES = [
  "Gospel movies and inspirational films",
  "Christian series and family-focused shows",
  "Short reels for quick uplifting content",
  "Live events and special broadcasts",
  "Watchlist and continue-watching features",
  "Personalised recommendations",
  "Mobile and web access",
  "Safe, respectful, and family-conscious platform",
];

export default function About() {
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
            <span className="text-4xl">🎥</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-5">
            About GoPremiere
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto leading-8 text-base md:text-lg">
            GoPremiere is a faith-friendly streaming platform created to make
            gospel movies, inspirational series, uplifting reels, live events,
            and family-conscious entertainment easier to discover and enjoy.
          </p>
        </section>

        <section
          className="rounded-3xl p-6 md:p-10 mb-14"
          style={{
            background:
              "linear-gradient(135deg, rgba(179,0,0,0.22), rgba(14,14,14,1))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "#e50914" }}>
                Our Mission
              </p>

              <h2 className="text-2xl md:text-4xl font-extrabold mb-5 leading-tight">
                To build a home for meaningful stories.
              </h2>

              <p className="text-gray-300 leading-8 mb-5">
                We believe entertainment can be more than just something to pass
                time. It can inspire, teach, encourage, strengthen faith, and
                bring people together. GoPremiere exists to make that kind of
                content more accessible.
              </p>

              <p className="text-gray-400 leading-8">
                Whether you are watching a movie, catching a live programme,
                enjoying short reels, or discovering a new series, our goal is
                to give you a clean and enjoyable experience built around
                purpose-driven content.
              </p>
            </div>

            <div
              className="rounded-3xl p-6"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 className="text-xl font-bold mb-4">What GoPremiere Offers</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-xl px-4 py-3 text-sm text-gray-300"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              What We Stand For
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-7">
              GoPremiere is built around values that matter to our viewers,
              creators, families, and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl p-6"
                style={{
                  background: "#0e0e0e",
                  border: "1px solid #1a1a1a",
                }}
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-7">{value.body}</p>
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
          <h2 className="text-2xl md:text-4xl font-extrabold mb-5">
            For Viewers
          </h2>

          <p className="text-gray-400 leading-8 mb-5">
            GoPremiere gives viewers a place to find content that aligns with faith,
            family, and positive values. We want users to enjoy a streaming
            experience that feels simple, modern, and intentional.
          </p>

          <p className="text-gray-400 leading-8">
            From powerful stories to short uplifting clips, we are building a
            library that helps people discover content worth watching.
          </p>
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
            For Creators and Partners
          </h2>

          <p className="text-gray-400 leading-8 mb-5">
            GoPremiere is also a platform for creators, filmmakers, churches,
            ministries, and content partners who want their stories to reach the
            right audience.
          </p>

          <p className="text-gray-400 leading-8">
            We aim to support quality storytelling, responsible distribution,
            and a stronger ecosystem for gospel and inspirational content.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
            Built with Purpose
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto leading-8 mb-8">
            GoPremiere is more than a streaming app. It is a growing platform for
            stories that encourage, inspire, and connect people through
            meaningful entertainment.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/movies"
              className="px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #B30000, #e50914)",
              }}
            >
              Explore Movies
            </a>

            <a
              href="/contact"
              className="px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}