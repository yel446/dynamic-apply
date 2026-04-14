'use client'

import { useState } from 'react'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trash2, 
  Pencil, 
  Sparkles, 
  Save, 
  Plus, 
  Globe,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { AccordionSection } from '@/components/ui/AccordionSection'
import { SectionModal } from '@/components/profile/SectionModal'
import { MissionEditor } from '@/components/profile/MissionEditor'
import Swal from 'sweetalert2'
import * as Icons from 'lucide-react'

import {
  updateSkill,
  updateExperience,
  updateEducation,
  updateCertification,
  addSkill,
  deleteSkill,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  addCertification,
  deleteCertification,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  addMission,
  deleteMission,
  deleteSection
} from '@/app/profile/actions'
import type { ProfileWithRelations } from '@/types'

interface ProfileFormProps {
  profile: ProfileWithRelations
  saving: string | null
  setSaving: (id: string | null) => void
}

export function ProfileForm({ profile, saving, setSaving }: ProfileFormProps) {
  const [editingSection, setEditingSection] = useState<any>(null)
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)

  const handleSaveSkill = async (skillId: string, formData: FormData) => {
    setSaving(`skill-${skillId}`)
    formData.append('skillId', skillId)
    await updateSkill(formData)
    setSaving(null)
  }

  const handleSaveExperience = async (experienceId: string, formData: FormData) => {
    setSaving(`exp-${experienceId}`)
    formData.append('experienceId', experienceId)
    await updateExperience(formData)
    setSaving(null)
  }

  const handleSaveEducation = async (educationId: string, formData: FormData) => {
    setSaving(`edu-${educationId}`)
    formData.append('educationId', educationId)
    await updateEducation(formData)
    setSaving(null)
  }

  return (
    <div className="space-y-8 pb-32">
      <form id="main-profile-form" className="space-y-6">
        {/* Informations personnelles */}
        <AccordionSection title="Informations personnelles" icon={User} defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input label="Nom complet" name="fullName" defaultValue={profile.fullName} required />
             <Input label="Titre professionnel" name="title" defaultValue={profile.title} required />
             <Input label="Email" name="email" type="email" defaultValue={profile.email} required />
             <Input label="Téléphone" name="phone" defaultValue={profile.phone} required />
             <Input label="Localisation" name="location" defaultValue={profile.location} required />
             <Input label="Site web" name="website" defaultValue={profile.website || ''} />
             <Input label="LinkedIn" name="linkedin" defaultValue={profile.linkedin || ''} />
             <div className="md:col-span-2">
               <Input label="Photo (URL ou Base64)" name="photo" defaultValue={profile.photo || ''} />
             </div>
             <div className="md:col-span-2">
                <Textarea label="Accroche / Devise" name="motto" defaultValue={profile.motto || ''} className="min-h-[60px]" />
             </div>
             <div className="md:col-span-2">
                <Textarea label="Résumé du profil" name="summary" defaultValue={profile.summary} className="min-h-[120px]" required />
             </div>
          </div>
        </AccordionSection>
      </form>

      {/* Skills */}
      <AccordionSection title="Compétences" icon={Star}>
        <div className="space-y-4">
          {profile.skills.map((skill) => (
            <div key={skill.id} className="relative group/skill">
              <form
                action={(fd) => handleSaveSkill(skill.id, fd)}
                className="p-4 rounded-[24px] bg-slate-50/50 border border-slate-100 space-y-3 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start gap-4">
                  <Input label="Catégorie" name="category" defaultValue={skill.category} required className="flex-1" />
                  <button
                    type="button"
                    onClick={async () => await deleteSkill(skill.id)}
                    className="mt-7 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Supprimer cette catégorie"
                  >
                    <Trash2 className="w-4 h-4 pointer-events-none" />
                  </button>
                </div>
                <Textarea
                  label="Compétences (séparées par des virgules)"
                  name="items"
                  defaultValue={skill.items}
                  className="min-h-[80px]"
                  required
                />
                <div className="flex justify-end">
                  <Button type="submit" size="xs" variant="secondary" isLoading={saving === `skill-${skill.id}`}>
                    <Save className="w-3 h-3 mr-1.5" />
                    Enregistrer
                  </Button>
                </div>
              </form>
            </div>
          ))}
          
          <button
            type="button"
            onClick={async () => {
              const fd = new FormData()
              fd.append('profileId', profile.id)
              fd.append('category', 'Nouvelle catégorie')
              fd.append('items', 'Compétence 1, Compétence 2')
              await addSkill(fd)
            }}
            className="w-full py-4 rounded-[24px] border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all font-bold text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter une catégorie
          </button>
        </div>
      </AccordionSection>

      {/* Experience */}
      <AccordionSection title="Expériences professionnelles" icon={Briefcase}>
        <div className="space-y-6">
          {profile.experiences.map((exp) => (
            <div key={exp.id} className="p-5 rounded-[32px] bg-slate-50/50 border border-slate-100 space-y-4 relative group/exp hover:bg-white hover:shadow-xl transition-all">
              <div className="absolute top-6 right-6 opacity-0 group-hover/exp:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={async () => await deleteExperience(exp.id, profile.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 className="w-5 h-5 pointer-events-none" />
                </button>
              </div>

              <form action={(fd) => handleSaveExperience(exp.id, fd)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Poste" name="jobTitle" defaultValue={exp.jobTitle} required />
                  <Input label="Entreprise" name="company" defaultValue={exp.company} required />
                  <Input label="Lieu" name="location" defaultValue={exp.location} required />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Début" name="startDate" defaultValue={exp.startDate} required />
                    <Input label="Fin" name="endDate" defaultValue={exp.endDate || ''} placeholder="Aujourd'hui" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" size="xs" variant="secondary" isLoading={saving === `exp-${exp.id}`}>
                    <Save className="w-3 h-3 mr-1.5" />
                    Enregistrer
                  </Button>
                </div>
              </form>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-4">Réalisations & Projets</p>
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
                  className="ml-4 flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Insérer une nouvelle mission
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={async () => await addExperience(profile.id)}
            className="w-full py-5 rounded-[32px] border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all font-bold text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ajouter une expérience professionnelle
          </button>
        </div>
      </AccordionSection>

      {/* Education */}
      <AccordionSection title="Formation" icon={GraduationCap}>
        <div className="space-y-4">
          {profile.education.map((edu) => (
            <div key={edu.id} className="relative group/edu">
              <form
                action={(fd) => handleSaveEducation(edu.id, fd)}
                className="p-5 rounded-[24px] bg-slate-50/50 border border-slate-100 space-y-4 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover/edu:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={async () => await deleteEducation(edu.id, profile.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4 pointer-events-none" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Diplôme" name="degree" defaultValue={edu.degree} required />
                  <Input label="École" name="school" defaultValue={edu.school} required />
                  <Input label="Lieu" name="location" defaultValue={edu.location} required />
                  <Input label="Date" name="date" defaultValue={edu.date} required />
                </div>
                <Input label="Détails" name="details" defaultValue={edu.details || ''} />
                <div className="flex justify-end">
                  <Button type="submit" size="xs" variant="secondary" isLoading={saving === `edu-${edu.id}`}>
                    <Save className="w-3 h-3 mr-1.5" />
                    Enregistrer
                  </Button>
                </div>
              </form>
            </div>
          ))}

          <button
            type="button"
            onClick={async () => await addEducation(profile.id)}
            className="w-full py-4 rounded-[24px] border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all font-bold text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un diplôme ou une école
          </button>
        </div>
      </AccordionSection>

      {/* Certifications */}
      <AccordionSection title="Certifications" icon={Award}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.certifications.map((cert) => (
              <div key={cert.id} className="p-4 rounded-[24px] bg-slate-50/50 border border-slate-100 space-y-3 relative group/cert hover:bg-white transition-all">
                <form action={async (fd) => {
                  fd.append('certificationId', cert.id)
                  await updateCertification(fd)
                }} className="space-y-2">
                  <Input label="Nom" name="name" defaultValue={cert.name} required />
                  <Input label="Organisme" name="issuer" defaultValue={cert.issuer} required />
                  <Input label="Date" name="date" defaultValue={cert.date} required />
                  <div className="flex justify-between items-center mt-3">
                    <button
                      type="button"
                      onClick={async () => await deleteCertification(cert.id, profile.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4 pointer-events-none" />
                    </button>
                    <Button type="submit" size="xs" variant="secondary">
                      Mettre à jour
                    </Button>
                  </div>
                </form>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={async () => await addCertification(profile.id)}
            className="w-full py-4 rounded-[24px] border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all font-bold text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvelle certification
          </button>
        </div>
      </AccordionSection>

      {/* Langues */}
      <AccordionSection title="Langues" icon={Globe}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.languages.map((lang) => (
              <div key={lang.id} className="p-4 rounded-[24px] bg-slate-50/50 border border-slate-100 space-y-3 relative group/lang hover:bg-white transition-all">
                <form action={async (fd) => {
                  fd.append('languageId', lang.id)
                  fd.append('profileId', profile.id)
                  await updateLanguage(fd)
                }} className="space-y-2">
                  <Input label="Langue" name="name" defaultValue={lang.name} required />
                  <Input label="Niveau" name="level" defaultValue={lang.level} required />
                  <div className="flex justify-between items-center mt-3">
                    <button
                      type="button"
                      onClick={async () => await deleteLanguage(lang.id, profile.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4 pointer-events-none" />
                    </button>
                    <Button type="submit" size="xs" variant="secondary">
                      OK
                    </Button>
                  </div>
                </form>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={async () => await addLanguage(profile.id)}
            className="w-full py-4 rounded-[24px] border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all font-bold text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter une langue
          </button>
        </div>
      </AccordionSection>

      {/* Dynamic Custom Sections */}
      {profile.customSections.map((section) => {
        const SectionIcon = (Icons as any)[section.icon || 'Sparkles'] || Sparkles
        return (
          <AccordionSection key={section.id} title={section.title} icon={SectionIcon}>
            <div className="space-y-4">
               <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingSection(section)
                      setIsSectionModalOpen(true)
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Éditer la rubrique
                  </button>
                  <button
                    onClick={async () => {
                      const result = await Swal.fire({
                        title: 'Supprimer cette rubrique ?',
                        text: "Le contenu sera définitivement effacé.",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Oui, supprimer',
                        confirmButtonColor: '#ef4444'
                      })
                      if (result.isConfirmed) {
                        await deleteSection(section.id, profile.id)
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Supprimer
                  </button>
               </div>
               <div 
                 className="p-6 rounded-[24px] bg-white border border-slate-100 prose prose-slate prose-sm max-w-none shadow-inner"
                 dangerouslySetInnerHTML={{ __html: section.content }}
               />
            </div>
          </AccordionSection>
        )
      })}

      {/* Add Section Button (Always visible at the end) */}
      <button
        onClick={() => {
          setEditingSection(null)
          setIsSectionModalOpen(true)
        }}
        className="w-full py-6 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-white hover:shadow-xl hover:scale-[1.01] transition-all font-bold text-sm flex items-center justify-center gap-3 group"
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
          <Plus className="w-6 h-6" />
        </div>
        CRÉER UNE NOUVELLE RUBRIQUE PERSONNALISÉE
      </button>

      {/* Modals */}
      <SectionModal 
        isOpen={isSectionModalOpen} 
        onClose={() => setIsSectionModalOpen(false)} 
        profileId={profile.id}
        section={editingSection}
      />
    </div>
  )
}
