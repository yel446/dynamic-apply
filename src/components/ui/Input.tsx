import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-neutral-700)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3.5 py-2.5 rounded-lg border text-sm text-[var(--color-neutral-800)] placeholder:text-[var(--color-neutral-400)] bg-white transition-all duration-150',
            error
              ? 'border-[var(--color-danger)] focus:ring-red-100'
              : 'border-[var(--color-neutral-300)] focus:border-[var(--color-primary-light)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-[var(--color-neutral-400)] mt-1">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export { Input }
