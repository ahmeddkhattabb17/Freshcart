import Link from "next/link";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";

const articles: [string, string, string[]][] = [
  [
    "Information We Collect",
    "layers",
    [
      "Personal Data: Name, email address, phone number, and shipping address.",
      "Payment Data: Credit card information processed securely through our payment providers.",
      "Technical Data: IP address, browser type, device information, and access times.",
      "Usage Data: Pages viewed, products browsed, and actions taken within our platform.",
    ],
  ],
  [
    "How We Use Your Information",
    "user",
    [
      "To process and fulfill your orders.",
      "To send order confirmations and shipping updates.",
      "To provide customer support and respond to inquiries.",
      "To improve our products, services, and user experience.",
      "To send promotional communications with your consent.",
    ],
  ],
  [
    "Data Protection",
    "lock",
    [
      "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
      "Payment information is processed by PCI-compliant payment providers.",
      "We conduct regular security audits and vulnerability assessments.",
      "Access to personal data is restricted to authorized personnel only.",
    ],
  ],
  [
    "Information Sharing",
    "share",
    [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share data with trusted service providers who assist in our operations.",
      "We may disclose information when required by law or to protect our rights.",
    ],
  ],
  [
    "Your Rights",
    "user",
    [
      "Access: Request a copy of your personal data.",
      "Rectification: Request correction of inaccurate data.",
      "Erasure: Request deletion of your personal data.",
      "Portability: Request your data in a portable format.",
      "Opt-out: Unsubscribe from marketing communications at any time.",
    ],
  ],
  [
    "Cookies",
    "layers",
    [
      "We use cookies to enhance your browsing experience and remember preferences.",
      "You can control cookie settings through your browser preferences.",
      "Disabling cookies may affect the functionality of certain features.",
    ],
  ],
  [
    "Data Retention",
    "return",
    [
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
    ],
  ],
  [
    "Contact Us",
    "mail",
    [
      "For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at privacy@freshcart.com",
    ],
  ],
];

function Services() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
        {[
          ["truck", "Free Shipping", "On orders over 500 EGP"],
          ["return", "Easy Returns", "14-day return policy"],
          ["shield", "Secure Payment", "100% secure checkout"],
          ["headset", "24/7 Support", "Contact us anytime"],
        ].map(([icon, title, detail]) => (
          <div key={title} className="flex items-center gap-3">
            <Icon name={icon} className="h-6 w-6 text-emerald-600" />
            <span>
              <b className="block text-sm">{title}</b>
              <small className="text-xs text-slate-500">{detail}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <p className="text-sm text-emerald-100">
              Home&nbsp; / &nbsp;Privacy Policy
            </p>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/20">
                <Icon name="shield" className="h-8 w-8" />
              </span>
              <div>
                <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
                <p className="mt-1 text-sm text-emerald-50">
                  Last updated: February 2026
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-9">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-600 text-white">
                <Icon name="shield" />
              </span>
              <div>
                <h2 className="font-bold text-emerald-900">
                  Your Privacy Matters
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This Privacy Policy describes how FreshCart collects, uses,
                  and protects your personal information when you use our
                  services. We are committed to ensuring that your privacy is
                  protected.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {articles.map(([title, icon, items], index) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon name={icon} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                      Article {index + 1}
                    </p>
                    <h2 className="font-bold text-slate-800">{title}</h2>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {items.map((item, itemIndex) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-5 text-slate-600"
                    >
                      <span className="font-bold text-emerald-500">
                        {index + 1}.{itemIndex + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <Link
              href="/"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-100"
            >
              ← Back to Home
            </Link>
            <Link
              href="/terms"
              className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              View Terms of Service →
            </Link>
          </div>
        </div>
      </main>
      <Services />
      <Footer />
    </>
  );
}
