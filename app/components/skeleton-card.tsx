import { cn } from '@/lib/utils';

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-sage-100 bg-white p-5 shadow-sm shadow-forest-900/5',
        className,
      )}
    >
      <div className="aspect-[4/3] animate-pulse rounded-xl bg-sage-100/70" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-3/4 animate-pulse rounded-full bg-sage-100" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-sage-100/70" />
      </div>
    </div>
  );
}