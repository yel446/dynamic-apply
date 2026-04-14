'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProfile(formData: FormData) {
  const profile = await prisma.profile.create({
    data: {
      fullName: 'Nouveau Profil',
      title: 'Titre du poste',
      email: '',
      phone: '',
      location: '',
      summary: 'À propos de moi...',
    },
  })

  revalidatePath('/profile')
  redirect(`/profile/${profile.id}`)
}

export async function deleteProfile(profileId: string) {
  await prisma.profile.delete({ where: { id: profileId } })
  revalidatePath('/profile')
  redirect('/profile')
}

export async function updateProfile(formData: FormData) {
  const profileId = formData.get('profileId') as string

  await prisma.profile.update({
    where: { id: profileId },
    data: {
      name: formData.get('name') as string,
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

  revalidatePath(`/profile/${profileId}`)
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

export async function updateMission(missionId: string, clientName: string, clientCountry: string | null, bullets: string[]) {
  await prisma.mission.update({
    where: { id: missionId },
    data: { 
      clientName,
      clientCountry,
      bullets: JSON.stringify(bullets) 
    },
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

  revalidatePath(`/profile/${certificationId}`)
}

export async function addSection(formData: FormData) {
  const profileId = formData.get('profileId') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const icon = formData.get('icon') as string

  const maxOrder = await prisma.profileSection.aggregate({
    where: { profileId },
    _max: { order: true },
  })

  await prisma.profileSection.create({
    data: {
      profileId,
      title,
      content,
      icon: icon || null,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  })

  revalidatePath(`/profile/${profileId}`)
}

export async function updateSection(formData: FormData) {
  const sectionId = formData.get('sectionId') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const icon = formData.get('icon') as string

  const section = await prisma.profileSection.update({
    where: { id: sectionId },
    data: { title, content, icon: icon || null },
  })

  revalidatePath(`/profile/${section.profileId}`)
}

export async function deleteSection(sectionId: string, profileId: string) {
  await prisma.profileSection.delete({ where: { id: sectionId } })
revalidatePath(`/profile/${profileId}`)
}

export async function addMission(formData: FormData) {
  const experienceId = formData.get('experienceId') as string
  const profileId = formData.get('profileId') as string

  const maxOrder = await prisma.mission.aggregate({
    where: { experienceId },
    _max: { order: true },
  })

  await prisma.mission.create({
    data: {
      experienceId,
      clientName: 'Nouveau Projet / Client',
      bullets: JSON.stringify(['Nouvelle réalisation...']),
      order: (maxOrder._max.order ?? -1) + 1,
    },
  })

  revalidatePath(`/profile/${profileId}`)
}

export async function deleteMission(missionId: string, profileId: string) {
  await prisma.mission.delete({ where: { id: missionId } })
  revalidatePath(`/profile/${profileId}`)
}
