import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { ProfileWithRelations } from '@/types'
import { ProfileEditorWrapper } from '@/components/profile/ProfileEditorWrapper'

export default async function ProfileEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const profile = await prisma.profile.findUnique({
    where: { id },
    include: {
      skills: { orderBy: { order: 'asc' } },
      experiences: {
        orderBy: { order: 'asc' },
        include: {
          missions: { orderBy: { order: 'asc' } },
        },
      },
      education: { orderBy: { order: 'asc' } },
      certifications: { orderBy: { order: 'asc' } },
      languages: true,
      customSections: { orderBy: { order: 'asc' } },
    },
  })

  if (!profile) {
    notFound()
  }

  // Cast to ProfileWithRelations
  const typedProfile = profile as unknown as ProfileWithRelations

  return (
    <div className="w-full flex-1">
       <ProfileEditorWrapper profile={typedProfile} />
    </div>
  )
}
