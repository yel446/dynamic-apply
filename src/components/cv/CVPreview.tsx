'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Download, Eye, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { ProfileWithRelations } from '@/types'

// Dynamic import to prevent SSR issues with react-pdf
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full"><p className="text-sm text-[var(--color-neutral-400)]">Chargement du PDF...</p></div> }
)

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
)

const CVDocumentComponent = dynamic(
  () => import('./CVDocument').then(mod => ({ default: mod.CVDocument })),
  { ssr: false }
)

interface CVPreviewProps {
  profile: ProfileWithRelations
  adaptedSummary?: string
  adaptedSkills?: { category: string; items: string }[]
  adaptedBullets?: { missionId: string; bullets: string[] }[]
  fileName?: string
}

export function CVPreviewButton({ profile, adaptedSummary, adaptedSkills, adaptedBullets, fileName }: CVPreviewProps) {
  const [open, setOpen] = useState(false)
  const pdfFileName = fileName || `CV_${profile.fullName.replace(/\s+/g, '_')}.pdf`

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Eye className="w-3.5 h-3.5" />
        Prévisualiser le CV
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Aperçu du CV"
        description="Prévisualisation de votre CV au format PDF"
        size="full"
      >
        <div className="flex flex-col h-[75vh]">
          <div className="flex-1 rounded-lg overflow-hidden border border-[var(--color-neutral-200)]">
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              <CVDocumentComponent
                profile={profile}
                adaptedSummary={adaptedSummary}
                adaptedSkills={adaptedSkills}
                adaptedBullets={adaptedBullets}
              />
            </PDFViewer>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Fermer
            </Button>
            <PDFDownloadLink
              document={
                <CVDocumentComponent
                  profile={profile}
                  adaptedSummary={adaptedSummary}
                  adaptedSkills={adaptedSkills}
                  adaptedBullets={adaptedBullets}
                />
              }
              fileName={pdfFileName}
            >
              {({ loading }) => (
                <Button isLoading={loading}>
                  <Download className="w-3.5 h-3.5" />
                  Télécharger le PDF
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </Modal>
    </>
  )
}
