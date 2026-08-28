import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-sage-200 bg-cream-50 px-6 py-14 text-center',
        className,
      )}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm shadow-forest-900/10">
          {icon}
        </div>
      )}

      <p className="font-sans text-sm font-semibold text-charcoal-900">
        {title}
      </p>

      {description && (
        <p className="mt-1.5 max-w-sm font-sans text-xs leading-relaxed text-charcoal-500">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}