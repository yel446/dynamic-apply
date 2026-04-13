'use client'

import { Document, Page, Text, View, StyleSheet, Font, Link, Image } from '@react-pdf/renderer'
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

// Enable single-word chunks for ATS parsing safety
Font.registerHyphenationCallback((word) => [word])

const COLORS = {
  primary: '#1A365D', // Dark Blue from Figma
  accent: '#2B6CB0',  // Lighter accent blue
  text: '#1F2937',    // Near black
  textSecondary: '#4B5563', 
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 45,
    paddingBottom: 45,
    paddingHorizontal: 40,
    fontFamily: 'Inter',
    fontSize: 9.5,
    color: COLORS.text,
    lineHeight: 1.5,
    backgroundColor: COLORS.white,
  },
  
  // Header Section
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 20,
  },
  photoBox: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  titleLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  locationLabel: {
    fontSize: 9,
    fontStyle: 'italic',
    color: COLORS.textLight,
  },

  // Contact Icons Row
  contactBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contactText: {
    fontSize: 8,
    color: COLORS.textSecondary,
    fontWeight: 500,
  },
  contactIcon: {
    width: 14,
    height: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 7,
    fontWeight: 700,
  },

  mottoBox: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  mottoText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    lineHeight: 1.4,
  },

  // Sections
  section: {
    marginBottom: 18,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.primary,
  },
  sectionLineContainer: {
    flex: 1,
    height: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  sectionLine: {
    height: 0.5,
    backgroundColor: COLORS.accent,
    opacity: 0.4,
    width: '100%',
  },
  sectionLineDot: {
    position: 'absolute',
    right: 0,
    top: -1,
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: COLORS.accent,
    opacity: 0.6,
  },

  // Summary
  summaryText: {
    fontSize: 9,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
    textAlign: 'justify',
  },

  // Skills
  skillsGrid: {
    flexDirection: 'column',
    gap: 6,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  skillCategory: {
    width: 130,
    fontSize: 8.5,
    fontWeight: 700,
    color: COLORS.primary,
    paddingTop: 1,
  },
  skillList: {
    flex: 1,
    fontSize: 8.5,
    color: COLORS.textSecondary,
    lineHeight: 1.4,
  },

  // Experience
  expItem: {
    marginBottom: 16,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  expTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: COLORS.text,
  },
  expLocation: {
    fontSize: 9,
    color: COLORS.accent,
    fontStyle: 'italic',
    fontWeight: 600,
  },
  expCompanyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  expCompany: {
    fontSize: 9.5,
    color: COLORS.textSecondary,
    fontWeight: 600,
  },
  expDate: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
    fontWeight: 700,
  },
  missionBlock: {
    marginTop: 4,
  },
  missionClient: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginBottom: 4,
    fontWeight: 500,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2.5,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 8,
    fontSize: 8,
    color: COLORS.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.2, // Smaller font for dense missions like in Image 3
    color: COLORS.textSecondary,
    lineHeight: 1.4,
    textAlign: 'justify',
  },

  // Footer / Misc
  simpleGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  simpleCol: {
    flex: 1,
  },
  eduItem: {
    marginBottom: 8,
  },
  eduTitle: {
    fontSize: 9,
    fontWeight: 700,
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
  const motto = profile.motto || "Digital Product Manager • Frontend Expert • UX/UI Designer"
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
    <Document title={`CV_${profile.fullName}`}>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.photoBox}>
            {profile.photo ? (
              <Image src={profile.photo} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder} />
            )}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{profile.fullName}</Text>
            <Text style={styles.titleLabel}>{profile.title}</Text>
            {profile.location && <Text style={styles.locationLabel}>{profile.location}</Text>}
          </View>
        </View>

        {/* CONTACT BAR */}
        <View style={styles.contactBar}>
          {profile.email && (
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}><Text>@</Text></View>
              <Text style={styles.contactText}>{profile.email}</Text>
            </View>
          )}
          {profile.phone && (
            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#059669' }]}><Text>✆</Text></View>
              <Text style={styles.contactText}>{profile.phone}</Text>
            </View>
          )}
          {profile.website && (
            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#1E293B' }]}><Text>🔗</Text></View>
              <Text style={styles.contactText}>{profile.website.replace(/^https?:\/\//, '')}</Text>
            </View>
          )}
          {profile.linkedin && (
            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#0A66C2' }]}><Text>in</Text></View>
              <Text style={styles.contactText}>{profile.fullName.toLowerCase().replace(/\s+/g, '')}</Text>
            </View>
          )}
        </View>

        {/* MOTTO */}
        <View style={styles.mottoBox}>
          <Text style={styles.mottoText}>“ {motto} ”</Text>
        </View>

        {/* SECTIONS */}
        
        {/* À propos de moi */}
        {summary && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>À propos de moi</Text>
              <View style={styles.sectionLineContainer}>
                <View style={styles.sectionLine} />
                <View style={styles.sectionLineDot} />
              </View>
            </View>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Compétences</Text>
              <View style={styles.sectionLineContainer}>
                <View style={styles.sectionLine} />
                <View style={styles.sectionLineDot} />
              </View>
            </View>
            <View style={styles.skillsGrid}>
              {skills.map((skill, i) => (
                <View key={i} style={styles.skillRow} wrap={false}>
                  <Text style={styles.skillCategory}>{skill.category}</Text>
                  <Text style={styles.skillList}>{skill.items}</Text>
                </View>
              ))}
              {profile.languages.length > 0 && (
                <View style={styles.skillRow} wrap={false}>
                  <Text style={styles.skillCategory}>Langues</Text>
                  <Text style={styles.skillList}>
                    {profile.languages.map(l => `${l.name} (${l.level})`).join(' - ')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Expérience */}
        {profile.experiences.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Expérience</Text>
              <View style={styles.sectionLineContainer}>
                <View style={styles.sectionLine} />
                <View style={styles.sectionLineDot} />
              </View>
            </View>
            
            {profile.experiences.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeader} wrap={false}>
                  <Text style={styles.expTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.expLocation}>{exp.location}</Text>
                </View>
                <View style={styles.expCompanyRow} wrap={false}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expDate}>{exp.startDate} - {exp.endDate || "Aujourd'hui"}</Text>
                </View>

                {exp.missions.map((mission) => {
                  const bullets = getMissionBullets(mission.id, mission.bullets)
                  return (
                    <View key={mission.id} style={styles.missionBlock}>
                      <Text style={styles.missionClient} wrap={false}>
                        Pour le client : {mission.clientName}
                        {mission.clientCountry && ` — ${mission.clientCountry}`}
                      </Text>
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

        {/* Education & Certifs (Side by Side) */}
        <View style={styles.simpleGrid} wrap={false}>
          {profile.education.length > 0 && (
            <View style={styles.simpleCol}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Formation</Text>
                <View style={styles.sectionLineContainer}>
                  <View style={styles.sectionLine} />
                </View>
              </View>
              {profile.education.map(edu => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.eduTitle}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduDate}>{edu.date} — {edu.location}</Text>
                </View>
              ))}
            </View>
          )}

          {profile.certifications.length > 0 && (
            <View style={styles.simpleCol}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                <View style={styles.sectionLineContainer}>
                  <View style={styles.sectionLine} />
                </View>
              </View>
              {profile.certifications.map(cert => (
                <View key={cert.id} style={styles.eduItem}>
                  <Text style={styles.eduTitle}>{cert.name}</Text>
                  <Text style={styles.eduSchool}>{cert.issuer}</Text>
                  <Text style={styles.eduDate}>{cert.date}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

      </Page>
    </Document>
  )
}

