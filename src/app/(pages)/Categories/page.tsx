import Link from "next/link";
import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/common/Footer";
import { getCategoryCards } from "@/services/categories.services";

type Category = {
  id: string | number;
  name: string;
  imageUrl: string;
  href: string;
};

const services = [
  ["▣", "Free Shipping", "On orders over 500 EGP"],
  ["↩", "Easy Returns", "14-day return policy"],
  ["✓", "Secure Payment", "100% secure checkout"],
  ["◉", "24/7 Support", "Contact us anytime"],
];

function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-100">
        {category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt={category.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-4xl text-emerald-600">▱</span>
        )}
      </div>
      <div className="pt-4 text-center">
        <h2 className="font-bold text-slate-800">{category.name}</h2>
        <Link
          href={category.href}
          className="mt-2 inline-block text-xs font-medium text-emerald-600"
        >
          View products →
        </Link>
      </div>
    </article>
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

export default async function CategoriesPage() {
  const categories = await getCategoryCards();

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="bg-linear-to-r from-emerald-600 to-emerald-400 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <p className="text-sm text-emerald-100">
              Home &nbsp;/&nbsp; Categories
            </p>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/20 text-3xl">
                ▱
              </span>
              <div>
                <h1 className="text-4xl font-extrabold sm:text-5xl">
                  All Categories
                </h1>
                <p className="mt-2 text-emerald-50">
                  Browse our wide range of product categories
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto min-h-520px max-w-6xl px-4 py-8 sm:py-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          {categories.length === 0 && (
            <p className="py-20 text-center text-sm text-slate-400">
              No categories available yet.
            </p>
          )}
        </section>
      </main>
      <ServiceStrip />
      <Footer />
    </>
  );
}
