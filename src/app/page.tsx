import Cards from "@/Components/common/Cards";
import Hero, { type HeroSlide } from "@/Components/Hero";
import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import { getCategoryCards } from "@/services/categories.services";
import { getProductCards } from "@/services/products.services";

type CategoryCard = {
  id: string | number;
  name: string;
  icon?: string;
  imageUrl?: string;
};

const heroSlides: HeroSlide[] = [
  {
    title: "Fresh Products Delivered to Your Door",
    subtitle: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    primary: "Shop Now",
    secondary: "Learn More",
  },
  {
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    primary: "Order Now",
    secondary: "Delivery Info",
  },
];
const benefits: {
  icon: string;
  title: string;
  detail: string;
  tone: string;
}[] = [
  {
    icon: "truck",
    title: "Free Shipping",
    detail: "On orders over 500 EGP",
    tone: "bg-blue-50 text-blue-500",
  },
  {
    icon: "shield",
    title: "Secure Payment",
    detail: "100% secure checkout",
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: "return",
    title: "Easy Returns",
    detail: "7-day return policy",
    tone: "bg-orange-50 text-orange-500",
  },
  {
    icon: "headset",
    title: "24/7 Support",
    detail: "We are here to help",
    tone: "bg-violet-50 text-violet-500",
  },
];

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="border-l-4 border-emerald-500 pl-3 text-xl font-bold text-slate-800">
        {title}
      </h2>
      {action && (
        <a href="#products" className="text-xs font-semibold text-emerald-600">
          {action} →
        </a>
      )}
    </div>
  );
}

function ServiceStrip() {
  return (
    <section className="bg-slate-50 py-4">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-4 shadow-sm"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${benefit.tone}`}
            >
              <Icon name={benefit.icon} className="h-4 w-4" />
            </span>
            <div>
              <b className="text-sm text-slate-700">{benefit.title}</b>
              <p className="mt-1 text-[11px] text-slate-400">
                {benefit.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryGrid({ categories }: { categories: CategoryCard[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle title="Shop by category" action="View all categories" />
      <div className="grid grid-cols-2 gap-1 overflow-hidden rounded-lg border border-slate-100 bg-slate-100 sm:grid-cols-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex min-h-28 flex-col items-center justify-center gap-2 bg-white p-3 text-center text-xs font-bold text-slate-700 transition hover:bg-emerald-50 sm:text-sm"
          >
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-emerald-50 text-emerald-600">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon name={category.icon ?? "layers"} className="h-6 w-6" />
              )}
            </span>
            {category.name}
          </div>
        ))}
      </div>
    </section>
  );
}

function PromoBanners() {
  return (
    <section className="mx-auto grid max-w-6xl gap-4 overflow-hidden px-4 pb-10 md:grid-cols-2">
      <div className="animate-promo-left rounded-xl bg-emerald-500 p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
          Deal of the day
        </p>
        <h2 className="mt-2 text-2xl font-bold">Fresh organic fruits</h2>
        <p className="mt-2 text-sm text-emerald-50">
          Get 40% off on selected organic fruits.
        </p>
        <button className="mt-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-emerald-700">
          Shop now →
        </button>
      </div>
      <div className="animate-promo-right rounded-xl bg-linear-to-r from-orange-400 to-rose-500 p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-100">
          Limited offer
        </p>
        <h2 className="mt-2 text-2xl font-bold">Exotic vegetables</h2>
        <p className="mt-2 text-sm text-orange-50">
          Discover premium vegetables at 25% off.
        </p>
        <button className="mt-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-rose-600">
          Explore now →
        </button>
      </div>
    </section>
  );
}

function NewsletterAndApp() {
  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-16 md:grid-cols-[1.4fr_0.8fr]">
      <div className="rounded-2xl bg-emerald-50 p-7 sm:p-10">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <Icon name="mail" />
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-800">
          Get FreshCart updates delivered free
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
          Weekly recipes, special offers, and fresh product updates delivered to
          your inbox.
        </p>
        <div className="mt-6 flex max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white">
          <input
            aria-label="Email address"
            placeholder="you@example.com"
            className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
          />
          <button className="bg-emerald-600 px-4 text-xs font-bold text-white hover:bg-emerald-700">
            Subscribe
          </button>
        </div>
      </div>
      <div className="rounded-2xl bg-slate-900 p-7 text-white sm:p-10">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Icon name="app" />
        </span>
        <h2 className="mt-4 text-2xl font-bold">Shop faster on our app</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Get exclusive deals and a smoother shopping experience on your phone.
        </p>
        <div className="mt-6 flex gap-3">
          <button className="rounded-md border border-slate-600 px-4 py-2 text-xs font-semibold hover:border-emerald-400">
            App Store
          </button>
          <button className="rounded-md border border-slate-600 px-4 py-2 text-xs font-semibold hover:border-emerald-400">
            Google Play
          </button>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProductCards(),
    getCategoryCards(),
  ]);

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <Hero slides={heroSlides} />
        <ServiceStrip />
        <CategoryGrid categories={categories} />
        <PromoBanners />
        <section id="products" className="mx-auto max-w-6xl px-4 pb-16">
          <SectionTitle title="Featured products" action="View all products" />
          <Cards items={products} />
        </section>
        <NewsletterAndApp />
      </main>
      <Footer />
    </>
  );
}
