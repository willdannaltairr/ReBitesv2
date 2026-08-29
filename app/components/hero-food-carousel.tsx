"use client";

import { useState, useRef, useId, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Flame,
  MapPin,
  ShoppingCart,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import OptionWheel, { type OptionWheelApi } from "@/app/components/ui/korosel";
import { SmartImage } from "@/app/components/SmartImage";
import { Reveal } from "@/app/components/reveal";
import { LeafSprig } from "@/app/components/ornaments";

const CREAM = "#FAF3E4";
const SAGE = "#7C7364";
const DEEP = "#3F6B4A";
const GOLD = "#C08A3E";
const BROWN = "#2E2A22";
const WARM = "#FFFDF8";

type Food = {
  name: string;
  image: string;
  merchant: string;
  category: string;
  price: number;
  originalPrice: number;
};

const FOODS: Food[] = [
  { name: "Geprek Sambal Bawang", image: "/makanan1.jpeg", merchant: "Warung Geprek Bu Ati", category: "Makanan Berat", price: 12000, originalPrice: 15000 },
  { name: "Nasi Goreng Kampung", image: "/makanan2.jpeg", merchant: "Kampung Rasa", category: "Nasi Goreng", price: 15000, originalPrice: 18000 },
  { name: "Soto Mie Bogor", image: "/makanan3.jpeg", merchant: "Soto Mie Mang Aji", category: "Soto Mie", price: 18000, originalPrice: 22000 },
  { name: "Sate Ayam Pak Tigiset", image: "/makanan4.jpeg", merchant: "Sate Pak Tigiset", category: "Sate Ayam", price: 20000, originalPrice: 25000 },
  { name: "Rendang Padang Karindang", image: "/makanan5.jpeg", merchant: "RM Padang Karindang", category: "Rendang", price: 25000, originalPrice: 30000 },
  { name: "Pancong Boss Lumer", image: "/makanan6.jpeg", merchant: "Pancong Lumer Depok", category: "Jajanan", price: 10000, originalPrice: 13000 },
  { name: "Martabak Gombret", image: "/makanan7.jpg", merchant: "Martabak Gombret 45", category: "Martabak", price: 22000, originalPrice: 28000 },
  { name: "Bakso Spesial Mas Jono", image: "/makanan8.webp", merchant: "Bakso Jono", category: "Bakso", price: 18000, originalPrice: 23000 },
  { name: "Ketoprak Telor Sedap", image: "/makanan9.webp", merchant: "Ketoprak Sedap", category: "Ketoprak", price: 13000, originalPrice: 16000 },
  { name: "Mie Ayam Balap 12", image: "/makanan10.webp", merchant: "Mie Ayam Balap 12", category: "Mie Ayam", price: 15000, originalPrice: 18000 },
];

const FEATURED = FOODS.slice(0, 4);

const formatRupiah = (value: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const BADGE_CLIP = (() => {
  const teeth = 36;
  const points: string[] = [];
  for (let t = 0; t < teeth; t++) {
    const a = (t / teeth) * Math.PI * 2;
    const b = ((t + 0.5) / teeth) * Math.PI * 2;
    points.push(
      `${(50 + 50 * Math.cos(a)).toFixed(3)}% ${(50 + 50 * Math.sin(a)).toFixed(3)}%`,
      `${(50 + 45 * Math.cos(b)).toFixed(3)}% ${(50 + 45 * Math.sin(b)).toFixed(3)}%`
    );
  }
  return `polygon(${points.join(", ")})`;
})();

export function HeroFoodCarousel() {
  const [foodIndex, setFoodIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [plateSize, setPlateSize] = useState(320);
  const wheelApi = useRef<OptionWheelApi | null>(null);

  const selected = FOODS[foodIndex];

  useEffect(() => {
    const updatePlate = () => {
      const w = window.innerWidth;
      if (w < 480) setPlateSize(Math.max(Math.round((w * 14) / 16 / 1.2), 150));
      else if (w < 1024) setPlateSize(300);
      else setPlateSize(390);
    };
    updatePlate();
    window.addEventListener("resize", updatePlate);
    return () => window.removeEventListener("resize", updatePlate);
  }, []);

  const steer = (action: () => void) => {
    setAutoRotate(false);
    action();
    window.setTimeout(() => setAutoRotate(true), 8000);
  };

  const scrollToUmkm = () => {
    document.getElementById("umkm")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="rekomendasi"
      data-nav="cream"
      className="grain-overlay relative overflow-hidden bg-[#FAF3E4] py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-[min(100vw,1600px)] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <Leaf className="h-4 w-4 text-[#C08A3E]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#C08A3E]">
              Rekomendasi Makanan
            </span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#2E2A22]">
            Pilihan terbaik untukmu hari ini
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-[1.8] text-[#2E2A22]/60 sm:text-base">
            Putar piringnya, temukan menu surplus favoritmu dari UMKM terbaik
            di Kota Depok.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={foodIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="flex flex-col gap-6 sm:gap-7">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#C08A3E]/35 bg-[#FFFDF8] px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#C08A3E] shadow-[0_10px_22px_-16px_rgba(192,138,62,0.8)]">
                    <Leaf className="h-3.5 w-3.5" />
                    Menu Favorit
                  </span>

                  <div>
                    <h3 className="font-display text-3xl font-bold tracking-tight text-[#2E2A22] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
                      {selected.name}
                    </h3>
                    <p className="mt-2 font-sans text-sm font-medium text-[#7C7364] sm:text-base">
                      {selected.merchant}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className="h-4 w-4 fill-[#C08A3E] text-[#C08A3E]"
                        />
                      ))}
                    </div>
                    <span className="ml-1 font-sans text-sm font-semibold text-[#2E2A22]">
                      4.9/5
                    </span>
                    <span className="font-sans text-sm text-[#2E2A22]/55">
                      (128 ulasan)
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-4xl font-bold tracking-tight text-[#C08A3E] sm:text-5xl">
                      {formatRupiah(selected.price)}
                    </span>
                    <span className="font-sans text-lg text-[#2E2A22]/45 line-through sm:text-xl">
                      {formatRupiah(selected.originalPrice)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 font-sans text-sm text-[#2E2A22]/80 sm:text-base">
                    <MapPin className="h-4 w-4 text-[#C08A3E]" />
                    Kota Depok
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#C08A3E]/30 bg-[#FFFDF8] px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-[#7C7364]">
                      <Flame className="h-3.5 w-3.5 text-[#C08A3E]" />
                      Hemat {formatRupiah(selected.originalPrice - selected.price)}
                    </span>
                  </div>

                  <span
                    aria-hidden
                    className="h-px w-full bg-gradient-to-r from-[#C08A3E]/45 via-[#C08A3E]/15 to-transparent"
                  />

                  <Link
                    href="/auth/login"
                    className="group mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-[#C08A3E] px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.14em] text-[#FFFDF8] shadow-[0_18px_32px_-18px_rgba(192,138,62,0.85)] transition-all duration-300 hover:bg-[#3F6B4A] hover:shadow-[0_22px_40px_-18px_rgba(63,107,74,0.8)] sm:text-base"
                  >
                    Pesan Sekarang
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal className="relative">
              <div className="relative mx-auto w-full max-w-[15rem] sm:max-w-[30rem] lg:mr-[-2rem] lg:max-w-[42rem]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-2 left-0 right-0 z-0 rounded-l-full border-2 border-[#FFFDF8] bg-[#3F6B4A] shadow-[0_44px_80px_-42px_rgba(63,107,74,0.75)] ring-1 ring-inset ring-[#C08A3E]/25"
                />
                <div className="relative overflow-hidden rounded-l-full" style={{ height: plateSize + 10 }}>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-l-full bg-[radial-gradient(130%_180%_at_12%_30%,rgba(255,253,248,0.18),transparent_55%)]"
                  />
                  <LeafSprig className="left-7 top-1/2 h-12 w-12 -translate-y-1/2 rotate-12 text-[#FAF3E4]/30" />

                  <div className="absolute inset-0">
                    <OptionWheel
                      items={FOODS.map((f) => f.name)}
                      defaultSelected={0}
                      side="right"
                      orientation="vertical"
                      spacing={0.45}
                      curve={18}
                      tilt={6}
                      blur={4}
                      fade={1}
                      minOpacity={0}
                      smoothing={200}
                      loop
                      draggable
                      autoRotate={autoRotate}
                      autoRotateInterval={4200}
                      plateSize={plateSize}
                      onChange={(index) => setFoodIndex(index)}
                      apiRef={wheelApi}
                      className="!py-0 -translate-x-[9%] sm:-translate-x-[18%] lg:-translate-x-[20%]"
                      renderItem={(i) => <FoodPlate image={FOODS[i].image} />}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#3F6B4A] to-transparent"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#3F6B4A] to-transparent"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[#3F6B4A] to-transparent"
                    />
                  </div>

                  <div
                    aria-hidden
                    className="absolute right-20 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 flex-col items-center justify-center bg-[#C08A3E] text-[#FFFDF8] [filter:drop-shadow(0_16px_22px_rgba(192,138,62,0.55))] sm:h-24 sm:w-24 lg:flex lg:h-32 lg:w-32"
                    style={{ clipPath: BADGE_CLIP }}
                  >
                    <span className="font-display text-base font-bold leading-none text-[#FFFDF8] sm:text-2xl lg:text-3xl">
                      30%
                    </span>
                    <span className="mt-1 font-sans text-[8px] font-bold uppercase tracking-[0.18em] text-[#FFFDF8] sm:text-[10px] lg:text-xs">
                      OFF
                    </span>
                  </div>

                  <div
                    aria-hidden
                    className="absolute right-7 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
                  >
                    <span className="h-9 w-px bg-[#C08A3E]/60" />
                    <span className="[writing-mode:vertical-rl] font-display text-xs font-semibold uppercase tracking-[0.48em] text-[#FFFDF8]">
                      ReBites
                    </span>
                    <span className="h-9 w-px bg-[#C08A3E]/60" />
                  </div>
                </div>
              </div>

              <div className="relative z-20 mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label="Makanan sebelumnya"
                  onClick={() => steer(() => wheelApi.current?.prev())}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C08A3E]/35 bg-[#FFFDF8] text-[#2E2A22] shadow-[0_12px_24px_-16px_rgba(46,42,34,0.65)] transition-colors duration-300 hover:bg-[#C08A3E] hover:text-[#FFFDF8]"
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
                          ? "w-6 bg-[#3F6B4A]"
                          : "w-1.5 bg-[#2E2A22]/15 hover:bg-[#C08A3E]",
                      )}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Makanan berikutnya"
                  onClick={() => steer(() => wheelApi.current?.next())}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C08A3E]/35 bg-[#FFFDF8] text-[#2E2A22] shadow-[0_12px_24px_-16px_rgba(46,42,34,0.65)] transition-colors duration-300 hover:bg-[#C08A3E] hover:text-[#FFFDF8]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 lg:mt-28">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#C08A3E]">
                  <span className="h-px w-8 bg-[#C08A3E]" />
                  Menu Unggulan
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#2E2A22]">
                  Signature picks hari ini
                </h3>
                <p className="mt-2 font-sans text-sm text-[#2E2A22]/60">
                  Empat menu paling diminati, siap menemani harimu.
                </p>
              </div>

              <a
                href="#umkm"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToUmkm();
                }}
                className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap font-sans text-sm font-semibold text-[#C08A3E] transition-colors hover:text-[#3F6B4A]"
              >
                Lihat Semua <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mt-4 grid grid-flow-col auto-cols-[72%] gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 pb-4 pt-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:snap-none lg:grid-cols-4">
              {FEATURED.map((food) => (
                <FeaturedFoodCard key={food.name} food={food} />
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}

function FeaturedFoodCard({ food }: { food: Food }) {
  return (
    <Link
      href="/auth/login"
      aria-label={`Lihat ${food.name}`}
      className="group relative flex h-full min-w-0 snap-start flex-col items-center rounded-[1.75rem] border border-[#2E2A22]/[0.07] bg-[#FFFDF8] px-5 pb-6 pt-3 text-center shadow-[0_22px_44px_-34px_rgba(63,107,74,0.55)] outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C08A3E]/40 hover:shadow-[0_34px_64px_-34px_rgba(63,107,74,0.6)] focus-visible:ring-2 focus-visible:ring-[#C08A3E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF3E4]"
    >
      <div className="relative -mt-14">
        <span
          aria-hidden
          className="absolute -inset-2 rounded-full border border-dashed border-[#C08A3E]/40"
        />
        <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-[0_16px_28px_-14px_rgba(46,42,34,0.55)] ring-[6px] ring-[#FFFDF8] sm:h-24 sm:w-24">
          <SmartImage
            src={food.image}
            alt={food.name}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="mt-4 flex w-full flex-1 flex-col">
        <h3 className="line-clamp-1 font-display text-base font-bold tracking-tight text-[#2E2A22] sm:text-lg">
          {food.name}
        </h3>
        <p className="mt-1 line-clamp-1 font-sans text-xs text-[#7C7364]">
          {food.category}
        </p>

        <span className="mt-3 w-fit rounded-full border border-[#C08A3E]/30 bg-[#FAF3E4] px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-[#C08A3E]">
          Menu Pilihan
        </span>

        <div className="mt-4 flex w-full items-center justify-between gap-2 border-t border-[#2E2A22]/[0.07] pt-3">
          <div className="text-left">
            <span className="block font-display text-lg font-bold tracking-tight text-[#C08A3E] sm:text-xl">
              {formatRupiah(food.price)}
            </span>
            <span className="text-[11px] text-[#2E2A22]/45 line-through">
              {formatRupiah(food.originalPrice)}
            </span>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C08A3E] text-[#FFFDF8] shadow-[0_10px_20px_-10px_rgba(192,138,62,0.9)] transition-colors duration-300 group-hover:bg-[#3F6B4A]">
            <ShoppingCart className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
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
      className="h-full w-full drop-shadow-[0_16px_22px_-14px_rgba(63,107,74,0.55)]"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="42%">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="72%" stopColor="#F1EEDF" />
          <stop offset="100%" stopColor="#DDD9C6" />
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
        stroke="#CBC6B1"
        strokeWidth="2.5"
      />

      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke="#DAD6C4"
        strokeWidth="1.5"
      />

      <circle cx="100" cy="100" r="86" fill="#F7F4E6" />

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
        stroke="#F7F4E6"
        strokeWidth="4"
      />

      <ellipse cx="80" cy="66" rx="46" ry="22" fill="#FFFFFF" opacity="0.16" />
    </svg>
  );
}