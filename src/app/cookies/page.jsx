"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const LAST_UPDATED = "May 10, 2026";

const SECTIONS = [
  {
    title: "What Are Cookies?",
    body: "Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, such as login status, preferences, settings, and usage activity. GoFlix may use cookies and similar technologies such as local storage, session storage, pixels, tags, and device identifiers.",
  },
  {
    title: "Why GoFlix Uses Cookies",
    body: "We use cookies to make GoFlix work properly, keep users signed in, improve security, remember preferences, understand how people use the platform, improve streaming performance, measure service reliability, and support advertising or analytics where applicable.",
  },
  {
    title: "Essential Cookies",
    body: "Essential cookies are required for the website to function. These may be used for login sessions, authentication, account security, fraud prevention, page navigation, subscription access, and other core features. Without these cookies, some parts of GoFlix may not work correctly.",
  },
  {
    title: "Authentication and Session Cookies",
    body: "GoFlix may use cookies or browser storage to keep you signed in, remember your session, verify your identity, and protect your account. These technologies may store tokens or session identifiers used to confirm that you are authorised to access certain features.",
  },
  {
    title: "Preference Cookies",
    body: "Preference cookies help us remember choices you make, such as language settings, display preferences, recently selected options, saved filters, playback preferences, and other settings that improve your experience.",
  },
  {
    title: "Analytics Cookies",
    body: "Analytics cookies help us understand how users interact with GoFlix. For example, we may measure which pages are visited, how often features are used, how users navigate the platform, where errors happen, and how we can improve the service.",
  },
  {
    title: "Performance and Streaming Cookies",
    body: "We may use cookies and similar technologies to improve video playback, monitor streaming quality, reduce buffering, detect playback errors, and optimise performance across devices, browsers, and network conditions.",
  },
  {
    title: "Advertising Cookies",
    body: "If GoFlix displays ads, advertising cookies or similar technologies may be used to show relevant ads, measure ad performance, limit how often ads are shown, detect invalid activity, and understand ad engagement. Advertising partners may also use their own technologies under their own policies.",
  },
  {
    title: "Security Cookies",
    body: "Security cookies help protect GoFlix and its users from fraud, abuse, unauthorised access, suspicious login attempts, spam, scraping, and other harmful activity. These cookies may help us detect unusual behaviour and protect accounts.",
  },
  {
    title: "Local Storage and Session Storage",
    body: "In addition to cookies, GoFlix may use browser local storage or session storage. These technologies may store information such as access tokens, user preferences, watch progress, temporary session data, or cached settings. Local storage usually remains until cleared, while session storage may be removed when the browser session ends.",
  },
  {
    title: "Third-Party Cookies",
    body: "Some cookies may be set by third-party services used by GoFlix, such as analytics providers, advertising networks, payment processors, video delivery providers, cloud hosting services, or embedded content providers. These third parties may collect information according to their own privacy and cookie policies.",
  },
  {
    title: "Cookies Used for Payments",
    body: "If GoFlix uses third-party payment providers, those providers may use cookies or similar technologies to process payments, prevent fraud, verify transactions, remember checkout sessions, and comply with payment security requirements.",
  },
  {
    title: "Cookies Used for App Downloads and External Links",
    body: "When GoFlix links to app stores, external websites, payment pages, or partner services, those external platforms may use their own cookies. GoFlix does not control cookies used by external websites or third-party platforms.",
  },
  {
    title: "How Long Cookies Stay on Your Device",
    body: "Some cookies are temporary and expire when you close your browser. Others may remain on your device for a longer period or until you delete them. The exact duration depends on the type of cookie, your browser settings, and the purpose for which the cookie is used.",
  },
  {
    title: "Managing Cookies",
    body: "You can control or delete cookies through your browser settings. Most browsers allow you to block cookies, delete existing cookies, or receive a warning before cookies are stored. However, disabling certain cookies may affect login, playback, account features, preferences, and other parts of GoFlix.",
  },
  {
    title: "Browser Controls",
    body: "You can usually manage cookies in your browser settings under privacy, security, site settings, or cookies. The exact steps depend on your browser. Clearing cookies may sign you out of GoFlix and reset some saved preferences.",
  },
  {
    title: "Mobile App Technologies",
    body: "In the GoFlix mobile app, similar technologies may be used instead of browser cookies. These may include device identifiers, secure storage, app storage, push notification tokens, analytics identifiers, and other tools that help the app function properly.",
  },
  {
    title: "Do Not Track Signals",
    body: "Some browsers offer Do Not Track signals. Because there is no universal standard for responding to these signals, GoFlix may not respond to all Do Not Track requests. You can still manage cookies and tracking through your browser, device, and privacy settings.",
  },
  {
    title: "Cookie Consent",
    body: "Where required by law, we may ask for your consent before using certain non-essential cookies, such as analytics or advertising cookies. You may be able to change your cookie choices through a cookie banner, preference centre, browser settings, or account settings where available.",
  },
  {
    title: "Changes to This Cookie Policy",
    body: "We may update this Cookie Policy from time to time to reflect changes in our technology, legal requirements, or business operations. When we update this policy, we may revise the Last Updated date and notify users where appropriate.",
  },
  {
    title: "Contact Us",
    body: "If you have questions about this Cookie Policy or how GoFlix uses cookies and similar technologies, please contact us at privacy@goflix.app.",
  },
];

export default function Cookies() {
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
            <span className="text-3xl">🍪</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Cookie Policy
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-7">
            This Cookie Policy explains how GoFlix uses cookies, browser
            storage, analytics tools, and similar technologies to operate,
            secure, improve, and personalise the service.
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
              goserviceofficial@hotmail.com
Outlook.com
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