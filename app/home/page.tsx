"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/app/components/navbar";
import { Hero } from "@/app/components/Hero";
import { UrgentDealsSection } from "@/app/components/UrgentDealsSection";
import { FlashSaleSection } from "@/app/components/FlashSaleSection";
import { CategorySection } from "@/app/components/CategorySection";
import { VendorSection } from "@/app/components/VendorSection";
import { SubscriptionSection } from "@/app/components/subscription/subscription-section";
import { SiteFooter } from "@/app/components/Footer";
import { ProductDetailModal } from "@/app/components/ProductDetailModalLazy";
import { useProductDetail } from "@/app/detail/product/use-product-detail";


export default function HomePage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const handleViewDetail = useCallback((id: string) => {
    setSelectedProductId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProductId(null);
  }, []);

  const selectedProduct = useProductDetail(selectedProductId);

  return (
    <div>
      <Navbar showLocationDropdown={false} />

      <main className="bg-cream-50">
        <Hero />
        <UrgentDealsSection from="home" onViewDetail={handleViewDetail} />
        <CategorySection />
        <FlashSaleSection onViewDetail={handleViewDetail} />
        <VendorSection />

        <SubscriptionSection />

      </main>

      <SiteFooter />

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
