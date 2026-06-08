import { Heart } from "lucide-react";

const FOOTER_LINKS = {
  Company: [
    { label: "About GoPremiere", href: "/about" },
    { label: "Our Mission", href: "/mission" },
    { label: "Vision", href: "/vision" },
    // { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Account", href: "/profile" },
    { label: "Plans & Pricing", href: "/pricing" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Community Guidelines", href: "/guidelines" },
  ],
  Watch: [
    { label: "Movies", href: "/movies" },
    { label: "Series", href: "/series" },
    { label: "Kids", href: "/kids" },
    { label: "Live Events", href: "/live" },
  ],
};

const SOCIAL_LINKS = [
  { name: "Facebook", href: "#", icon: "f" },
  { name: "Instagram", href: "#", icon: "📷" },
  { name: "Twitter/X", href: "#", icon: "X" },
  { name: "YouTube", href: "#", icon: "▶" },
  { name: "TikTok", href: "#", icon: "♪" },
];

export default function Footer() {
  return (
    <footer
      className="mt-24 border-t"
      style={{ background: "#080808", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Top promo bar */}
      <div
        className="py-12 px-4 md:px-8 text-center"
        style={{
          background: "linear-gradient(to right, #0a0a0a, #1a0000, #0a0a0a)",
        }}
      >
        <div
          className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#B30000" }}
        >
          <Heart size={12} fill="#B30000" /> Faith · Family · Entertainment
        </div>
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Stream With Purpose
        </h2>
        <p
          className="text-gray-400 text-sm max-w-md mx-auto mb-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Join millions of moral driven and believers streaming faith-driven, family-safe content
          on GoPremiere.
        </p>
        <a
          href="/account/signup"
          className="inline-block px-8 py-3 font-semibold text-sm text-white rounded transition-all duration-200 hover:opacity-90"
          style={{ background: "#B30000", fontFamily: "Inter, sans-serif" }}
        >
          Start Watching Free
        </a>
      </div>

      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div
              className="flex items-center gap-1 mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span
                className="text-2xl font-black"
                style={{ color: "#B30000" }}
              >
                Go
              </span>
              <span className="text-2xl font-black text-white">Flix</span>
            </div>
            <p
              className="text-gray-500 text-xs leading-relaxed mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              "Faith, Family, Entertainment."
              <br />
              Premium gospel & family-safe streaming for believers worldwide.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white transition-colors border"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-white text-xs font-bold uppercase tracking-widest mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-gray-600 text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © {new Date().getFullYear()} GoPremiere Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span
              className="text-gray-600 text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              English
            </span>
            <span className="text-gray-700">|</span>
            <a
              href="/terms"
              className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/cookies"
              className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
