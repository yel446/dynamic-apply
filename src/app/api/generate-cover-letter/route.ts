import { openai, SYSTEM_PROMPTS } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { jobDescription, tone = 'formal', company, jobTitle } = await request.json()

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
      return new Response(JSON.stringify({ error: 'Profil non trouvé.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const toneKey = tone as keyof typeof SYSTEM_PROMPTS.generateCoverLetter
    const systemPrompt = SYSTEM_PROMPTS.generateCoverLetter[toneKey] || SYSTEM_PROMPTS.generateCoverLetter.formal

    const profileSummary = `
Candidat : ${profile.fullName} — ${profile.title}
Résumé : ${profile.summary}
Compétences clés : ${profile.skills.map(s => s.items).join(', ')}
Dernière expérience : ${profile.experiences[0]?.jobTitle} chez ${profile.experiences[0]?.company}
`

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.7,
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Génère une lettre de motivation pour le poste de "${jobTitle}" chez "${company}".\n\nOFFRE D'EMPLOI :\n${jobDescription}\n\nPROFIL DU CANDIDAT :\n${profileSummary}`,
        },
      ],
    })

    // Stream the response
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ''
          if (content) {
            controller.enqueue(encoder.encode(content))
          }
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Erreur génération lettre:', error)
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
