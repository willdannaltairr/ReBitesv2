"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Apple,
  Beef,
  CakeSlice,
  Cookie,
  CupSoda,
  IceCreamCone,
  Sandwich,
  Soup,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { fetchCategoryCounts } from "@/lib/catalog";
import { PageHeader } from "@/app/components/page-header";
import { SectionShell } from "@/app/components/section-shell";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "makanan-berat": Beef,
  jajanan: Cookie,
  japanese: Soup,
  "roti-kue": CakeSlice,
  "makanan-cepat-saji": Sandwich,
  dessert: IceCreamCone,
  "buah-sayur": Apple,
  minuman: CupSoda,
};

export function CategorySection() {
  // Kategori hanya tampil kalau benar-benar ada produknya di database.
  // null = belum termuat -> tampilkan semua agar layout tidak melompat.
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let active = true;
    fetchCategoryCounts().then((result) => {
      if (active) setCounts(result);
    });
    return () => {
      active = false;
    };
  }, []);

  const visibleCategories = counts
    ? CATEGORIES.filter((category) => (counts[category.name] ?? 0) > 0)
    : CATEGORIES;

  if (counts && visibleCategories.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id="kategori"
      dataNav="cream"
      tone="cream"
      className="scroll-mt-24"
    >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <PageHeader
            title="Jelajahi Kategori"
            subtitle="Temukan berbagai makanan sesuai seleramu yang masih layak dinikmati"
          />
          <Link
            href="/cari"
            className={cn(
              "hidden items-center gap-1.5 font-sans text-sm font-semibold text-primary transition-colors hover:text-caramel sm:inline-flex",
              FOCUS_RING,
            )}
          >
            Lihat Semua <span aria-hidden>→</span>
          </Link>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
          className="mt-8 flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-8 lg:gap-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {visibleCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] ?? UtensilsCrossed;
            return (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="min-w-[148px] snap-start lg:min-w-0"
              >
                <Link
                  href={`/makanan/${category.id}`}
                  aria-label={`Lihat makanan kategori ${category.name}`}
                  className={cn(
                    "group flex h-[132px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md",
                    FOCUS_RING,
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-sans text-[13px] font-semibold leading-tight text-charcoal-900">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-2 flex justify-end sm:hidden">
          <Link
            href="/cari"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-primary"
          >
            Lihat Semua <span aria-hidden>→</span>
          </Link>
        </div>
    </SectionShell>
  );
}
