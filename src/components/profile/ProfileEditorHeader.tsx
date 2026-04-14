'use client'

import { Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/ui/BackButton'
import { DeleteProfileButton } from '@/components/profile/DeleteProfileButton'
import { CVPreviewButton } from '@/components/cv/CVDynamic'
import type { ProfileWithRelations } from '@/types'

interface ProfileEditorHeaderProps {
  profile: ProfileWithRelations
  profileName: string
  setProfileName: (name: string) => void
  onSave: () => void
  isSaving: boolean
}

export function ProfileEditorHeader({
  profile,
  profileName,
  setProfileName,
  onSave,
  isSaving
}: ProfileEditorHeaderProps) {
  return (
    <div 
      className="fixed top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300"
      style={{ 
        left: 'var(--sidebar-width)', 
        right: 0,
        height: 'var(--header-height)' 
      }}
    >
      <div className="h-full px-8 lg:px-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href="/profile" />
          <div className="flex flex-col">
            <input
               value={profileName}
               onChange={(e) => setProfileName(e.target.value)}
               className="text-xl font-bold text-slate-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-100 rounded-lg px-2 -ml-2 w-full max-w-[350px] transition-all"
               placeholder="Nom du profil..."
            />
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest px-2">
              Édition Variant Master
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <DeleteProfileButton id={profile.id} />
           <CVPreviewButton 
             profile={profile} 
             variant="primary"
           />
           <Button onClick={onSave} isLoading={isSaving} className="!rounded-2xl !px-6 shadow-lg shadow-blue-200/40 !h-11">
             <Save className="w-4 h-4 mr-2" />
             Enregistrer
           </Button>
        </div>
      </div>
    </div>
  )
}
