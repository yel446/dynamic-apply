'use client'

import { useState } from 'react'
import { User, Briefcase, GraduationCap, Award, Globe, Heart, ChevronDown, ChevronUp, Save, Eye, Pencil, Plus, Trash2, Layout, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'
import { 
  updateProfile, 
  updateSkill, 
  updateExperience, 
  updateMissionBullets, 
  updateEducation, 
  updateCertification,
  addSection,
  updateSection,
  deleteSection,
  addSkill,
  deleteSkill
} from '@/app/profile/actions'
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
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-[var(--color-neutral-50)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-lighter)] flex items-center justify-center">
            <Icon className="w-[18px] h-[18px] text-[var(--color-primary-light)]" />
          </div>
          <h3 className="text-sm font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[var(--color-neutral-400)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--color-neutral-400)]" />
        )}
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
          <Input label="URL Photo de profil" name="photo" defaultValue={profile.photo || ''} placeholder="https://..." />
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
              {exp.missions.map((mission) => {
                const bullets: string[] = JSON.parse(mission.bullets)
                return (
                  <div key={mission.id} className="ml-4 pl-4 border-l-2 border-[var(--color-primary-lighter)] space-y-2">
                    <p className="text-sm font-semibold text-[var(--color-neutral-700)]">
                      📍 {mission.clientName}
                      {mission.clientCountry && (
                        <span className="text-[var(--color-neutral-400)] font-normal"> — {mission.clientCountry}</span>
                      )}
                    </p>
                    <ul className="space-y-1.5">
                      {bullets.map((bullet, i) => (
                        <li key={i} className="text-xs text-[var(--color-neutral-600)] leading-relaxed flex gap-2">
                          <span className="text-[var(--color-primary-light)] mt-0.5 flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
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
        <div className="space-y-6">
          {profile.customSections.map((section) => (
            <form
              key={section.id}
              action={updateSection}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4"
            >
              <input type="hidden" name="sectionId" value={section.id} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Titre de la rubrique" name="title" defaultValue={section.title} required />
                <Input label="Icône (ex: Award, Star, List)" name="icon" defaultValue={section.icon || ''} placeholder="Award" />
              </div>
              <Textarea
                label="Contenu"
                name="content"
                defaultValue={section.content}
                className="min-h-[100px]"
                required
              />
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => deleteSection(section.id, profile.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Supprimer la rubrique
                </button>
                <Button type="submit" size="sm" variant="secondary" isLoading={saving === `section-${section.id}`}>
                  <Save className="w-3.5 h-3.5" />
                  Mettre à jour
                </Button>
              </div>
            </form>
          ))}

          {/* New Section Form */}
          <form
            action={addSection}
            className="p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 space-y-4"
          >
            <input type="hidden" name="profileId" value={profile.id} />
            <div className="flex items-center gap-2 mb-2">
              <Plus className="w-4 h-4 text-blue-500" />
              <h4 className="text-sm font-bold text-slate-700">Nouvelle rubrique personnalisée</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Titre" name="title" placeholder="Ex: Projets, Logiciels, etc." required />
              <Input label="Icône" name="icon" placeholder="Star" />
            </div>
            <Textarea label="Contenu" name="content" placeholder="Détails de la rubrique..." required />
            <div className="flex justify-end">
              <Button type="submit" size="sm" variant="primary">
                Ajouter la rubrique
              </Button>
            </div>
          </form>
        </div>
      </AccordionSection>
    </div>
  )
}
