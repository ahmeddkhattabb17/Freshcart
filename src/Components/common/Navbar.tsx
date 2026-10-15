"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Icon from "../Icon";
import TopBar from "./TopBar";
import logo from "@/assets/Images/freshcart-logo.svg";
import { getCart } from "@/services/cart.services";
import { getWishlist } from "@/services/wishlist.services";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/Shop" },
  { label: "Brands", href: "/Brands" },
];

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/Search${search.trim() ? `?query=${encodeURIComponent(search.trim())}` : ""}`);
  }

  useEffect(() => {
    const syncUser = () =>
      setUser(window.localStorage.getItem("freshcart-user"));
    syncUser();
    window.addEventListener("auth-change", syncUser);
    const syncCounts = () => {
      if (!window.localStorage.getItem("freshcart-token")) { setCartCount(0); setWishlistCount(0); return; }
      void getCart().then((cart: any) => setCartCount((cart.products ?? cart.cartItems ?? []).reduce((sum: number, item: any) => sum + (item.count ?? item.quantity ?? 1), 0))).catch(() => setCartCount(0));
      void getWishlist().then((items: any[]) => setWishlistCount(items.length)).catch(() => setWishlistCount(0));
    };
    syncCounts();
    window.addEventListener("auth-change", syncCounts);
    window.addEventListener("cart-change", syncCounts);
    window.addEventListener("wishlist-change", syncCounts);
    return () => { window.removeEventListener("auth-change", syncUser); window.removeEventListener("auth-change", syncCounts); window.removeEventListener("cart-change", syncCounts); window.removeEventListener("wishlist-change", syncCounts); };
  }, []);

  const signOut = () => {
    window.localStorage.removeItem("freshcart-user");
    window.localStorage.removeItem("freshcart-token");
    window.dispatchEvent(new Event("auth-change"));
    window.dispatchEvent(new Event("cart-change"));
    window.dispatchEvent(new Event("wishlist-change"));
  };

  return (
    <>
      <TopBar />
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1520px] items-center gap-3 px-3 py-3 sm:gap-5 sm:px-4">
          <Link href="/" className="-ml-4 shrink-0" aria-label="FreshCart home">
            <img
              src={logo.src}
              alt="FreshCart"
              className="h-9 w-auto sm:h-10"
            />
          </Link>
          <form onSubmit={submitSearch} className="relative z-0 ml-2 flex min-w-0 flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-2 text-slate-400 sm:px-4 sm:py-2.5 sm:text-sm xl:flex-[1.3] 2xl:flex-[1.5] xl:mr-[-18px] 2xl:mr-[-28px]">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for products, brands and more..."
              className="hidden min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400 sm:block"
            />
            <button
              aria-label="Search"
              className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-white"
            >
              <Icon name="search" className="h-4 w-4" />
            </button>
          </form>
          <nav
            className="relative z-10 hidden items-center gap-7 bg-white pl-3 text-sm font-medium text-slate-700 xl:flex"
            aria-label="Primary navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap hover:text-emerald-600"
              >
                {item.label}
              </Link>
            ))}
            <div className="group relative">
              <button
                className="flex cursor-pointer items-center gap-1 whitespace-nowrap hover:text-emerald-600"
                aria-haspopup="menu"
              >
                Categories
                <ExpandMoreIcon
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fontSize="inherit"
                />
              </button>
              <div className="invisible absolute right-0 top-6 z-30 w-48 translate-y-1 rounded-lg border border-slate-100 bg-white p-2 text-sm opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link
                  href="/Categories"
                  className="block rounded-md px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  All Categories
                </Link>
                <Link
                  href="/Categories/Men"
                  className="block rounded-md px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Men Fashion
                </Link>
                <Link
                  href="/Categories/Women"
                  className="block rounded-md px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Women Fashion
                </Link>
                <Link
                  href="/Categories/Electronics"
                  className="block rounded-md px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Electronics
                </Link>
              </div>
            </div>
          </nav>
          <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 xl:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <Icon name="headset" className="h-4 w-4" />
            </span>
            <span className="text-[10px] leading-3 text-slate-500">
              Support
              <br />
              <b className="text-slate-700">24/7 Help</b>
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-slate-600">
            <Link
              href="/Wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-slate-50"
              aria-label="Wishlist"
            >
              <Icon name="heart" className="h-6 w-6 text-red-500" />
              {wishlistCount > 0 && <span className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[9px] text-white">{wishlistCount}</span>}
            </Link>
            <Link
              href="/Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-slate-50"
              aria-label="Shopping cart"
            >
              <Icon name="cart" className="h-6 w-6" />
              <span className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-full bg-emerald-600 text-[9px] text-white">
                {cartCount}
              </span>
            </Link>
            {user ? (
              <div className="group relative ml-1 hidden sm:block">
                <button className="flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Icon name="user" className="h-5 w-5" />
                  </span>
                  <span className="max-w-28 truncate">{user}</span>
                </button>
                <div className="invisible absolute right-0 top-11 z-40 w-64 translate-y-1 rounded-xl border border-slate-100 bg-white p-3 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center gap-3 border-b border-slate-100 px-2 pb-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <Icon name="user" />
                    </span>
                    <b className="truncate text-sm">{user}</b>
                  </div>
                  <div className="space-y-1 py-2 text-sm text-slate-600">
                    <Link
                      href="/Account"
                      className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"
                    >
                      <Icon name="user" className="h-4 w-4" />
                      My Profile
                    </Link>
                    <Link
                      href="/Orders"
                      className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"
                    >
                      <Icon name="cart" className="h-4 w-4" />
                      My Orders
                    </Link>
                    <Link
                      href="/Wishlist"
                      className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"
                    >
                      <Icon name="heart" className="h-4 w-4" />
                      My Wishlist
                    </Link>
                    <Link
                      href="/Account"
                      className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"
                    >
                      <Icon name="layers" className="h-4 w-4" />
                      Addresses
                    </Link>
                    <Link
                      href="/Account"
                      className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"
                    >
                      <Icon name="shield" className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>
                  <button
                    onClick={signOut}
                    className="flex w-full items-center gap-3 border-t border-slate-100 px-2 pt-3 text-sm font-semibold text-red-500"
                  >
                    <Icon name="arrow" className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="ml-1 mr-2 hidden rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 sm:block"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
