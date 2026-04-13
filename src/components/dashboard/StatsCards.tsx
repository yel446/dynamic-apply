import { FileText, Send, MessageSquare, XCircle, Trophy, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardsProps {
  stats: {
    total: number
    draft: number
    applied: number
    interview: number
    rejected: number
    offer: number
  }
}

const statItems = [
  { key: 'total', label: 'Total', icon: BarChart3, color: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary-lighter)]' },
  { key: 'draft', label: 'Brouillons', icon: FileText, color: 'text-[var(--color-neutral-600)]', bg: 'bg-[var(--color-neutral-100)]' },
  { key: 'applied', label: 'Postulées', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'interview', label: 'Entretiens', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
  { key: 'rejected', label: 'Refusées', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  { key: 'offer', label: 'Offres', icon: Trophy, color: 'text-green-600', bg: 'bg-green-50' },
]

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon
        const value = stats[item.key as keyof typeof stats]
        return (
          <div
            key={item.key}
            className="card p-4 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', item.bg)}>
                <Icon className={cn('w-[18px] h-[18px]', item.color)} />
              </div>
            </div>
            <p
              className="text-2xl font-bold text-[var(--color-neutral-800)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {value}
            </p>
            <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">{item.label}</p>
          </div>
        )
      })}
    </div>
  )
}
