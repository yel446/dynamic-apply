'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const profileId = formData.get('profileId') as string

  await prisma.profile.update({
    where: { id: profileId },
    data: {
      fullName: formData.get('fullName') as string,
      title: formData.get('title') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      website: (formData.get('website') as string) || null,
      linkedin: (formData.get('linkedin') as string) || null,
      summary: formData.get('summary') as string,
      motto: (formData.get('motto') as string) || null,
      photo: (formData.get('photo') as string) || null,
      interests: (formData.get('interests') as string) || null,
    },
  })

  revalidatePath('/profile')
}

export async function updateSkill(formData: FormData) {
  const skillId = formData.get('skillId') as string
  const category = formData.get('category') as string
  const items = formData.get('items') as string

  await prisma.skill.update({
    where: { id: skillId },
    data: { category, items },
  })

  revalidatePath('/profile')
}

export async function addSkill(formData: FormData) {
  const profileId = formData.get('profileId') as string
  const category = formData.get('category') as string
  const items = formData.get('items') as string

  const maxOrder = await prisma.skill.aggregate({
    where: { profileId },
    _max: { order: true },
  })

  await prisma.skill.create({
    data: {
      profileId,
      category,
      items,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  })

  revalidatePath('/profile')
}

export async function deleteSkill(skillId: string) {
  await prisma.skill.delete({ where: { id: skillId } })
  revalidatePath('/profile')
}

export async function updateExperience(formData: FormData) {
  const experienceId = formData.get('experienceId') as string

  await prisma.experience.update({
    where: { id: experienceId },
    data: {
      jobTitle: formData.get('jobTitle') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      startDate: formData.get('startDate') as string,
      endDate: (formData.get('endDate') as string) || null,
    },
  })

  revalidatePath('/profile')
}

export async function updateMissionBullets(missionId: string, bullets: string[]) {
  await prisma.mission.update({
    where: { id: missionId },
    data: { bullets: JSON.stringify(bullets) },
  })

  revalidatePath('/profile')
}

export async function updateEducation(formData: FormData) {
  const educationId = formData.get('educationId') as string

  await prisma.education.update({
    where: { id: educationId },
    data: {
      degree: formData.get('degree') as string,
      school: formData.get('school') as string,
      location: formData.get('location') as string,
      date: formData.get('date') as string,
      details: (formData.get('details') as string) || null,
    },
  })

  revalidatePath('/profile')
}

export async function updateCertification(formData: FormData) {
  const certificationId = formData.get('certificationId') as string

  await prisma.certification.update({
    where: { id: certificationId },
    data: {
      name: formData.get('name') as string,
      issuer: formData.get('issuer') as string,
      date: formData.get('date') as string,
    },
  })

  revalidatePath('/profile')
}
