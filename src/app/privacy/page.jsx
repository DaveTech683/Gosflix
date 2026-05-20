"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const LAST_UPDATED = "May 10, 2026";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly to us, such as your name, email address, password, profile details, and any information you submit when creating or managing your account. We may also collect information related to your subscriptions, watchlist, viewing activity, search queries, preferences, device information, IP address, app usage, and interactions with GoFlix features.",
  },
  {
    title: "Account and Login Information",
    body: "When you create an account or log in to GoFlix, we collect and process authentication information needed to verify your identity and protect your account. Passwords are hashed and are not stored in plain text. We may use access tokens, refresh tokens, or similar technologies to keep you signed in securely.",
  },
  {
    title: "How We Use Your Information",
    body: "We use the information we collect to provide, maintain, secure, and improve GoFlix; personalise your content recommendations; remember your preferences; manage your account; process subscriptions; improve playback performance; communicate with you about service updates; analyse usage patterns; detect suspicious activity; prevent fraud; and comply with applicable legal obligations.",
  },
  {
    title: "Content Recommendations and Personalisation",
    body: "GoFlix may use your viewing history, watchlist, liked content, search activity, genre preferences, and general usage behaviour to recommend movies, series, reels, live events, and other content that may be relevant to you. You may be able to change some preferences through your account settings.",
  },
  {
    title: "Watch History and User Activity",
    body: "We may collect information about the content you watch, your playback progress, content you pause or resume, items added to your watchlist, likes, saves, shares, and other interactions. This helps us provide features such as continue watching, personalised recommendations, analytics, and service improvements.",
  },
  {
    title: "Payment and Subscription Information",
    body: "If GoFlix offers paid subscriptions or purchases, payment processing may be handled by trusted third-party payment providers. We may receive limited payment-related information such as transaction status, subscription plan, expiry date, payment confirmation, and billing reference. We do not store full card details unless clearly stated and handled through a compliant payment provider.",
  },
  {
    title: "Advertising and Analytics",
    body: "GoFlix may use analytics tools and advertising partners to understand app performance, measure engagement, show relevant ads, prevent abuse, and improve the service. These partners may collect device identifiers, usage events, ad interactions, and approximate location information in accordance with their own privacy policies.",
  },
  {
    title: "Cookies and Similar Technologies",
    body: "On the web version of GoFlix, we may use cookies, local storage, session storage, and similar technologies to keep you signed in, remember preferences, improve performance, protect your account, and analyse usage. You may control cookies through your browser settings, but disabling some cookies may affect how the service works.",
  },
  {
    title: "Device and Technical Information",
    body: "We may collect technical information such as device type, browser type, operating system, app version, IP address, crash logs, diagnostics, language settings, network information, and unique device identifiers. This information helps us improve security, troubleshoot errors, and optimise playback quality.",
  },
  {
    title: "Location Information",
    body: "We may collect approximate location information based on your IP address or device settings. This may be used for security, analytics, content availability, fraud prevention, and regional service improvements. GoFlix does not collect precise GPS location unless a feature specifically requires it and you give permission.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who help us operate GoFlix, including hosting providers, analytics services, payment processors, customer support tools, email services, cloud storage providers, and security partners. These providers are expected to protect your information and use it only for authorised purposes.",
  },
  {
    title: "Legal Compliance and Safety",
    body: "We may disclose information if required by law, regulation, court order, legal process, or government request. We may also use or share information when necessary to protect GoFlix, our users, our rights, our property, prevent fraud, investigate abuse, enforce our terms, or respond to security issues.",
  },
  {
    title: "Data Retention",
    body: "We retain your personal information for as long as your account is active or as needed to provide the service. Some information may be retained longer where required for legal, security, fraud prevention, accounting, dispute resolution, or backup purposes. You may request deletion of your account and associated data by contacting us.",
  },
  {
    title: "Security",
    body: "We implement reasonable technical and organisational measures to protect your personal information, including encryption in transit, secure authentication practices, access controls, monitoring, and password hashing. However, no method of internet transmission or electronic storage is completely secure, so we cannot guarantee absolute security.",
  },
  {
    title: "Your Rights",
    body: "Depending on your location, you may have the right to access, correct, update, delete, restrict, or object to certain processing of your personal information. You may also request a copy of your data or ask questions about how your information is used. To exercise these rights, contact us at privacy@goflix.app.",
  },
  {
    title: "Account Deletion",
    body: "You may request deletion of your GoFlix account and associated personal data. After deletion, you may lose access to your profile, watch history, watchlist, preferences, subscription features, and saved data. Some information may remain in backups, logs, or records where required for legal, security, or legitimate business purposes.",
  },
  {
    title: "Marketing Communications",
    body: "We may send you service-related messages, updates, announcements, or promotional communications where permitted. You may opt out of marketing messages where an unsubscribe option is provided. Important service, security, or account-related messages may still be sent even if you opt out of marketing messages.",
  },
  {
    title: "Children's Privacy",
    body: "GoFlix is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, please contact us immediately and we will take steps to delete such information where required.",
  },
  {
    title: "Parental Guidance and Family Content",
    body: "Some GoFlix content may be suitable for family viewing, while other content may be intended for older audiences. Parents and guardians are responsible for supervising children’s use of the service and ensuring that content watched is appropriate for their household.",
  },
  {
    title: "Third-Party Links and Services",
    body: "GoFlix may contain links to third-party websites, app stores, payment providers, social platforms, or external services. We are not responsible for the privacy practices, content, or security of those third-party services. You should review their privacy policies before providing information to them.",
  },
  {
    title: "International Data Transfers",
    body: "Your information may be stored, processed, or transferred to servers and service providers located outside your country of residence. Where applicable, we take reasonable steps to ensure that your information receives appropriate protection in accordance with this Privacy Policy.",
  },
  {
    title: "User-Generated Content",
    body: "If GoFlix allows comments, reviews, profile details, uploads, or other user-generated content, information you choose to share may be visible to other users or the public depending on the feature. You are responsible for the information you choose to make available through the service.",
  },
  {
    title: "Push Notifications",
    body: "If you enable push notifications, we may send notifications about new content, account activity, recommendations, reminders, offers, or service updates. You can manage or disable push notifications through your device settings or app settings where available.",
  },
  {
    title: "App Permissions",
    body: "Some features may request device permissions such as notifications, storage, camera, microphone, or media access. We only request permissions where needed for a feature to work. You can manage permissions through your device settings.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. When we make changes, we may update the Last Updated date and notify users of significant changes through the app, website, email, or other appropriate methods. Your continued use of GoFlix after changes means you accept the updated policy.",
  },
  {
    title: "Contact Us",
    body: "If you have questions, requests, or concerns about this Privacy Policy or how GoFlix handles your information, please contact us at privacy@goflix.app.",
  },
];

export default function Privacy() {
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
            <span className="text-3xl">🔒</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Privacy Policy
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-7">
            Your privacy matters. We are committed to protecting your personal
            information and being transparent about how we collect, use, store,
            and protect it.
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
              goflixofficials@gmail.com
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