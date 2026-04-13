import { prisma } from '@/lib/prisma'
import { ProfileForm } from '@/components/forms/ProfileForm'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst({
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

  if (!profile) {
    redirect('/')
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[var(--color-neutral-800)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Mon Profil
        </h1>
        <p className="text-[var(--color-neutral-500)] mt-1">
          Gérez vos informations de base utilisées pour générer les CV
        </p>
      </div>

      <ProfileForm profile={profile} />
    </div>
  )
}
