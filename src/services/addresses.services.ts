import { apiRequest } from "./api";

export type AddressPayload = { name: string; details: string; phone: string; city: string };
export const addAddress = (payload: AddressPayload) => apiRequest("/addresses", { method: "POST", body: JSON.stringify(payload) });
export const getAddresses = () => apiRequest<unknown[]>("/addresses");
export const removeAddress = (addressId: string | number) => apiRequest(`/addresses/${addressId}`, { method: "DELETE" });
