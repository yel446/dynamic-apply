'use client'

import { LayoutTemplate, MapPin, CheckCircle2, ChevronRight, FileText, Settings2, Trash2, Copy } from 'lucide-react'
import type { ProfileWithRelations } from '@/types'

interface ProfileListViewProps {
  profiles: ProfileWithRelations[]
  onSelect: (id: string, view: 'editor') => void
}

export function ProfileListView({ profiles, onSelect }: ProfileListViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
      {profiles.map((profile) => (
        <div 
          key={profile.id}
          className="glass-card group hover:scale-[1.02] transition-all duration-300 flex flex-col cursor-pointer"
          onClick={() => onSelect(profile.id, 'editor')}
        >
          {/* Default badge */}
          {profile.isDefault && (
            <div className="absolute -top-3 -right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg z-10">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={(e) => { e.stopPropagation(); /* TODO: Duplicate logic */ }}
                  title="Dupliquer"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                  onClick={(e) => { e.stopPropagation(); /* TODO: Delete logic */ }}
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
              {profile.name}
            </h3>
            <p className="text-sm font-medium text-slate-500 mb-4 h-10 line-clamp-2">
              {profile.title}
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <FileText className="w-3.5 h-3.5" />
                {profile.experiences.length} Expériences • {profile.skills.length} Catégories
              </div>
            </div>

            <button 
              className="mt-auto w-full py-2.5 rounded-xl border border-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-50 hover:border-slate-200 flex items-center justify-center gap-2 transition-all"
            >
              Éditer & Visualiser
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
