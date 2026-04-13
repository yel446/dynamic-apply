'use client'

import { Bell, Bookmark, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isDashboard = pathname === '/'

  return (
    <header
      className="fixed top-0 right-0 z-30 bg-transparent"
      style={{
        left: 'var(--sidebar-width)',
        height: 'var(--header-height)',
      }}
    >
      <div className="h-full flex items-center justify-between px-8 lg:px-10">
        <div>
          {/* We will let the individual pages handle their headers to match the reference design directly */}
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-500 hover:text-blue-500 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-500 hover:text-blue-500 transition-colors relative">
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
