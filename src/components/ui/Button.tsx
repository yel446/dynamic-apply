import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
          // Variants
          variant === 'primary' && 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-800)] focus-visible:ring-[var(--color-primary-light)]',
          variant === 'secondary' && 'bg-[var(--color-primary-lighter)] text-[var(--color-primary)] hover:bg-[var(--color-primary-100)]',
          variant === 'outline' && 'border border-[var(--color-neutral-300)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)] hover:border-[var(--color-neutral-400)]',
          variant === 'danger' && 'bg-[var(--color-danger)] text-white hover:bg-red-700 focus-visible:ring-red-500',
          variant === 'ghost' && 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-800)]',
          // Sizes
          size === 'sm' && 'text-xs px-3 py-1.5',
          size === 'md' && 'text-sm px-4 py-2.5',
          size === 'lg' && 'text-base px-6 py-3',
          className
        )}
        style={{ fontFamily: 'var(--font-heading)' }}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
