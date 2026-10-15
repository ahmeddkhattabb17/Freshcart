import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${BASE_URL}/api/v1/products/${encodeURIComponent(id)}/reviews`, { next: { revalidate: 300 } });
  const body = await response.json().catch(() => ({}));
  return NextResponse.json(body, { status: response.status });
}
