'use client'
import dynamic from 'next/dynamic'

export const CVDocumentComponent = dynamic(
  () => import('./CVDocument').then(mod => ({ default: mod.CVDocument })),
  { ssr: false }
)

export const CVPreviewButton = dynamic(
  () => import('./CVPreview').then(mod => mod.CVPreviewButton),
  { ssr: false }
)

export const CVLivePreview = dynamic(
  () => import('./CVLivePreview').then(mod => mod.CVLivePreview),
  { ssr: false }
)
