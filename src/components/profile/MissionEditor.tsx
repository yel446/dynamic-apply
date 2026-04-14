'use client'

import { useState } from 'react'
import { Save, Trash2, Plus, X } from 'lucide-react'
import { updateMission, deleteMission } from '@/app/profile/actions'
import { Input } from '@/components/ui/Input'
import Swal from 'sweetalert2'

interface MissionEditorProps {
  mission: {
    id: string
    clientName: string | null
    clientCountry: string | null
    bullets: string // JSON string
  }
  profileId: string
}

export function MissionEditor({ mission, profileId }: MissionEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [clientName, setClientName] = useState(mission.clientName || '')
  const [clientCountry, setClientCountry] = useState(mission.clientCountry || '')
  const [bullets, setBullets] = useState<string[]>(JSON.parse(mission.bullets || '[]'))
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateMission(mission.id, clientName, clientCountry, bullets)
      setIsEditing(false)
      Swal.fire({
        title: 'Mission enregistrée',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
        background: '#ffffff',
        borderRadius: '24px'
      })
    } catch (error) {
       console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Supprimer cette réalisation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#ef4444'
    })

    if (result.isConfirmed) {
      await deleteMission(mission.id, profileId)
    }
  }

  const addBullet = () => setBullets([...bullets, ''])
  
  const updateBullet = (index: number, value: string) => {
    const newBullets = [...bullets]
    newBullets[index] = value
    setBullets(newBullets)
  }

  const removeBullet = (index: number) => {
    setBullets(bullets.filter((_, i) => i !== index))
  }

  if (!isEditing) {
    return (
      <div className="group relative ml-4 pl-4 border-l-2 border-slate-100 py-1 hover:border-blue-400 transition-colors">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h5 className="text-sm font-bold text-slate-800">
               {mission.clientName || 'Nouveau Projet'} 
               {mission.clientCountry && <span className="text-slate-400 font-normal ml-2">({mission.clientCountry})</span>}
            </h5>
            <ul className="mt-1 space-y-1">
              {bullets.map((b, i) => (
                <li key={i} className="text-xs text-slate-500 flex gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  {b || 'Détail en attente...'}
                </li>
              ))}
            </ul>
          </div>
          <div className="opacity-0 group-hover:opacity-100 flex gap-1">
            <button onClick={() => setIsEditing(true)} className="p-1 text-slate-400 hover:text-blue-600">
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button onClick={handleDelete} className="p-1 text-slate-400 hover:text-red-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ml-4 p-4 rounded-xl bg-white border border-blue-100 shadow-lg animate-fade-in space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Client / Projet" value={clientName} onChange={(e) => setClientName(e.target.value)} />
        <Input label="Pays / Lieu" value={clientCountry || ''} onChange={(e) => setClientCountry(e.target.value)} />
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Points Clés</p>
        {bullets.map((b, i) => (
          <div key={i} className="flex gap-2">
            <input 
              value={b} 
              onChange={(e) => updateBullet(e, i)}
              className="flex-1 text-xs p-2 rounded-lg bg-slate-50 border border-slate-100 focus:ring-1 focus:ring-blue-100 outline-none"
              placeholder="Ex: Optimisation des performances SSR..."
            />
            <button onClick={() => removeBullet(i)} className="text-slate-300 hover:text-red-500">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button 
          onClick={addBullet}
          className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline"
        >
          <Plus className="w-3 h-3" /> AGREGAR PUNTO
        </button>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600">
          Annuler
        </button>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="px-4 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
        >
          {isSaving ? '...' : 'Valider'}
        </button>
      </div>
    </div>
  )
}
