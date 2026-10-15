"use client";

import { useEffect, useMemo, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/Components/common/Footer";
import Navbar from "@/Components/common/Navbar";
import Cards from "@/Components/common/Cards";
import Icon from "@/Components/Icon";
import { getProductCards } from "@/services/products.services";
import { getCategoryCards } from "@/services/categories.services";
import { getBrandCards } from "@/services/brands.services";
import type { ProductCard } from "@/types/products";

const PAGE_SIZE = 12;

function SearchContent() {
  const params = useSearchParams();
  const query = params.get("query") ?? "";
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [categories, setCategories] = useState<{ id: string | number; name: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string | number; name: string }[]>([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    void Promise.all([getProductCards(), getCategoryCards(), getBrandCards()]).then(([productData, categoryData, brandData]) => {
      setProducts(productData);
      setCategories(categoryData);
      setBrands(brandData);
    }).catch(() => undefined);
  }, []);

  const filtered = useMemo(() => products.filter((product) => {
    const price = Number.parseFloat(product.price);
    return (!query || `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())) &&
      (!category || product.category === category) &&
      (!brand || product.name.toLowerCase().includes(brand.toLowerCase())) &&
      (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice));
  }), [products, query, category, brand, minPrice, maxPrice]);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => setPage(1), [query, category, brand, minPrice, maxPrice]);

  return <><Navbar /><main className="bg-slate-50"><div className="mx-auto max-w-6xl px-4 py-6"><p className="text-sm text-slate-500">Home &nbsp;/&nbsp; Search Results</p><div className="mt-4 flex max-w-xl items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-400"><Icon name="search" className="h-5 w-5" /><span>{query || "Search for products..."}</span></div><div className="mt-10 grid gap-6 lg:grid-cols-[190px_1fr]"><aside className="h-fit rounded-xl border border-slate-200 bg-white p-4"><h2 className="font-bold text-slate-700">Categories</h2><div className="mt-3 space-y-2">{categories.map((item) => <label key={item.id} className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" checked={category === item.name} onChange={() => setCategory(category === item.name ? "" : item.name)} />{item.name}</label>)}</div><hr className="my-5" /><h2 className="font-bold text-slate-700">Price Range</h2><div className="mt-3 grid grid-cols-2 gap-2"><input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="number" placeholder="Min" className="w-full rounded border p-2 text-xs" /><input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" placeholder="Max" className="w-full rounded border p-2 text-xs" /></div><hr className="my-5" /><h2 className="font-bold text-slate-700">Brands</h2><div className="mt-3 max-h-52 space-y-2 overflow-auto">{brands.map((item) => <label key={item.id} className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" checked={brand === item.name} onChange={() => setBrand(brand === item.name ? "" : item.name)} />{item.name}</label>)}</div></aside><section><div className="mb-4 flex items-center justify-between text-sm text-slate-500"><span>{filtered.length} products found</span><select className="rounded border border-slate-200 bg-white px-3 py-2"><option>Relevance</option></select></div><Cards items={visible} columns={4} /><div className="mt-8 flex justify-center gap-2">{Array.from({ length: pages }, (_, index) => index + 1).map((item) => <button key={item} onClick={() => setPage(item)} className={`h-9 w-9 rounded-md text-sm ${page === item ? "bg-emerald-600 text-white" : "border bg-white text-slate-600"}`}>{item}</button>)}</div></section></div></div></main><Footer /></>;
}

export default function SearchPage() {
  return <Suspense fallback={<main className="min-h-screen bg-slate-50" />}><SearchContent /></Suspense>;
}
