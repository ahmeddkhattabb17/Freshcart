import { apiRequest } from "./api";

export type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
};

export function getUserIdFromToken() {
  if (typeof window === "undefined") return null;
  const token = window.localStorage.getItem("freshcart-token");
  if (!token) return null;

  try {
    const payload = JSON.parse(window.atob(token.split(".")[1])) as { id?: string };
    return payload.id ?? null;
  } catch {
    return null;
  }
}

export const getAllOrders = () => apiRequest<unknown[]>("/orders/");

export const getUserOrders = (userId: string) =>
  apiRequest<unknown[]>(`/orders/user/${userId}`);

export const createCheckoutSession = (
  cartId: string,
  shippingAddress: ShippingAddress,
  redirectUrl: string,
) =>
  apiRequest<{ session?: { url?: string }; url?: string }>(
    `/orders/checkout-session/${cartId}?url=${encodeURIComponent(redirectUrl)}`,
    { method: "POST", body: JSON.stringify({ shippingAddress }) },
  );
