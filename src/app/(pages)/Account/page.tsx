"use client";

import { useState } from "react";
import AccountSettings from "@/Components/AccountSettings";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import MyAddresses from "@/Components/MyAddresses";
import Navbar from "@/Components/common/Navbar";

function Services() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
        <div className="flex items-center gap-3">
          <Icon name="truck" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Free Shipping</b>
            <small className="text-xs text-slate-500">
              On orders over 500 EGP
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="return" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Easy Returns</b>
            <small className="text-xs text-slate-500">
              14-day return policy
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="shield" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Secure Payment</b>
            <small className="text-xs text-slate-500">
              100% secure checkout
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="headset" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">24/7 Support</b>
            <small className="text-xs text-slate-500">Contact us anytime</small>
          </span>
        </div>
      </div>
    </section>
  );
}

export default function AccountPage() {
  const [activePanel, setActivePanel] = useState<"addresses" | "settings">(
    "addresses",
  );
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="bg-gradient from-emerald-600 to-emerald-400 text-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <p className="text-sm text-emerald-100">
              Home/My Account
            </p>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/20">
                <Icon name="heart" className="h-7 w-7" />
              </span>
              <div>
                <h1 className="text-3xl font-extrabold sm:text-4xl">
                  My Account
                </h1>
                <p className="mt-2 text-emerald-50">
                  Manage your addresses and account settings
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[220px_1fr]">
          <aside className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white">
            <h2 className="border-b border-slate-100 px-5 py-5 font-bold text-slate-800">
              My Account
            </h2>
            <nav className="p-2">
              <button
                onClick={() => setActivePanel("addresses")}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-4 text-left text-sm ${activePanel === "addresses" ? "bg-emerald-50 font-semibold text-emerald-600" : "text-slate-500 hover:bg-slate-50"}`}
              >
                <span className="flex items-center gap-3">
                  <Icon name="tag" className="h-5 w-5" />
                  My Addresses
                </span>
                ›
              </button>
              <button
                onClick={() => setActivePanel("settings")}
                className={`mt-1 flex w-full items-center justify-between rounded-lg px-4 py-4 text-left text-sm ${activePanel === "settings" ? "bg-emerald-50 font-semibold text-emerald-600" : "text-slate-500 hover:bg-slate-50"}`}
              >
                <span className="flex items-center gap-3">
                  <Icon name="shield" className="h-5 w-5" />
                  Settings
                </span>
                ›
              </button>
            </nav>
          </aside>
          <section>
            {activePanel === "addresses" ? (
              <MyAddresses />
            ) : (
              <AccountSettings />
            )}
          </section>
        </div>
      </main>
      <Services />
      <Footer />
    </>
  );
}
