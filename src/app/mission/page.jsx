"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PILLARS = [
  {
    title: "Inspire Through Stories",
    body: "We believe stories can encourage people, strengthen faith, teach values, and bring hope. Our mission is to make meaningful entertainment easier to find and enjoy.",
    icon: "✨",
  },
  {
    title: "Support Gospel Creativity",
    body: "GoPremiere exists to support filmmakers, ministries, storytellers, and creators who are producing faith-based, inspirational, and family-conscious content.",
    icon: "🎬",
  },
  {
    title: "Build a Safe Viewing Space",
    body: "We want GoPremiere to be a platform where individuals, families, and communities can enjoy content with confidence, purpose, and peace of mind.",
    icon: "🛡️",
  },
  {
    title: "Make Quality Content Accessible",
    body: "Our goal is to make gospel movies, series, reels, live events, and uplifting media available across web and mobile for viewers everywhere.",
    icon: "🌍",
  },
];

const GOALS = [
  "Create a trusted home for gospel and inspirational entertainment.",
  "Help viewers discover movies, series, reels, and live content that align with their values.",
  "Give Christian creators and partners a platform to reach the right audience.",
  "Promote stories that encourage hope, faith, love, family, purpose, and positive change.",
  "Build a modern streaming experience that is simple, smooth, and accessible.",
  "Support responsible content distribution and protect creative ownership.",
];

export default function Mission() {
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
            <span className="text-4xl">🎯</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-5">
            Our Mission
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto leading-8 text-base md:text-lg">
            Our mission is to build a trusted streaming platform where
            faith-friendly, inspirational, and family-conscious stories can be
            discovered, shared, and enjoyed by people everywhere.
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
            Why We Exist
          </p>

          <h2 className="text-2xl md:text-4xl font-extrabold mb-5 leading-tight">
            To make meaningful entertainment accessible to everyone.
          </h2>

          <p className="text-gray-300 leading-8 mb-5">
            GoPremiere was created with a simple belief: entertainment should not
            only capture attention, it should also inspire, uplift, and speak to
            the heart. We want to create a place where viewers can find stories
            that reflect faith, hope, purpose, family, courage, and positive
            values.
          </p>

          <p className="text-gray-400 leading-8">
            Whether someone is watching a gospel movie, following a series,
            enjoying short reels, or joining a live event, our goal is to make
            the experience simple, meaningful, and worth returning to.
          </p>
        </section>

        <section className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              Our Mission Pillars
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-7">
              These are the values that guide what we are building and how we
              want GoPremiere to serve viewers, creators, and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl p-6"
                style={{
                  background: "#0e0e0e",
                  border: "1px solid #1a1a1a",
                }}
              >
                <div className="text-3xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-400 leading-7">{pillar.body}</p>
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
            What We Are Working Toward
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GOALS.map((goal) => (
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

        <section
          className="rounded-3xl p-6 md:p-10 mb-14"
          style={{
            background:
              "linear-gradient(135deg, rgba(229,9,20,0.12), rgba(14,14,14,1))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-5">
            For Viewers, Families, and Communities
          </h2>

          <p className="text-gray-400 leading-8 mb-5">
            We want GoPremiere to become a place where people can confidently search
            for content that aligns with their values. Our mission is to serve
            viewers who want entertainment that feels uplifting, intentional,
            and suitable for meaningful moments.
          </p>

          <p className="text-gray-400 leading-8">
            From personal inspiration to family movie nights, GoPremiere is being
            built to support content discovery that goes beyond ordinary
            streaming.
          </p>
        </section>

        <section
          className="rounded-3xl p-6 md:p-10 mb-14"
          style={{
            background: "#0e0e0e",
            border: "1px solid #1a1a1a",
          }}
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-5">
            For Creators and Storytellers
          </h2>

          <p className="text-gray-400 leading-8 mb-5">
            GoPremiere also exists to create more opportunities for gospel
            filmmakers, Christian creatives, ministries, churches, and
            inspirational storytellers. We want creators to have a platform
            where their work can be discovered by audiences who value it.
          </p>

          <p className="text-gray-400 leading-8">
            Our mission includes helping meaningful stories travel further,
            reach the right people, and contribute to a stronger creative
            ecosystem for faith-based media.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
            A Platform Built With Purpose
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto leading-8 mb-8">
            GoPremiere is not just about watching content. It is about creating a
            home for stories that inspire faith, encourage families, uplift
            communities, and give creators a place to share meaningful work.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/movies"
              className="px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #B30000, #e50914)",
              }}
            >
              Start Watching
            </a>

            <a
              href="/about"
              className="px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Learn About GoPremiere
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}