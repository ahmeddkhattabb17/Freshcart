import Cards from "@/Components/common/Cards";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import { getProductCardsByCategory } from "@/services/products.services";

type CategoryProductsPageProps = {
  title: string;
  categoryMatch: string;
  description: string;
};

const services = [
  {
    icon: "truck",
    title: "Free Shipping",
    detail: "On orders over 500 EGP",
  },
  {
    icon: "return",
    title: "Easy Returns",
    detail: "14-day return policy",
  },
  {
    icon: "shield",
    title: "Secure Payment",
    detail: "100% secure checkout",
  },
  {
    icon: "headset",
    title: "24/7 Support",
    detail: "Contact us anytime",
  },
];

function Services() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
        {services.map((service) => (
          <div key={service.title} className="flex items-center gap-3">
            <Icon name={service.icon} className="h-6 w-6 text-emerald-600" />
            <span>
              <b className="block text-sm">{service.title}</b>
              <small className="text-xs text-slate-500">
                {service.detail}
              </small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function CategoryProductsPage({
  title,
  categoryMatch,
  description,
}: CategoryProductsPageProps) {
  const products = await getProductCardsByCategory(categoryMatch);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="bg-linear-to-r from-emerald-600 to-emerald-400 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <p className="text-sm text-emerald-100">
              Home &nbsp;/&nbsp; Categories &nbsp;/&nbsp; {title}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/20">
                <Icon name="layers" className="h-7 w-7" />
              </span>
              <div>
                <h1 className="text-4xl font-extrabold sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-2 text-emerald-50">{description}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto min-h-720px max-w-6xl px-4 py-8 sm:py-10">
          <p className="mb-5 text-sm text-slate-500">
            Showing {products.length} products
          </p>
          <Cards items={products} />
          {products.length === 0 && (
            <p className="py-24 text-center text-sm text-slate-400">
              No products were found for this category.
            </p>
          )}
        </section>
      </main>
      <Services />
      <Footer />
    </>
  );
}
