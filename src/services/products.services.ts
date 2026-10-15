import type { IProduct, ProductCard } from "@/types/products";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com";

export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products`, { next: { revalidate: 600 } });
  if (!response.ok) throw new Error("Unable to load products");
  const data = await response.json();
  return data;
}

export async function getProductById(id: string) {
  const response = await fetch(`/api/products/${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error("Unable to load product");
  return response.json();
}


export async function getProductReviews(id: string) {
  const response = await fetch(`/api/products/${encodeURIComponent(id)}/reviews`);
  if (!response.ok) throw new Error("Unable to load product reviews");
  return response.json();
}

function formatPrice(price?: number | string) {
  if (price === undefined || price === null || price === "") return "0 EGP";
  return `${price} EGP`;
}

function getDiscount(
  price?: number | string,
  discountedPrice?: number | string,
) {
  const original = Number(price);
  const discounted = Number(discountedPrice);

  if (!original || !discounted || discounted >= original) return undefined;

  return `${Math.round(((original - discounted) / original) * 100)}%`;
}

function getCategoryName(product: IProduct) {
  return typeof product.category === "string"
    ? product.category
    : product.category?.name;
}

function mapProductCard(product: IProduct): ProductCard {
  const category = getCategoryName(product);

  return {
    id: product.id ?? product._id ?? product.title ?? product.name ?? "",
    name: product.name ?? product.title ?? "Product",
    category: category ?? "FreshCart",
    price: formatPrice(product.priceAfterDiscount ?? product.price),
    oldPrice: product.priceAfterDiscount
      ? formatPrice(product.price)
      : undefined,
    rating: String(product.ratingsAverage ?? 0),
    imageUrl: product.imageUrl ?? product.imageCover,
    discount: getDiscount(product.price, product.priceAfterDiscount),
  };
}

function productMatchesCategory(product: IProduct, categoryMatch: string) {
  const category = getCategoryName(product)?.toLowerCase() ?? "";
  const match = categoryMatch.toLowerCase();

  if (match === "men") {
    return /\bmen\b/.test(category) && !/\bwomen\b/.test(category);
  }

  if (match === "women") {
    return /\bwomen\b/.test(category) && !/\bmen\b/.test(category);
  }

  if (match === "women") {
    return /\bwomen\b/.test(category) && !/\bmen\b/.test(category);
  }

  return category.includes(match);
}

export async function getProductCards() {
  const productsResponse = await getAllProducts().catch(() => ({ data: [] }));
  return (productsResponse?.data ?? []).map(mapProductCard);
}

export async function getProductCardsByCategory(categoryMatch: string) {
  const productsResponse = await getAllProducts().catch(() => ({ data: [] }));
  return (productsResponse?.data ?? [])
    .filter((product: IProduct) => productMatchesCategory(product, categoryMatch))
    .map(mapProductCard);
}

export async function getProductCardsByBrand(brandId: string, brandName?: string) {
  const productsResponse = await getAllProducts().catch(() => ({ data: [] }));
  const normalizedName = brandName?.toLowerCase();
  return (productsResponse?.data ?? [])
    .filter((product: IProduct & { brand?: { _id?: string; name?: string } | string }) => {
      const brand = product.brand;
      if (typeof brand === "string") return brand === brandId || brand.toLowerCase() === normalizedName;
      return brand?._id === brandId || brand?.name?.toLowerCase() === normalizedName;
    })
    .map(mapProductCard);
}

export async function getAdminProducts() {
  const productsResponse = await getAllProducts().catch(() => ({ data: [] }));

  return (productsResponse?.data ?? []).map((product: IProduct) => ({
    id: product.id ?? product._id ?? product.title ?? product.name ?? "",
    name: product.name ?? product.title ?? "Product",
    count: formatPrice(product.priceAfterDiscount ?? product.price),
    imageUrl: product.imageUrl ?? product.imageCover,
  }));
}
