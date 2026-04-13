'use client'

import { CVDocumentComponent } from './CVDynamic'
import dynamic from 'next/dynamic'

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full text-white text-sm">Chargement PDF...</div> }
)

export function CVLivePreview({ profile }: { profile: any }) {
  return (
    <PDFViewer width="100%" height="100%" showToolbar={false} className="border-none">
      <CVDocumentComponent profile={profile} />
    </PDFViewer>
  )
}
