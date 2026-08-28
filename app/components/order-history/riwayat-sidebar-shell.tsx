'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { ProfileSidebarNav } from '@/app/components/profile-sidebar-nav';
import { PageHeader } from '@/app/components/page-header';

export function RiwayatSidebarShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-cream-50 lg:bg-cream-50">
      <ProfileSidebarNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[280px]">
        {/* Mobile top bar - like profile */}
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-sage-100 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka navigasi"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-charcoal-900"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-display text-base font-semibold text-forest-deep">Riwayat Transaksi</span>
        </div>

        <main className="mx-auto max-w-[1100px] px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          {/* Desktop title - plain, no breadcrumb like photo's Home > My Account > My Orders excluded */}
          <PageHeader
            className="hidden lg:block"
            eyebrow="Pesanan Saya"
            title="My Orders"
            subtitle="Kelola dan lacak transaksi makanan surplus kamu."
          />
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
