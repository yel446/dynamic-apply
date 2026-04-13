'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[90vw] max-h-[90vh]',
}

export function Modal({ open, onOpenChange, title, description, children, className, size = 'md' }: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-fade-in" />
        <DialogPrimitive.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'bg-white rounded-xl shadow-xl border border-[var(--color-neutral-200)]',
            'w-[95vw] p-6 animate-fade-in',
            sizeClasses[size],
            className
          )}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <DialogPrimitive.Title
                className="text-lg font-bold text-[var(--color-neutral-800)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="text-sm text-[var(--color-neutral-500)] mt-1">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] transition-colors">
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
