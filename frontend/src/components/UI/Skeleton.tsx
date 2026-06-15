interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className = "", count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse rounded-xl bg-surface-800 ${className}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-3 px-4 py-3 animate-fade-in" role="status" aria-label="Loading message">
      <div className="shrink-0 w-8 h-8 rounded-full bg-surface-800 animate-pulse" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-full max-w-xl" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
