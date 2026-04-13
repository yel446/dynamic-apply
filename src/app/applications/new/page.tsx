'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles, FileText, Pen, Download, ClipboardPaste, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Badge, ScoreBadge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const STEPS = [
  { label: "L'offre", icon: ClipboardPaste },
  { label: 'Analyse IA', icon: Sparkles },
  { label: 'CV adapté', icon: FileText },
  { label: 'Lettre de motivation', icon: Pen },
  { label: 'Export', icon: Download },
]

export default function NewApplicationPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  // Form state
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  // Analysis results
  const [analysis, setAnalysis] = useState<{
    recommendedProfileId?: string
    keywords?: string[]
    requiredSkills?: string[]
    experienceLevel?: string
    atsScore?: number
    gaps?: string[]
    suggestions?: {
      summary?: string
      skillsToHighlight?: string[]
      bulletsToReformulate?: { original: string; suggested: string; missionId: string }[]
    }
  } | null>(null)

  // Adapted CV
  const [adaptedCV, setAdaptedCV] = useState<{
    adaptedSummary?: string
    adaptedSkills?: { category: string; items: string }[]
    adaptedBullets?: { missionId: string; bullets: string[] }[]
    newAtsScore?: number
  } | null>(null)

  // Cover letter
  const [coverLetter, setCoverLetter] = useState('')
  const [tone, setTone] = useState<'formal' | 'dynamic' | 'creative'>('formal')

  // Step 1 → 2 : Analyze offer
  async function handleAnalyze() {
    if (!jobDescription.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/analyze-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      })
      if (!res.ok) throw new Error('Erreur API')
      const data = await res.json()
      setAnalysis(data)
      setStep(1)
    } catch (e) {
      alert('Erreur lors de l\'analyse. Vérifiez votre clé API OpenAI.')
    } finally {
      setLoading(false)
    }
  }

  // Step 2 → 3 : Adapt CV
  async function handleAdaptCV() {
    setLoading(true)
    try {
      const res = await fetch('/api/adapt-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobDescription, 
          jobAnalysis: analysis,
          profileId: analysis?.recommendedProfileId
        }),
      })
      if (!res.ok) throw new Error('Erreur API')
      const data = await res.json()
      setAdaptedCV(data)
      setStep(2)
    } catch (e) {
      alert('Erreur lors de l\'adaptation du CV.')
    } finally {
      setLoading(false)
    }
  }

  // Step 3 → 4 : Generate cover letter
  async function handleGenerateCoverLetter() {
    setLoading(true)
    setCoverLetter('')
    try {
      const res = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, tone, company, jobTitle }),
      })
      if (!res.ok) throw new Error('Erreur API')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let text = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          text += decoder.decode(value, { stream: true })
          setCoverLetter(text)
        }
      }
      setStep(3)
    } catch (e) {
      alert('Erreur lors de la génération de la lettre.')
    } finally {
      setLoading(false)
    }
  }

  // Step 5 : Save application
  async function handleSaveApplication(status: 'draft' | 'applied') {
    setLoading(true)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          company,
          jobUrl,
          jobDescription,
          status,
          baseProfileId: analysis?.recommendedProfileId,
          adaptedSummary: adaptedCV?.adaptedSummary,
          adaptedSkills: JSON.stringify(adaptedCV?.adaptedSkills),
          adaptedBullets: JSON.stringify(adaptedCV?.adaptedBullets),
          atsScore: adaptedCV?.newAtsScore || analysis?.atsScore,
          atsKeywords: JSON.stringify(analysis?.keywords),
          coverLetter,
          appliedAt: status === 'applied' ? new Date().toISOString() : null,
        }),
      })
      if (!res.ok) throw new Error('Erreur')
      const data = await res.json()
      router.push(`/applications/${data.id}`)
    } catch (e) {
      alert('Erreur lors de la sauvegarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const isActive = i === step
            const isDone = i < step
            return (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                  isDone ? 'bg-[var(--color-success)] text-white' :
                  isActive ? 'bg-[var(--color-primary)] text-white shadow-md' :
                  'bg-[var(--color-neutral-200)] text-[var(--color-neutral-500)]'
                )}>
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={cn(
                  'text-xs font-medium hidden md:block',
                  isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-neutral-400)]'
                )}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    'flex-1 h-0.5 mx-2 rounded-full transition-colors',
                    isDone ? 'bg-[var(--color-success)]' : 'bg-[var(--color-neutral-200)]'
                  )} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step 1: L'offre */}
      {step === 0 && (
        <Card className="animate-fade-in">
          <div className="p-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>
                📋 Décrivez l&apos;offre d&apos;emploi
              </h2>
              <p className="text-sm text-[var(--color-neutral-500)] mt-1">
                Collez l&apos;URL ou la description de l&apos;offre pour commencer l&apos;analyse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Intitulé du poste" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="ex: Product Manager Senior" required />
              <Input label="Entreprise" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="ex: Orange CI" required />
            </div>
            <Input label="URL de l'offre (optionnel)" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="https://..." />
            <Textarea
              label="Description de l'offre"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Collez ici la description complète de l'offre d'emploi..."
              className="min-h-[200px]"
              required
            />
            <div className="flex justify-end">
              <Button onClick={handleAnalyze} isLoading={loading} disabled={!jobTitle || !company || !jobDescription}>
                <Sparkles className="w-4 h-4" />
                Analyser avec l&apos;IA
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Analyse IA */}
      {step === 1 && analysis && (
        <div className="space-y-4 animate-fade-in">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-[var(--color-neutral-800)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              🔍 Résultat de l&apos;analyse
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-[var(--color-neutral-50)] text-center">
                <p className="text-xs text-[var(--color-neutral-500)] mb-1">Score ATS de base</p>
                <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: analysis.atsScore && analysis.atsScore >= 60 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  {analysis.atsScore}%
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-neutral-50)] text-center">
                <p className="text-xs text-[var(--color-neutral-500)] mb-1">Mots-clés ATS</p>
                <p className="text-3xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {analysis.keywords?.length || 0}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-neutral-50)] text-center">
                <p className="text-xs text-[var(--color-neutral-500)] mb-1">Niveau requis</p>
                <p className="text-lg font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {analysis.experienceLevel || 'N/A'}
                </p>
              </div>
            </div>

            {/* Keywords */}
            {analysis.keywords && analysis.keywords.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[var(--color-neutral-700)] mb-2">Mots-clés ATS détectés</h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.keywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-[var(--color-primary-lighter)] text-xs font-medium text-[var(--color-primary)]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gaps */}
            {analysis.gaps && analysis.gaps.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[var(--color-neutral-700)] mb-2">Lacunes identifiées</h4>
                <ul className="space-y-1">
                  {analysis.gaps.map((gap, i) => (
                    <li key={i} className="text-xs text-[var(--color-danger)] flex gap-2">
                      <span>⚠️</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills to highlight */}
            {analysis.suggestions?.skillsToHighlight && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[var(--color-neutral-700)] mb-2">Compétences à mettre en avant</h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.suggestions.skillsToHighlight.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-green-50 text-xs font-medium text-green-700">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(0)}>
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <Button onClick={handleAdaptCV} isLoading={loading}>
              <Sparkles className="w-4 h-4" />
              Adapter mon CV
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: CV adapté */}
      {step === 2 && adaptedCV && (
        <div className="space-y-4 animate-fade-in">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>
                📄 CV adapté
              </h2>
              {adaptedCV.newAtsScore && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--color-neutral-500)]">Nouveau score ATS :</span>
                  <ScoreBadge score={adaptedCV.newAtsScore} />
                </div>
              )}
            </div>

            {/* Adapted summary */}
            {adaptedCV.adaptedSummary && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[var(--color-neutral-700)] mb-2">Résumé adapté</h4>
                <Textarea
                  value={adaptedCV.adaptedSummary}
                  onChange={(e) => setAdaptedCV({ ...adaptedCV, adaptedSummary: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            )}

            {/* Adapted skills */}
            {adaptedCV.adaptedSkills && adaptedCV.adaptedSkills.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[var(--color-neutral-700)] mb-2">Compétences réordonnées</h4>
                {adaptedCV.adaptedSkills.map((skill, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[var(--color-neutral-50)] mb-2">
                    <p className="text-xs font-semibold text-[var(--color-primary)] mb-1">{skill.category}</p>
                    <p className="text-xs text-[var(--color-neutral-600)]">{skill.items}</p>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-[var(--color-neutral-400)] italic">
              💡 Vous pouvez modifier les champs ci-dessus avant de continuer
            </p>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <Button onClick={handleGenerateCoverLetter} isLoading={loading}>
              <Pen className="w-4 h-4" />
              Générer la lettre de motivation
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Cover letter */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>
                ✉️ Lettre de motivation
              </h2>
              <div className="flex gap-1.5">
                {(['formal', 'dynamic', 'creative'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTone(t); handleGenerateCoverLetter() }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                      tone === t
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-200)]'
                    )}
                  >
                    {t === 'formal' ? '🎩 Formel' : t === 'dynamic' ? '⚡ Dynamique' : '🎨 Créatif'}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[350px] text-sm leading-relaxed"
              placeholder="La lettre de motivation sera générée ici..."
            />
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <Button onClick={() => setStep(4)}>
              <ArrowRight className="w-4 h-4" />
              Exporter & Sauvegarder
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Export & Save */}
      {step === 4 && (
        <div className="space-y-4 animate-fade-in">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-[var(--color-neutral-800)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              🚀 Export & Sauvegarde
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-xl border-2 border-dashed border-[var(--color-neutral-300)] flex flex-col items-center justify-center gap-3 text-center">
                <FileText className="w-10 h-10 text-[var(--color-primary-light)]" />
                <p className="text-sm font-semibold text-[var(--color-neutral-800)]">CV adapté</p>
                <p className="text-xs text-[var(--color-neutral-500)]">Preview et téléchargement dans la page détail</p>
              </div>
              <div className="p-5 rounded-xl border-2 border-dashed border-[var(--color-neutral-300)] flex flex-col items-center justify-center gap-3 text-center">
                <Pen className="w-10 h-10 text-[var(--color-primary-light)]" />
                <p className="text-sm font-semibold text-[var(--color-neutral-800)]">Lettre de motivation</p>
                <p className="text-xs text-[var(--color-neutral-500)]">{coverLetter ? `${coverLetter.split(' ').length} mots` : 'Non générée'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-50 text-sm text-blue-800 mb-4">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>Score ATS estimé : <strong>{adaptedCV?.newAtsScore || analysis?.atsScore || 'N/A'}%</strong></span>
            </div>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(3)}>
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => handleSaveApplication('draft')} isLoading={loading}>
                <FileText className="w-4 h-4" />
                Sauvegarder en brouillon
              </Button>
              <Button onClick={() => handleSaveApplication('applied')} isLoading={loading}>
                <Send className="w-4 h-4" />
                Marquer comme postulé
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
