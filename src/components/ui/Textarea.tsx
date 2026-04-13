import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--color-neutral-700)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-3.5 py-2.5 rounded-lg border text-sm text-[var(--color-neutral-800)] placeholder:text-[var(--color-neutral-400)] bg-white transition-all duration-150 min-h-[100px] resize-y',
            error
              ? 'border-[var(--color-danger)] focus:ring-red-100'
              : 'border-[var(--color-neutral-300)] focus:border-[var(--color-primary-light)]',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[var(--color-neutral-400)] mt-1">{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export { Textarea }
