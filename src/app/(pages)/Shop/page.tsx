import Cards from "@/Components/common/Cards";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import { getProductCards } from "@/services/products.services";

function Services() {
  return (
    <section className="border-y border-emerald-100 bg-emerald-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
        <div className="flex items-center gap-3">
          <Icon name="truck" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Free Shipping</b>
            <small className="text-xs text-slate-500">
              On orders over 500 EGP
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="return" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Easy Returns</b>
            <small className="text-xs text-slate-500">
              14-day return policy
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="shield" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">Secure Payment</b>
            <small className="text-xs text-slate-500">
              100% secure checkout
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Icon name="headset" className="h-6 w-6 text-emerald-600" />
          <span>
            <b className="block text-sm">24/7 Support</b>
            <small className="text-xs text-slate-500">Contact us anytime</small>
          </span>
        </div>
      </div>
    </section>
  );
}

export default async function ShopPage() {
  const products = await getProductCards();

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="bg-gradient-to-r from-green-600 to-green-400 text-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <p className="text-sm font-medium text-green-100">
              Home &nbsp;/&nbsp;{" "}
              <span className="font-extrabold text-white">All Products</span>
            </p>
            <div className="mt-6 flex items-center gap-5">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20">
                <Icon name="layers" className="h-8 w-8" />
              </span>
              <div>
                <h1 className="text-4xl font-extrabold leading-none">
                  All Products
                </h1>
                <p className="mt-3 text-base font-medium text-green-50">
                  Explore our complete product collection
                </p>
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
              No products available yet.
            </p>
          )}
        </section>
      </main>
      <Services />
      <Footer />
    </>
  );
}
