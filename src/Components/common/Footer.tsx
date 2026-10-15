import Link from "next/link";
import Icon from "../Icon";
import logo from "@/assets/Images/freshcart-logo.svg";

const footerGroups = [
  {
    title: "Account",
    links: [
      ["Create Account", "/auth/signup"],
      ["My Orders", "/Orders"],
      ["Sign In", "/auth/login"],
      ["Shopping Cart", "/Cart"],
      ["Wishlist", "/Wishlist"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy-policy"],
      ["Terms of Service", "/terms"],
    ],
  },
  {
    title: "Shop",
    links: [
      ["All Products", "/Shop"],
      ["Brands", "/Brands"],
      ["Categories", "/Categories"],
    ],
  },
  {
    title: "Support",
    links: [["Contact Us", "/Support"]],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.6fr_repeat(4,1fr)] lg:gap-10 lg:py-12">
        <div>
          <Link href="/">
            <img
              src={logo.src}
              alt="FreshCart"
              className="mb-5 h-9 brightness-0 invert"
            />
          </Link>
          <p className="max-w-xs text-sm leading-6 text-slate-400">
            FreshCart is your one-stop destination for quality products with a
            seamless shopping experience.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-slate-400">
            <Icon name="phone" className="h-4 w-4 text-emerald-500" /> +1 (800)
            123-4567
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <Icon name="mail" className="h-4 w-4 text-emerald-500" />{" "}
            support@freshcart.com
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-bold text-white">{group.title}</h3>
            <nav
              className="mt-5 space-y-3 text-sm text-slate-400"
              aria-label={`${group.title} links`}
            >
              {group.links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="block hover:text-emerald-400"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl justify-between px-4 py-5 text-xs text-slate-500">
          <span>© 2026 FreshCart. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="rounded bg-white px-2 py-1 text-[10px] font-extrabold italic text-blue-900">
              VISA
            </span>
            <span className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-extrabold text-slate-700">
              <i className="h-3 w-3 rounded-full bg-red-500" />
              <i className="-ml-2 h-3 w-3 rounded-full bg-orange-400 opacity-90" />
              MC
            </span>
            <span className="rounded bg-white px-2 py-1 text-[10px] font-extrabold italic text-blue-700">
              PayPal
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
