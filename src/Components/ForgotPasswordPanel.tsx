"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import Icon from "./Icon";
import { resetPassword, sendResetCode, verifyResetCode } from "@/services/auth.services";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
const codeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter exactly 6 digits"),
});
const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type Step = "email" | "code" | "password";

export default function ForgotPasswordPanel() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submitEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = emailSchema.safeParse({ email });
    if (!result.success) return setError(result.error.issues[0].message);
    setError("");
    sendResetCode(email).then(() => setStep("code")).catch((error) => setError(error instanceof Error ? error.message : "Unable to send reset code"));
  }

  function submitCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = codeSchema.safeParse({ code: form.get("code") });
    if (!result.success) return setError(result.error.issues[0].message);
    setError("");
    verifyResetCode(String(form.get("code"))).then(() => setStep("password")).catch((error) => setError(error instanceof Error ? error.message : "Invalid reset code"));
  }

  function submitPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = passwordSchema.safeParse({
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    });
    if (!result.success) return setError(result.error.issues[0].message);
    setError("");
    resetPassword(email, String(form.get("password"))).then(() => router.push("/auth/login")).catch((error) => setError(error instanceof Error ? error.message : "Unable to reset password"));
  }

  return (
    <section className="mx-auto w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-7 shadow-xl sm:p-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">
          <span className="text-emerald-600">Fresh</span>
          <span className="text-slate-800">Cart</span>
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-800">
          {step === "email"
            ? "Forgot Password?"
            : step === "code"
              ? "Check Your Email"
              : "Create New Password"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {step === "email"
            ? "No worries, we'll send you a reset code"
            : step === "code"
              ? `Enter the 6-digit code sent to ${email}`
              : "Your new password must be different from previous passwords"}
        </p>
      </div>
      <div className="my-8 flex items-center justify-center gap-3">
        <span
          className={`grid h-10 w-10 place-items-center rounded-full ${step === "email" ? "bg-emerald-600 text-white" : "bg-emerald-600 text-white"}`}
        >
          <Icon name="mail" className="h-4 w-4" />
        </span>
        <span className="h-0.5 w-14 bg-emerald-500" />
        <span
          className={`grid h-10 w-10 place-items-center rounded-full ${step === "code" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}
        >
          <Icon name="tag" className="h-4 w-4" />
        </span>
        <span className="h-0.5 w-14 bg-slate-200" />
        <span
          className={`grid h-10 w-10 place-items-center rounded-full ${step === "password" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}
        >
          <Icon name="shield" className="h-4 w-4" />
        </span>
      </div>
      {step === "email" && (
        <form onSubmit={submitEmail} className="space-y-5">
          <label className="block text-sm font-semibold text-slate-600">
            Email Address
            <div className="mt-2 flex h-12 items-center rounded-lg border border-slate-200 px-4">
              <Icon name="mail" className="h-4 w-4 text-slate-400" />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="ml-3 w-full outline-none"
              />
            </div>
          </label>
          <button className="h-12 w-full rounded-lg bg-emerald-600 font-bold text-white">
            Send Reset Code
          </button>
        </form>
      )}
      {step === "code" && (
        <form onSubmit={submitCode} className="space-y-5">
          <label className="block text-left text-sm font-semibold text-slate-600">
            Verification Code
            <input
              name="code"
              inputMode="numeric"
              maxLength={6}
              placeholder="• • • • • •"
              className="mt-2 h-14 w-full rounded-lg border border-slate-200 text-center text-xl tracking-[0.7em] outline-none focus:border-emerald-500"
            />
          </label>
          <p className="text-center text-sm text-slate-500">
            Didn&apos;t receive the code?{" "}
            <button type="button" className="font-semibold text-emerald-600">
              Resend Code
            </button>
          </p>
          <button className="h-12 w-full rounded-lg bg-emerald-600 font-bold text-white">
            Verify Code
          </button>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full text-sm text-slate-500"
          >
            ← Change email address
          </button>
        </form>
      )}
      {step === "password" && (
        <form onSubmit={submitPassword} className="space-y-5">
          <label className="block text-sm font-semibold text-slate-600">
            New Password
            <input
              name="password"
              type="password"
              placeholder="Enter new password"
              className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-emerald-500"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-600">
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-emerald-500"
            />
          </label>
          <button className="h-12 w-full rounded-lg bg-emerald-600 font-bold text-white">
            Reset Password
          </button>
        </form>
      )}
      {error && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
      )}
      <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
        Remember your password?{" "}
        <Link href="/auth/login" className="font-semibold text-emerald-600">
          Sign In
        </Link>
      </div>
    </section>
  );
}
