'use client'

import { LayoutTemplate, MapPin, CheckCircle2, ChevronRight, FileText, Settings2, Trash2, Copy, Plus, MoreVertical, X } from 'lucide-react'
import type { ProfileWithRelations } from '@/types'
import Link from 'next/link'
import { createProfile, deleteProfile } from '@/app/profile/actions'

interface ProfileListViewProps {
  profiles: ProfileWithRelations[]
}

import Swal from 'sweetalert2'

export function ProfileListView({ profiles }: ProfileListViewProps) {
  const handleDelete = async (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault()
    e.stopPropagation()

    const result = await Swal.fire({
      title: 'Supprimer ce profil ?',
      text: `Vous êtes sur le point de supprimer "${name}". Cette action est irréversible.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      background: '#ffffff',
      borderRadius: '24px',
      customClass: {
        popup: 'rounded-[24px] border border-slate-100 shadow-xl',
        confirmButton: 'rounded-xl px-6 py-2.5 font-bold',
        cancelButton: 'rounded-xl px-6 py-2.5 font-bold'
      }
    })

    if (result.isConfirmed) {
      await deleteProfile(id)
      Swal.fire({
        title: 'Profil supprimé',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        borderRadius: '24px'
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
      {/* Create New Profile Card */}
      <form action={createProfile}>
        <button
          type="submit"
          className="w-full h-full min-h-[280px] rounded-3xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 flex flex-col items-center justify-center gap-4 group"
        >
          <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="text-slate-900 font-bold">Nouveau Profil</p>
            <p className="text-slate-500 text-xs mt-1">Créez une nouvelle base de CV</p>
          </div>
        </button>
      </form>

      {profiles.map((profile) => (
        <Link 
          key={profile.id}
          href={`/profile/${profile.id}`}
          className="glass-card group hover:scale-[1.02] transition-all duration-300 flex flex-col h-full bg-white border border-slate-100 overflow-hidden"
        >
          <div className="p-6 flex flex-col h-full relative">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              
              {/* Direct Delete Action */}
              <button
                onClick={(e) => handleDelete(e, profile.id, profile.name)}
                className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                title="Supprimer ce profil"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {profile.name}
              </h3>
              <p className="text-sm font-medium text-slate-500 h-10 line-clamp-2">
                {profile.title}
              </p>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <FileText className="w-3.5 h-3.5" />
                {profile.experiences.length} Expériences • {profile.skills.length} Catégories
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-50 px-0">
              <div className="w-full py-2.5 rounded-xl border border-slate-100 text-slate-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 flex items-center justify-center gap-2 transition-all">
                Éditer & Visualiser
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
