"use client";

import { useEffect, useState } from "react";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import Link from "next/link";
import { getUserIdFromToken, getUserOrders } from "@/services/orders.services";

type OrderItem = {
  id: string | number;
  name: string;
  quantity: number;
  price: string;
  imageUrl: string;
};
type Order = {
  id: string | number;
  status: "Processing" | "On the way" | "Delivered";
  date: string;
  itemCount: number;
  city: string;
  total: string;
  items: OrderItem[];
  address?: string;
  phone?: string;
};

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles =
    status === "On the way"
      ? "bg-cyan-50 text-cyan-600"
      : status === "Delivered"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-amber-50 text-amber-600";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}

function OrderCard({
  order,
  expanded = false,
  onToggle,
}: {
  order: Order;
  expanded?: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={`overflow-hidden rounded-xl border bg-white shadow-sm ${expanded ? "border-emerald-200" : "border-slate-200"}`}
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
          <img
            src={order.items[0]?.imageUrl}
            alt={order.items[0]?.name ?? "Order item"}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={order.status} />
            <span className="text-sm font-bold text-slate-800">
              # {order.id}
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {order.date} &nbsp; · &nbsp; {order.itemCount} items &nbsp; · &nbsp;{" "}
            {order.city}
          </p>
          <p className="mt-3 text-xl font-extrabold text-slate-800">
            {order.total}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <button
            className="grid h-10 w-10 place-items-center rounded-lg bg-slate-50 text-slate-500"
            aria-label="Order actions"
          >
            •••
          </button>
          <button onClick={onToggle} className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
            {expanded ? "Hide" : "Details"}⌄
          </button>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-emerald-100">
          <div className="p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Icon name="cart" className="h-4 w-4 text-emerald-600" />
              Order Items
            </h3>
            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-10 w-10 object-contain"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.quantity} × {item.price}
                      </p>
                    </div>
                  </div>
                  <b className="text-sm text-slate-700">{item.price}</b>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-100 p-4">
                <h3 className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Icon name="tag" className="h-4 w-4 text-emerald-600" />
                  Delivery Address
                </h3>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {order.city}
                </p>
                <p className="mt-1 text-xs text-slate-500">{order.address}</p>
                <p className="mt-3 text-xs text-slate-500">{order.phone}</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <h3 className="flex items-center gap-2 text-xs font-bold text-amber-700">
                  <Icon name="cart" className="h-4 w-4" />
                  Order Summary
                </h3>
                <div className="mt-3 flex justify-between text-xs text-slate-600">
                  <span>Subtotal</span>
                  <span>{order.total}</span>
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="mt-4 flex justify-between font-bold text-slate-800">
                  <span>Total</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | number | null>(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToast = window.localStorage.getItem("freshcart-toast");
    if (savedToast) {
      setToast(savedToast);
      window.localStorage.removeItem("freshcart-toast");
      window.setTimeout(() => setToast(""), 3500);
    }
    const userId = getUserIdFromToken();
    if (!userId) {
      setLoading(false);
      return;
    }

    getUserOrders(userId)
      .then((response) => {
        const data = Array.isArray(response) ? response : [];
        const mappedOrders: Order[] = data.map((raw: any) => ({
          id: raw._id ?? raw.id,
          status: (raw.isDelivered ? "Delivered" : raw.isPaid ? "On the way" : "Processing") as Order["status"],
          date: raw.createdAt ? new Date(raw.createdAt).toLocaleDateString() : "",
          itemCount: raw.cartItems?.length ?? 0,
          city: raw.shippingAddress?.city ?? "",
          total: `${raw.totalOrderPrice ?? 0} EGP`,
          address: raw.shippingAddress?.details ?? "",
          phone: raw.shippingAddress?.phone ?? "",
          items: (raw.cartItems ?? []).map((item: any) => ({
            id: item._id ?? item.product?._id,
            name: item.product?.title ?? item.product?.name ?? "Product",
            quantity: item.count ?? item.quantity ?? 1,
            price: `${item.price ?? item.product?.price ?? 0} EGP`,
            imageUrl: item.product?.imageCover ?? "",
          })),
        }));
        setOrders(mappedOrders);
        setExpandedOrderId(mappedOrders[0]?.id ?? null);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      {toast && <div role="status" className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-xl ring-1 ring-emerald-100">{toast}</div>}
      <main className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Home &nbsp;/&nbsp; My Orders
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-600 text-white">
                  <Icon name="cart" className="h-6 w-6" />
                </span>
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-800">
                    My Orders
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Track and manage your orders
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/"
              className="hidden text-sm font-semibold text-emerald-600 sm:block"
            >
              Continue Shopping
            </Link>
          </div>
          <section className="mt-8 space-y-4">
            {orders.map((order, index) => (
              <OrderCard key={order.id} order={order} expanded={expandedOrderId === order.id} onToggle={() => setExpandedOrderId((current) => current === order.id ? null : order.id)} />
            ))}
            {loading && (
              <div className="rounded-xl border border-slate-200 bg-white px-6 py-24 text-center text-sm text-slate-400">
                Loading your orders...
              </div>
            )}
            {!loading && orders.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center text-sm text-slate-400">
                No orders yet.
              </div>
            )}
          </section>
        </div>
      </main>
      <Services />
      <Footer />
    </>
  );
}
