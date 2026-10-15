"use client";

import Link from "next/link";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[780px] items-center justify-center overflow-hidden bg-slate-50 px-4 py-20">
        <div className="pointer-events-none absolute left-[8%] top-24 text-emerald-200/60">
          <Icon name="layers" className="h-8 w-8" />
        </div>
        <div className="pointer-events-none absolute right-[10%] top-44 text-emerald-200/60">
          <Icon name="tag" className="h-8 w-8" />
        </div>
        <div className="pointer-events-none absolute bottom-28 left-[15%] text-emerald-200/50">
          <Icon name="heart" className="h-8 w-8" />
        </div>
        <div className="pointer-events-none absolute bottom-20 right-[16%] text-emerald-200/60">
          <Icon name="truck" className="h-8 w-8" />
        </div>
        <section className="relative z-10 max-w-xl text-center">
          <div className="relative mx-auto grid h-48 w-60 place-items-center rounded-2xl border border-emerald-100 bg-white shadow-[0_16px_50px_rgba(83,206,116,0.16)]">
            <span className="text-emerald-400">
              <Icon name="cart" className="h-20 w-20" />
            </span>
            <span className="absolute -right-5 -top-5 grid h-24 w-24 place-items-center rounded-full border-8 border-white bg-emerald-600 text-2xl font-extrabold text-white shadow-lg">
              404
            </span>
          </div>
          <div className="mx-auto mt-8 flex w-20 items-center justify-between text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="h-2.5 w-8 rounded-full bg-emerald-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Oops! Nothing Here
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-500">
            Looks like this page went out of stock. Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
            >
              <Icon name="home" className="h-5 w-5" />
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-7 py-3.5 font-bold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <Icon name="arrow" className="h-5 w-5" />
              Go Back
            </button>
          </div>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular destinations
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/Shop"
                className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                All Products
              </Link>
              <Link
                href="/Categories"
                className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
              >
                Categories
              </Link>
              <Link
                href="/Shop"
                className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
              >
                Today&apos;s Deals
              </Link>
              <Link
                href="/Support"
                className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
