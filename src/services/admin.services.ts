import { apiRequest } from "./api";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com";

async function getCollection(path: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/${path}`, { next: { revalidate: 120 } });
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload) ? payload : payload.data ?? [];
  } catch {
    return [];
  }
}

export const getAdminUsers = () => getCollection("users");
export const getAdminReviews = () => getCollection("reviews");
export const getAdminUserOrders = (userId: string) => getCollection(`orders/user/${userId}`);
export const deleteAdminReview = (reviewId: string | number) => apiRequest(`/reviews/${reviewId}`, { method: "DELETE" });
export const updateAdminReview = (reviewId: string | number, review: string, rating: number) => apiRequest(`/reviews/${reviewId}`, { method: "PUT", body: JSON.stringify({ review, rating }) });
