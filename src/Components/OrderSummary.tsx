import Icon from "./Icon";
import Link from "next/link";

type SummaryItem = {
  id: string | number;
  name: string;
  quantity: number;
  price: string;
  imageUrl: string;
};
type OrderSummaryProps = {
  itemCount: number;
  subtotal: string;
  total: string;
  shipping?: string;
  items?: SummaryItem[];
};

export default function OrderSummary({
  itemCount,
  subtotal,
  total,
  shipping = "FREE",
  items = [],
}: OrderSummaryProps) {
  return (
    <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-emerald-600 px-6 py-5 text-white">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Icon name="cart" className="h-5 w-5" />
          Order Summary
        </h2>
        <p className="mt-1 text-sm text-emerald-100">
          {itemCount} items in your cart
        </p>
      </div>
      <div className="p-5">
        {items.length > 0 && (
          <div className="max-h-48 space-y-2 overflow-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-9 w-9 object-contain"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-700">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {item.quantity} × {item.price}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-4 text-emerald-700">
          <Icon name="truck" className="h-6 w-6" />
          <div>
            <p className="font-semibold">Free Shipping!</p>
            <p className="text-xs">You qualify for free delivery</p>
          </div>
        </div>
        <dl className="mt-5 space-y-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Subtotal</dt>
            <dd className="font-semibold text-slate-700">{subtotal}</dd>
          </div>
          <div className="flex justify-between border-b border-dashed border-slate-200 pb-4">
            <dt className="text-slate-500">Shipping</dt>
            <dd className="font-semibold text-emerald-600">{shipping}</dd>
          </div>
          <div className="flex justify-between text-base">
            <dt className="font-bold text-slate-700">Total</dt>
            <dd className="font-extrabold text-slate-800">{total}</dd>
          </div>
        </dl>
        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-sm text-slate-500">
          ◆ Apply Promo Code
        </button>
        <Link
          href={itemCount > 0 ? "/Checkout" : "/Cart"}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          <Icon name="shield" className="h-4 w-4" />
          {itemCount > 0 ? "Secure Checkout" : "Cart is empty"}
        </Link>
        <div className="mt-5 flex justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Icon name="shield" className="h-3.5 w-3.5 text-emerald-500" />
            Secure Payment
          </span>
          <span className="flex items-center gap-1">
            <Icon name="truck" className="h-3.5 w-3.5 text-blue-500" />
            Fast Delivery
          </span>
        </div>
        <Link
          href="/"
          className="mt-7 block text-center text-sm font-semibold text-emerald-600"
        >
          ← Continue Shopping
        </Link>
      </div>
    </aside>
  );
}
