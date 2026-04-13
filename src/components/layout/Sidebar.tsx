'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, FileText, Plus, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Tableau de bord',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Mon Profil',
    href: '/profile',
    icon: User,
  },
  {
    label: 'Mes Candidatures',
    href: '/applications',
    icon: FileText,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed top-0 left-0 bottom-0 flex flex-col z-40 transition-all"
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--sidebar-bg)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-8 pt-8 pb-10">
        <div className="w-8 h-8 rounded-lg bg-emerald-400 flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-sm transform rotate-45"></div>
        </div>
        <div>
          <h1 className="text-white font-bold text-xl tracking-tight leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
            DynamicApply
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 mb-2">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Main Menu</p>
      </div>
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-500 text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Profile Card */}
      <div className="px-6 pb-8">
        <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3 border border-white/5">
           <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
             LY
           </div>
           <div className="flex-1 min-w-0">
             <p className="text-white text-sm font-semibold truncate leading-tight">Landry Yamb</p>
             <p className="text-gray-400 text-xs truncate">Product Manager</p>
           </div>
        </div>
      </div>
    </aside>
  )
}
