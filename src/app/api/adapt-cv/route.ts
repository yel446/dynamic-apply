import { openai, SYSTEM_PROMPTS } from '@/lib/openai'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { jobDescription, jobAnalysis } = await request.json()

    const profile = await prisma.profile.findFirst({
      include: {
        skills: { orderBy: { order: 'asc' } },
        experiences: {
          orderBy: { order: 'asc' },
          include: { missions: { orderBy: { order: 'asc' } } },
        },
      },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profil non trouvé.' }, { status: 404 })
    }

    const profileData = JSON.stringify({
      summary: profile.summary,
      skills: profile.skills.map(s => ({ category: s.category, items: s.items })),
      experiences: profile.experiences.map(e => ({
        jobTitle: e.jobTitle,
        company: e.company,
        missions: e.missions.map(m => ({
          id: m.id,
          clientName: m.clientName,
          bullets: JSON.parse(m.bullets),
        })),
      })),
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.adaptCV },
        {
          role: 'user',
          content: `OFFRE D'EMPLOI :\n${jobDescription}\n\nANALYSE DE L'OFFRE :\n${JSON.stringify(jobAnalysis)}\n\nPROFIL COMPLET DU CANDIDAT :\n${profileData}`,
        },
      ],
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erreur adaptation CV:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'adaptation du CV.' },
      { status: 500 }
    )
  }
}
