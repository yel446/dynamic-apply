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
          {/* Icons removed as per user request */}
        </div>
      </div>
    </header>
  )
}
