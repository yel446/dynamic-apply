'use client'
import dynamic from 'next/dynamic'

export const CVDocumentComponent = dynamic(
  () => import('./CVDocument').then(mod => ({ default: mod.CVDocument })),
  { ssr: false }
)
