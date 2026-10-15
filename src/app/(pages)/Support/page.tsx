"use client";

import { useState } from "react";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";

const contactCards = [
  {
    icon: "phone",
    title: "Phone",
    detail: "Mon-Fri from 8am to 6pm",
    value: "+1 (800) 123-4567",
  },
  {
    icon: "mail",
    title: "Email",
    detail: "We&apos;ll respond within 24 hours",
    value: "support@freshcart.com",
  },
  {
    icon: "tag",
    title: "Office",
    detail: "123 Commerce Street\nNew York, NY 10001\nUnited States",
    value: "",
  },
  {
    icon: "layers",
    title: "Business Hours",
    detail: "Monday - Friday: 8am - 6pm\nSaturday: 9am - 4pm\nSunday: Closed",
    value: "",
  },
];

function Services() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
        {[
          {
            icon: "truck",
            title: "Free Shipping",
            detail: "On orders over 500 EGP",
          },
          {
            icon: "return",
            title: "Easy Returns",
            detail: "14-day return policy",
          },
          {
            icon: "shield",
            title: "Secure Payment",
            detail: "100% secure checkout",
          },
          {
            icon: "headset",
            title: "24/7 Support",
            detail: "Contact us anytime",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <Icon name={item.icon} className="h-6 w-6 text-emerald-600" />
            <span>
              <b className="block text-sm">{item.title}</b>
              <small className="text-xs text-slate-500">{item.detail}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SupportPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="bg-gradient from-emerald-600 to-emerald-400 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <p className="text-sm text-emerald-100">
              Home&nbsp; / &nbsp;Contact Us
            </p>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/20">
                <Icon name="headset" className="h-8 w-8" />
              </span>
              <div>
                <h1 className="text-3xl font-extrabold">Contact Us</h1>
                <p className="mt-1 text-sm text-emerald-50">
                  We&apos;d love to hear from you. Get in touch with our team.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[0.75fr_1.35fr]">
          {" "}
          <aside className="space-y-5">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon name={card.icon} />
                  </span>
                  <div>
                    <h2 className="font-bold text-slate-800">{card.title}</h2>
                    <p className="mt-1 whitespace-pre-line text-sm text-slate-500">
                      {card.detail}
                    </p>
                    {card.value && (
                      <p className="mt-2 font-semibold text-emerald-600">
                        {card.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-800">Follow Us</h2>
              <div className="mt-4 flex gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                  f
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                  t
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                  ◎
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                  in
                </span>
              </div>
            </div>
          </aside>
          <section className="space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Icon name="headset" />
                </span>
                <div>
                  <h2 className="text-xl font-bold">Send us a Message</h2>
                  <p className="text-sm text-slate-500">
                    Fill out the form and we&apos;ll get back to you
                  </p>
                </div>
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
                className="mt-6 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-600">
                    Full Name
                    <input
                      required
                      placeholder="John Doe"
                      className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-emerald-500"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-600">
                    Email Address
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-emerald-500"
                    />
                  </label>
                </div>
                <label className="block text-sm font-semibold text-slate-600">
                  Subject
                  <select
                    required
                    defaultValue=""
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-emerald-500"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option>Order support</option>
                    <option>Product question</option>
                    <option>Returns and refunds</option>
                  </select>
                </label>
                <label className="block text-sm font-semibold text-slate-600">
                  Message
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="mt-2 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-emerald-500"
                  />
                </label>
                <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-bold text-white shadow-sm hover:bg-emerald-700">
                  <Icon name="arrow" className="h-4 w-4" />
                  {sent ? "Message Sent" : "Send Message"}
                </button>
              </form>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-emerald-600">
                <Icon name="shield" />
              </span>
              <div>
                <h2 className="font-bold">Looking for quick answers?</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Check out our Help Center for frequently asked questions about
                  orders, shipping, returns, and more.
                </p>
                <a
                  href="#support"
                  className="mt-3 inline-block text-sm font-semibold text-emerald-600"
                >
                  Visit Help Center →
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Services />
      <Footer />
    </>
  );
}
