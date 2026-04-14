'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from './Card'

interface AccordionSectionProps {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AccordionSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className="overflow-hidden p-1 border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[70px] flex items-center justify-between px-6 hover:bg-slate-50/50 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-[15px] font-bold text-slate-900 uppercase tracking-wide">
              {title}
            </h3>
          </div>
        </div>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all",
          isOpen && "bg-blue-600 text-white rotate-180"
        )}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-slate-50 pt-4 animate-fade-in">
          {children}
        </div>
      )}
    </Card>
  )
}
