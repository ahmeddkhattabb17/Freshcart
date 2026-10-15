"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import LayersIcon from "@mui/icons-material/Layers";
import LabelIcon from "@mui/icons-material/Label";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShieldIcon from "@mui/icons-material/Shield";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import type { SvgIconComponent } from "@mui/icons-material";
import { getAdminUserOrders } from "@/services/admin.services";
import { deleteAdminReview, updateAdminReview } from "@/services/admin.services";

const iconMap: Record<string, SvgIconComponent> = {
  cart: ShoppingCartIcon,
  layers: LayersIcon,
  star: StarIcon,
  user: PersonIcon,
  tag: LabelIcon,
  search: SearchIcon,
  mail: EmailIcon,
  plus: AddIcon,
  shield: ShieldIcon,
  truck: LocalShippingIcon,
};
function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Component = iconMap[name] ?? LayersIcon;
  return <Component className={className} fontSize="small" />;
}

type Tab = "overview" | "reviews" | "users" | "catalog";
type Review = {
  id: string | number;
  product: string;
  user: string;
  rating: number;
  text: string;
  date: string;
};
type User = {
  id: string | number;
  name: string;
  email: string;
  role: string;
  joined: string;
  status: string;
};
type CatalogItem = {
  id: string | number;
  name: string;
  count?: number | string;
  imageUrl?: string;
};

const navigation: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "layers" },
  { id: "reviews", label: "Reviews", icon: "star" },
  { id: "users", label: "Users", icon: "user" },
  { id: "catalog", label: "Catalog", icon: "cart" },
];

