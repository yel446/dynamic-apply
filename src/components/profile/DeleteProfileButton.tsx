'use client'

import { Trash2 } from 'lucide-react'
import { deleteProfile } from '@/app/profile/actions'

interface DeleteProfileButtonProps {
  id: string
}

import Swal from 'sweetalert2'

export function DeleteProfileButton({ id }: DeleteProfileButtonProps) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Supprimer le profil ?',
      text: "Cette action est irréversible !",
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
        title: 'Supprimé !',
        text: 'Le profil a été supprimé avec succès.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        borderRadius: '24px'
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="flex items-center justify-center w-12 h-12 rounded-2xl border border-slate-100 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 hover:shadow-lg transition-all shadow-sm cursor-pointer"
      title="Supprimer ce profil"
    >
      <Trash2 className="w-6 h-6 pointer-events-none" />
    </button>
  )
}
