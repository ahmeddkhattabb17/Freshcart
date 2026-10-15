"use client";

import { FormEvent, useEffect, useState } from "react";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import OrderSummary from "@/Components/OrderSummary";
import { clearCart, getCart } from "@/services/cart.services";
import { createCashOrder, createCheckoutSession } from "@/services/orders.services";
import { z } from "zod";

const checkoutSchema = z.object({
  city: z.string().trim().min(1, "You must fill this field with your city"),
  details: z.string().trim().min(1, "You must fill this field with your street address"),
  phone: z.string().trim().min(1, "You must fill this field with your phone number").regex(/^01\d{9}$/, "Enter a valid Egyptian phone number"),
});

type CheckoutItem = {
  id: string | number;
  name: string;
  quantity: number;
  price: string;
  imageUrl: string;
};

function AddressSection({ errors }: { errors: Partial<Record<"city" | "details" | "phone", string>> }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="bg-emerald-600 px-5 py-4 text-white">
        <h2 className="flex items-center gap-2 font-bold">
          <Icon name="tag" className="h-5 w-5" />
          Shipping Address
        </h2>
        <p className="mt-1 text-xs text-emerald-100">
          Where should we deliver your order?
        </p>
      </div>
      <div className="p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <Icon name="tag" className="h-4 w-4 text-emerald-600" />
          Saved Addresses
        </h3>
        <p className="mt-2 text-xs text-slate-500">
          Select a saved address or enter a new one below
        </p>
        <button type="button" className="mt-4 flex w-full items-center gap-3 rounded-lg border border-dashed border-emerald-500 bg-emerald-50 p-4 text-left">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald-500 text-white">
            +
          </span>
          <span>
            <b className="block text-sm text-emerald-700">
              Use a different address
            </b>
            <small className="text-xs text-slate-500">
              Enter a new shipping address manually
            </small>
          </span>
        </button>
        <div className="mt-5 rounded-lg bg-emerald-50 p-4 text-xs text-emerald-700">
          <b>Delivery Information</b>
          <p className="mt-1">
            Please ensure your address is accurate for smooth delivery.
          </p>
        </div>
        <div className="mt-5 grid gap-4">
          <label className="text-sm font-semibold text-slate-600">
            City
            <input
              placeholder="e.g. Cairo, Alexandria, Giza"
              name="city"
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-emerald-500"
            />
            {errors.city && <span className="mt-1 block text-xs font-medium text-red-600">{errors.city}</span>}
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Street Address
            <textarea
              placeholder="Street name, building number, floor, apartment..."
              name="details"
              required
              className="mt-2 h-20 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
            {errors.details && <span className="mt-1 block text-xs font-medium text-red-600">{errors.details}</span>}
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Phone Number
            <input
              placeholder="01xxxxxxxxx"
              name="phone"
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-emerald-500"
            />
            {errors.phone && <span className="mt-1 block text-xs font-medium text-red-600">{errors.phone}</span>}
          </label>
        </div>
      </div>
    </section>
  );
}

function PaymentSection({ payment, onPaymentChange }: { payment: "cash" | "online"; onPaymentChange: (payment: "cash" | "online") => void }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="bg-emerald-600 px-5 py-4 text-white">
        <h2 className="flex items-center gap-2 font-bold">
          <Icon name="cart" className="h-5 w-5" />
          Payment Method
        </h2>
        <p className="mt-1 text-xs text-emerald-100">
          Choose how you&apos;d like to pay
        </p>
      </div>
      <div className="space-y-3 p-5">
        <button type="button" onClick={() => onPaymentChange("cash")} className={`flex w-full items-center gap-4 rounded-lg p-4 text-left ${payment === "cash" ? "border-2 border-emerald-500 bg-emerald-50" : "border border-slate-200"}`}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500 text-white">
            ▣
          </span>
          <span className="flex-1">
            <b className="block text-sm text-emerald-700">Cash on Delivery</b>
            <small className="text-xs text-slate-500">
              Pay when your order arrives at your doorstep
            </small>
          </span>
          <span className={payment === "cash" ? "text-emerald-600" : "text-slate-300"}>✓</span>
        </button>
        <button type="button" onClick={() => onPaymentChange("online")} className={`flex w-full items-center gap-4 rounded-lg p-4 text-left ${payment === "online" ? "border-2 border-emerald-500 bg-emerald-50" : "border border-slate-200"}`}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-500">
            ▤
          </span>
          <span className="flex-1">
            <b className="block text-sm text-slate-700">Pay Online</b>
            <small className="text-xs text-slate-500">
              Secure payment with Credit/Debit Card
            </small>
          </span>
          <span className={`grid h-5 w-5 place-items-center rounded-full border ${payment === "online" ? "border-emerald-600 text-emerald-600" : "border-slate-300"}`}>{payment === "online" ? "✓" : ""}</span>
        </button>
        <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-4 text-xs text-emerald-700">
          <Icon name="shield" className="h-5 w-5" />
          Secure &amp; Encrypted
        </div>
      </div>
    </section>
  );
}

