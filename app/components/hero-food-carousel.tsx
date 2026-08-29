"use client";

import { useState, useRef, useId } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Flame,
  Salad,
} from "lucide-react";
import { cn } from "@/lib/utils";
import OptionWheel, { type OptionWheelApi } from "@/app/components/ui/korosel";
import { PageHeader } from "@/app/components/page-header";

const FOODS = [
  { name: "Geprek Sambal Bawang", image: "/makanan1.jpeg", merchant: "Warung Geprek Bu Ati", price: 12000, originalPrice: 15000 },
  { name: "Nasi Goreng Kampung", image: "/makanan2.jpeg", merchant: "Kampung Rasa", price: 15000, originalPrice: 18000 },
  { name: "Soto Mie Bogor", image: "/makanan3.jpeg", merchant: "Soto Mie Mang Aji", price: 18000, originalPrice: 22000 },
  { name: "Sate Ayam Pak Tigiset", image: "/makanan4.jpeg", merchant: "Sate Pak Tigiset", price: 20000, originalPrice: 25000 },
  { name: "Rendang Padang Karindang", image: "/makanan5.jpeg", merchant: "RM Padang Karindang", price: 25000, originalPrice: 30000 },
  { name: "Pancong Boss Lumer", image: "/makanan6.jpeg", merchant: "Pancong Lumer Depok", price: 10000, originalPrice: 13000 },
  { name: "Martabak Gombret", image: "/makanan7.jpg", merchant: "Martabak Gombret 45", price: 22000, originalPrice: 28000 },
  { name: "Bakso Spesial Mas Jono", image: "/makanan8.webp", merchant: "Bakso Jono", price: 18000, originalPrice: 23000 },
  { name: "Ketoprak Telor Sedap", image: "/makanan9.webp", merchant: "Ketoprak Sedap", price: 13000, originalPrice: 16000 },
  { name: "Mie Ayam Balap 12", image: "/makanan10.webp", merchant: "Mie Ayam Balap 12", price: 15000, originalPrice: 18000 },
];

const formatRupiah = (value: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function HeroFoodCarousel() {
  const [foodIndex, setFoodIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const wheelApi = useRef<OptionWheelApi | null>(null);

  const selected = FOODS[foodIndex];

  const steer = (action: () => void) => {
    setAutoRotate(false);
    action();
    window.setTimeout(() => setAutoRotate(true), 8000);
  };

  return (
    <section
      id="rekomendasi"
      data-nav="cream"
      className="relative overflow-hidden bg-cream py-20 lg:py-28"
    >
      <PageHeader
        eyebrow="Rekomendasi Makanan"
        icon={<Salad className="h-4 w-4 text-caramel" />}
        title="Pilihan terbaik untukmu hari ini"
        subtitle="Swipe, putar, dan temukan makanan surplus favoritmu dari UMKM terbaik di Kota Depok."
        align="center"
        className="mx-auto"
      />

      <div className="relative mx-auto mt-14 w-full max-w-[min(100vw,1600px)] px-4 sm:px-6 lg:px-8">
        <div className="relative h-[18rem] w-full sm:h-[22rem] lg:h-[26rem]">
          <OptionWheel
            items={FOODS.map((f) => f.name)}
            defaultSelected={0}
            side="left"
            orientation="horizontal"
            spacing={1.15}
            curve={20}
            tilt={6}
            blur={3}
            fade={0.32}
            minOpacity={0.02}
            smoothing={180}
            loop
            draggable
            autoRotate={autoRotate}
            autoRotateInterval={4000}
            plateSize={340}
            onChange={(index) => setFoodIndex(index)}
            apiRef={wheelApi}
            renderItem={(i) => <FoodPlate image={FOODS[i].image} />}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent sm:w-48"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent sm:w-48"
          />
        </div>

        <div className="relative z-20 -mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Makanan sebelumnya"
            onClick={() => steer(() => wheelApi.current?.prev())}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white text-forest-dark shadow-sm transition-colors hover:bg-caramel hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {FOODS.map((food, index) => (
              <button
                key={food.name}
                type="button"
                aria-label={`Pilih ${food.name}`}
                onClick={() => steer(() => wheelApi.current?.to(index))}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === foodIndex
                    ? "w-6 bg-forest-dark"
                    : "w-1.5 bg-hairline hover:bg-caramel",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Makanan berikutnya"
            onClick={() => steer(() => wheelApi.current?.next())}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white text-forest-dark shadow-sm transition-colors hover:bg-caramel hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={foodIndex}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto mt-12 w-full max-w-3xl overflow-hidden rounded-3xl border border-hairline bg-white/90 p-6 shadow-[0_28px_56px_-28px_rgba(27,77,50,0.4)] backdrop-blur-sm sm:p-7"
        >
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="h-24 w-24 shrink-0 sm:h-28 sm:w-28">
              <FoodPlate image={selected.image} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="truncate font-display text-lg font-semibold tracking-tight text-forest-dark sm:text-xl">
                  {selected.name}
                </h3>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cream-100 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-forest-dark">
                  <Flame className="h-3 w-3" />
                  Hemat {formatRupiah(selected.originalPrice - selected.price)}
                </span>
              </div>

              <p className="mt-0.5 font-sans text-xs text-stone">
                {selected.merchant} · Kota Depok
              </p>

              <div className="mt-1.5 flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold text-gold-600" />
                <span className="font-sans text-xs font-semibold text-forest-dark">
                  4.9
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="font-display text-xl font-bold text-forest-dark">
                  {formatRupiah(selected.price)}
                </span>
                <span className="font-sans text-sm text-stone line-through">
                  {formatRupiah(selected.originalPrice)}
                </span>
                <Link
                  href="/cari"
                  className="group ml-auto inline-flex items-center gap-1.5 rounded-full border border-forest-dark/20 px-4 py-2 font-sans text-xs font-semibold text-forest-dark transition-colors hover:bg-forest-dark hover:text-white"
                >
                  Lihat di Peta
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function FoodPlate({ image }: { image: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `plate-surface-${uid}`;
  const clipId = `plate-cut-${uid}`;

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Piring makanan"
      className="h-full w-full drop-shadow-[0_16px_22px_-14px_rgba(27,77,50,0.55)]"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="42%">
          <stop offset="0%" stopColor="#F7F6EE" />
          <stop offset="72%" stopColor="#E9E7D9" />
          <stop offset="100%" stopColor="#D5D2C1" />
        </radialGradient>

        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="84" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="92" fill={`url(#${gradId})`} />

      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke="#C8C5B5"
        strokeWidth="2.5"
      />

      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke="#D8D5C6"
        strokeWidth="1.5"
      />

      <circle cx="100" cy="100" r="86" fill="#F5F3E9" />

      <image
        href={image}
        x="0"
        y="0"
        width="200"
        height="200"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />

      <circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="#F5F3E9"
        strokeWidth="4"
      />

      <ellipse cx="80" cy="66" rx="46" ry="22" fill="#FFFFFF" opacity="0.16" />
    </svg>
  );
}
