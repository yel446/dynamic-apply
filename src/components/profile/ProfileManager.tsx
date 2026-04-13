'use client'

import { useState } from 'react'
import { ProfileForm } from '@/components/forms/ProfileForm'
import { Plus, LayoutTemplate, FileText, List as ListIcon, Edit3, ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'
import { ProfileListView } from './ProfileListView'
import type { ProfileWithRelations } from '@/types'

const CVPreviewButton = dynamic(
  () => import('@/components/cv/CVPreview').then(mod => mod.CVPreviewButton),
  { ssr: false }
)

const CVLivePreview = dynamic(
  () => import('@/components/cv/CVLivePreview').then(mod => mod.CVLivePreview),
  { ssr: false }
)

interface ProfileManagerProps {
  profiles: ProfileWithRelations[]
}

export function ProfileManager({ profiles }: ProfileManagerProps) {
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    profiles.find((p) => p.isDefault)?.id || profiles[0]?.id || ''
  )

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId)

  const handleSelectProfile = (id: string, newView: 'editor') => {
    setSelectedProfileId(id)
    setView(newView)
  }

  if (!selectedProfile) return <div>Aucun profil disponible.</div>

  return (
    <div className="flex flex-col gap-6">
      {/* Sub-Navigation */}
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-md p-2 rounded-2xl border border-slate-200/60 w-fit shrink-0 self-center lg:self-start">
        <button
          onClick={() => setView('list')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            view === 'list'
              ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
          }`}
        >
          <ListIcon className="w-4 h-4" />
          Bibliothèque
        </button>
        <button
          onClick={() => setView('editor')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            view === 'editor'
              ? 'bg-white text-blue-600 shadow-sm border border-slate-100'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          Éditeur & Aperçu
        </button>
      </div>

      {view === 'list' ? (
        <ProfileListView profiles={profiles} onSelect={handleSelectProfile} />
      ) : (
        <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-220px)] animate-fade-in">
          {/* LEFT COLUMN: Controls & Form */}
          <div className="w-full xl:w-[55%] flex flex-col h-full overflow-hidden">
            {/* Profile Selector & Back */}
            <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
              <div className="w-full sm:w-auto flex items-center gap-4">
                <button 
                  onClick={() => setView('list')}
                  className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
                  title="Retour à la liste"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1 min-w-[200px]">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Variant en édition
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProfileId}
                      onChange={(e) => setSelectedProfileId(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    >
                      {profiles.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} {p.isDefault ? '(Défaut)' : ''}
                        </option>
                      ))}
                    </select>
                    <LayoutTemplate className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3">
                <div className="block xl:hidden w-full sm:w-auto">
                  <CVPreviewButton profile={selectedProfile} fileName={`CV_${(selectedProfile.name || 'Profil').replace(/\s+/g, '_')}.pdf`} />
                </div>
                <button className="w-full sm:w-auto bg-slate-900 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Nouveau Variant
                </button>
              </div>
            </div>

            {/* Form Scrollable Area */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-[100px]">
              <ProfileForm profile={selectedProfile} />
            </div>
          </div>

          {/* RIGHT COLUMN: Live Preview */}
          <div className="hidden xl:flex w-[45%] h-full flex-col bg-slate-900 rounded-[28px] overflow-hidden shadow-2xl border border-slate-800 relative">
            <div className="bg-slate-950 px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <h2 className="font-semibold text-sm">Rendu PDF en temps réel</h2>
              </div>
              <div className="flex gap-2">
                 <CVPreviewButton profile={selectedProfile} />
              </div>
            </div>

            <div className="flex-1 w-full bg-slate-100 overflow-hidden relative">
               <CVLivePreview profile={selectedProfile} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

