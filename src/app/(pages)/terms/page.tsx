import Link from "next/link";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";

const sections = [
  [
    "Acceptance of Terms",
    "By accessing or using FreshCart, you agree to be bound by these terms and all applicable laws and regulations.",
  ],
  [
    "Using Our Service",
    "You may use FreshCart to browse products, create an account, place orders, and contact our support team. Please provide accurate account and delivery information.",
  ],
  [
    "Orders and Payments",
    "Orders are subject to availability and confirmation. Prices, delivery fees, and promotional offers may change. Payment information is handled securely by our payment providers.",
  ],
  [
    "Returns and Refunds",
    "Eligible items may be returned according to our return policy. Contact our support team for help with damaged, incorrect, or missing items.",
  ],
  [
    "Account Responsibility",
    "You are responsible for protecting your account credentials and for activity performed through your account. Notify us promptly if you believe your account has been compromised.",
  ],
  [
    "Contact Us",
    "Questions about these terms can be sent to support@freshcart.com.",
  ],
];

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <p className="text-sm text-emerald-100">
              Home&nbsp; / &nbsp;Terms of Service
            </p>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/20">
                <Icon name="shield" className="h-8 w-8" />
              </span>
              <div>
                <h1 className="text-4xl font-extrabold">Terms of Service</h1>
                <p className="mt-1 text-sm text-emerald-50">
                  Last updated: February 2026
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-8">
              {sections.map(([title, body], index) => (
                <article key={title}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-600">
                      {index + 1}
                    </span>
                    <h2 className="text-xl font-bold text-slate-800">
                      {title}
                    </h2>
                  </div>
                  <p className="mt-3 pl-12 text-sm leading-7 text-slate-600">
                    {body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-10 border-t border-slate-100 pt-6">
              <Link
                href="/privacy-policy"
                className="text-sm font-semibold text-emerald-600"
              >
                ← View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
