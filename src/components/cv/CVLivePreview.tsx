'use client'

import { PDFViewer } from '@react-pdf/renderer'
import { CVDocument } from './CVDocument'

export function CVLivePreview({ profile }: { profile: any }) {
  if (!profile) return null;

  return (
    <PDFViewer width="100%" height="100%" showToolbar={false} className="border-none">
      <CVDocument profile={profile} />
    </PDFViewer>
  )
}
