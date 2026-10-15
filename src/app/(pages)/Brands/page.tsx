import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/common/Footer";
import { getBrandCards } from "@/services/brands.services";
import Link from "next/link";

type Brand = {
  id: string | number;
  name: string;
  logoUrl: string;
};

const services = [
  ["▣", "Free Shipping", "On orders over 500 EGP"],
  ["↩", "Easy Returns", "14-day return policy"],
  ["✓", "Secure Payment", "100% secure checkout"],
  ["◉", "24/7 Support", "Contact us anytime"],
];

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/Brands/${brand.id}`} className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg">
      <div className="flex aspect-[1.45] items-center justify-center overflow-hidden rounded-lg bg-slate-50 p-5">
        <img
          src={brand.logoUrl}
          alt={`${brand.name} logo`}
          className="max-h-full max-w-full object-contain transition group-hover:scale-105"
        />
      </div>
      <h2 className="pt-4 text-center text-sm font-bold text-slate-700">
        {brand.name}
      </h2>
    </Link>
  );
}

function ServiceStrip() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
        {services.map(([icon, title, detail]) => (
          <div key={title} className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-100 text-lg font-bold text-emerald-600">
              {icon}
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-800">{title}</h3>
              <p className="mt-1 text-xs text-slate-500">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function BrandsPage() {
  const brands: Brand[] = await getBrandCards();
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="bg-gradient-to-r from-violet-600 to-purple-400 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <p className="text-sm text-purple-100">Home &nbsp;/&nbsp; Brands</p>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/20 text-3xl">
                »
              </span>
              <div>
                <h1 className="text-4xl font-extrabold sm:text-5xl">
                  Top Brands
                </h1>
                <p className="mt-2 text-purple-50">
                  Shop from your favorite brands
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto min-h-[720px] max-w-6xl px-4 py-8 sm:py-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
          {brands.length === 0 && (
            <p className="py-24 text-center text-sm text-slate-400">
              No brands available yet.
            </p>
          )}
        </section>
      </main>
      <ServiceStrip />
      <Footer />
    </>
  );
}
