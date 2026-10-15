"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../Icon";

function UtilityItem({
  icon,
  children,
}: {
  icon: "truck" | "mail" | "phone" | "tag";
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <Icon name={icon} className="h-3.5 w-3.5 text-emerald-600" />
      {children}
    </span>
  );
}

export default function TopBar() {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const syncUser = () =>
      setUser(window.localStorage.getItem("freshcart-user"));
    syncUser();
    window.addEventListener("auth-change", syncUser);
    return () => window.removeEventListener("auth-change", syncUser);
  }, []);
  return (
    <div className="border-b border-slate-100 bg-white text-[11px] text-slate-500">
      <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4 px-4 py-2">
        <div className="hidden items-center gap-5 sm:flex">
          <UtilityItem icon="truck">
            Free Shipping on Orders 500 EGP
          </UtilityItem>
          <UtilityItem icon="tag">New Arrivals Daily</UtilityItem>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <UtilityItem icon="phone">+1 (800) 123-4567</UtilityItem>
          <UtilityItem icon="mail">support@freshcart.com</UtilityItem>
          {user ? (
            <>
              <span className="flex items-center gap-1">
                <Icon name="user" className="h-3.5 w-3.5" />
                {user}
              </span>
              <button
                onClick={() => {
                  window.localStorage.removeItem("freshcart-user");
                  window.localStorage.removeItem("freshcart-token");
                  window.dispatchEvent(new Event("auth-change"));
                  window.dispatchEvent(new Event("cart-change"));
                  window.dispatchEvent(new Event("wishlist-change"));
                }}
                className="hover:text-red-500"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-emerald-600">
                Sign In
              </Link>
              <Link href="/auth/signup" className="hover:text-emerald-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
