"use client";

import Image from "next/image";
import { useEffect, useState, useId, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import OptionWheel, { type OptionWheelApi } from "@/app/components/ui/korosel";
import FoldText from "@/app/components/FoldText";
import { DashedDivider } from "@/app/components/ornaments";

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

const NAV_LINKS = [
  { href: "/#top", label: "Beranda" },
  { href: "/#rekomendasi", label: "Rekomendasi" },
  { href: "/#about", label: "Tentang" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
  { href: "/#langganan", label: "Langganan" },
  { href: "/#testimoni", label: "Testimoni" },
  { href: "/#faq", label: "FAQ" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const formatRupiah = (value: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function HeroSection() {
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("Beranda");
  const [overDark, setOverDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [foodIndex, setFoodIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const wheelApi = useRef<OptionWheelApi | null>(null);

  const lang = "id" as "id" | "en";

  const t = (id: string, en: string): string => {
    return lang === "en" ? en : id;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav]"),
    );

    if (sections.length === 0) {
      setOverDark(false);
      return;
    }

    const probeY = 44;

    const update = () => {
      setScrolled(window.scrollY > 32);

      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });

      setOverDark(current?.dataset.nav === "green");

      let label = NAV_LINKS[0].label;
      for (const link of NAV_LINKS) {
        const hash = link.href.split("#")[1];
        const el = hash ? document.getElementById(hash) : null;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          label = link.label;
        }
      }
      setActiveNav(label);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mounted]);

  const navIsDark = mounted && overDark;
  const selected = FOODS[foodIndex];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    label: string,
    href: string,
  ) => {
    e.preventDefault();
    setActiveNav(label);
    setOpen(false);
    const hash = href.split("#")[1];
    const target = hash ? document.getElementById(hash) : null;
    if (!target) return;

    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -88, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const steer = (action: () => void) => {
    setAutoRotate(false);
    action();
    window.setTimeout(() => setAutoRotate(true), 8000);
  };

  return (
    <div className="overflow-x-hidden bg-cream" data-nav="cream">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="px-4 pt-3 sm:px-6 lg:px-8 sm:pt-4">
          <div className="mx-auto w-full">
            <nav
              className={cn(
                "flex h-16 min-w-fit items-center justify-between px-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 lg:px-8",
                scrolled
                  ? cn(
                      "mx-auto w-full max-w-4xl rounded-full border px-5 shadow-[0_20px_44px_-26px_rgba(27,77,50,0.45)] backdrop-blur-xl sm:px-6 xl:max-w-5xl",
                      navIsDark
                        ? "border-white/15 bg-forest-dark/70 text-white"
                        : "border-hairline/70 bg-white/85 text-forest-dark",
                    )
                  : cn(
                      "mx-auto w-full max-w-7xl rounded-none border-b border-transparent bg-transparent",
                    ),
              )}
            >
              <Link
                href="/"
                aria-label="ReBites"
                className="flex shrink-0 items-center gap-2.5"
              >
                <Image
                  src="/logo.png"
                  alt="ReBites"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />

                <span
                  className={cn(
                    "font-display text-2xl font-medium tracking-tight transition-colors duration-500",
                    navIsDark ? "text-white" : "text-forest-dark",
                  )}
                >
                  <span className="font-display text-2xl font-medium">
                    Re
                  </span>
                  <span className="font-display text-2xl font-light italic">
                    Bites
                  </span>
                </span>
              </Link>

              <ul
                className={cn(
                  "hidden items-center gap-5 lg:flex",
                  scrolled && "lg:gap-4",
                )}
              >
                {NAV_LINKS.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.label, link.href)}
                      aria-current={activeNav === link.label ? "page" : undefined}
                      className={cn(
                        "relative py-1 font-inter transition-colors duration-300",
                        scrolled ? "text-[13px] xl:text-sm" : "text-sm",
                        activeNav === link.label
                          ? navIsDark
                            ? "font-semibold text-white"
                            : "font-semibold text-forest-dark"
                          : navIsDark
                            ? "text-white/80 hover:text-white"
                            : "text-forest-dark/80 hover:text-caramel",
                      )}
                    >
                      {link.label}

                      {activeNav === link.label && (
                        <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-caramel" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <Link
                  href="/auth/login"
                  className={cn(
                    "hidden items-center gap-1.5 rounded-full px-5 py-2.5 font-inter text-sm font-semibold shadow-[0_14px_30px_-18px_rgba(27,77,50,0.65)] transition-colors duration-300 sm:flex",
                    navIsDark
                      ? "bg-white text-forest-dark hover:bg-caramel hover:text-white"
                      : "bg-forest text-white hover:bg-caramel hover:text-white",
                    FOCUS_RING,
                  )}
                >
                  <User className="h-3.5 w-3.5" />
                  {t("Masuk", "Log In")}
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen((value) => !value)}
                  aria-label={open ? "Tutup menu" : "Buka menu"}
                  aria-expanded={open}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center lg:hidden",
                    navIsDark ? "text-white" : "text-forest",
                    FOCUS_RING,
                  )}
                >
                  {open ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </nav>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2 overflow-hidden rounded-3xl border border-hairline/70 bg-white p-3 shadow-[0_28px_56px_-28px_rgba(27,77,50,0.5)] lg:hidden"
                >
                  <ul className="flex flex-col">
                    {NAV_LINKS.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={(e) =>
                            scrollToSection(e, link.label, link.href)
                          }
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-4 py-3 font-inter text-sm transition-colors duration-300",
                            activeNav === link.label
                              ? "bg-caramel/10 font-semibold text-forest-dark"
                              : "text-forest-dark hover:bg-cream",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 flex border-t border-hairline/70 pt-3">
                    <Link
                      href="/auth/login"
                      onClick={() => setOpen(false)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest py-3 font-inter text-sm font-semibold text-white transition-colors duration-300 hover:bg-caramel"
                    >
                      <User className="h-3.5 w-3.5" />
                      {t("Masuk", "Log In")}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <section
        id="top"
        className="relative flex min-h-[640px] flex-col items-center overflow-hidden bg-cream px-4 pb-16 pt-24 sm:px-6 lg:min-h-[760px] lg:px-8 lg:pt-28"
      >
        <HeroFoodBackdrop />

        <div className="relative w-full">
          <DashedDivider
            className="mx-auto mb-7 max-w-[22rem] text-caramel"
            tone="soft"
          />

          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-caramel/40 bg-caramel/10 px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-caramel-dark">
              <MapPin className="h-3.5 w-3.5" />
              {t("Khusus Wilayah Kota Depok", "Only in Depok City")}
            </span>

            <div className="mt-7 w-full">
              <FoldText
                text="Ubah cara kamu menyelamatkan makanan."
                hinge="top"
                trigger="load"
                duration={1.15}
                stagger={0.03}
                ease="expo.out"
                perspective={600}
                creaseShading={0.45}
                as="h1"
                fontSize="clamp(2.25rem, 5.5vw, 4.25rem)"
                fontWeight={600}
                lineHeight={1.08}
                letterSpacing="-0.02em"
                className="text-forest-dark"
              />
            </div>

            <p className="mt-7 max-w-xl font-sans text-sm leading-[1.85] text-muted-foreground">
              ReBites menghubungkan kamu dengan makanan surplus berkualitas dari
              dapur UMKM Kota Depok — harga lebih hemat, kualitas tetap juara,
              dan tanpa food waste.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/auth/register"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full bg-forest-dark px-7 py-3.5 font-inter text-sm font-semibold text-white shadow-[0_16px_32px_-16px_rgba(27,77,50,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-caramel",
                  FOCUS_RING,
                )}
              >
                Mulai Sekarang
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />
                    ))}
                  </div>
                  <span className="font-sans text-sm font-bold text-forest-dark">
                    5.0
                  </span>
                </div>
                <p className="font-sans text-[11px] leading-tight text-muted-foreground">
                  dari{" "}
                  <span className="font-semibold text-forest-dark">500+</span>
                  <br />
                  ulasan pengguna
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-6 w-full max-w-[min(96vw,1400px)]">
          <div className="relative h-[16rem] w-full sm:h-[20rem]">
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
              plateSize={300}
              onChange={(index) => setFoodIndex(index)}
              apiRef={wheelApi}
              renderItem={(i) => <FoodPlate image={FOODS[i].image} />}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-cream to-transparent sm:w-40"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-cream to-transparent sm:w-40"
            />
          </div>

          <div className="relative z-20 -mt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Makanan sebelumnya"
              onClick={() => steer(() => wheelApi.current?.prev())}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white text-forest-dark shadow-sm transition-colors hover:bg-caramel hover:text-white"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white text-forest-dark shadow-sm transition-colors hover:bg-caramel hover:text-white"
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
            className="relative z-10 mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-hairline bg-white/90 p-5 shadow-[0_28px_56px_-28px_rgba(27,77,50,0.4)] backdrop-blur-sm sm:p-6"
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
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-green-700">
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
                  <span className="font-display text-xl font-bold text-green-700">
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
    </div>
  );
}

function HeroOrganicArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 560"
      preserveAspectRatio="none"
      className="
        pointer-events-none
        absolute
        left-1/2
        top-[90px]
        z-0
        h-[470px]
        w-screen
        -translate-x-1/2
        overflow-visible
        text-forest
        opacity-20
      "
    >
      <g
        fill="none"
        stroke="#1B4D32"
        strokeOpacity="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="
            M -220 330
            C -40 220, 120 175, 300 215
            C 465 252, 545 350, 700 330
            C 850 310, 925 190, 1080 175
            C 1245 160, 1370 220, 1660 70
          "
          strokeWidth="2.8"
          opacity="0.72"
        />

        <path
          d="
            M -220 365
            C -35 255, 125 215, 305 248
            C 470 280, 560 375, 710 355
            C 855 335, 935 220, 1090 205
            C 1250 188, 1380 245, 1660 105
          "
          strokeWidth="1.7"
          opacity="0.52"
        />

        <path
          d="
            M -220 393
            C -30 290, 140 252, 315 278
            C 485 305, 570 397, 720 380
            C 870 363, 950 250, 1100 235
            C 1265 218, 1395 265, 1660 135
          "
          strokeWidth="1"
          opacity="0.34"
        />

        <path
          d="
            M 115 260
            C 77 220, 30 225, 12 267
            C 51 297, 94 292, 115 260Z
          "
          strokeWidth="2"
          opacity="0.62"
        />

        <path
          d="
            M 19 268
            C 48 266, 81 262, 112 260
          "
          strokeWidth="1.3"
          opacity="0.48"
        />

        <path
          d="
            M 175 243
            C 184 195, 225 171, 260 196
            C 258 239, 222 266, 175 243Z
          "
          strokeWidth="1.9"
          opacity="0.56"
        />

        <path
          d="
            M 180 241
            C 207 228, 234 211, 257 198
          "
          strokeWidth="1.2"
          opacity="0.42"
        />

        <path
          d="
            M 325 210
            C 289 178, 298 142, 336 133
            C 362 162, 351 197, 325 210Z
          "
          strokeWidth="1.8"
          opacity="0.50"
        />

        <path
          d="
            M 327 206
            C 333 180, 336 154, 336 135
          "
          strokeWidth="1"
          opacity="0.38"
        />

        <ellipse
          cx="590"
          cy="330"
          rx="88"
          ry="43"
          strokeWidth="2"
          opacity="0.56"
        />

        <ellipse
          cx="590"
          cy="330"
          rx="62"
          ry="27"
          strokeWidth="1.2"
          opacity="0.40"
        />

        <path
          d="
            M 535 330
            C 551 304, 580 302, 595 321
            C 611 299, 640 305, 655 330
          "
          strokeWidth="1.7"
          opacity="0.50"
        />

        <path
          d="
            M 540 334
            C 548 359, 570 370, 590 368
            C 614 371, 638 358, 647 334
          "
          strokeWidth="1.3"
          opacity="0.40"
        />

        <path
          d="
            M 580 317
            C 565 294, 575 274, 598 270
            C 616 288, 609 310, 580 317Z
          "
          strokeWidth="1.4"
          opacity="0.44"
        />

        <path
          d="
            M 582 314
            C 588 297, 593 282, 597 271
          "
          strokeWidth="1"
          opacity="0.32"
        />

        <path
          d="
            M 760 352
            C 726 321, 690 334, 694 371
            C 700 410, 731 434, 760 443
            C 790 432, 820 410, 826 371
            C 831 334, 796 321, 760 352Z
          "
          strokeWidth="1.8"
          opacity="0.48"
        />

        <path
          d="
            M 760 351
            C 766 334, 783 324, 799 328
          "
          strokeWidth="1.2"
          opacity="0.38"
        />

        <path
          d="
            M 880 220
            C 864 180, 884 150, 920 150
            C 942 181, 925 216, 880 220Z
          "
          strokeWidth="1.8"
          opacity="0.46"
        />

        <path
          d="
            M 884 216
            C 895 193, 909 169, 919 152
          "
          strokeWidth="1"
          opacity="0.34"
        />

        <path
          d="
            M 1015 320
            C 992 290, 996 258, 1020 236
          "
          strokeWidth="2"
          opacity="0.48"
        />

        <path d="M 1020 236 L 1007 238" strokeWidth="1.4" opacity="0.42" />

        <path d="M 1020 236 L 1018 249" strokeWidth="1.4" opacity="0.42" />

        <path
          d="
            M 1020 236
            C 1049 234, 1072 249, 1083 270
          "
          strokeWidth="2"
          opacity="0.48"
        />

        <path d="M 1083 270 L 1085 256" strokeWidth="1.4" opacity="0.42" />

        <path d="M 1083 270 L 1069 268" strokeWidth="1.4" opacity="0.42" />

        <path
          d="
            M 1083 270
            C 1077 301, 1052 320, 1021 321
          "
          strokeWidth="2"
          opacity="0.48"
        />

        <path d="M 1021 321 L 1033 315" strokeWidth="1.4" opacity="0.42" />

        <path d="M 1021 321 L 1024 308" strokeWidth="1.4" opacity="0.42" />

        <path d="M 1180 150 L 1180 320" strokeWidth="1.8" opacity="0.34" />

        <path d="M 1170 150 L 1170 214" strokeWidth="1.2" opacity="0.30" />

        <path d="M 1180 150 L 1180 214" strokeWidth="1.2" opacity="0.30" />

        <path d="M 1190 150 L 1190 214" strokeWidth="1.2" opacity="0.30" />

        <path
          d="
            M 1170 215
            C 1170 230, 1175 237, 1180 240
            C 1185 237, 1190 230, 1190 215
          "
          strokeWidth="1.2"
          opacity="0.30"
        />

        <circle
          cx="255"
          cy="310"
          r="4"
          fill="#1B4D32"
          stroke="none"
          opacity="0.46"
        />

        <circle
          cx="355"
          cy="350"
          r="2.5"
          fill="#1B4D32"
          stroke="none"
          opacity="0.36"
        />

        <circle
          cx="665"
          cy="250"
          r="4"
          fill="#1B4D32"
          stroke="none"
          opacity="0.42"
        />

        <circle
          cx="830"
          cy="300"
          r="2.5"
          fill="#1B4D32"
          stroke="none"
          opacity="0.34"
        />

        <circle
          cx="1120"
          cy="340"
          r="4"
          fill="#1B4D32"
          stroke="none"
          opacity="0.40"
        />

        <path d="M 430 150 V 170" strokeWidth="1.5" opacity="0.38" />

        <path d="M 420 160 H 440" strokeWidth="1.5" opacity="0.38" />

        <path d="M 930 365 V 383" strokeWidth="1.3" opacity="0.34" />

        <path d="M 921 374 H 939" strokeWidth="1.3" opacity="0.34" />
      </g>
    </svg>
  );
}

