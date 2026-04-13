import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/applications/[id]'>
) {
  try {
    const { id } = await ctx.params
    const body = await request.json()

    const application = await prisma.application.update({
      where: { id },
      data: {
        ...(body.status !== undefined && { status: body.status }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.status === 'applied' && !body.appliedAt && { appliedAt: new Date() }),
      },
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Erreur mise à jour candidature:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  ctx: RouteContext<'/api/applications/[id]'>
) {
  try {
    const { id } = await ctx.params

    await prisma.application.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur suppression candidature:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression.' },
      { status: 500 }
    )
  }
}
