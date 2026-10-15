"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { getAddresses, addAddress } from "@/services/addresses.services";

type Address = {
  id: string | number;
  name: string;
  address: string;
  phone: string;
  city: string;
};

export default function MyAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { void getAddresses().then((data) => setAddresses(Array.isArray(data) ? (data as any[]).map((address, index) => ({ id: address._id ?? address.id ?? `address-${index}`, name: address.name ?? "Address", address: address.details ?? address.address ?? "", phone: address.phone ?? "", city: address.city ?? "" })) : [])).catch((err) => setError(err instanceof Error ? err.message : "Unable to load addresses")); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const payload = { name: String(form.get("name") ?? ""), details: String(form.get("details") ?? ""), phone: String(form.get("phone") ?? ""), city: String(form.get("city") ?? "") }; if (!payload.name || !payload.details || !payload.city || !/^01\d{9}$/.test(payload.phone)) { setError("Please enter valid address details and phone number."); return; } try { const saved = await addAddress(payload); setAddresses((current) => [...current, saved as Address]); setOpen(false); setError(""); } catch (err) { setError(err instanceof Error ? err.message : "Unable to add address"); } }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">My Addresses</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your saved delivery addresses
          </p>
        </div>
        <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">
          <Icon name="plus" className="h-4 w-4" />
          Add Address
        </button>
      </div>
      {open && <form onSubmit={submit} className="mt-5 grid gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2"><input name="name" placeholder="Address name" className="h-11 rounded-lg border px-3" required /><input name="city" placeholder="City" className="h-11 rounded-lg border px-3" required /><input name="phone" placeholder="01xxxxxxxxx" className="h-11 rounded-lg border px-3" required /><textarea name="details" placeholder="Address details" className="h-20 rounded-lg border px-3 py-2 sm:col-span-2" required /><button className="rounded-lg bg-emerald-600 py-3 font-semibold text-white sm:col-span-2">Save Address</button></form>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-5 space-y-4">
        {addresses.map((address) => (
          <article
            key={address.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start gap-3">
              <Icon name="tag" className="h-5 w-5 text-emerald-600" />
              <div>
                <h3 className="font-bold text-slate-700">{address.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{address.address}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {address.phone} · {address.city}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Edit address"
                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50"
              >
                <Icon name="tag" className="h-4 w-4" />
              </button>
              <button
                aria-label="Delete address"
                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50"
              >
                <Icon name="return" className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
        {addresses.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center text-sm text-slate-400">
            No saved addresses yet.
          </div>
        )}
      </div>
    </div>
  );
}
