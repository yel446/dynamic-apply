'use client'

import { Trash2 } from 'lucide-react'
import { deleteProfile } from '@/app/profile/actions'

interface DeleteProfileButtonProps {
  id: string
}

export function DeleteProfileButton({ id }: DeleteProfileButtonProps) {
  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce profil ?")) {
      await deleteProfile(id)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="p-3 rounded-2xl border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
      title="Supprimer ce profil"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  )
}
