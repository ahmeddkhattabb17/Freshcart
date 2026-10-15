const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com";

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("freshcart-token") : null;
  const response = await fetch(`${BASE_URL}/api/v1${path}`, { ...options, headers: { "Content-Type": "application/json", ...(token ? { token } : {}), ...options.headers } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message ?? `Request failed (${response.status})`);
  return (payload.data ?? payload) as T;
}
