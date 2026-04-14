// Types pour Dynamic Apply

export type ApplicationStatus = 'draft' | 'applied' | 'interview' | 'rejected' | 'offer'

export type CoverLetterTone = 'formal' | 'dynamic' | 'creative'

// Profil complet avec relations
export interface ProfileWithRelations {
  id: string
  name: string
  isDefault: boolean
  fullName: string
  title: string
  photo: string | null
  motto: string | null
  email: string
  phone: string
  location: string
  website: string | null
  linkedin: string | null
  summary: string
  interests: string | null
  skills: SkillData[]
  experiences: ExperienceWithMissions[]
  education: EducationData[]
  certifications: CertificationData[]
  languages: LanguageData[]
  customSections: CustomSectionData[]
}

export interface CustomSectionData {
  id: string
  title: string
  icon: string | null
  content: string
  order: number
}

export interface SkillData {
  id: string
  category: string
  items: string
  order: number
}

export interface ExperienceWithMissions {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  order: number
  missions: MissionData[]
}

export interface MissionData {
  id: string
  clientName: string
  clientCountry: string | null
  bullets: string // JSON array
  order: number
}

export interface EducationData {
  id: string
  degree: string
  school: string
  location: string
  date: string
  details: string | null
  order: number
}

export interface CertificationData {
  id: string
  name: string
  issuer: string
  date: string
  order: number
}

export interface LanguageData {
  id: string
  name: string
  level: string
}

// Réponses API IA
export interface OfferAnalysis {
  keywords: string[]
  requiredSkills: string[]
  experienceLevel: string
  atsScore: number
  gaps: string[]
  suggestions: {
    summary: string
    skillsToHighlight: string[]
    bulletsToReformulate: { original: string; suggested: string; missionId: string }[]
  }
}

export interface AdaptedCV {
  adaptedSummary: string
  adaptedSkills: { category: string; items: string }[]
  adaptedBullets: { missionId: string; bullets: string[] }[]
  newAtsScore: number
}

export interface GeneratedCoverLetter {
  coverLetter: string
}

// Application complète
export interface ApplicationData {
  id: string
  jobTitle: string
  company: string
  jobUrl: string | null
  jobDescription: string | null
  status: ApplicationStatus
  appliedAt: Date | null
  createdAt: Date
  updatedAt: Date
  baseProfileId: string | null
  adaptedSummary: string | null
  adaptedSkills: string | null
  adaptedBullets: string | null
  atsScore: number | null
  atsKeywords: string | null
  coverLetter: string | null
  notes: string | null
}
