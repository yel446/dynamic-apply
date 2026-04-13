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

    // Récupérer tous les profils de base pour la sélection intelligente
    const profiles = await prisma.profile.findMany()

    if (!profiles || profiles.length === 0) {
      return NextResponse.json(
        { error: 'Aucun profil trouvé. Veuillez d\'abord configurer votre profil de base.' },
        { status: 404 }
      )
    }

    const profilesContext = profiles.map(p => `
--- PROFIL ID: ${p.id} ---
Nom: ${p.name}
Titre: ${p.title}
Résumé: ${p.summary}
`).join('\n')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.analyzeOffer },
        {
          role: 'user',
          content: `OFFRE D'EMPLOI :\n${jobDescription}\n\nPROFILS DISPONIBLES (choisis le ID du plus pertinent) :\n${profilesContext}`,
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
