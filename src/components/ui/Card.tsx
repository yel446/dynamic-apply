import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'card p-5',
        hover && 'cursor-pointer hover:translate-y-[-1px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
Card.displayName = 'Card'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between pb-4 border-b border-[var(--color-neutral-100)] mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-base font-bold text-[var(--color-neutral-800)]', className)}
      style={{ fontFamily: 'var(--font-heading)' }}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

export { Card, CardHeader, CardTitle }
