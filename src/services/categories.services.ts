const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com";

type ApiCategory = {
  _id?: string;
  id?: string | number;
  name?: string;
  image?: string;
  imageUrl?: string;
};

export async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/api/v1/categories`, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Unable to load categories");
  const data = await response.json();
  return data;
}

export async function getCategoryById(categoryId: string | number) {
  const response = await fetch(`${BASE_URL}/api/v1/categories/${categoryId}`, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Unable to load category");
  return response.json();
}

function getCategoryHref(name: string) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("men")) return "/Categories/Men";
  if (normalizedName.includes("women")) return "/Categories/Women";
  if (normalizedName.includes("electronics")) return "/Categories/Electronics";

  return "/Categories";
}

function mapCategory(category: ApiCategory) {
  const name = category.name ?? "Category";

  return {
    id: category.id ?? category._id ?? name,
    name,
    imageUrl: category.imageUrl ?? category.image ?? "",
    href: getCategoryHref(name),
  };
}

export async function getCategoryCards() {
  const categoriesResponse = await getAllCategories().catch(() => ({
    data: [],
  }));

  return (categoriesResponse?.data ?? []).map((category: ApiCategory) => mapCategory(category));
}

export async function getAdminCategories() {
  const categories = await getCategoryCards();

  return categories.map((category: ReturnType<typeof mapCategory>) => ({
    id: category.id,
    name: category.name,
    imageUrl: category.imageUrl,
  }));
}
