import AdminDashboard from "@/Components/AdminDashboard";
import { getAdminCategories } from "@/services/categories.services";
import { getAdminProducts } from "@/services/products.services";
import { getAdminReviews, getAdminUsers } from "@/services/admin.services";
import { getAdminBrands } from "@/services/brands.services";

export default async function AdminPage() {
  const [categories, products, brands, reviews, users] = await Promise.all([
    getAdminCategories(),
    getAdminProducts(),
    getAdminBrands(),
    getAdminReviews(),
    getAdminUsers(),
  ]);

  return <AdminDashboard categories={categories} products={products} brands={brands} reviews={reviews.map((review: any) => ({ id: review._id ?? review.id, product: review.product?.title ?? review.product?.name ?? "Product", user: review.user?.name ?? review.user?.email ?? "Customer", rating: review.rating ?? 0, text: review.title ?? review.comment ?? "", date: review.createdAt ? String(review.createdAt).slice(0, 10) : "" }))} users={users.map((user: any) => ({ id: user._id ?? user.id, name: user.name ?? "User", email: user.email ?? "", role: user.role ?? "user", joined: user.createdAt ? String(user.createdAt).slice(0, 10) : "", status: user.active === false ? "Inactive" : "Active" }))} />;
}
