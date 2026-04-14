import { prisma } from '@/lib/prisma'
import { ProfileListView } from '@/components/profile/ProfileListView'
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
      <div className="mb-8">
        <h1
          className="text-4xl font-extrabold text-slate-900 tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Mes Bibliothèques de CV
        </h1>
        <p className="text-slate-500 mt-2 max-w-2xl text-lg font-medium">
          Naviguez entre vos différents profils de base, ou créez-en un nouveau adapté à un secteur spécifique.
        </p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[40px] border border-white/60 shadow-xl shadow-slate-200/50">
        <ProfileListView profiles={typedProfiles} />
      </div>
    </div>
  )
}
