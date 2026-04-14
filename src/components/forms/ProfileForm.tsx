'use client'

import { useState } from 'react'
import { User, Briefcase, GraduationCap, Award, Globe, Heart, ChevronDown, ChevronUp, Save, Eye, Pencil, Plus, Trash2, Layout, Sparkles, Camera, X } from 'lucide-react'
import { compressImage } from '@/lib/image-utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'
import { 
  updateProfile, 
  updateSkill, 
  updateExperience, 
  updateMission, 
  updateEducation, 
  updateCertification,
  addSection,
  updateSection,
  deleteSection,
  addSkill,
  deleteSkill,
  addMission,
  deleteMission
} from '@/app/profile/actions'
import { SectionModal } from '@/components/profile/SectionModal'
import { RichTextEditor } from '@/components/ui/RichTextEditor'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProfileWithRelations } from '@/types'

interface ProfileFormProps {
  profile: ProfileWithRelations
}

function AccordionSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[70px] flex items-center justify-between px-6 hover:bg-slate-50/50 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-[15px] font-bold text-slate-900">
              {title}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Configuration</p>
          </div>
        </div>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all",
          isOpen && "bg-blue-600 text-white rotate-180"
        )}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-[var(--color-neutral-100)] pt-4 animate-fade-in">
          {children}
        </div>
      )}
    </Card>
  )
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [saving, setSaving] = useState<string | null>(null)
  const [photo, setPhoto] = useState<string | null>(profile.photo || null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [editingSection, setEditingSection] = useState<any>(null)
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsCompressing(true)
    try {
      const compressed = await compressImage(file)
      setPhoto(compressed)
    } catch (err) {
      console.error("Erreur compression photo:", err)
    } finally {
      setIsCompressing(false)
    }
  }

  async function handleSaveProfile(formData: FormData) {
    setSaving('profile')
    formData.set('profileId', profile.id)
    await updateProfile(formData)
    setSaving(null)
  }

  async function handleSaveSkill(skillId: string, formData: FormData) {
    setSaving(`skill-${skillId}`)
    formData.set('skillId', skillId)
    await updateSkill(formData)
    setSaving(null)
  }

  async function handleSaveExperience(experienceId: string, formData: FormData) {
    setSaving(`exp-${experienceId}`)
    formData.set('experienceId', experienceId)
    await updateExperience(formData)
    setSaving(null)
  }

  async function handleSaveEducation(educationId: string, formData: FormData) {
    setSaving(`edu-${educationId}`)
    formData.set('educationId', educationId)
    await updateEducation(formData)
    setSaving(null)
  }

  return (
    <div className="space-y-4">
      {/* Informations personnelles */}
      <AccordionSection title="Informations personnelles" icon={User} defaultOpen>
        <form action={handleSaveProfile} className="space-y-4">
          <Input label="Nom du variant (ex: Profil Base Complet)" name="name" defaultValue={profile.name} required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nom complet" name="fullName" defaultValue={profile.fullName} required />
            <Input label="Titre" name="title" defaultValue={profile.title} required />
            <Input label="Email" name="email" type="email" defaultValue={profile.email} required />
            <Input label="Téléphone" name="phone" defaultValue={profile.phone} required />
            <Input label="Localisation" name="location" defaultValue={profile.location} required />
            <Input label="Site web" name="website" defaultValue={profile.website || ''} />
            <Input label="LinkedIn" name="linkedin" defaultValue={profile.linkedin || ''} className="md:col-span-2" />
          </div>
          <Textarea
            label="Phrase d'accroche (Motto)"
            name="motto"
            defaultValue={profile.motto || ''}
            className="min-h-[60px]"
            placeholder="ex: Résilient face aux défis, créatif dans les solutions..."
          />
          <Textarea
            label="Résumé / À propos"
            name="summary"
            defaultValue={profile.summary}
            className="min-h-[120px]"
            required
          />
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Photo de profil</label>
            <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 border-dashed">
              <div className="relative group/photo">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-2 border-white shadow-md">
                   {photo ? (
                     <img src={photo} alt="Profil" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                       <User className="w-10 h-10" />
                     </div>
                   )}
                </div>
                {photo && (
                  <button 
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover/photo:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all cursor-pointer shadow-sm">
                   <Camera className="w-4 h-4" />
                   {isCompressing ? "Traitement..." : "Changer la photo"}
                   <input 
                     type="file" 
                     className="hidden" 
                     accept="image/*" 
                     onChange={handlePhotoUpload}
                     disabled={isCompressing}
                   />
                </label>
                <p className="text-[10px] text-slate-400 mt-2">Format recommandé: carré, max 1Mo. La photo sera automatiquement optimisée.</p>
              </div>
            </div>
            <input type="hidden" name="photo" value={photo || ''} />
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="sm" isLoading={saving === 'profile'}>
              <Save className="w-3.5 h-3.5" />
              Enregistrer
            </Button>
          </div>
        </form>
      </AccordionSection>

      {/* Compétences */}
      <AccordionSection title="Compétences" icon={Briefcase}>
        <div className="space-y-4">
          {profile.skills.map((skill) => (
            <form
              key={skill.id}
              action={(fd) => handleSaveSkill(skill.id, fd)}
              className="p-4 rounded-lg bg-[var(--color-neutral-50)] space-y-3"
            >
              <Input label="Catégorie" name="category" defaultValue={skill.category} required />
              <Textarea
                label="Compétences (séparées par des virgules)"
                name="items"
                defaultValue={skill.items}
                className="min-h-[80px]"
                required
              />
              <div className="flex justify-end">
                <Button type="submit" size="sm" variant="secondary" isLoading={saving === `skill-${skill.id}`}>
                  <Save className="w-3.5 h-3.5" />
                  Sauvegarder
                </Button>
              </div>
            </form>
          ))}
        </div>
      </AccordionSection>

      {/* Expériences */}
      <AccordionSection title="Expériences professionnelles" icon={Briefcase}>
        <div className="space-y-6">
          {profile.experiences.map((exp) => (
            <div key={exp.id} className="p-4 rounded-lg bg-[var(--color-neutral-50)] space-y-4">
              <form
                action={(fd) => handleSaveExperience(exp.id, fd)}
                className="space-y-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input label="Poste" name="jobTitle" defaultValue={exp.jobTitle} required />
                  <Input label="Entreprise" name="company" defaultValue={exp.company} required />
                  <Input label="Lieu" name="location" defaultValue={exp.location} required />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Début" name="startDate" defaultValue={exp.startDate} required />
                    <Input label="Fin" name="endDate" defaultValue={exp.endDate || ''} placeholder="Aujourd'hui" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" size="sm" variant="secondary" isLoading={saving === `exp-${exp.id}`}>
                    <Save className="w-3.5 h-3.5" />
                    Sauvegarder
                  </Button>
                </div>
              </form>

              {/* Missions */}
              <div className="space-y-4 pt-2">
                {exp.missions.map((mission) => (
                  <MissionEditor key={mission.id} mission={mission} profileId={profile.id} />
                ))}
                
                <button
                  type="button"
                  onClick={async () => {
                    const fd = new FormData()
                    fd.append('experienceId', exp.id)
                    fd.append('profileId', profile.id)
                    await addMission(fd)
                  }}
                  className="ml-4 flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter une mission / projet
                </button>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Formation */}
      <AccordionSection title="Formation" icon={GraduationCap}>
        <div className="space-y-4">
          {profile.education.map((edu) => (
            <form
              key={edu.id}
              action={(fd) => handleSaveEducation(edu.id, fd)}
              className="p-4 rounded-lg bg-[var(--color-neutral-50)] space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Diplôme" name="degree" defaultValue={edu.degree} required />
                <Input label="École" name="school" defaultValue={edu.school} required />
                <Input label="Lieu" name="location" defaultValue={edu.location} required />
                <Input label="Date" name="date" defaultValue={edu.date} required />
              </div>
              <Input label="Détails / Spécialisation" name="details" defaultValue={edu.details || ''} />
              <div className="flex justify-end">
                <Button type="submit" size="sm" variant="secondary" isLoading={saving === `edu-${edu.id}`}>
                  <Save className="w-3.5 h-3.5" />
                  Sauvegarder
                </Button>
              </div>
            </form>
          ))}
        </div>
      </AccordionSection>

      {/* Certifications */}
      <AccordionSection title="Certifications" icon={Award}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {profile.certifications.map((cert) => (
            <div key={cert.id} className="p-3 rounded-lg bg-[var(--color-neutral-50)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--color-neutral-800)] truncate">{cert.name}</p>
                <p className="text-xs text-[var(--color-neutral-500)]">{cert.issuer} · {cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Langues */}
      <AccordionSection title="Langues" icon={Globe}>
        <div className="flex gap-4">
          {profile.languages.map((lang) => (
            <div key={lang.id} className="p-3 rounded-lg bg-[var(--color-neutral-50)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-neutral-800)]">{lang.name}</p>
                <p className="text-xs text-[var(--color-neutral-500)]">{lang.level}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>



      {/* Sections Personnalisées */}
      <AccordionSection title="Rubriques personnalisées" icon={Sparkles}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.customSections.map((section) => {
              const SectionIcon = (Icons as any)[section.icon || 'Sparkles'] || Sparkles
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setEditingSection(section)
                    setIsSectionModalOpen(true)
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <SectionIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">{section.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{section.content.replace(/<[^>]*>/g, '')}</p>
                  </div>
                </button>
              )
            })}

            <button
              onClick={() => {
                setEditingSection(null)
                setIsSectionModalOpen(true)
              }}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/30 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-700">Ajouter une rubrique</h4>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Personnalisé</p>
              </div>
            </button>
          </div>
        </div>
      </AccordionSection>

      <SectionModal 
        open={isSectionModalOpen}
        onOpenChange={setIsSectionModalOpen}
        isEditing={!!editingSection}
        initialData={editingSection}
        onSave={async (data) => {
          const fd = new FormData()
          fd.append('title', data.title)
          fd.append('icon', data.icon)
          fd.append('content', data.content)
          fd.append('profileId', profile.id)
          if (editingSection) {
            fd.append('sectionId', editingSection.id)
            await updateSection(fd)
          } else {
            await addSection(fd)
          }
        }}
        onDelete={editingSection ? async () => {
          await deleteSection(editingSection.id, profile.id)
        } : undefined}
      />
    </div>
  )
}

function MissionEditor({ mission, profileId }: { mission: any, profileId: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [bullets, setBullets] = useState<string[]>(JSON.parse(mission.bullets))
  const [clientName, setClientName] = useState(mission.clientName)
  const [clientCountry, setClientCountry] = useState(mission.clientCountry || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const fd = new FormData()
    fd.append('missionId', mission.id)
    fd.append('clientName', clientName)
    fd.append('clientCountry', clientCountry)
    fd.append('bullets', JSON.stringify(bullets.filter(b => b.trim() !== '')))
    fd.append('profileId', profileId)
    
    // Server Action update
    await updateMission(mission.id, clientName, clientCountry || null, bullets.filter(b => b.trim() !== '')) 
    
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <div className="ml-4 pl-4 border-l-2 border-slate-100 space-y-3 group/mission">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input 
                className="text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client / Projet"
              />
              <span className="text-slate-300">—</span>
              <input 
                className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
                placeholder="Pays"
              />
            </div>
          ) : (
            <p className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
              <span className="text-blue-500">📍</span>
              {clientName} 
              {clientCountry && <span className="text-slate-400 font-medium"> — {clientCountry}</span>}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover/mission:opacity-100 transition-opacity">
          {isEditing ? (
            <button 
              onClick={handleSave} 
              className="text-[10px] font-bold text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full transition-colors shadow-sm" 
              disabled={isSaving}
            >
              {isSaving ? "CHARGEMENT..." : "VALIDER"}
            </button>
          ) : (
            <>
              <button 
                type="button"
                onClick={() => setIsEditing(true)} 
                className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button"
                onClick={async () => await deleteMission(mission.id, profileId)} 
                className="p-1.5 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      <ul className="space-y-2">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 group/bullet">
            <span className="text-blue-400 mt-2 flex-shrink-0 text-[10px]">•</span>
            {isEditing ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  className="flex-1 text-xs text-slate-600 bg-white border border-slate-100 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
                  value={bullet}
                  onChange={(e) => {
                    const newBullets = [...bullets]
                    newBullets[i] = e.target.value
                    setBullets(newBullets)
                  }}
                />
                <button 
                  type="button"
                  onClick={() => setBullets(bullets.filter((_, idx) => idx !== i))}
                  className="opacity-0 group-hover/bullet:opacity-100 p-1.5 text-slate-300 hover:text-red-500 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{bullet}</p>
            )}
          </li>
        ))}
        {isEditing && (
          <button 
            type="button"
            onClick={() => setBullets([...bullets, ''])}
            className="text-[10px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors ml-5 py-1 px-2 rounded-lg bg-blue-50/50"
          >
            + AJOUTER UNE PUCE
          </button>
        )}
      </ul>
    </div>
  )
}
