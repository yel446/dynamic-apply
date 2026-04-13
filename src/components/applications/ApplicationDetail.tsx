'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Eye, FileText, Pen, ExternalLink, NotebookText, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge, ScoreBadge } from '@/components/ui/Badge'
import { Textarea } from '@/components/ui/Textarea'
import { formatDate, STATUS_CONFIG } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Application, Profile, Skill, Experience, Mission, Education, Certification, Language } from '@prisma/client'

type FullProfile = Profile & {
  skills: Skill[]
  experiences: (Experience & { missions: Mission[] })[]
  education: Education[]
  certifications: Certification[]
  languages: Language[]
}

interface ApplicationDetailProps {
  application: Application
  profile: FullProfile | null
}

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'applied', label: 'Postulé' },
  { value: 'interview', label: 'Entretien' },
  { value: 'rejected', label: 'Refusé' },
  { value: 'offer', label: 'Offre reçue' },
]

export function ApplicationDetail({ application, profile }: ApplicationDetailProps) {
  const [status, setStatus] = useState(application.status)
  const [notes, setNotes] = useState(application.notes || '')
  const [saving, setSaving] = useState(false)

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus)
    await fetch(`/api/applications/${application.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
  }

  async function handleSaveNotes() {
    setSaving(true)
    await fetch(`/api/applications/${application.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    })
    setSaving(false)
  }

  const keywords: string[] = application.atsKeywords ? JSON.parse(application.atsKeywords) : []

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div className="flex items-center gap-4">
        <Link href="/applications" className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>
            {application.jobTitle}
          </h1>
          <p className="text-sm text-[var(--color-neutral-500)]">{application.company}</p>
        </div>
        <Badge variant="status" status={status} />
        {application.atsScore && <ScoreBadge score={application.atsScore} />}
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <p className="text-xs text-[var(--color-neutral-500)]">Créée le</p>
          <p className="text-sm font-semibold text-[var(--color-neutral-800)] mt-1">{formatDate(application.createdAt)}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs text-[var(--color-neutral-500)]">Score ATS</p>
          <p className="text-2xl font-bold mt-1" style={{ fontFamily: 'var(--font-heading)', color: application.atsScore && application.atsScore >= 60 ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {application.atsScore ? `${application.atsScore}%` : '—'}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-[var(--color-neutral-500)] mb-2">Statut</p>
          <div className="flex gap-1 flex-wrap">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleStatusChange(opt.value)}
                className={cn(
                  'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                  status === opt.value
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-200)]'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* ATS Keywords */}
      {keywords.length > 0 && (
        <Card className="p-5">
          <h3 className="text-sm font-bold text-[var(--color-neutral-700)] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Mots-clés ATS
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full bg-[var(--color-primary-lighter)] text-xs font-medium text-[var(--color-primary)]">
                {kw}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CV */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-lighter)] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[var(--color-primary-light)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>CV adapté</h3>
              <p className="text-xs text-[var(--color-neutral-500)]">
                {application.adaptedSummary ? 'Adapté par l\'IA' : 'CV de base'}
              </p>
            </div>
          </div>
          {application.adaptedSummary && (
            <p className="text-xs text-[var(--color-neutral-600)] mb-3 line-clamp-3">{application.adaptedSummary}</p>
          )}
          <p className="text-xs text-[var(--color-neutral-400)] italic">Preview PDF disponible dans la page profil</p>
        </Card>

        {/* Cover letter */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Pen className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>Lettre de motivation</h3>
              <p className="text-xs text-[var(--color-neutral-500)]">
                {application.coverLetter ? `${application.coverLetter.split(' ').length} mots` : 'Non générée'}
              </p>
            </div>
          </div>
          {application.coverLetter && (
            <p className="text-xs text-[var(--color-neutral-600)] line-clamp-4">{application.coverLetter}</p>
          )}
        </Card>
      </div>

      {/* Notes */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <NotebookText className="w-4 h-4 text-[var(--color-neutral-400)]" />
            <h3 className="text-sm font-bold text-[var(--color-neutral-700)]" style={{ fontFamily: 'var(--font-heading)' }}>Notes</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSaveNotes} isLoading={saving}>
            Sauvegarder
          </Button>
        </div>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ajoutez des notes sur cette candidature..."
          className="min-h-[100px]"
        />
      </Card>

      {/* Job description */}
      {application.jobDescription && (
        <Card className="p-5">
          <h3 className="text-sm font-bold text-[var(--color-neutral-700)] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Description de l&apos;offre
          </h3>
          <div className="text-xs text-[var(--color-neutral-600)] leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto">
            {application.jobDescription}
          </div>
        </Card>
      )}
    </div>
  )
}
