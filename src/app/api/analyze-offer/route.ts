import { openai, SYSTEM_PROMPTS } from '@/lib/openai'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json()

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json(
        { error: 'La description de l\'offre est requise.' },
        { status: 400 }
      )
    }

    // Récupérer le profil de base
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
      return NextResponse.json(
        { error: 'Profil non trouvé. Veuillez d\'abord configurer votre profil.' },
        { status: 404 }
      )
    }

    const profileSummary = `
Profil : ${profile.fullName} — ${profile.title}
Résumé : ${profile.summary}
Compétences : ${profile.skills.map(s => `${s.category}: ${s.items}`).join(' | ')}
Expériences : ${profile.experiences.map(e => `${e.jobTitle} chez ${e.company} (${e.startDate} - ${e.endDate || "Aujourd'hui"})`).join(' | ')}
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.analyzeOffer },
        {
          role: 'user',
          content: `OFFRE D'EMPLOI :\n${jobDescription}\n\nPROFIL DU CANDIDAT :\n${profileSummary}`,
        },
      ],
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erreur analyse offre:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse de l\'offre. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
