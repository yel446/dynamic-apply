import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Supprimer les données existantes
  await prisma.mission.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.education.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.language.deleteMany()
  await prisma.application.deleteMany()
  await prisma.profile.deleteMany()

  // Créer le profil
  const profile = await prisma.profile.create({
    data: {
      fullName: 'Etienne Landry YAMB',
      title: 'Digital Product Manager',
      email: 'eyamb.pro@gmail.com',
      phone: '+225 07 09 45 67 89',
      location: 'Abidjan, Côte d\'Ivoire',
      website: null,
      linkedin: 'linkedin.com/in/etienne-landry-yamb',
      summary: 'Expert en transformation digitale avec plus de 7 ans d\'expérience en conseil et gestion de produits numériques. Spécialisé dans le pilotage de projets complexes, la conception d\'interfaces utilisateur centrées sur l\'humain et l\'accompagnement au changement. Passionné par l\'innovation et la création de valeur grâce au numérique, je m\'appuie sur une solide formation d\'ingénieur et une expertise terrain acquise au sein de missions variées en Afrique de l\'Ouest.',
      interests: 'Basketball - Football - Danse - Cuisine - Musique - Art - Voyage - Dessin - Guitare',

      // Compétences
      skills: {
        create: [
          {
            category: 'Vision produit & stratégie',
            items: 'Définition de la vision produit,Product discovery & delivery,Roadmap produit,Analyse concurrentielle,KPIs & OKRs,Priorisation (RICE, MoSCoW),User research & personas,Product-market fit',
            order: 0,
          },
          {
            category: 'Transformation digitale',
            items: 'Conduite du changement,Digitalisation de processus métier,Architecture fonctionnelle,Cadrage et spécifications fonctionnelles,User flows & wireframing,Prototypage (Figma),Design System,Tests utilisateurs (UAT)',
            order: 1,
          },
          {
            category: 'Management & leadership',
            items: 'Gestion d\'équipes pluridisciplinaires,Coordination clients et prestataires,Animation d\'ateliers,Formation et montée en compétences,Méthodologies Agile (Scrum, Kanban),Planification et suivi de projet,Gestion des risques,Reporting et pilotage par les données',
            order: 2,
          },
          {
            category: 'Compétences transverses',
            items: 'Jira,Confluence,Figma,Miro,Notion,SQL (notions),Power BI,Suite Google / Microsoft,Communication orale et écrite,Esprit de synthèse',
            order: 3,
          },
        ],
      },

      // Expériences
      experiences: {
        create: [
          {
            jobTitle: 'Consultant Digital Product Manager',
            company: 'Everest Consulting Group',
            location: 'Abidjan, Côte d\'Ivoire',
            startDate: 'Juil. 2023',
            endDate: null,
            order: 0,
            missions: {
              create: [
                {
                  clientName: 'Compagnie Ivoirienne d\'Électricité (CIE)',
                  clientCountry: 'Côte d\'Ivoire',
                  bullets: JSON.stringify([
                    'Pilotage de la refonte du portail client web & mobile (250K+ utilisateurs) — cadrage fonctionnel, wireframes, suivi du delivery avec l\'équipe de développement',
                    'Conception et déploiement d\'un dashboard de monitoring réseau temps réel pour la direction technique (KPIs, alertes, cartographie)',
                    'Animation d\'ateliers de design thinking avec les équipes métier pour identifier les pain points et co-construire les solutions',
                    'Mise en place d\'un backlog produit structuré sous Jira avec priorisation RICE et sprints bi-hebdomadaires',
                    'Réduction de 35% du temps de traitement des réclamations clients grâce à la digitalisation du workflow',
                  ]),
                  order: 0,
                },
              ],
            },
          },
          {
            jobTitle: 'Consultant Chef de Projet Digital',
            company: 'Everest Consulting Group',
            location: 'Abidjan, Côte d\'Ivoire',
            startDate: 'Mars 2021',
            endDate: 'Juin 2023',
            order: 1,
            missions: {
              create: [
                {
                  clientName: 'Orange Côte d\'Ivoire',
                  clientCountry: 'Côte d\'Ivoire',
                  bullets: JSON.stringify([
                    'Coordination de la mise en œuvre d\'une plateforme de gestion des interventions terrain (500+ techniciens)',
                    'Rédaction des spécifications fonctionnelles et techniques en collaboration avec les architectes SI',
                    'Pilotage de 3 squads Agile (15 personnes) avec cérémonies Scrum et reporting hebdomadaire',
                    'Mise en place d\'indicateurs de performance (SLA, taux de résolution, NPS) et dashboards Power BI',
                    'Accompagnement au changement : formation de 200+ utilisateurs et création de supports pédagogiques',
                  ]),
                  order: 0,
                },
                {
                  clientName: 'Banque Atlantique',
                  clientCountry: 'Côte d\'Ivoire',
                  bullets: JSON.stringify([
                    'Cadrage et pilotage du projet de refonte de l\'application mobile banking (100K+ téléchargements)',
                    'Réalisation de benchmarks UX et analyse des parcours utilisateurs existants',
                    'Coordination entre les équipes métier, IT et le prestataire de développement',
                    'Élaboration du plan de recette et supervision des phases de tests (fonctionnels, UAT, performance)',
                  ]),
                  order: 1,
                },
              ],
            },
          },
          {
            jobTitle: 'Consultant Junior en Transformation Digitale',
            company: 'Everest Consulting Group',
            location: 'Abidjan, Côte d\'Ivoire',
            startDate: 'Sept. 2018',
            endDate: 'Fév. 2021',
            order: 2,
            missions: {
              create: [
                {
                  clientName: 'Société Générale Côte d\'Ivoire',
                  clientCountry: 'Côte d\'Ivoire',
                  bullets: JSON.stringify([
                    'Participation à l\'audit des processus métier et identification des opportunités de digitalisation',
                    'Réalisation de maquettes et prototypes Figma pour les interfaces internes (back-office)',
                    'Assistance à la rédaction des cahiers des charges pour 3 projets de transformation digitale',
                    'Support à la conduite du changement et à la formation des utilisateurs finaux',
                  ]),
                  order: 0,
                },
                {
                  clientName: 'Port Autonome d\'Abidjan',
                  clientCountry: 'Côte d\'Ivoire',
                  bullets: JSON.stringify([
                    'Cartographie des processus de gestion portuaire et proposition de solutions digitales',
                    'Conception de wireframes pour un portail de suivi des opérations (import/export)',
                    'Animation de sessions de recueil de besoins avec les parties prenantes',
                  ]),
                  order: 1,
                },
              ],
            },
          },
        ],
      },

      // Formation
      education: {
        create: [
          {
            degree: 'Diplôme d\'Ingénieur en Informatique',
            school: '3iL — Institut d\'Ingénierie Informatique de Limoges',
            location: 'Limoges, France',
            date: '2015 - 2018',
            details: 'Spécialisation en Génie Logiciel et Systèmes d\'Information',
            order: 0,
          },
        ],
      },

      // Certifications
      certifications: {
        create: [
          { name: 'Product Manager', issuer: 'Uxcel', date: '2024', order: 0 },
          { name: 'Product Designer', issuer: 'Uxcel', date: '2024', order: 1 },
          { name: 'Wireframing', issuer: 'Uxcel', date: '2024', order: 2 },
          { name: 'Design Accessibility', issuer: 'Uxcel', date: '2024', order: 3 },
          { name: 'UI Components', issuer: 'Uxcel', date: '2023', order: 4 },
          { name: 'UX Design Foundations', issuer: 'Uxcel', date: '2023', order: 5 },
        ],
      },

      // Langues
      languages: {
        create: [
          { name: 'Français', level: 'Natif' },
          { name: 'Anglais', level: 'Avancé (B2+)' },
        ],
      },
    },
  })

  console.log(`✅ Profil créé : ${profile.fullName} (${profile.id})`)
  console.log('🎉 Seed terminé avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