export default function CheckoutPage() {
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [totals, setTotals] = useState({ itemCount: 0, subtotal: "0 EGP", total: "0 EGP", shipping: "FREE" });
  const [cartId, setCartId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [payment, setPayment] = useState<"cash" | "online">("online");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"city" | "details" | "phone", string>>>({});

  useEffect(() => {
    getCart().then((raw: any) => {
      const items = raw?.products ?? raw?.cartItems ?? [];
      if (!items.length) {
        window.location.href = "/Cart";
        return;
      }
      const mapped = items.map((item: any) => ({
        id: item.product?._id ?? item._id,
        name: item.product?.title ?? item.product?.name ?? "Product",
        quantity: item.count ?? item.quantity ?? 1,
        price: `${item.price ?? item.product?.price ?? 0} EGP`,
        imageUrl: item.product?.imageCover ?? "",
      }));
      const total = raw?.totalCartPrice ?? mapped.reduce((sum: number, item: CheckoutItem) => sum + Number.parseFloat(item.price) * item.quantity, 0);
      setCheckoutItems(mapped);
      setCartId(raw?._id ?? raw?.id ?? raw?.cartId ?? null);
      setTotals({ itemCount: mapped.reduce((sum: number, item: CheckoutItem) => sum + item.quantity, 0), subtotal: `${total} EGP`, total: `${total} EGP`, shipping: "FREE" });
    }).catch(() => undefined);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!window.localStorage.getItem("freshcart-token")) {
      window.location.href = "/auth/login";
      return;
    }
    const form = new FormData(event.currentTarget);
    const address = checkoutSchema.safeParse({ city: form.get("city"), details: form.get("details"), phone: form.get("phone") });
    if (!address.success) {
      const nextErrors: Partial<Record<"city" | "details" | "phone", string>> = {};
      for (const issue of address.error.issues) {
        const field = issue.path[0] as "city" | "details" | "phone";
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setFieldErrors(nextErrors);
      setFormError("");
      return;
    }
    setFieldErrors({});
    if (!cartId) return;
    if (payment === "cash") {
      setSubmitting(true);
      setFormError("");
      try {
        await createCashOrder(cartId, address.data);
        await clearCart();
        window.localStorage.setItem("freshcart-toast", "Your purchase has been placed successfully");
        window.location.href = "/Orders";
      } catch (error) {
        setFormError(error instanceof Error ? error.message : "Unable to place your order");
      } finally {
        setSubmitting(false);
      }
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      const result = await createCheckoutSession(cartId, address.data, window.location.origin);
      const redirectUrl = result.session?.url ?? result.url ?? (result as any).data?.session?.url;
      if (redirectUrl) window.location.href = redirectUrl;
      else setFormError("The payment session could not be created. Please try again.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to start payment";
      if (/phone|mobile|number/i.test(message)) setFieldErrors({ phone: message });
      else if (/city/i.test(message)) setFieldErrors({ city: message });
      else if (/address|details/i.test(message)) setFieldErrors({ details: message });
      else setFormError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-7">
          <p className="text-sm text-slate-500">
            Home &nbsp;/&nbsp; Cart &nbsp;/&nbsp; Checkout
          </p>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-600 text-white">
                <Icon name="cart" className="h-6 w-6" />
              </span>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800">
                  Complete Your Order
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Review your items and complete your purchase
                </p>
              </div>
            </div>
            <a href="/Cart" className="text-sm font-semibold text-emerald-600">
              ← Back to Cart
            </a>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <AddressSection errors={fieldErrors} />
              <PaymentSection payment={payment} onPaymentChange={setPayment} />
              <button type="submit" disabled={submitting || !cartId} className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? "Processing Payment..." : payment === "online" ? "Pay Online" : "Place Order"}
              </button>
              {formError && <p className="text-sm font-medium text-red-600">{formError}</p>}
            </div>
            <OrderSummary {...totals} items={checkoutItems} />
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
