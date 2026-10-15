"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import homeSlider from "@/assets/Images/home-slider.png";
import { signUp, signupSchema } from "@/services/auth.services";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = signupSchema.safeParse({ name: String(form.get("name")), email: String(form.get("email")), password: String(form.get("password")), rePassword: String(form.get("rePassword")), phone: String(form.get("phone")) });
    if (!result.success) { setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]))); return; }
    setErrors({});
    signUp(result.data).then(() => setSubmitted(true)).catch((error) => setErrors({ form: error instanceof Error ? error.message : "Unable to create account" }));
  };
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:py-16 lg:grid-cols-2 lg:items-center">
          <section className="hidden text-center lg:block">
            <div className="mx-auto flex h-80 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-emerald-50 shadow-sm">
              <img
                src={homeSlider.src}
                alt="Fresh products in a shopping basket"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <h1 className="mt-7 text-3xl font-extrabold text-slate-800">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h1>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-500">
              Join thousands of happy customers who trust FreshCart for their
              daily shopping needs.
            </p>
          </section>
          <section className="mx-auto w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-10">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">
                <span className="text-emerald-600">Fresh</span>
                <span className="text-slate-800">Cart</span>
              </h2>
              <h3 className="mt-4 text-2xl font-bold text-slate-800">
                Create an Account
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Start your fresh shopping experience today
              </p>
            </div>
            <form onSubmit={submit} className="mt-7 space-y-4">
              <label className="block text-sm font-semibold text-slate-600">
                Full Name
                <input
                  required
                  name="name"
                  placeholder="Enter your full name"
                  className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-emerald-500"
                />
              </label>
              {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
              <label className="block text-sm font-semibold text-slate-600">
                Email Address
                <div className="mt-2 flex h-12 items-center rounded-lg border border-slate-200 px-4">
                  <Icon name="mail" className="h-4 w-4 text-slate-400" />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="ml-3 w-full outline-none"
                  />
                </div>
              </label>
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              <label className="block text-sm font-semibold text-slate-600">Phone Number<input required name="phone" type="tel" placeholder="01xxxxxxxxx" className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-emerald-500" />{errors.phone && <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>}</label>
              <label className="block text-sm font-semibold text-slate-600">
                Password
                <div className="mt-2 flex h-12 items-center rounded-lg border border-slate-200 px-4">
                  <Icon name="lock" className="h-4 w-4 text-slate-400" />
                  <input
                    required
                    minLength={6}
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="ml-3 w-full outline-none"
                  />
                </div>
              </label>
              {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
              <label className="block text-sm font-semibold text-slate-600">Confirm Password<input required name="rePassword" minLength={6} type="password" placeholder="Confirm your password" className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-emerald-500" />{errors.rePassword && <span className="mt-1 block text-xs text-red-600">{errors.rePassword}</span>}</label>
              <label className="flex items-start gap-2 text-xs text-slate-500">
                <input required type="checkbox" className="mt-0.5" />I agree to
                the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-emerald-600"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-emerald-600"
                >
                  Privacy Policy
                </Link>
                .
              </label>
              <button className="h-12 w-full rounded-lg bg-emerald-600 font-bold text-white shadow-sm hover:bg-emerald-700">
                {submitted ? "Account Created" : "Create Account"}
              </button>
              {errors.form && <p className="text-center text-sm text-red-600">{errors.form}</p>}
            </form>
            <p className="mt-6 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-emerald-600"
              >
                Sign In
              </Link>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
