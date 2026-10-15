import Link from "next/link";
import Cards from "@/Components/common/Cards";
import Footer from "@/Components/common/Footer";
import Icon from "@/Components/Icon";
import Navbar from "@/Components/common/Navbar";
import { getBrandById } from "@/services/brands.services";
import { getProductCardsByBrand } from "@/services/products.services";

export default async function BrandDetailsPage({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params;
  const response = await getBrandById(brandId).catch(() => null);
  const brand = response?.data ?? response;
  const name = brand?.name ?? "Brand";
  const products = await getProductCardsByBrand(brandId, name);

  return <><Navbar /><main className="bg-white"><section className="bg-gradient-to-r from-violet-600 to-purple-400 text-white"><div className="mx-auto max-w-6xl px-4 py-12 sm:py-16"><p className="text-sm text-purple-100"><Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/Brands">Brands</Link> &nbsp;/&nbsp; {name}</p><div className="mt-5 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-xl bg-white/20 p-2">{brand?.image ? <img src={brand.image} alt="" className="h-full w-full object-contain" /> : <Icon name="tag" className="h-7 w-7" />}</span><div><h1 className="text-4xl font-extrabold sm:text-5xl">{name}</h1><p className="mt-2 text-purple-50">Explore products from this brand</p></div></div></div></section><section className="mx-auto min-h-[720px] max-w-6xl px-4 py-8 sm:py-10"><p className="mb-5 text-sm text-slate-500">Showing {products.length} products</p><Cards items={products} />{products.length === 0 && <p className="py-24 text-center text-sm text-slate-400">No products were found for this brand.</p>}</section></main><Footer /></>;
}
