'use client'

import { useState } from 'react'
import { ProfileEditorHeader } from './ProfileEditorHeader'
import { ProfileForm } from '@/components/forms/ProfileForm'
import { CVLivePreview } from '@/components/cv/CVDynamic'
import { updateProfile } from '@/app/profile/actions'
import Swal from 'sweetalert2'
import type { ProfileWithRelations } from '@/types'

interface ProfileEditorWrapperProps {
  profile: ProfileWithRelations
}

export function ProfileEditorWrapper({ profile }: ProfileEditorWrapperProps) {
  const [saving, setSaving] = useState<string | null>(null)
  const [profileName, setProfileName] = useState(profile.name)

  const handleGlobalSave = async () => {
    setSaving('global')
    const form = document.getElementById('main-profile-form') as HTMLFormElement
    if (form) {
      const formData = new FormData(form)
      formData.set('profileId', profile.id)
      formData.set('name', profileName)
      await updateProfile(formData)
      Swal.fire({
        title: 'Profil mis à jour !',
        text: 'Toutes les informations ont été enregistrées.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#ffffff',
        borderRadius: '24px',
        customClass: {
          popup: 'rounded-[24px] border border-slate-100 shadow-xl',
        }
      })
    }
    setSaving(null)
  }

  return (
    <div className="min-h-screen">
      {/* 1. NAVBAR FIXED (Full Width) */}
      <ProfileEditorHeader 
        profile={profile}
        profileName={profileName}
        setProfileName={setProfileName}
        onSave={handleGlobalSave}
        isSaving={saving === 'global'}
      />

      {/* 2. MAIN CONTENT GRID (Below Navbar) */}
      <div className="pt-[var(--header-height)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-10 py-8">
          <div className="flex flex-col xl:flex-row gap-10 items-start">
            
            {/* LEFT COLUMN: DYNAMIC SECTION FORM */}
            <div className="w-full xl:w-[55%] animate-fade-in">
              <ProfileForm 
                profile={profile} 
                saving={saving} 
                setSaving={setSaving} 
              />
            </div>

            {/* RIGHT COLUMN: PREVIEW CARD FIXED (Sticky) */}
            <div className="hidden xl:flex xl:w-[45%] sticky top-[calc(var(--header-height)+2rem)] self-start flex-col bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-white/5 relative ring-1 ring-white/10 h-[calc(100vh-var(--header-height)-5rem)]">
              <div className="bg-slate-950 px-8 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                  <h2 className="font-bold text-sm text-slate-200 tracking-wide uppercase">Rendu PDF Haute-Fidélité</h2>
                </div>
              </div>

              <div className="flex-1 w-full bg-[#1e222d] overflow-hidden relative p-8">
                <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden group/pdf">
                  <CVLivePreview profile={profile} />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Mise à jour en temps réel lors de la saisie
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
