'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  href?: string
  className?: string
}

export function BackButton({ href, className }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleBack}
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-500 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all cursor-pointer",
        className
      )}
      aria-label="Retour"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  )
}
