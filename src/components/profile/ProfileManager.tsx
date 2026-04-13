'use client'

import { useState } from 'react'
import { ProfileForm } from '@/components/forms/ProfileForm'
import { Plus, LayoutTemplate, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'
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
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    profiles.find((p) => p.isDefault)?.id || profiles[0]?.id || ''
  )

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId)

  if (!selectedProfile) return <div>Aucun profil disponible.</div>

  return (
    <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-140px)]">
      {/* LEFT COLUMN: Controls & Form */}
      <div className="w-full xl:w-[55%] flex flex-col h-full overflow-hidden">
        {/* Profile Selector */}
        <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
          <div className="w-full sm:w-auto">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
              Variante de CV active
            </label>
            <div className="relative">
              <select
                value={selectedProfileId}
                onChange={(e) => setSelectedProfileId(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-xl px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                style={{ fontFamily: 'var(--font-heading)' }}
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
          
          <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3">
            {/* Mobile/Tablet Only: Floating Preview Button so they don't miss the PDF access */}
            <div className="block xl:hidden w-full sm:w-auto">
              <CVPreviewButton profile={selectedProfile} fileName={`CV_${selectedProfile.name.replace(/\s+/g, '_')}.pdf`} />
            </div>
            {/* Future: Duplicate Profile feature could go here */}
            <button className="w-full sm:w-auto bg-slate-900 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nouveau Profil
            </button>
          </div>
        </div>

        {/* Form Scrollable Area */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-[100px]">
          <ProfileForm profile={selectedProfile} />
        </div>
      </div>

      {/* RIGHT COLUMN: Live Preview */}
      <div className="hidden xl:flex w-[45%] h-full flex-col bg-slate-900 rounded-[24px] overflow-hidden shadow-xl border border-slate-800 relative">
        <div className="bg-slate-950 px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-white">
            <FileText className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-sm">Aperçu en direct (PDF)</h2>
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
  )
}
