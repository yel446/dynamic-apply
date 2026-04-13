import { type LucideIcon } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-lighter)] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[var(--color-primary-light)]" />
      </div>
      <h3
        className="text-lg font-bold text-[var(--color-neutral-800)] mb-1.5"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h3>
      <p className="text-sm text-[var(--color-neutral-500)] max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && (
        actionHref ? (
          <a href={actionHref}>
            <Button>{actionLabel}</Button>
          </a>
        ) : (
          <Button onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </div>
  )
}
