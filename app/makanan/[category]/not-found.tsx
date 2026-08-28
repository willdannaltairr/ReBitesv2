import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Navbar } from "@/app/components/navbar";
import { SiteFooter } from "@/app/components/Footer";
import { EmptyState } from "@/app/components/empty-state";

export default function CategoryNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-28">
        <EmptyState
          className="w-full max-w-md border border-hairline bg-white py-14"
          icon={<Compass className="h-7 w-7 text-charcoal-500" aria-hidden />}
          title="Kategori tidak ditemukan"
          description="Kategori makanan yang kamu cari tidak tersedia."
          action={
            <Link
              href="/homePage"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-700/20 transition-all duration-200 hover:bg-caramel active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Kembali ke Beranda
            </Link>
          }
        />
      </main>
      <SiteFooter />
    </div>
  );
}
