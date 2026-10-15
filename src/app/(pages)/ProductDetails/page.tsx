"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Cards from "@/Components/common/Cards";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import RatingStars from "@/Components/RatingStars";
import homeSlider from "@/assets/Images/home-slider.png";
import { getProductById, getProductCards, getProductReviews } from "@/services/products.services";
import { addToCart } from "@/services/cart.services";
import { addToWishlist } from "@/services/wishlist.services";

type Product = {
  id?: string;
  name: string;
  category: string;
  brand: string;
  price: string;
  rating: string;
  reviews: string;
  imageUrl: string;
  description: string;
  available: number;
  images?: string[];
};

function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  useEffect(() => setSelectedImage(product.imageUrl), [product.imageUrl]);
  const images = product.images?.length ? product.images : [product.imageUrl];
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5">
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-slate-50">
        <img
          src={selectedImage || homeSlider.src}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            onClick={() => setSelectedImage(image)}
            className="aspect-square overflow-hidden rounded-md border border-slate-200 bg-slate-50 p-1 hover:border-emerald-500"
          >
            <img
              src={image || homeSlider.src}
              alt={`${product.name} view ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function PurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  function showMessage(value: string) { setMessage(value); window.setTimeout(() => setMessage(""), 2500); }
  const price = Number(product.price.replace(/[^0-9.]/g, "")) || 0;
  async function cartAction() { if (!window.localStorage.getItem("freshcart-token")) { showMessage("Please sign in first"); return; } try { await addToCart(productId()); showMessage("Added to cart"); } catch (error) { showMessage(error instanceof Error ? error.message : "Unable to add to cart"); } }
  async function wishlistAction() { if (!window.localStorage.getItem("freshcart-token")) { showMessage("Please sign in first"); return; } try { await addToWishlist(productId()); showMessage("Added to wishlist"); } catch (error) { showMessage(error instanceof Error ? error.message : "Unable to add to wishlist"); } }
  function productId() { return searchParams.get("productId") ?? searchParams.get("id") ?? product.id ?? ""; }
  return (
    <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      {message && <div role="status" className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-xl ring-1 ring-emerald-100">{message}</div>}
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
          {product.category}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {product.brand}
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold text-slate-800">
        {product.name}
      </h1>
      <div className="mt-3 flex items-center gap-2">
        <RatingStars
          value={product.rating}
          size={20}
          valueClassName="text-sm font-semibold text-slate-700"
        />
        <span className="text-sm text-slate-400">({product.reviews})</span>
      </div>
      <p className="mt-4 text-3xl font-extrabold text-slate-800">
        {product.price}
      </p>
      <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        In Stock
      </span>
      <p className="mt-6 border-t border-slate-100 pt-5 text-sm leading-6 text-slate-500">
        {product.description}
      </p>
      <div className="mt-5 flex items-end gap-3">
        <div>
          <label
            htmlFor="quantity"
            className="mb-2 block text-xs font-semibold text-slate-600"
          >
            Quantity
          </label>
          <div className="flex h-10 items-center overflow-hidden rounded-md border border-slate-200">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid h-full w-10 place-items-center text-slate-500">
              −
            </button>
            <input
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              className="h-full w-10 border-x border-slate-200 text-center outline-none"
            />
            <button type="button" onClick={() => setQuantity((value) => Math.min(product.available || 999, value + 1))} className="grid h-full w-10 place-items-center text-slate-500">
              +
            </button>
          </div>
        </div>
        <span className="pb-3 text-xs text-slate-400">
          {product.available} available
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-4">
        <span className="text-sm text-slate-500">Total Price:</span>
        <strong className="text-xl text-emerald-600">{(price * quantity).toFixed(2)} EGP</strong>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => void cartAction()} className="flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 font-semibold text-white hover:bg-emerald-700">
          <Icon name="cart" className="h-4 w-4" />
          Add to Cart
        </button>
        <button type="button" onClick={() => void cartAction().then(() => router.push("/Checkout"))} className="h-11 rounded-lg bg-slate-900 font-semibold text-white hover:bg-slate-800">
          Buy Now
        </button>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => void wishlistAction()} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm text-slate-600">
          <Icon name="heart" className="h-4 w-4" />
          Add to Wishlist
        </button>
        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200"
          aria-label="Share product"
        >
          ↗
        </button>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 text-xs text-slate-500">
        <span>
          <Icon name="truck" className="mb-1 h-5 w-5 text-emerald-600" />
          Free Delivery
        </span>
        <span>
          <Icon name="return" className="mb-1 h-5 w-5 text-emerald-600" />
          30 Days Return
        </span>
        <span>
          <Icon name="shield" className="mb-1 h-5 w-5 text-emerald-600" />
          Secure Payment
        </span>
      </div>
    </section>
  );
}

type ProductReview = { id: string | number; user: string; rating: number; review: string; date?: string };

function ProductInformation({ product, reviews }: { product: Product; reviews: ProductReview[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<"details" | "reviews">("details");
  return (
    <section className="mt-8 rounded-xl border border-slate-100 bg-white">
      <div className="flex gap-8 border-b border-slate-100 px-6">
        <button type="button" onClick={() => setTab("details")} className={tab === "details" ? "border-b-2 border-emerald-500 py-4 text-sm font-semibold text-emerald-600" : "py-4 text-sm text-slate-500"}>
          Product Details
        </button>
        <button type="button" onClick={() => setTab("reviews")} className={tab === "reviews" ? "border-b-2 border-emerald-500 py-4 text-sm font-semibold text-emerald-600" : "py-4 text-sm text-slate-500"}>
          Reviews ({product.reviews})
        </button>
        <button type="button" onClick={() => router.push("/ContactUs")} className="py-4 text-sm text-slate-500">
          Shipping & Returns
        </button>
      </div>
      <div className="p-6">
        {tab === "reviews" ? (
          <div>
            <h2 className="font-bold text-slate-800">Customer Reviews</h2>
            {reviews.length === 0 ? <p className="mt-4 text-sm text-slate-500">No reviews available yet.</p> : <div className="mt-4 space-y-4">{reviews.map((review) => <article key={review.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4"><div className="flex items-center justify-between"><b className="text-sm text-slate-700">{review.user}</b><RatingStars value={String(review.rating)} size={14} /></div><p className="mt-2 text-sm text-slate-600">{review.review}</p>{review.date && <time className="mt-2 block text-xs text-slate-400">{review.date}</time>}</article>)}</div>}
          </div>
        ) : (
        <>
        <h2 className="font-bold text-slate-800">About this Product</h2>
        <p className="mt-3 text-sm text-slate-500">{product.description}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-700">
              Product Information
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-400">Category</dt>
                <dd>{product.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Brand</dt>
                <dd>{product.brand}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Items Sold</dt>
                <dd>{product.available}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-lg bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-700">Key Features</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-emerald-500">✓</span>Premium quality
                product
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">✓</span>100% authentic
                guarantee
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">✓</span>Fast and secure
                packaging
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">✓</span>Quality tested
              </li>
            </ul>
          </div>
        </div>
        </>
        )}
      </div>
    </section>
  );
}

function ProductDetailsContent() {
  const params = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loadError, setLoadError] = useState("");
  useEffect(() => { const id = params.get("productId") ?? params.get("id"); setProduct(null); if (!id) { setLoadError("Product was not found."); return; } let active = true; void getProductById(id).then((payload: any) => { if (!active) return; const raw = payload.data?.data ?? payload.data ?? payload; setProduct({ id: String(raw._id ?? raw.id ?? id), name: raw.title ?? raw.name ?? "Product", category: raw.category?.name ?? "Product", brand: raw.brand?.name ?? "Brand", price: `${raw.priceAfterDiscount ?? raw.price ?? 0} EGP`, rating: String(raw.ratingsAverage ?? 0), reviews: String(raw.ratingsQuantity ?? 0), imageUrl: raw.imageCover ?? raw.imageUrl ?? "", description: raw.description ?? "", available: raw.quantity ?? 0 }); setLoadError(""); }).catch(() => { if (active) setLoadError("This product could not be found."); }); void getProductReviews(id).then((payload: any) => { if (!active) return; const data = payload.data?.data ?? payload.data ?? payload; setReviews((Array.isArray(data) ? data : []).map((item: any, index: number) => ({ id: item._id ?? item.id ?? index, user: item.user?.name ?? item.user?.email ?? "Customer", rating: Number(item.rating ?? 0), review: item.review ?? item.comment ?? "", date: item.createdAt ? String(item.createdAt).slice(0, 10) : undefined }))); }).catch(() => { if (active) setReviews([]); }); void getProductCards().then((items) => { if (active) setRelated(items); }).catch(() => { if (active) setRelated([]); }); return () => { active = false; }; }, [params]);
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        {loadError && <div className="mx-auto max-w-6xl px-4 pt-8 text-center text-sm font-semibold text-red-600">{loadError}</div>}
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-slate-500">
          Home {product && <> &nbsp;›&nbsp; {product.category} &nbsp;›&nbsp; {product.name}</>}
        </div>
        {!product && !loadError ? <ProductDetailsSkeleton /> : product && <section className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[270px_1fr]"><ProductGallery product={product} /><PurchasePanel product={product} /></section>}
        <div className="mx-auto max-w-6xl px-4">
          {product && <ProductInformation product={product} reviews={reviews} />}
          <section className="py-12">
            <h2 className="border-l-4 border-emerald-500 pl-3 text-xl font-bold text-slate-800">
              You May Also <span className="text-emerald-600">Like</span>
            </h2>
            <div className="mt-6">
              <Cards items={related} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ProductDetailsSkeleton() {
  return <section className="mx-auto grid max-w-6xl animate-pulse gap-6 px-4 lg:grid-cols-[270px_1fr]"><div className="aspect-square rounded-xl bg-slate-200" /><div className="rounded-xl bg-white p-6"><div className="h-5 w-32 rounded bg-slate-200" /><div className="mt-5 h-10 w-2/3 rounded bg-slate-200" /><div className="mt-5 h-8 w-28 rounded bg-slate-200" /><div className="mt-8 h-20 rounded bg-slate-100" /><div className="mt-6 h-11 rounded bg-slate-200" /></div></section>;
}

export default function ProductDetailsPage() {
  return <Suspense fallback={<main className="min-h-screen bg-slate-50" />}><ProductDetailsContent /></Suspense>;
}
