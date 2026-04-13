import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const application = await prisma.application.create({
      data: {
        jobTitle: body.jobTitle,
        company: body.company,
        jobUrl: body.jobUrl || null,
        jobDescription: body.jobDescription || null,
        status: body.status || 'draft',
        adaptedSummary: body.adaptedSummary || null,
        adaptedSkills: body.adaptedSkills || null,
        adaptedBullets: body.adaptedBullets || null,
        atsScore: body.atsScore ? parseInt(body.atsScore) : null,
        atsKeywords: body.atsKeywords || null,
        coverLetter: body.coverLetter || null,
        appliedAt: body.appliedAt ? new Date(body.appliedAt) : null,
        notes: body.notes || null,
      },
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Erreur création candidature:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la candidature.' },
      { status: 500 }
    )
  }
}
