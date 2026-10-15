"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "../Icon";
import RatingStars from "../RatingStars";
import type { ProductCard } from "@/types/products";
import { addToCart } from "@/services/cart.services";
import { addToWishlist } from "@/services/wishlist.services";

export default function Cards({ items = [], columns = 5 }: { items?: ProductCard[]; columns?: 4 | 5 }) {
  const [message, setMessage] = useState("");
  const [likedProducts, setLikedProducts] = useState<Set<string | number>>(new Set());
  async function action(request: Promise<unknown>, success: string) { try { await request; setMessage(success); window.setTimeout(() => setMessage(""), 2200); } catch (error) { setMessage(error instanceof Error ? error.message : "Please sign in first"); } }
  function guarded(request: () => Promise<unknown>, success: string) {
    if (!window.localStorage.getItem("freshcart-token")) { setMessage("Please sign in first"); return; }
    void action(request(), success);
  }
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
      {items.map((product) => (
        <article
          key={product.id}
          className="group relative overflow-hidden rounded-md border border-slate-200 bg-white p-2 transition hover:-translate-y-0.5 hover:shadow-md sm:p-3"
        >
          <div className="absolute right-1.5 top-2 z-10 flex flex-col gap-1 text-slate-400">
            <button onClick={() => guarded(() => addToWishlist(product.id), "Added to wishlist")}
              className={`grid h-6 w-6 place-items-center rounded-full bg-white/90 hover:text-rose-500 ${likedProducts.has(product.id) ? "text-red-500" : "text-slate-400"}`}
              aria-label={`Add ${product.name} to wishlist`}
            >
              <span onClick={() => { if (window.localStorage.getItem("freshcart-token")) setLikedProducts((current) => new Set(current).add(product.id)); }}>
                <Icon name="heart" className="h-3.5 w-3.5" />
              </span>
            </button>
            <button onClick={() => guarded(() => addToCart(product.id), "Added to cart")}
              className="grid h-6 w-6 place-items-center rounded-full bg-white/90 hover:text-emerald-600"
              aria-label={`Compare ${product.name}`}
            >
              <Icon name="return" className="h-3.5 w-3.5" />
            </button>
          </div>
          <Link href={`/ProductDetails?productId=${encodeURIComponent(String(product.id))}`} aria-label={`View ${product.name}`} className="block">
          <div
            className={`relative mb-2 flex aspect-square items-center justify-center overflow-hidden rounded-md ${product.accent ?? "bg-slate-50"}`}
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <Icon name="tag" className="h-12 w-12 opacity-30" />
            )}
            {product.discount && (
              <span className="absolute left-1.5 top-1.5 rounded-sm bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                -{product.discount}
              </span>
            )}
          </div>
          </Link>
          <p className="mb-1 text-[9px] text-slate-400">{product.category}</p>
          <h3 className="min-h-10 text-[11px] font-semibold leading-4 text-slate-700">
            {product.name}
          </h3>
          <div className="mt-1">
            <RatingStars value={product.rating} size={12} />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <strong className="text-xs font-extrabold text-emerald-600 sm:text-sm">
                {product.price}
              </strong>
              {product.oldPrice && (
                <del className="text-[9px] text-slate-400">
                  {product.oldPrice}
                </del>
              )}
            </div>
            <button
              onClick={() => guarded(() => addToCart(product.id), "Added to cart")}
              className="grid h-7 w-7 place-items-center rounded-full bg-emerald-600 text-white"
              aria-label={`Add ${product.name} to cart`}
            >
              <Icon name="plus" className="h-4 w-4" />
            </button>
          </div>
        </article>
      ))}
      {message && <div role="status" className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-xl ring-1 ring-emerald-100">{message}</div>}
    </div>
  );
}
