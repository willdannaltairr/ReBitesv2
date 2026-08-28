"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import DetailPage from "@/app/components/detail/detail-page";
import { EmptyState } from "@/app/components/empty-state";
import type {
  ProductDetail,
  RelatedProduct,
  Review,
} from "@/app/detail/product/data";
import { fetchProductDetail, fetchRelatedProducts } from "./detail-data";
import { getProductReviews } from "@/lib/review-storage";

export function DetailProductContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") ?? searchParams.get("slug");

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "not-found">(
    "loading"
  );

  useEffect(() => {
    if (!productId) {
      setStatus("not-found");
      return;
    }
    let active = true;
    setStatus("loading");

    fetchProductDetail(productId).then((detail) => {
      if (!active) return;
      if (!detail) {
        setStatus("not-found");
        return;
      }
      setProduct(detail);
      setStatus("ready");
    });

    return () => {
      active = false;
    };
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    let active = true;

    getProductReviews(product.slug).then((rows) => {
      if (active) setReviews(rows);
    });
    fetchRelatedProducts(product.category, product.slug).then((rows) => {
      if (active) setRelatedProducts(rows);
    });

    return () => {
      active = false;
    };
  }, [product]);

  if (status === "loading") {
    return <div className="min-h-screen bg-cream-50" />;
  }

  if (status === "not-found" || !product) {
    return (
      <div className="flex min-h-screen items-center bg-cream-50 px-6">
        <EmptyState
          className="mx-auto w-full max-w-md"
          icon={<SearchX className="h-6 w-6" aria-hidden />}
          title="Produk tidak ditemukan"
          description="Menu yang kamu cari mungkin sudah habis atau dihapus penjualnya."
          action={
            <a
              href="/"
              className="mt-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
            >
              Kembali ke Beranda
            </a>
          }
        />
      </div>
    );
  }

  return (
    <DetailPage
      product={product}
      reviews={reviews}
      relatedProducts={relatedProducts}
    />
  );
}
