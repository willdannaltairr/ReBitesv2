'use client';

import { SkeletonCard } from '@/app/components/skeleton-card';
import { SellerShell } from '@/app/components/dashboardPenjual/SellerShell';

export default function SellerDashboardLoading() {
  return (
    <SellerShell>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="h-3 w-32 animate-pulse rounded-full bg-sage-200/60" />
          <div className="mt-3 h-9 w-64 max-w-full animate-pulse rounded-full bg-sage-200/50" />
        </div>
        <div className="h-11 w-36 shrink-0 animate-pulse rounded-full bg-sage-100" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="space-y-5 lg:col-span-8">
          <SkeletonCard className="h-[300px]" />
          <SkeletonCard className="h-48" />
        </div>
        <div className="space-y-5 lg:col-span-4">
          <SkeletonCard className="h-52" />
          <SkeletonCard className="h-44" />
        </div>
      </div>
    </SellerShell>
  );
}