"use client";

import Icon from "./Icon";
import { updateLoggedUser } from "@/services/auth.services";

const account = { fullName: "", email: "", phone: "", userId: "", role: "" };

function Field({
  label,
  name,
  placeholder,
  type = "text",
  value,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-600">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}

export default function AccountSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800">Account Settings</h2>
      <p className="mt-1 text-sm text-slate-500">
        Update your profile information and change your password
      </p>
      <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); updateLoggedUser({ name: String(data.get("fullName")), email: String(data.get("email")), phone: String(data.get("phone")) }).then(() => window.alert("Profile updated successfully")).catch((error) => window.alert(error instanceof Error ? error.message : "Unable to update profile")); }} className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
              <Icon name="heart" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800">Profile Information</h3>
              <p className="text-sm text-slate-500">
                Update your personal details
              </p>
            </div>
          </div>
          <div className="mt-7 space-y-5">
            <Field
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              value={account.fullName}
            />
            <Field
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={account.email}
            />
            <Field
              label="Phone Number"
              name="phone"
              placeholder="01xxxxxxxxx"
              value={account.phone}
            />
          </div>
          <button className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">
            Save Changes
          </button>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 p-6 sm:p-8">
          <h3 className="font-bold text-slate-800">Account Information</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">User ID</dt>
              <dd>{account.userId || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Role</dt>
              <dd className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-600">
                {account.role || "User"}
              </dd>
            </div>
          </dl>
        </div>
      </form>
      <form className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-amber-100 text-amber-600">
            <Icon name="shield" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-bold text-slate-800">Change Password</h3>
            <p className="text-sm text-slate-500">
              Update your account password
            </p>
          </div>
        </div>
        <div className="mt-7 space-y-5">
          <Field
            label="Current Password"
            name="currentPassword"
            placeholder="Enter your current password"
            type="password"
            value=""
          />
          <Field
            label="New Password"
            name="newPassword"
            placeholder="Enter your new password"
            type="password"
            value=""
          />
          <Field
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            type="password"
            value=""
          />
        </div>
        <button className="mt-6 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white">
          Change Password
        </button>
      </form>
    </div>
  );
}
