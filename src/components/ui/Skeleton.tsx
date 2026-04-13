import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-[var(--color-neutral-200)]',
        className
      )}
      style={{ animation: 'pulse-soft 1.5s ease-in-out infinite' }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3 px-4 border-b border-[var(--color-neutral-100)]">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-4 w-20 ml-auto" />
    </div>
  )
}
