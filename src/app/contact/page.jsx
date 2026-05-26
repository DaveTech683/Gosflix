"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CONTACT_OPTIONS = [
  {
    title: "General Support",
    description: "Questions about your account, login, subscriptions, or using GoFlix.",
    contact: "goserviceofficial@hotmail.com",
    icon: "🎧",
  },
  {
    title: "Privacy Requests",
    description: "Questions about your data, privacy rights, account deletion, or personal information.",
    contact: "goserviceofficial@hotmail.com",
    icon: "🔒",
  },
  {
    title: "Content & Partnerships",
    description: "For filmmakers, churches, studios, creators, or partners who want to work with GoFlix.",
    contact: "goserviceofficial@hotmail.com",
    icon: "🎬",
  },
  {
    title: "Report a Problem",
    description: "Report bugs, playback issues, payment issues, harmful content, or platform abuse.",
    contact: "goserviceofficial@hotmail.com",
    icon: "⚠️",
  },
];

const FAQS = [
  {
    question: "I cannot log in. What should I do?",
    answer:
      "Check that your email and password are correct. If the issue continues, contact support with your registered email address and a short description of the problem.",
  },
  {
    question: "A video is not playing properly.",
    answer:
      "Try refreshing the page, checking your internet connection, or switching browsers. If the issue continues, send us the content title, device type, and what error you are seeing.",
  },
  {
    question: "How do I request account deletion?",
    answer:
      "Send a request to goserviceofficial@hotmail.com using the email connected to your GoFlix account. We may need to verify ownership before deleting account data.",
  },
  {
    question: "How can I submit content to GoFlix?",
    answer:
      "Creators, filmmakers, ministries, and partners can contact goserviceofficial@hotmail.com with details about the content, ownership rights, and distribution interest.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Support",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailSubject = encodeURIComponent(
      `[${form.category}] ${form.subject || "GoFlix Contact Request"}`
    );

    const mailBody = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCategory: ${form.category}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:goserviceofficial@hotmail.com
Outlook.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-12 max-w-6xl mx-auto text-white">
        <section className="text-center mb-14">
          <div
            className="mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{
              width: 72,
              height: 72,
              background: "rgba(229,9,20,0.12)",
              border: "1px solid rgba(229,9,20,0.25)",
            }}
          >
            <span className="text-3xl">📩</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Contact GoFlix
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-7">
            Need help with your account, streaming, privacy, subscriptions, or
            partnerships? Send us a message and the right team will get back to
            you.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {CONTACT_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl p-5"
              style={{
                background: "#0e0e0e",
                border: "1px solid #1a1a1a",
              }}
            >
              <div className="text-3xl mb-4">{option.icon}</div>
              <h2 className="text-lg font-bold mb-2">{option.title}</h2>
              <p className="text-gray-400 text-sm leading-6 mb-4">
                {option.description}
              </p>
              <p style={{ color: "#e50914", fontWeight: 600 }}>
                {option.contact}
              </p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: "#0e0e0e",
              border: "1px solid #1a1a1a",
            }}
          >
            <h2 className="text-2xl font-bold mb-3">Send us a message</h2>
            <p className="text-gray-400 leading-7 mb-6">
              Fill the form below. It will open your email app with the message
              already prepared.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl px-4 py-3 bg-black text-white outline-none"
                  style={{ border: "1px solid #222" }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl px-4 py-3 bg-black text-white outline-none"
                  style={{ border: "1px solid #222" }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 bg-black text-white outline-none"
                  style={{ border: "1px solid #222" }}
                >
                  <option>General Support</option>
                  <option>Login Issue</option>
                  <option>Playback Issue</option>
                  <option>Subscription or Payment</option>
                  <option>Privacy Request</option>
                  <option>Content Partnership</option>
                  <option>Report Abuse</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="w-full rounded-xl px-4 py-3 bg-black text-white outline-none"
                  style={{ border: "1px solid #222" }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Explain the issue or request..."
                  required
                  rows={6}
                  className="w-full rounded-xl px-4 py-3 bg-black text-white outline-none resize-none"
                  style={{ border: "1px solid #222" }}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl py-3 font-bold text-white transition-transform hover:scale-[1.01]"
                style={{
                  background: "linear-gradient(135deg, #B30000, #e50914)",
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "#0e0e0e",
                border: "1px solid #1a1a1a",
              }}
            >
              <h2 className="text-2xl font-bold mb-4">Contact Details</h2>

              <div className="space-y-4 text-gray-400">
                <div>
                  <p className="text-white font-semibold mb-1">Support Email</p>
                  <p style={{ color: "#e50914" }}>goserviceofficial@hotmail.com
Outlook.com</p>
                </div>

                <div>
                  <p className="text-white font-semibold mb-1">Privacy Email</p>
                  <p style={{ color: "#e50914" }}>goserviceofficial@hotmail.com
Outlook.com</p>
                </div>

                <div>
                  <p className="text-white font-semibold mb-1">
                    Partnership Email
                  </p>
                  <p style={{ color: "#e50914" }}>goserviceofficial@hotmail.com
Outlook.com</p>
                </div>

                <div>
                  <p className="text-white font-semibold mb-1">Response Time</p>
                  <p>
                    We aim to respond as soon as possible. Complex account,
                    payment, or privacy requests may take longer to review.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "#0e0e0e",
                border: "1px solid #1a1a1a",
              }}
            >
              <h2 className="text-2xl font-bold mb-4">Before you contact us</h2>

              <div className="space-y-4">
                {FAQS.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-white font-semibold mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-400 leading-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}