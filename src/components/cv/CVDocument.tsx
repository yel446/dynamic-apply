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
  primary: '#0F172A', // Navy Dark from Figma
  accent: '#3B82F6',  // Bright Blue
  text: '#334155',    // Slate/Grey body
  textSecondary: '#64748B', 
  textLight: '#94A3B8',
  border: '#E2E8F0',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
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
    marginBottom: 20,
    gap: 20,
  },
  photoBox: {
    width: 80,
    height: 80,
    borderRadius: 8, // Square with slight rounding as per Figma
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E2E8F0',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  titleLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  locationLabel: {
    fontSize: 9,
    color: COLORS.textSecondary,
    fontWeight: 500,
  },

  // Contact Icons Row
  contactBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 8,
    color: COLORS.text,
    fontWeight: 500,
  },
  contactIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIconText: {
    color: 'white',
    fontSize: 7,
    fontWeight: 700,
  },

  mottoBox: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  mottoText: {
    fontSize: 9,
    color: COLORS.textSecondary,
    lineHeight: 1.4,
    opacity: 0.85,
  },

  // Sections
  section: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans',
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionLineContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLine: {
    height: 1,
    backgroundColor: COLORS.border,
    flex: 1,
  },
  sectionLineDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.accent,
    marginLeft: -1, // Overlap slightly to look connected
  },

  // Summary
  summaryText: {
    fontSize: 9,
    color: COLORS.text,
    lineHeight: 1.6,
    textAlign: 'justify',
  },

  // Skills
  skillsGrid: {
    marginTop: 4,
    gap: 12,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  skillCategory: {
    width: 120,
    fontSize: 8.5,
    fontWeight: 700,
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  skillList: {
    flex: 1,
    fontSize: 8.5,
    color: COLORS.text,
    lineHeight: 1.4,
    borderLeftWidth: 1.5,
    borderLeftColor: COLORS.accent,
    paddingLeft: 10,
    marginLeft: 0,
  },

  // Experience
  expItem: {
    marginBottom: 16,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.primary,
  },
  expLocation: {
    fontSize: 8.5,
    color: COLORS.accent,
    fontWeight: 600,
  },
  expCompanyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  expCompany: {
    fontSize: 9,
    color: COLORS.text,
    fontWeight: 600,
  },
  expDate: {
    fontSize: 8.5,
    color: COLORS.textSecondary,
    fontWeight: 500,
  },
  missionBlock: {
    marginTop: 4,
  },
  missionClient: {
    fontSize: 8,
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontWeight: 600,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 6,
  },
  bulletDot: {
    width: 8,
    fontSize: 8,
    color: COLORS.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.2,
    color: COLORS.text,
    lineHeight: 1.4,
    textAlign: 'justify',
  },

  // Education & Other
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
    color: COLORS.primary,
  },
  eduSchool: {
    fontSize: 8.5,
    color: COLORS.text,
  },
  eduDate: {
    fontSize: 8,
    color: COLORS.textSecondary,
  },
  
  // Interests
  interestsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestItem: {
    fontSize: 8.5,
    color: COLORS.text,
    opacity: 0.9,
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
              <View style={styles.contactIcon}><Text style={styles.contactIconText}>@</Text></View>
              <Text style={styles.contactText}>{profile.email}</Text>
            </View>
          )}
          {profile.phone && (
            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#10B981' }]}><Text style={styles.contactIconText}>✆</Text></View>
              <Text style={styles.contactText}>{profile.phone}</Text>
            </View>
          )}
          {profile.website && (
            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#334155' }]}><Text style={styles.contactIconText}>🔗</Text></View>
              <Text style={styles.contactText}>{profile.website.replace(/^https?:\/\//, '')}</Text>
            </View>
          )}
          {profile.linkedin && (
            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#0A66C2' }]}><Text style={styles.contactIconText}>in</Text></View>
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
                    {profile.languages.map(l => `${l.name} (${l.level})`).join('  •  ')}
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
                  <View style={styles.sectionLineDot} />
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
                  <View style={styles.sectionLineDot} />
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

        {/* Centre d'intérêt */}
        {profile.interests && (
          <View style={[styles.section, { marginTop: 10 }]}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Centre d'intérêt</Text>
              <View style={styles.sectionLineContainer}>
                <View style={styles.sectionLine} />
                <View style={styles.sectionLineDot} />
              </View>
            </View>
            <View style={styles.interestsWrapper}>
              {profile.interests.split(',').map((interest, idx) => (
                <Text key={idx} style={styles.interestItem}>
                  {interest.trim()}{idx < profile.interests.split(',').length - 1 ? ' • ' : ''}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Rubriques personnalisées */}
        {profile.customSections && profile.customSections.length > 0 && (
          <View>
            {profile.customSections.map((section) => (
              <View key={section.id} style={styles.section} wrap={false}>
                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionTitle}>
                    {section.icon && (
                      <Text style={{ color: COLORS.accent }}>
                        {section.icon.toLowerCase().includes('star') ? '★ ' : 
                         section.icon.toLowerCase().includes('award') ? '🏅 ' : 
                         section.icon.toLowerCase().includes('list') ? '• ' : 
                         '○ '}
                      </Text>
                    )}
                    {section.title}
                  </Text>
                  <View style={styles.sectionLineContainer}>
                    <View style={styles.sectionLine} />
                    <View style={styles.sectionLineDot} />
                  </View>
                </View>
                <Text style={styles.summaryText}>{section.content}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}

