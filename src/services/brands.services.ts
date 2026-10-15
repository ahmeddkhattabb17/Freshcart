const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com";

export type ApiBrand = { _id?: string; id?: string | number; name?: string; image?: string; imageUrl?: string };

export async function getAllBrands() {
  const response = await fetch(`${BASE_URL}/api/v1/brands`, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Unable to load brands");
  return response.json();
}

export async function getBrandById(brandId: string | number) {
  const response = await fetch(`${BASE_URL}/api/v1/brands/${brandId}`, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Unable to load brand");
  return response.json();
}

export async function getBrandCards() {
  const response = await getAllBrands().catch(() => ({ data: [] }));
  return (response?.data ?? []).map((brand: ApiBrand) => ({
    id: brand.id ?? brand._id ?? brand.name ?? "",
    name: brand.name ?? "Brand",
    logoUrl: brand.imageUrl ?? brand.image ?? "",
  }));
}

export async function getAdminBrands() {
  const response = await getAllBrands().catch(() => ({ data: [] }));
  return (response?.data ?? []).map((brand: ApiBrand) => ({
    id: brand.id ?? brand._id ?? brand.name ?? "",
    name: brand.name ?? "Brand",
    imageUrl: brand.imageUrl ?? brand.image ?? "",
  }));
}


