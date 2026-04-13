'use client'

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import type { ProfileWithRelations } from '@/types'

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Inter-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Inter-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 700 },
  ],
})

Font.register({
  family: 'PlusJakartaSans',
  fonts: [
    { src: '/fonts/PlusJakartaSans-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/PlusJakartaSans-Bold.ttf', fontWeight: 700 },
  ],
})

// Disable hyphenation for ATS
Font.registerHyphenationCallback((word) => [word])

const COLORS = {
  primary: '#1A365D',
  primaryLight: '#2B6CB0',
  text: '#1A202C',
  textSecondary: '#4A5568',
  textLight: '#718096',
  accent: '#EBF4FF',
  border: '#E2E8F0',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 45,
    fontFamily: 'Inter',
    fontSize: 9,
    color: COLORS.text,
    lineHeight: 1.4,
  },
  // Header
  header: {
    marginBottom: 20,
    borderBottom: `2px solid ${COLORS.primary}`,
    paddingBottom: 12,
  },
  name: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.primaryLight,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  contactItem: {
    fontSize: 8,
    color: COLORS.textSecondary,
  },
  contactSeparator: {
    fontSize: 8,
    color: COLORS.border,
  },
  // Sections
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.primary,
    borderBottom: `1px solid ${COLORS.border}`,
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Summary
  summaryText: {
    fontSize: 9,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
  },
  // Skills
  skillCategory: {
    marginBottom: 6,
  },
  skillCategoryName: {
    fontSize: 9,
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: 2,
  },
  skillItems: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
  },
  // Experience
  experienceBlock: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  expTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: COLORS.text,
  },
  expCompany: {
    fontSize: 9,
    color: COLORS.primaryLight,
    fontWeight: 500,
  },
  expDate: {
    fontSize: 8,
    color: COLORS.textLight,
    textAlign: 'right' as const,
  },
  expLocation: {
    fontSize: 8,
    color: COLORS.textLight,
  },
  // Mission
  missionBlock: {
    marginBottom: 6,
    marginLeft: 8,
    paddingLeft: 8,
    borderLeft: `1.5px solid ${COLORS.accent}`,
  },
  missionClient: {
    fontSize: 9,
    fontWeight: 600,
    color: COLORS.textSecondary,
    marginBottom: 3,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingRight: 4,
  },
  bulletDot: {
    fontSize: 8,
    color: COLORS.primaryLight,
    marginRight: 6,
    marginTop: 1,
  },
  bulletText: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
    flex: 1,
  },
  // Education
  eduBlock: {
    marginBottom: 6,
  },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 600,
    color: COLORS.text,
  },
  eduSchool: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
  },
  eduDate: {
    fontSize: 8,
    color: COLORS.textLight,
  },
  eduDetails: {
    fontSize: 8,
    color: COLORS.textLight,
    fontStyle: 'italic' as const,
    marginTop: 1,
  },
  // Certifications
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  certItem: {
    fontSize: 8,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  // Languages
  langRow: {
    flexDirection: 'row',
    gap: 20,
  },
  langItem: {
    flexDirection: 'row',
    gap: 4,
  },
  langName: {
    fontSize: 9,
    fontWeight: 600,
    color: COLORS.text,
  },
  langLevel: {
    fontSize: 9,
    color: COLORS.textSecondary,
  },
  // Interests
  interestsText: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
  },
})

interface CVDocumentProps {
  profile: ProfileWithRelations
  adaptedSummary?: string
  adaptedSkills?: { category: string; items: string }[]
  adaptedBullets?: { missionId: string; bullets: string[] }[]
}

export function CVDocument({
  profile,
  adaptedSummary,
  adaptedSkills,
  adaptedBullets,
}: CVDocumentProps) {
  const summary = adaptedSummary || profile.summary
  const skills = adaptedSkills || profile.skills.map(s => ({ category: s.category, items: s.items }))

  function getMissionBullets(missionId: string, originalBullets: string): string[] {
    if (adaptedBullets) {
      const adapted = adaptedBullets.find(b => b.missionId === missionId)
      if (adapted) return adapted.bullets
    }
    try {
      return JSON.parse(originalBullets)
    } catch {
      return []
    }
  }

  const contactParts = [
    profile.email,
    profile.phone,
    profile.location,
    profile.linkedin,
    profile.website,
  ].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header} fixed={false}>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          <View style={styles.contactRow}>
            {contactParts.map((item, i) => (
              <View key={i} style={{ flexDirection: 'row' as const }}>
                <Text style={styles.contactItem}>{item}</Text>
                {i < contactParts.length - 1 && (
                  <Text style={styles.contactSeparator}>  |  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* À propos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        {/* Compétences */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compétences</Text>
            {skills.map((skill, i) => (
              <View key={i} style={styles.skillCategory}>
                <Text style={styles.skillCategoryName}>{skill.category}</Text>
                <Text style={styles.skillItems}>{skill.items}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Expérience professionnelle */}
        {profile.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expérience professionnelle</Text>
            {profile.experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceBlock} wrap={false}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.expTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.expDate}>
                      {exp.startDate} — {exp.endDate || "Aujourd'hui"}
                    </Text>
                    <Text style={styles.expLocation}>{exp.location}</Text>
                  </View>
                </View>

                {exp.missions.map((mission) => {
                  const bullets = getMissionBullets(mission.id, mission.bullets)
                  return (
                    <View key={mission.id} style={styles.missionBlock}>
                      <Text style={styles.missionClient}>
                        {mission.clientName}
                        {mission.clientCountry && ` — ${mission.clientCountry}`}
                      </Text>
                      {bullets.map((bullet, bi) => (
                        <View key={bi} style={styles.bullet}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      ))}
                    </View>
                  )
                })}
              </View>
            ))}
          </View>
        )}

        {/* Formation */}
        {profile.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formation</Text>
            {profile.education.map((edu) => (
              <View key={edu.id} style={styles.eduBlock}>
                <View style={styles.eduHeader}>
                  <View>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school} — {edu.location}</Text>
                  </View>
                  <Text style={styles.eduDate}>{edu.date}</Text>
                </View>
                {edu.details && <Text style={styles.eduDetails}>{edu.details}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {profile.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.certGrid}>
              {profile.certifications.map((cert) => (
                <Text key={cert.id} style={styles.certItem}>
                  {cert.name} ({cert.issuer}, {cert.date})
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Langues */}
        {profile.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Langues</Text>
            <View style={styles.langRow}>
              {profile.languages.map((lang) => (
                <View key={lang.id} style={styles.langItem}>
                  <Text style={styles.langName}>{lang.name} :</Text>
                  <Text style={styles.langLevel}>{lang.level}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Centres d'intérêt */}
        {profile.interests && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Centres d&apos;intérêt</Text>
            <Text style={styles.interestsText}>{profile.interests}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}
