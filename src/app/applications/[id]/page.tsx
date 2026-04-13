import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ApplicationDetail } from '@/components/applications/ApplicationDetail'

export default async function ApplicationDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const application = await prisma.application.findUnique({
    where: { id },
  })

  if (!application) {
    notFound()
  }

  const profile = await prisma.profile.findFirst({
    include: {
      skills: { orderBy: { order: 'asc' } },
      experiences: {
        orderBy: { order: 'asc' },
        include: { missions: { orderBy: { order: 'asc' } } },
      },
      education: { orderBy: { order: 'asc' } },
      certifications: { orderBy: { order: 'asc' } },
      languages: true,
    },
  })

  return (
    <div className="max-w-4xl animate-fade-in">
      <ApplicationDetail application={application} profile={profile} />
    </div>
  )
}
