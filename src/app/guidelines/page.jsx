"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const LAST_UPDATED = "May 10, 2026";

const SECTIONS = [
  {
    title: "Our Community Standard",
    body: "GoFlix is built to be a safe, respectful, faith-friendly, and family-conscious entertainment platform. Users are expected to treat others with respect, avoid harmful behaviour, and use the platform in a way that supports a positive viewing experience for everyone.",
  },
  {
    title: "Respect Other Users",
    body: "Do not harass, threaten, insult, bully, intimidate, impersonate, or target other users. If GoFlix allows comments, reviews, reactions, profiles, or community features, users must communicate respectfully and avoid abusive or harmful language.",
  },
  {
    title: "No Hate Speech or Discrimination",
    body: "Content or behaviour that promotes hatred, violence, humiliation, or discrimination against people based on race, ethnicity, nationality, religion, gender, disability, age, or other protected characteristics is not allowed.",
  },
  {
    title: "No Violence, Threats, or Harmful Conduct",
    body: "Users must not post, encourage, or promote violent threats, dangerous behaviour, criminal activity, self-harm, exploitation, or any form of abuse. Content that creates a safety risk to users or the public may be removed.",
  },
  {
    title: "Keep Content Appropriate",
    body: "GoFlix may host content for different audiences. Users should avoid posting or sharing sexually explicit, excessively violent, misleading, illegal, or harmful material. Parents and guardians are responsible for supervising children’s viewing activity.",
  },
  {
    title: "No Spam or Misleading Activity",
    body: "Do not post spam, scams, fake promotions, phishing links, misleading information, repetitive comments, fake engagement, or anything designed to deceive users or manipulate GoFlix features.",
  },
  {
    title: "Respect Copyright and Ownership",
    body: "Only upload, post, share, or submit content that you own or have permission to use. Do not copy, record, redistribute, download, resell, or share GoFlix content outside the platform unless GoFlix clearly allows it.",
  },
  {
    title: "No Account Misuse",
    body: "Do not share your login details with unauthorised people, sell account access, bypass subscriptions, create fake accounts, abuse free trials, evade bans, or use another person’s account without permission.",
  },
  {
    title: "Platform Security",
    body: "Do not attempt to hack, disrupt, overload, reverse engineer, scrape, bypass security controls, interfere with video protections, or access private parts of GoFlix systems. Any attempt to damage or misuse the platform may lead to account suspension or legal action.",
  },
  {
    title: "Comments and User Interactions",
    body: "If GoFlix provides comment sections, reviews, likes, saves, shares, or other interactive features, users must use them honestly and respectfully. We may remove comments or interactions that are abusive, spammy, misleading, hateful, or harmful.",
  },
  {
    title: "Profile and Display Names",
    body: "Users should not use names, profile photos, or descriptions that impersonate others, mislead users, contain offensive language, promote scams, or violate another person’s rights.",
  },
  {
    title: "Reporting Problems",
    body: "If you see content, comments, users, or activity that appears harmful, abusive, illegal, misleading, or against these guidelines, you may contact GoFlix support. Reports help us keep the platform safe and improve the community experience.",
  },
  {
    title: "Content Moderation",
    body: "GoFlix may review, remove, restrict, hide, or disable access to content, comments, profiles, or accounts that violate these guidelines, our Terms of Service, our Privacy Policy, or applicable law.",
  },
  {
    title: "Account Enforcement",
    body: "Violating these guidelines may result in warnings, content removal, feature restrictions, temporary suspension, permanent account termination, or other enforcement actions depending on the seriousness and frequency of the violation.",
  },
  {
    title: "Family and Faith-Friendly Use",
    body: "GoFlix aims to support uplifting and meaningful entertainment. Users should avoid behaviour that damages the experience for families, faith-based viewers, creators, and other members of the community.",
  },
  {
    title: "Live Events and Reels",
    body: "For live events, reels, short videos, or interactive content, users must not disrupt broadcasts, post harmful comments, spread false information, harass creators, or encourage unsafe behaviour. GoFlix may moderate live or short-form content to protect viewers.",
  },
  {
    title: "Creator and Partner Guidelines",
    body: "Creators, partners, or content providers working with GoFlix must ensure they have the necessary rights to their content and that their content follows platform standards. Content that violates ownership rights, safety rules, or community standards may be rejected or removed.",
  },
  {
    title: "Appeals and Reviews",
    body: "If your content or account is restricted and you believe it was a mistake, you may contact GoFlix support for review. GoFlix may review appeals at its discretion, but not all enforcement decisions may be reversed.",
  },
  {
    title: "Changes to These Guidelines",
    body: "GoFlix may update these guidelines from time to time to improve safety, comply with legal requirements, or respond to new platform features. Continued use of GoFlix after changes means you agree to follow the updated guidelines.",
  },
  {
    title: "Contact Us",
    body: "If you have questions about these Community Guidelines or need to report an issue, contact us at support@goflix.app.",
  },
];

export default function Guidelines() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-12 max-w-5xl mx-auto text-white">
        <section className="text-center mb-12">
          <div
            className="mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{
              width: 72,
              height: 72,
              background: "rgba(229,9,20,0.12)",
              border: "1px solid rgba(229,9,20,0.25)",
            }}
          >
            <span className="text-3xl">🛡️</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Community Guidelines
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-7">
            These guidelines explain how users should behave on GoFlix so the
            platform remains safe, respectful, family-conscious, and enjoyable
            for everyone.
          </p>

          <p className="mt-5 text-sm text-gray-500">
            Last updated: {LAST_UPDATED}
          </p>
        </section>

        <section className="space-y-5">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl p-6"
              style={{
                background: "#0e0e0e",
                border: "1px solid #1a1a1a",
              }}
            >
              <h2 className="text-xl font-bold mb-3">{section.title}</h2>
              <p className="text-gray-400 leading-7">{section.body}</p>
            </div>
          ))}
        </section>

        <section className="text-center mt-12 text-sm text-gray-500">
          <p>
            Questions? Contact us at{" "}
            <span style={{ color: "#e50914", fontWeight: 600 }}>
              abiolad267@gmail.com
            </span>
          </p>
          <p className="mt-3 text-gray-700">
            © 2026 GoFlix. All rights reserved.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}