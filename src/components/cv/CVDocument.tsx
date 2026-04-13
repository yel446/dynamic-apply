'use client'

import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer'
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

// Enable single-word chunks for ATS parsing safety (no weird hyphenations)
Font.registerHyphenationCallback((word) => [word])

const COLORS = {
  primary: '#1A365D', // Bleu Nuit original du Figma
  primaryLight: '#2B6CB0',
  primaryLighter: '#EBF4FF',
  text: '#111827',
  textSecondary: '#374151',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 45,
    paddingBottom: 45,
    paddingHorizontal: 50,
    fontFamily: 'Inter',
    fontSize: 9.5,
    color: COLORS.text,
    lineHeight: 1.5,
    backgroundColor: COLORS.white,
  },
  
  // Header Section
  headerContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    borderBottomStyle: 'solid',
    paddingBottom: 15,
  },
  name: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: '#2A4365',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
    fontWeight: 500,
  },
  contactLink: {
    fontSize: 8.5,
    color: COLORS.primaryLight,
    textDecoration: 'none',
    fontWeight: 500,
  },
  contactSeparator: {
    color: COLORS.border,
    fontSize: 9,
  },

  // Global Section Styles
  section: {
    marginBottom: 16,
  },
  sectionTitleBox: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Summary
  summaryText: {
    fontSize: 9.5,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
    textAlign: 'justify',
  },

  // Skills
  skillsContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  skillCategoryTitle: {
    width: '25%',
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.text,
    paddingTop: 2,
  },
  skillTagsBox: {
    width: '75%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillTag: {
    backgroundColor: COLORS.primaryLighter,
    color: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 8.5,
    fontWeight: 600,
  },

  // Experience
  expItem: {
    marginBottom: 14,
  },
  expHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  expTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 10,
    color: COLORS.primaryLight,
    fontWeight: 600,
  },
  expMetaBox: {
    alignItems: 'flex-end',
  },
  expDate: {
    fontSize: 9,
    color: COLORS.textSecondary,
    fontWeight: 600,
    marginBottom: 2,
  },
  expLocation: {
    fontSize: 8.5,
    color: COLORS.textLight,
  },
  missionBox: {
    marginLeft: 6,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    marginTop: 6,
    marginBottom: 8,
  },
  missionClient: {
    fontSize: 9.5,
    fontWeight: 700,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
    color: COLORS.primaryLight,
    lineHeight: 1.4,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
    paddingRight: 10,
  },

  // Education & Certifications
  gridList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  eduItem: {
    width: '100%',
    marginBottom: 8,
  },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  eduTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.text,
  },
  eduDate: {
    fontSize: 8.5,
    color: COLORS.textLight,
    fontWeight: 600,
  },
  eduSchool: {
    fontSize: 9,
    color: COLORS.primaryLight,
    fontWeight: 500,
  },
  eduDetails: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 1.4,
  },

  certBox: {
    width: '48%', // Half column grid
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 8,
    marginBottom: 4,
  },
  certTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 2,
  },
  certMeta: {
    fontSize: 8,
    color: COLORS.textLight,
  },

  // Languages & Interests
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  langName: {
    fontSize: 9.5,
    fontWeight: 700,
    color: COLORS.text,
    width: 80,
  },
  langLevel: {
    fontSize: 9.5,
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          <View style={styles.contactGrid}>
            {profile.location && <Text style={styles.contactItem}>{profile.location}</Text>}
            {profile.location && <Text style={styles.contactSeparator}>•</Text>}
            {profile.phone && <Text style={styles.contactItem}>{profile.phone}</Text>}
            {profile.phone && <Text style={styles.contactSeparator}>•</Text>}
            {profile.email && <Text style={styles.contactItem}>{profile.email}</Text>}
            {profile.email && <Text style={styles.contactSeparator}>•</Text>}
            {profile.linkedin && (
              <Link src={profile.linkedin} style={styles.contactLink}>LinkedIn</Link>
            )}
            {profile.website && (
              <>
                <Text style={styles.contactSeparator}>•</Text>
                <Link src={profile.website} style={styles.contactLink}>Portfolio</Link>
              </>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {summary && (
          <View style={styles.section}>
            <View style={styles.sectionTitleBox}>
              <Text style={styles.sectionTitle}>Profil Professionnel</Text>
            </View>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleBox}>
              <Text style={styles.sectionTitle}>Compétences Clés</Text>
            </View>
            <View style={styles.skillsContainer}>
              {skills.map((skill, i) => {
                // Split comma separated items for tags
                const tags = skill.items.split(',').map(s => s.trim()).filter(Boolean)
                return (
                  <View key={i} style={styles.skillRow} wrap={false}>
                    <Text style={styles.skillCategoryTitle}>{skill.category}</Text>
                    <View style={styles.skillTagsBox}>
                      {tags.map((tag, j) => (
                        <Text key={j} style={styles.skillTag}>{tag}</Text>
                      ))}
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
        )}

        {/* EXPERIENCES */}
        {profile.experiences.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleBox}>
              <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
            </View>
            
            {profile.experiences.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeaderContent} wrap={false}>
                  <View style={{ flex: 1, paddingRight: 15 }}>
                    <Text style={styles.expTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                  </View>
                  <View style={styles.expMetaBox}>
                    <Text style={styles.expDate}>
                      {exp.startDate} – {exp.endDate || "Présent"}
                    </Text>
                    <Text style={styles.expLocation}>{exp.location}</Text>
                  </View>
                </View>

                {exp.missions.map((mission) => {
                  const bullets = getMissionBullets(mission.id, mission.bullets)
                  return (
                    <View key={mission.id} style={styles.missionBox}>
                      {mission.clientName && (
                        <Text style={styles.missionClient} wrap={false}>
                          Mission : {mission.clientName}
                          {mission.clientCountry && ` (${mission.clientCountry})`}
                        </Text>
                      )}
                      {bullets.map((bullet, bi) => (
                        <View key={bi} style={styles.bulletRow} wrap={false}>
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

        {/* EDUCATION */}
        {profile.education.length > 0 && (
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionTitleBox}>
              <Text style={styles.sectionTitle}>Formation</Text>
            </View>
            {profile.education.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <View style={styles.eduHeader}>
                  <Text style={styles.eduTitle}>{edu.degree}</Text>
                  <Text style={styles.eduDate}>{edu.date}</Text>
                </View>
                <Text style={styles.eduSchool}>{edu.school} – {edu.location}</Text>
                {edu.details && <Text style={styles.eduDetails}>{edu.details}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS */}
        {profile.certifications.length > 0 && (
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionTitleBox}>
              <Text style={styles.sectionTitle}>Certifications & Licences</Text>
            </View>
            <View style={styles.gridList}>
              {profile.certifications.map((cert) => (
                <View key={cert.id} style={styles.certBox}>
                  <Text style={styles.certTitle}>{cert.name}</Text>
                  <Text style={styles.certMeta}>{cert.issuer} • {cert.date}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* LANGUAGES & INTERESTS */}
        {(profile.languages.length > 0 || profile.interests) && (
          <View style={{ flexDirection: 'row', gap: 20 }} wrap={false}>
            {profile.languages.length > 0 && (
              <View style={{ flex: 1 }}>
                <View style={styles.sectionTitleBox}>
                  <Text style={styles.sectionTitle}>Langues</Text>
                </View>
                {profile.languages.map((lang) => (
                  <View key={lang.id} style={styles.simpleRow}>
                    <Text style={styles.langName}>{lang.name}</Text>
                    <Text style={styles.langLevel}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {profile.interests && (
              <View style={{ flex: 1 }}>
                <View style={styles.sectionTitleBox}>
                  <Text style={styles.sectionTitle}>Centres d'intérêt</Text>
                </View>
                <Text style={styles.summaryText}>{profile.interests}</Text>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  )
}
