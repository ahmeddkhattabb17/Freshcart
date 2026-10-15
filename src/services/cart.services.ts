import { apiRequest } from "./api";

const CART_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com"}/api/v2/cart`;

async function cartRequest<T>(options: RequestInit = {}, path = "") {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("freshcart-token") : null;
  const response = await fetch(`${CART_API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(token ? { token } : {}), ...options.headers } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message ?? `Cart request failed (${response.status})`);
  return (payload.data ?? payload) as T;
}

function notifyCartChanged() { if (typeof window !== "undefined") window.dispatchEvent(new Event("cart-change")); }
export const addToCart = (productId: string | number) => apiRequest("/cart", { method: "POST", body: JSON.stringify({ productId }) }).then((result) => { notifyCartChanged(); return result; });
export const getCart = () => cartRequest<{ products?: unknown[]; cartItems?: unknown[]; totalCartPrice?: number }>();
export const updateCartQuantity = (productId: string | number, count: number) => cartRequest({ method: "PUT", body: JSON.stringify({ count }) }, `/${productId}`).then((result) => { notifyCartChanged(); return result; });
export const removeFromCart = (productId: string | number) => cartRequest({ method: "DELETE" }, `/${productId}`).then((result) => { notifyCartChanged(); return result; });
export const applyCoupon = (couponName: string) => cartRequest({ method: "PUT", body: JSON.stringify({ couponName }) }, "/applyCoupon");
export async function clearCart() {
  const cart = await getCart();
  const items = cart.products ?? cart.cartItems ?? [];
  await Promise.all((items as any[]).map((item) => removeFromCart(item.product?._id ?? item.product?.id ?? item._id ?? item.id)));
  notifyCartChanged();
}
