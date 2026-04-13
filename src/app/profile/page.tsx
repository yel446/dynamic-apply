import { prisma } from '@/lib/prisma'
import { ProfileManager } from '@/components/profile/ProfileManager'
import { redirect } from 'next/navigation'
import type { ProfileWithRelations } from '@/types'

export default async function ProfilePage() {
  const profiles = await prisma.profile.findMany({
    orderBy: { createdAt: 'asc' },
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
    },
  })

  // Cast to ProfileWithRelations since Prisma generated types map identically to it
  const typedProfiles = profiles as unknown as ProfileWithRelations[]

  if (typedProfiles.length === 0) {
    redirect('/')
  }

  return (
    <div className="w-full animate-fade-in relative max-w-none">
      <div className="mb-4">
        <h1
          className="text-2xl font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Mes Bibliothèques de CV
        </h1>
        <p className="text-slate-500 mt-1 max-w-2xl text-sm">
          Naviguez entre vos différents profils de base, modifiez-les, et visualisez instantanément le rendu PDF.
        </p>
      </div>

      <ProfileManager profiles={typedProfiles} />
    </div>
  )
}
