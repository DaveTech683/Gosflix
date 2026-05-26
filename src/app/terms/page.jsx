"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const LAST_UPDATED = "May 10, 2026";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using GoFlix, including our website, mobile app, video content, reels, live events, subscriptions, and related services, you agree to be bound by these Terms of Service. If you do not agree with these terms, you should not use GoFlix.",
  },
  {
    title: "About GoFlix",
    body: "GoFlix is a digital streaming platform that provides access to movies, series, short-form videos, live content, family-friendly entertainment, and related features. Some content may be free, while other content may require an account, subscription, payment, or other form of access approval.",
  },
  {
    title: "Eligibility",
    body: "You must be at least 13 years old to use GoFlix. If you are under the age of majority in your location, you may only use GoFlix with the permission and supervision of a parent or legal guardian. Parents and guardians are responsible for the activity of minors using the service.",
  },
  {
    title: "Account Registration",
    body: "To access certain features, you may need to create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated. You are responsible for maintaining the confidentiality of your login details and for all activities that occur under your account.",
  },
  {
    title: "Account Security",
    body: "You agree not to share your password, access token, subscription access, or account login with unauthorised persons. If you suspect that your account has been accessed without permission, you should contact us immediately. GoFlix is not responsible for losses caused by your failure to protect your account credentials.",
  },
  {
    title: "Subscriptions and Payments",
    body: "Some GoFlix features or content may require payment or an active subscription. Subscription prices, billing cycles, renewal terms, and available plans may be shown before purchase. By subscribing, you authorise us or our payment provider to charge the applicable fees. All payment handling may be processed by trusted third-party payment providers.",
  },
  {
    title: "Renewals and Cancellation",
    body: "Subscriptions may renew automatically unless cancelled before the renewal date. You are responsible for cancelling your subscription through the available account, app store, or payment provider settings. Cancelling a subscription may stop future billing, but you may still have access until the end of your current billing period.",
  },
  {
    title: "Refunds",
    body: "Payments are generally non-refundable unless required by law or clearly stated otherwise. Refund requests may be reviewed on a case-by-case basis, especially where there are duplicate charges, technical issues, or billing errors. Third-party payment providers or app stores may have their own refund policies.",
  },
  {
    title: "Permitted Use",
    body: "GoFlix is provided for personal, non-commercial entertainment use only. You agree not to misuse the service, interfere with its operation, attempt to gain unauthorised access, scrape data, bypass security measures, reverse engineer the platform, or use GoFlix for illegal or harmful activities.",
  },
  {
    title: "Content Access and Availability",
    body: "Content available on GoFlix may change from time to time. We may add, remove, update, restrict, or disable access to content at any time due to licensing, technical, business, legal, or operational reasons. We do not guarantee that any specific movie, series, reel, live event, or feature will always be available.",
  },
  {
    title: "Streaming Quality and Device Compatibility",
    body: "Streaming quality may vary based on your internet connection, device, browser, app version, subscription plan, and technical conditions. GoFlix does not guarantee uninterrupted, error-free, or high-definition playback at all times. You are responsible for using a compatible device and maintaining a suitable internet connection.",
  },
  {
    title: "Intellectual Property",
    body: "All GoFlix branding, logos, designs, software, platform features, text, graphics, videos, audio, images, and other materials are owned by GoFlix or our licensors, unless otherwise stated. You may not copy, reproduce, distribute, modify, sell, broadcast, publicly display, or exploit any part of the service without permission.",
  },
  {
    title: "Content Restrictions",
    body: "You may not download, record, redistribute, resell, upload, mirror, share, or make GoFlix content available outside the platform unless we clearly allow it. You may not bypass digital rights management, signed URLs, streaming protections, access controls, or any technical restrictions used to protect content.",
  },
  {
    title: "User-Generated Content",
    body: "If GoFlix allows users to post comments, reviews, profiles, images, videos, or other content, you are responsible for what you submit. You agree not to post content that is unlawful, abusive, hateful, defamatory, sexually explicit, violent, misleading, infringing, spammy, or harmful to others.",
  },
  {
    title: "Licence to User Content",
    body: "When you submit content to GoFlix, you grant us a non-exclusive, worldwide, royalty-free licence to host, store, display, reproduce, moderate, and use that content as needed to operate and promote the service. You must only submit content that you own or have permission to share.",
  },
  {
    title: "Community Rules",
    body: "You agree to interact respectfully with other users and with GoFlix staff. Harassment, threats, impersonation, hate speech, spam, scams, abuse, and attempts to manipulate platform features may result in removal of content, account restrictions, suspension, or permanent termination.",
  },
  {
    title: "Prohibited Activities",
    body: "You may not use GoFlix to break the law, infringe intellectual property rights, distribute malware, attack our systems, overload our servers, evade payment, create fake accounts, abuse promotions, harvest user data, or interfere with the experience of other users.",
  },
  {
    title: "Third-Party Services",
    body: "GoFlix may integrate with third-party services such as payment processors, analytics providers, advertising networks, cloud hosting providers, app stores, video delivery services, and external links. We are not responsible for the content, security, policies, or practices of third-party services.",
  },
  {
    title: "Advertising and Promotions",
    body: "GoFlix may display advertisements, sponsored content, or promotional messages. We may also offer promotions, discounts, trials, or special plans. Promotions may have additional terms, eligibility requirements, limits, and expiration dates.",
  },
  {
    title: "Service Updates and Changes",
    body: "We may update, modify, suspend, or discontinue any part of GoFlix at any time. This may include changes to features, design, content, subscription plans, pricing, supported devices, or technical requirements. We may also release updates that are required for continued use of the service.",
  },
  {
    title: "Suspension and Termination",
    body: "We may suspend or terminate your account or access to GoFlix if we believe you have violated these terms, misused the service, created risk for GoFlix or other users, failed to pay required fees, or engaged in fraudulent, illegal, or harmful conduct.",
  },
  {
    title: "Account Deletion",
    body: "You may request deletion of your account where available. Deleting your account may remove your profile, preferences, watch history, watchlist, and other account-related data. Some information may be retained where required for legal, security, fraud prevention, dispute resolution, backup, or accounting purposes.",
  },
  {
    title: "Privacy",
    body: "Your use of GoFlix is also governed by our Privacy Policy, which explains how we collect, use, store, and protect your information. By using GoFlix, you agree that we may handle your information as described in the Privacy Policy.",
  },
  {
    title: "Disclaimers",
    body: "GoFlix is provided on an 'as is' and 'as available' basis. We do not guarantee that the service will always be uninterrupted, secure, error-free, or available on every device or network. We do not guarantee that all content will meet your expectations or remain available permanently.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, GoFlix and its owners, employees, partners, service providers, and affiliates will not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of data, revenue, profits, or access resulting from your use of the service.",
  },
  {
    title: "Indemnity",
    body: "You agree to defend, indemnify, and hold GoFlix harmless from claims, losses, damages, liabilities, costs, and expenses arising from your use of the service, your violation of these terms, your user-generated content, or your infringement of any rights of another person or organisation.",
  },
  {
    title: "Changes to These Terms",
    body: "We may update these Terms of Service from time to time. When changes are made, we may update the Last Updated date and notify users of significant changes through the app, website, email, or other reasonable method. Continued use of GoFlix after changes means you accept the updated terms.",
  },
  {
    title: "Contact Us",
    body: "If you have questions about these Terms of Service, please contact us at support@goflix.app.",
  },
];

export default function Terms() {
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
            <span className="text-3xl">📄</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Terms of Service
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-7">
            These terms explain the rules for using GoFlix, including your
            account, subscriptions, content access, user responsibilities, and
            our rights as a platform.
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