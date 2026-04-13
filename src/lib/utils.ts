import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  draft: { label: 'Brouillon', color: 'text-neutral-600', bg: 'bg-neutral-100' },
  applied: { label: 'Postulé', color: 'text-blue-700', bg: 'bg-blue-50' },
  interview: { label: 'Entretien', color: 'text-amber-700', bg: 'bg-amber-50' },
  rejected: { label: 'Refusé', color: 'text-red-700', bg: 'bg-red-50' },
  offer: { label: 'Offre', color: 'text-green-700', bg: 'bg-green-50' },
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getAtsScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-red-600'
}

export function getAtsScoreBg(score: number): string {
  if (score >= 80) return 'bg-green-50'
  if (score >= 60) return 'bg-amber-50'
  return 'bg-red-50'
}