function HeroFoodBackdrop() {
  const shots = [
    {
      src: "/makanan2.jpeg",
      className:
        "-left-14 -top-14 h-64 w-64 rotate-[-14deg] rounded-[2.75rem] opacity-30 blur-xl sm:-left-20 sm:h-80 sm:w-80",
    },
    {
      src: "/makanan5.jpeg",
      className:
        "-left-10 bottom-24 hidden h-56 w-56 rotate-[10deg] rounded-full opacity-25 blur-2xl sm:block sm:h-64 sm:w-64 lg:-left-6",
    },
    {
      src: "/makanan3.jpeg",
      className:
        "-right-16 top-4 h-72 w-72 rotate-[12deg] rounded-[2.75rem] opacity-30 blur-xl sm:-right-24 sm:h-96 sm:w-96",
    },
    {
      src: "/makanan7.jpg",
      className:
        "bottom-6 right-24 hidden h-60 w-60 -rotate-[8deg] rounded-full opacity-25 blur-2xl sm:block lg:right-40",
    },
    {
      src: "/makanan6.jpeg",
      className:
        "left-[11%] top-8 hidden h-36 w-36 rotate-6 rounded-full opacity-20 blur-2xl sm:block",
    },
    {
      src: "/makanan10.webp",
      className:
        "right-[13%] top-10 hidden h-40 w-40 -rotate-6 rounded-full opacity-20 blur-2xl lg:block",
    },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <HeroOrganicArt />

      {shots.map((shot) => (
        <div
          key={shot.src}
          className={`absolute overflow-hidden ${shot.className}`}
        >
          <Image
            src={shot.src}
            alt=""
            fill
            sizes="(max-width: 640px) 256px, 384px"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </div>
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