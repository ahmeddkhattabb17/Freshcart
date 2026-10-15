"use client";

import { useEffect, useState } from "react";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import Link from "next/link";
import { getWishlist, removeFromWishlist } from "@/services/wishlist.services";
import { addToCart } from "@/services/cart.services";

type WishlistItem = {
  id: string | number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  imageUrl: string;
  inStock: boolean;
};

const wishlistItems: WishlistItem[] = [];

function WishlistRow({ item, onRemove }: { item: WishlistItem; onRemove: (id: string | number) => void }) {
  return (
    <div className="grid items-center gap-4 border-t border-slate-100 px-5 py-4 md:grid-cols-[minmax(300px,1.8fr)_150px_150px_185px]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <h2 className="font-semibold text-slate-700">{item.name}</h2>
          <p className="mt-1 text-xs text-slate-400">{item.category}</p>
        </div>
      </div>
      <div>
        <strong className="text-sm text-slate-700">{item.price}</strong>
        {item.oldPrice && (
          <del className="ml-2 block text-xs text-slate-400">
            {item.oldPrice}
          </del>
        )}
      </div>
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${item.inStock ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
      >
        {item.inStock ? "In Stock" : "Out of Stock"}
      </span>
      <div className="flex items-center gap-2">
        <button onClick={() => { if (!window.localStorage.getItem("freshcart-token")) { window.alert("Please sign in first"); return; } void addToCart(item.id).then(() => window.alert("Added to cart")).catch((error) => window.alert(error.message)); }} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700">
          <Icon name="cart" className="h-4 w-4" />
          Add to Cart
        </button>
        <button onClick={() => onRemove(item.id)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:text-red-500"
          aria-label={`Remove ${item.name}`}
        >
          <Icon name="delete" className="h-4 w-4" />
        </button>
      </div>
    </div>
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

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const removeItem = (id: string | number) => removeFromWishlist(id).then(() => setItems((current) => current.filter((item) => item.id !== id))).catch((error) => window.alert(error.message));
  useEffect(() => { const clearOnLogout = () => { if (!window.localStorage.getItem("freshcart-token")) setItems([]); }; window.addEventListener("auth-change", clearOnLogout); getWishlist().then((data: any[]) => setItems(data.map((entry) => { const product = entry.product ?? entry; return { id: product._id ?? product.id, name: product.title ?? product.name, category: product.category?.name ?? "Product", price: `${product.priceAfterDiscount ?? product.price ?? 0} EGP`, oldPrice: product.priceAfterDiscount ? `${product.price} EGP` : undefined, imageUrl: product.imageCover ?? product.imageUrl ?? "", inStock: true }; }))).catch(() => setItems([])); return () => window.removeEventListener("auth-change", clearOnLogout); }, []);
  return (
    <>
      <Navbar />
      <main className="min-h-[720px] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-7">
          <p className="text-sm text-slate-500">Home &nbsp;/&nbsp; Wishlist</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-500">
              <Icon name="heart" className="h-6 w-6 fill-current" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800">
                My Wishlist
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {items.length} items saved
              </p>
            </div>
          </div>
          <section className="mt-8 overflow-hidden rounded-xl border border-slate-200">
            <div className="hidden bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid md:grid-cols-[minmax(300px,1.8fr)_150px_150px_185px]">
              <span>Product</span>
              <span>Price</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {items.map((item) => (
                <WishlistRow key={item.id} item={item} onRemove={removeItem} />
            ))}
            {items.length === 0 && (
              <div className="px-6 py-24 text-center text-sm text-slate-400">
                Your Wishlist is empty
              </div>
            )}
          </section>
          <Link
            href="/"
            className="mt-7 inline-block text-sm font-semibold text-slate-500 hover:text-emerald-600"
          >
            ← Continue Shopping
          </Link>
        </div>
      </main>
      <Services />
      <Footer />
    </>
  );
}
