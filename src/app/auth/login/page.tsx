"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import homeSlider from "@/assets/Images/home-slider.png";
import { signIn } from "@/services/auth.services";

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

export default function LoginPage() {
  const [error, setError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const email = String(form.get("email") ?? "");
      const password = String(form.get("password") ?? "");
      setError("");
      try {
        const response = await signIn({ email, password });
        const name = response.user?.name || email?.split("@")[0] || "FreshCart User";
        window.localStorage.setItem("freshcart-user", name);
        if (response.token) window.localStorage.setItem("freshcart-token", response.token);
        window.dispatchEvent(new Event("auth-change"));
        window.location.href = "/";
      } catch (error) { setError(error instanceof Error ? error.message : "Unable to sign in"); }
    };

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <section className="text-center">
            <div className="mx-auto flex h-80 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-emerald-50 shadow-sm">
              <img
                src={homeSlider.src}
                alt="Fresh products in a shopping basket"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <h1 className="mt-7 text-3xl font-extrabold leading-tight text-slate-800 sm:text-4xl">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-500">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs.
            </p>
            <div className="mt-6 flex justify-center gap-5 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <Icon name="truck" className="h-4 w-4 text-emerald-600" />
                Free Delivery
              </span>
              <span className="flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-emerald-600" />
                Secure Payment
              </span>
              <span className="flex items-center gap-2">
                <Icon name="headset" className="h-4 w-4 text-emerald-600" />
                24/7 Support
              </span>
            </div>
          </section>
          <section className="mx-auto w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-7 shadow-xl sm:p-10">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">
                <span className="text-emerald-600">Fresh</span>
                <span className="text-slate-800">Cart</span>
              </h2>
              <h3 className="mt-4 text-2xl font-bold text-slate-800">
                Welcome Back!
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue your fresh shopping experience
              </p>
            </div>
            <div className="mt-7 grid gap-3">
              <button className="flex h-12 items-center justify-center gap-3 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                <span className="font-bold text-red-500">G</span>Continue with
                Google
              </button>
              <button className="flex h-12 items-center justify-center gap-3 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                <span className="font-bold text-blue-600">f</span>Continue with
                Facebook
              </button>
            </div>
            <div className="my-7 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              OR CONTINUE WITH EMAIL
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-semibold text-slate-600">
                Email Address
                <div className="mt-2 flex h-12 items-center rounded-lg border border-slate-200 px-4">
                  <Icon name="mail" className="h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="ml-3 w-full outline-none"
                  />
                </div>
              </label>
              <label className="block text-sm font-semibold text-slate-600">
                Password
                <div className="mt-2 flex h-12 items-center rounded-lg border border-slate-200 px-4">
                  <Icon name="shield" className="h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                  name="password"
                    placeholder="Enter your password"
                    className="ml-3 w-full outline-none"
                  />
                  <button type="button" aria-label="Show password">
                    <Icon name="heart" className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </label>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" />
                  Keep me signed in
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="font-semibold text-emerald-600"
                >
                  Forgot Password?
                </Link>
              </div>
              <button className="h-12 w-full rounded-lg bg-emerald-600 font-bold text-white shadow-sm hover:bg-emerald-700">
                Sign In
              </button>
              {error && <p className="text-center text-sm text-red-600">{error}</p>}
            </form>
            <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
              New to FreshCart?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-emerald-600"
              >
                Create an account
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Services />
      <Footer />
    </>
  );
}