export default function AdminDashboard({
  categories = [],
  products = [],
  brands = [],
  reviews = [],
  users = [],
}: {
  categories?: CatalogItem[];
  products?: CatalogItem[];
  brands?: CatalogItem[];
  reviews?: Review[];
  users?: User[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#53CE74] text-white">
              <Icon name="cart" />
            </span>
            <div>
              <p className="text-lg font-extrabold">FreshCart</p>
              <p className="text-[11px] uppercase tracking-widest text-slate-400">
                Admin panel
              </p>
            </div>
          </div>
          <div className="px-4 py-6">
            <p className="px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Workspace
            </p>
            <nav className="mt-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${activeTab === item.id ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-auto border-t border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">
                A
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">Administrator</p>
                <p className="truncate text-xs text-slate-400">
                  admin@freshcart.com
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-sm text-slate-400">FreshCart / Admin</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight">
                {navigation.find((item) => item.id === activeTab)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Search"
                className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500"
              >
                <Icon name="search" />
              </button>
              <button
                onClick={() =>
                  notify("Notifications are connected to your API.")
                }
                aria-label="Notifications"
                className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500"
              >
                <Icon name="mail" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />
              </button>
              <div className="hidden items-center gap-2 border-l border-slate-200 pl-4 sm:flex">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                  A
                </span>
                <span className="text-sm font-semibold">Admin</span>
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 bg-white px-5 lg:hidden">
            <div className="flex gap-1 overflow-x-auto py-3">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === item.id ? "bg-emerald-50 text-emerald-700" : "text-slate-500"}`}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-8">
            {activeTab === "overview" && (
              <Overview
                reviews={reviews}
                users={users}
                products={products}
                onAction={notify}
              />
            )}
            {activeTab === "reviews" && (
              <Reviews reviews={reviews} onAction={notify} />
            )}
            {activeTab === "users" && <Users users={users} />}
            {activeTab === "catalog" && (
              <Catalog
                products={products}
                brands={brands}
                categories={categories}
              />
            )}
          </div>
        </main>
      </div>
      {toast && (
        <div
          role="status"
          className="fixed left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-xl ring-1 ring-emerald-100"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#53CE74]">
            ✓
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}

function Overview({
  reviews,
  users,
  products,
  onAction,
}: {
  reviews: Review[];
  users: User[];
  products: CatalogItem[];
  onAction: (message: string) => void;
}) {
  const stats = [
    {
      label: "Total products",
      value: products.length,
      icon: "cart",
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Registered users",
      value: users.length,
      icon: "user",
      tone: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending reviews",
      value: reviews.length,
      icon: "star",
      tone: "bg-amber-50 text-amber-600",
    },
    {
      label: "Store health",
      value: "100%",
      icon: "shield",
      tone: "bg-violet-50 text-violet-600",
    },
  ];
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <span
                className={`grid h-11 w-11 place-items-center rounded-lg ${stat.tone}`}
              >
                <Icon name={stat.icon} />
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                Live
              </span>
            </div>
            <p className="mt-5 text-3xl font-extrabold">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Admin actions</h2>
              <p className="mt-1 text-sm text-slate-400">
                Keep your marketplace running smoothly.
              </p>
            </div>
            <Icon name="plus" className="text-emerald-600" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              onClick={() => onAction("Review moderation opened.")}
              className="rounded-lg border border-slate-200 p-4 text-left hover:border-emerald-300 hover:bg-emerald-50"
            >
              <Icon name="star" className="text-amber-500" />
              <p className="mt-3 text-sm font-bold">Moderate reviews</p>
              <p className="mt-1 text-xs text-slate-400">
                Update or remove feedback
              </p>
            </button>
            <button
              onClick={() => onAction("User management opened.")}
              className="rounded-lg border border-slate-200 p-4 text-left hover:border-emerald-300 hover:bg-emerald-50"
            >
              <Icon name="user" className="text-blue-500" />
              <p className="mt-3 text-sm font-bold">Manage users</p>
              <p className="mt-1 text-xs text-slate-400">
                View your customer base
              </p>
            </button>
            <button
              onClick={() => onAction("Catalog management opened.")}
              className="rounded-lg border border-slate-200 p-4 text-left hover:border-emerald-300 hover:bg-emerald-50"
            >
              <Icon name="layers" className="text-violet-500" />
              <p className="mt-3 text-sm font-bold">Manage catalog</p>
              <p className="mt-1 text-xs text-slate-400">
                Products and classifications
              </p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Reviews({
  reviews,
  onAction,
}: {
  reviews: Review[];
  onAction: (message: string) => void;
}) {
  const [reviewItems, setReviewItems] = useState(reviews);

  async function removeReview(reviewId: string | number) {
    try {
      await deleteAdminReview(reviewId);
      setReviewItems((current) => current.filter((review) => review.id !== reviewId));
      onAction("Review deleted successfully.");
    } catch (error) {
      onAction(error instanceof Error ? error.message : "Unable to delete review.");
    }
  }

  async function editReview(review: Review) {
    const text = window.prompt("Review text", review.text);
    if (text === null) return;
    const ratingValue = window.prompt("Rating from 1 to 5", String(review.rating));
    if (ratingValue === null) return;
    const rating = Number(ratingValue);
    if (!text.trim() || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      onAction("Enter review text and a rating from 1 to 5.");
      return;
    }
    try {
      await updateAdminReview(review.id, text.trim(), rating);
      setReviewItems((current) => current.map((item) => item.id === review.id ? { ...item, text: text.trim(), rating } : item));
      onAction("Review updated successfully.");
    } catch (error) {
      onAction(error instanceof Error ? error.message : "Unable to update review.");
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-6">
        <div>
          <h2 className="font-bold">Review moderation</h2>
          <p className="mt-1 text-sm text-slate-400">
            Update or delete customer reviews.
          </p>
        </div>
        <button
          onClick={() => onAction("Review list refreshed.")}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
        >
          Refresh
        </button>
      </div>
      {reviewItems.length === 0 ? (
        <EmptyState
          title="No reviews to moderate"
          message="No reviews are available to moderate."
        />
      ) : (
        <div className="divide-y divide-slate-100">
          {reviewItems.map((review) => (
            <div
              key={review.id}
              className="flex flex-wrap items-center justify-between gap-4 p-5"
            >
              <div>
                <p className="font-bold">{review.product}</p>
                <p className="text-sm text-slate-500">
                  {review.user} · {review.date}
                </p>
                <p className="mt-2 text-sm text-slate-600">{review.text}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    void editReview(review)
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold"
                >
                  Update
                </button>
                <button
                  onClick={() =>
                    void removeReview(review.id)
                  }
                  className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Users({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  async function showOrders(userId: string) {
    if (selectedUser === userId) {
      setSelectedUser(null);
      return;
    }
    setSelectedUser(userId);
    setOrdersLoading(true);
    try {
    const result = await getAdminUserOrders(String(userId));
      setOrders(Array.isArray(result) ? result : []);
    } finally {
      setOrdersLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-6">
        <h2 className="font-bold">All users</h2>
        <p className="mt-1 text-sm text-slate-400">
          Registered customer accounts.
        </p>
      </div>
      {users.length === 0 ? (
        <EmptyState
          title="No users loaded"
          message="No users were returned by the API."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="cursor-pointer hover:bg-slate-50" onClick={() => void showOrders(String(user.id))}>
                  <td className="px-6 py-4">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.joined}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedUser && (
            <div className="border-t border-slate-100 bg-slate-50 p-6">
              <h3 className="font-bold">Orders for selected user</h3>
              {ordersLoading ? <p className="mt-2 text-sm text-slate-500">Loading orders...</p> : orders.length === 0 ? <p className="mt-2 text-sm text-slate-500">No orders found for this user.</p> : (
                <div className="mt-3 grid gap-2">
                  {orders.map((order: any) => <div key={order._id ?? order.id} className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm"><span>Order #{order._id ?? order.id}</span><b>{order.totalOrderPrice ?? order.total ?? 0} EGP</b></div>)}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Catalog({
  products,
  brands,
  categories,
}: {
  products: CatalogItem[];
  brands: CatalogItem[];
  categories: CatalogItem[];
}) {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const groups = [
    {
      label: "Products",
      items: showAllProducts ? products : products.slice(0, 10),
      total: products.length,
      icon: "cart",
    },
    { label: "Brands", items: showAllBrands ? brands : brands.slice(0, 10), total: brands.length, icon: "tag" },
    { label: "Categories", items: categories, icon: "layers" },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {groups.map((group) => (
        <section
          key={group.label}
          className="rounded-xl border border-slate-200 bg-white"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 p-5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <Icon name={group.icon} />
            </span>
            <div>
              <h2 className="font-bold">{group.label}</h2>
              <p className="text-xs text-slate-400">
                {"total" in group
                  ? `${group.total} loaded`
                  : `${group.items.length} loaded`}
              </p>
            </div>
          </div>
          {group.items.length === 0 ? (
            <EmptyState
              title={`No ${group.label.toLowerCase()}`}
              message="No catalog items are available."
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {group.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-100 text-slate-400">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon name={group.icon} className="h-5 w-5" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {item.count ?? "View"}
                  </span>
                </div>
              ))}
              {((group.label === "Products" && products.length > 10) || (group.label === "Brands" && brands.length > 10)) && (
                <div className="p-4">
                  <button
                    onClick={() => group.label === "Products" ? setShowAllProducts((current) => !current) : setShowAllBrands((current) => !current)}
                    className="w-full rounded-lg border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    {group.label === "Products"
                      ? showAllProducts ? "Show fewer products" : `Show ${products.length - 10} more products`
                      : showAllBrands ? "Show fewer brands" : `Show ${brands.length - 10} more brands`}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="px-6 py-16 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400">
        <Icon name="layers" />
      </span>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mx-auto mt-1 max-w-xs text-sm text-slate-400">{message}</p>
    </div>
  );
}
