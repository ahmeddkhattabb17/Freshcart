import { apiRequest } from "./api";

function notifyWishlistChanged() { if (typeof window !== "undefined") window.dispatchEvent(new Event("wishlist-change")); }
export const addToWishlist = (productId: string | number) => apiRequest("/wishlist", { method: "POST", body: JSON.stringify({ productId }) }).then((result) => { notifyWishlistChanged(); return result; });
export const getWishlist = () => apiRequest<unknown[]>("/wishlist");
export const removeFromWishlist = (productId: string | number) => apiRequest(`/wishlist/${productId}`, { method: "DELETE" }).then((result) => { notifyWishlistChanged(); return result; });
