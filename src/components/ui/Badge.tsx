import { cn } from '@/lib/utils'
import { STATUS_CONFIG } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'status'
  status?: string
  children?: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', status, children, className }: BadgeProps) {
  if (variant === 'status' && status) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.draft
    return (
      <span className={cn('badge', config.color, config.bg, className)}>
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'draft' && 'bg-neutral-400',
          status === 'applied' && 'bg-blue-500',
          status === 'interview' && 'bg-amber-500',
          status === 'rejected' && 'bg-red-500',
          status === 'offer' && 'bg-green-500',
        )} />
        {config.label}
      </span>
    )
  }

  return (
    <span className={cn('badge bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]', className)}>
      {children}
    </span>
  )
}

interface ScoreBadgeProps {
  score: number
  className?: string
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const color = score >= 80 ? 'text-green-700 bg-green-50' : score >= 60 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50'
  return (
    <span className={cn('badge font-bold', color, className)}>
      {score}%
    </span>
  )
}
