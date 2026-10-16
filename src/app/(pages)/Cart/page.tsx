"use client";

import { useEffect, useState } from "react";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import OrderSummary from "@/Components/OrderSummary";
import Link from "next/link";
import { getCart, removeFromCart, updateCartQuantity } from "@/services/cart.services";

type CartItem = {
  id: string | number;
  name: string;
  category: string;
  sku: string;
  price: string;
  total: string;
  quantity: number;
  imageUrl: string;
  inStock: boolean;
};

function CartItemCard({ item, onChangeQuantity, onRemove }: { item: CartItem; onChangeQuantity: (id: string | number, count: number) => void; onRemove: (id: string | number) => void }) {
  return (
    <article className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-slate-800">{item.name}</h2>
        <p className="mt-2 text-xs text-slate-400">
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">
            {item.category}
          </span>
          <span className="mx-2">·</span>SKU: {item.sku}
        </p>
        <p className="mt-4 text-lg font-bold text-emerald-600">
          {item.price}{" "}
          <span className="text-xs font-normal text-slate-400">per unit</span>
        </p>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-semibold text-white">
          <Icon name="shield" className="h-3 w-3" />
          {item.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
        <div className="flex h-9 items-center overflow-hidden rounded-lg border border-slate-200">
          <button onClick={() => onChangeQuantity(item.id, Math.max(1, item.quantity - 1))} className="grid h-full w-9 place-items-center text-slate-500">
            −
          </button>
          <span className="grid h-full w-9 place-items-center border-x border-slate-200 text-sm">
            {item.quantity}
          </span>
          <button onClick={() => onChangeQuantity(item.id, item.quantity + 1)} className="grid h-full w-9 place-items-center bg-emerald-600 text-white">
            +
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-400">Total</p>
            <strong className="text-lg text-slate-800">{item.total}</strong>
          </div>
          <button onClick={() => onRemove(item.id)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-red-200 text-red-500"
            aria-label={`Remove ${item.name}`}
          >
            <Icon name="delete" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2500); };
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + Number(item.price.replace(" EGP", "")) * item.quantity, 0);
  const changeQuantity = (id: string | number, count: number) => updateCartQuantity(id, count).then(() => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: count, total: `${Number(item.price.replace(" EGP", "")) * count} EGP` } : item))).catch((error) => notify(error instanceof Error ? error.message : "Unable to update cart"));
  const removeItem = (id: string | number) => removeFromCart(id).then(() => { setItems((current) => current.filter((item) => item.id !== id)); notify("Removed from cart"); }).catch((error) => notify(error instanceof Error ? error.message : "Unable to remove item"));
  const clearAllItems = async () => {
    if (!items.length) return;
    try {
      await Promise.all(items.map((item) => removeFromCart(item.id)));
      setItems([]);
    } catch (error) {
      notify(error instanceof Error ? error.message : "Unable to clear the cart");
    }
  };
  useEffect(() => { const clearOnLogout = () => { if (!window.localStorage.getItem("freshcart-token")) setItems([]); }; window.addEventListener("auth-change", clearOnLogout); getCart().then((cart) => { const source = cart.products ?? cart.cartItems ?? []; setItems((source as any[]).map((entry) => { const product = entry.product ?? entry; const quantity = entry.count ?? entry.quantity ?? 1; const price = entry.price ?? entry.priceAfterDiscount ?? product.priceAfterDiscount ?? product.price ?? 0; return { id: product._id ?? product.id, name: product.title ?? product.name, category: product.category?.name ?? "Product", sku: product._id ?? product.id, price: `${price} EGP`, total: `${Number(price) * quantity} EGP`, quantity, imageUrl: product.imageCover ?? product.imageUrl ?? "", inStock: true }; })); }).catch(() => setItems([])).finally(() => setLoading(false)); return () => window.removeEventListener("auth-change", clearOnLogout); }, []);
  return (
    <>
      <Navbar />
      {toast && <div role="status" className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-xl ring-1 ring-emerald-100">{toast}</div>}
      <main className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-7">
          <p className="text-sm text-slate-500">
            Home &nbsp;/&nbsp; Shopping Cart
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-600 text-white">
              <Icon name="cart" className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800">
                Shopping Cart
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                You have{" "}
                <b className="text-emerald-600">
                  {itemCount} items
                </b>{" "}
                in your cart
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]">
            <section className="space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} onChangeQuantity={changeQuantity} onRemove={removeItem} />
              ))}
              {!loading && items.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center text-sm text-slate-400">
                  Your Cart is empty
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-5">
                <Link href="/" className="text-sm font-semibold text-emerald-600">
                  ← Continue Shopping
                </Link>
                <button onClick={() => void clearAllItems()} disabled={!items.length} className="text-sm text-slate-400 disabled:cursor-not-allowed disabled:opacity-50">
                  Clear all items
                </button>
              </div>
            </section>
            <OrderSummary itemCount={itemCount} subtotal={`${subtotal} EGP`} total={`${subtotal} EGP`} shipping="FREE" />
          </div>
        </div>
      </main>
      <Services />
      <Footer />
    </>
  );
}
