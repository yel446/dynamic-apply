'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { IconPicker } from '@/components/ui/IconPicker'
import { RichTextEditor } from '@/components/ui/RichTextEditor'
import { Save, Trash2, Sparkles, ChevronDown } from 'lucide-react'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: { title: string, icon: string, content: string }) => Promise<void>
  onDelete?: () => Promise<void>
  initialData?: { title: string, icon: string, content: string }
  isEditing?: boolean
}

export function SectionModal({ 
  open, 
  onOpenChange, 
  onSave, 
  onDelete, 
  initialData,
  isEditing = false 
}: SectionModalProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [icon, setIcon] = useState(initialData?.icon || 'Sparkles')
  const [content, setContent] = useState(initialData?.content || '')
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (open && initialData) {
      setTitle(initialData.title)
      setIcon(initialData.icon || 'Sparkles')
      setContent(initialData.content)
    } else if (open && !isEditing) {
      setTitle('')
      setIcon('Sparkles')
      setContent('')
    }
  }, [open, initialData, isEditing])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave({ title, icon, content })
      onOpenChange(false)
    } finally {
      setIsSaving(false)
    }
  }

  const SelectedIcon = (Icons as any)[icon] || Sparkles

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? "Modifier la rubrique" : "Nouvelle rubrique"}
      description={isEditing ? "Ajustez les détails de votre rubrique personnalisée." : "Ajoutez une section spécifique à votre parcours (Logiciels, Distinctions, etc.)."}
      size="lg"
    >
      <div className="space-y-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Icon Selector Button */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Icône</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowIconPicker(!showIconPicker)}
                className="w-full h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
              >
                <SelectedIcon className="w-6 h-6" />
                <ChevronDown className="w-3 h-3 ml-2 text-slate-400" />
              </button>
              
              {showIconPicker && (
                <div className="absolute top-14 left-0 z-[60]">
                  <IconPicker 
                    value={icon} 
                    onChange={setIcon} 
                    onClose={() => setShowIconPicker(false)} 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Title Input */}
          <div className="md:col-span-9 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Titre de la rubrique</label>
            <Input 
              placeholder="Ex: Logiciels, Projets, Distinctions..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 text-sm font-medium"
            />
          </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contenu</label>
          <RichTextEditor 
            initialValue={content} 
            onChange={setContent} 
            placeholder="Détails de votre rubrique..."
            className="min-h-[200px]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {isEditing && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="text-sm text-red-500 hover:text-red-700 font-bold flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          ) : <div />}

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
              Annuler
            </Button>
            <Button 
              onClick={handleSave} 
              isLoading={isSaving} 
              disabled={!title || !content}
              className="px-8"
            >
              <Save className="w-4 h-4" />
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
