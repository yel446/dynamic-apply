'use client'

import * as Icons from 'lucide-react'
import { useState, useMemo } from 'react'
import { Input } from './Input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Curated list of professional/common icons for CV sections
const COMMON_ICONS = [
  'Sparkles', 'Star', 'Award', 'Trophy', 'Briefcase', 'GraduationCap', 'Heart', 
  'Gamepad2', 'Music', 'Camera', 'Code', 'Cpu', 'Database', 'Globe', 'Languages',
  'Layout', 'Mail', 'Phone', 'MapPin', 'Link', 'Github', 'Linkedin', 'Twitter',
  'Facebook', 'Instagram', 'Youtube', 'Slack', 'MessageSquare', 'Share2', 'ExternalLink',
  'FileText', 'Folder', 'Archive', 'BookOpen', 'Bookmark', 'Flag', 'Bell', 'Settings',
  'Tools', 'PenTool', 'Brush', 'Palette', 'Coffee', 'Plane', 'Bike', 'Car', 'Activity',
  'Anchor', 'Atom', 'BarChart', 'CheckCircle', 'Cloud', 'Compass', 'CreditCard',
  'DollarSign', 'Download', 'Edit', 'Eye', 'Gift', 'Hash', 'Image', 'Layers',
  'LifeBuoy', 'Lock', 'Maximize', 'Menu', 'Mic', 'Moon', 'MoreHorizontal', 'MousePointer',
  'Navigation', 'Package', 'Paperclip', 'PieChart', 'Power', 'Printer', 'QrCode',
  'Radio', 'RefreshCw', 'Save', 'Scissors', 'Search', 'Shield', 'ShoppingBag',
  'Smartphone', 'Speaker', 'Sun', 'Tag', 'Terminal', 'ThumbsUp', 'Timer', 'Trash2',
  'Truck', 'Umbrella', 'Unlock', 'Upload', 'Video', 'Volume2', 'Watch', 'Wifi',
  'Zap', 'ZoomIn'
]

interface IconPickerProps {
  value: string
  onChange: (iconName: string) => void
  onClose?: () => void
}

export function IconPicker({ value, onChange, onClose }: IconPickerProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIcons = useMemo(() => {
    return COMMON_ICONS.filter(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className="w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 select-none">
      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="relative flex-1 mr-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            autoFocus
            type="text"
            placeholder="Rechercher une icône..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="p-2 max-h-60 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-6 gap-1">
          {filteredIcons.map((name) => {
            const Icon = (Icons as any)[name]
            if (!Icon) return null
            
            return (
              <button
                key={name}
                type="button"
                onClick={() => {
                  onChange(name)
                  onClose?.()
                }}
                className={cn(
                  "p-2.5 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-all group",
                  value === name ? "bg-blue-100 text-blue-600 shadow-sm" : "bg-transparent text-slate-500"
                )}
                title={name}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  value === name && "scale-110"
                )} />
              </button>
            )
          })}
        </div>
        
        {filteredIcons.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-xs text-slate-400">Aucune icône trouvée.</p>
          </div>
        )}
      </div>
      
      <div className="p-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] text-slate-400 font-medium">Lucide Icons Pack</p>
        <button 
          onClick={() => onChange('')}
          className="text-[10px] text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded hover:bg-red-50"
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}
