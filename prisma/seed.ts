import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🚀 Démarrage du seed...')

  // Nettoyage de la base
  await prisma.application.deleteMany()
  await prisma.profile.deleteMany()

  // Création du PROFIL BASE (issu du PDF)
  const profile = await prisma.profile.create({
    data: {
      name: "Profil Base Complet",
      isDefault: true,
      fullName: 'Etienne Landry YAMB',
      title: 'DIGITAL PRODUCT MANAGER • FRONTEND EXPERT • UX/UI DESIGNER',
      email: 'landryyamb446@gmail.com',
      phone: '(+225) 01 51 24 18 26',
      location: "Abidjan - Côte d'Ivoire",
      website: 'https://yel-cv-portfolio.vercel.app/',
      linkedin: 'etienne landry yamb',
      summary: 'Expert en transformation digitale avec plus de 7 ans d\'expérience en conseil, j\'accompagne les organisations dans leur mutation numérique à la croisée de la stratégie, de la technologie et de l\'expérience utilisateur. Habitué à évoluer dans des environnements complexes et multisectoriels, je transforme les enjeux business en solutions digitales concrètes, utiles et durables. Porté par un leadership humain et une forte culture produit, je m\'engage à créer un impact positif à travers des projets ambitieux.',
      interests: 'Basketball - Football - Danse - Cuisine - Musique - Art - Voyage - Dessin - Guitar',
      
      skills: {
        create: [
          {
            order: 1,
            category: 'Vision produit & stratégie',
            items: 'Cadrage, conception et livraison produit, Traduction des enjeux business en solutions digitales, Définition de roadmaps produit, Priorisation (MVP, backlog, valeur utilisateur), Pilotage d\'indicateurs produit (KPI, impact, adoption).'
          },
          {
            order: 2,
            category: 'Transformation digitale',
            items: 'Digitalisation de processus métiers, Conduite du changement, Innovation produit & amélioration continue, Veille technologique, Conception d\'expérience utilisateur, Design system & Cohérence visuelle, Prototypage (Figma), Développement d\'application Web & Mobile (React, Nextjs, Angularjs).'
          },
          {
            order: 3,
            category: 'Management',
            items: 'Pilotage des projets digitaux, Méthode Agile, Coordination équipes pluridisciplinaires, Leadership, Démarche qualité, Restitution & présentation stratégique (Powerpoint).'
          },
          {
            order: 4,
            category: 'Transverse',
            items: 'Écoute active, Esprit d’équipe, Autonomie, Agilité, Proactivité, Force de proposition, Résilience, Adaptabilité sectorielle, Créatif.'
          }
        ]
      },

      languages: {
        create: [
          { name: 'Français', level: 'Natif' },
          { name: 'Anglais', level: 'Avancé' },
        ]
      },

      education: {
        create: [
          {
            order: 1,
            degree: 'Diplôme d’Ingénieur - Génie Logiciel',
            school: 'Institut d’Ingénierie Informatique de Limoges',
            location: 'Limoges, France',
            date: 'Octobre 2018',
            details: 'Développement d’applications web et mobiles, Gestion de projet'
          }
        ]
      },

      certifications: {
        create: [
          { order: 1, name: 'Product Manager', issuer: 'Uxcel', date: 'Février 2026' },
          { order: 2, name: 'Product Designer', issuer: 'Uxcel', date: 'Février 2026' },
          { order: 3, name: 'Wireframing', issuer: 'Uxcel', date: 'Juin 2024' },
          { order: 4, name: 'Common Design Patterns', issuer: 'Uxcel', date: 'Mai 2024' },
          { order: 5, name: 'Design Accessibility', issuer: 'Uxcel', date: 'Avril 2024' },
          { order: 6, name: 'UI Components', issuer: 'Uxcel', date: 'Avril 2024' },
          { order: 7, name: 'UX Design Foundations', issuer: 'Uxcel', date: 'Avril 2024' },
        ]
      },

      experiences: {
        create: [
          {
            order: 1,
            jobTitle: 'Assistant Manager Digital',
            company: 'Everest Consulting',
            location: "Abidjan, Côte d'Ivoire",
            startDate: 'Juil 2023',
            endDate: null,
            missions: {
              create: [
                {
                  order: 1,
                  clientName: "Compagnie Ivoirienne d'Électricité (CIE)",
                  clientCountry: "Côte d'Ivoire",
                  bullets: JSON.stringify([
                    "Contribution à la définition de la vision produit de l'agence en ligne V3 (web, mobile et back-office), en lien avec les orientations stratégiques de la Compagnie Ivoirienne d'Électricité( CIE).",
                    "Animation et participation à des ateliers de réflexion avec les équipes métiers afin de concevoir l'évolution des parcours utilisateurs, du design et des services digitaux proposés.",
                    "Analyse de l'existant et les usages à travers des entretiens et une cartographie globale de l'architecture fonctionnelle, afin d'identifier les limites et structurer les axes d'amélioration de produits digitaux.",
                    "Coordination et suivi les travaux des équipes de design et développement, en veillant à la cohérence fonctionnelle entre les versions web, mobile et back-office, dans un cadre de travail agile.",
                    "Structuration, synthèse et restitution des travaux liés aux processus métiers et à l'avancement des projets lors des comités de pilotage, avec une posture de force de proposition orientée innovation."
                  ])
                }
              ]
            }
          },
          {
            order: 2,
            jobTitle: 'Consultant Senior Web & Mobile',
            company: 'Everest Consulting',
            location: "Abidjan, Côte d'Ivoire",
            startDate: 'Déc 2020',
            endDate: 'Juil 2023',
            missions: {
              create: [
                {
                  order: 1,
                  clientName: "Compagnie Ivoirienne d'Électricité (CIE)",
                  clientCountry: "Côte d'Ivoire",
                  bullets: JSON.stringify([
                    "Conception et pilotage de produits digitaux web et mobiles (agence en ligne V2, applications métiers), incluant la définition des parcours utilisateurs, la réalisation de maquettes et prototypes, et l'alignement des usages métiers et grand public.",
                    "Refonte de solutions critiques de lutte contre la fraude et de monitoring des postes de distribution, avec optimisation des parcours utilisateurs, visualisation de données temps réel et intégration d'interfaces orientées exploitation métier.",
                    "Conception et animation de supports de présentation pour la formation des utilisateurs, la restitution des projets et la présentation des produits digitaux en comités de pilotage et instances de direction générale."
                  ])
                },
                {
                  order: 2,
                  clientName: "Union des Assurances du Burkina (UAB)",
                  clientCountry: "Burkina",
                  bullets: JSON.stringify([
                    "Conception de l'agence en ligne (application mobile et back-office), design de l'expérience utilisateur, structuration des parcours métiers et participation aux actions de restitution stratégique et de formation pour l'adoption de la solution.",
                    "Structuration et animation de présentations pédagogiques destinées à la formation et à l'acculturation des équipes métiers, ainsi qu'à la présentation grand public du produit lors de la keynote de lancement de la solution au Burkina."
                  ])
                },
                {
                  order: 3,
                  clientName: "Atlantic Assurance",
                  clientCountry: "Côte d'Ivoire",
                  bullets: JSON.stringify([
                    "Refonte du parcours de déclaration des sinistres (web responsive, mobile et back-office), conception d'interfaces pédagogiques et illustrées, amélioration de l'expérience de suivi des sinistres et participation à la conception de prototypes applicatifs.",
                    "Synthèse et formalisation des travaux projets à travers des présentations PowerPoint dédiées aux réunions stratégiques et comités de pilotage, facilitant la compréhension des enjeux, des parcours et des décisions."
                  ])
                }
              ]
            }
          },
          {
            order: 3,
            jobTitle: 'Consultant Junior Web & Mobile',
            company: 'Everest Consulting',
            location: "Abidjan, Côte d'Ivoire",
            startDate: 'Nov 2018',
            endDate: 'Dec 2020',
            missions: {
              create: [
                {
                  order: 1,
                  clientName: "Compagnie Ivoirienne d'Électricité (CIE)",
                  clientCountry: "Côte d'Ivoire",
                  bullets: JSON.stringify([
                    "Conception graphique et développement de la première version de l'application mobile de l'agence en ligne, avec une implication directe sur le design des interfaces et l'intégration frontend.",
                    "Participation à la conception et au développement des applications web et mobile du projet de digitalisation des visites des postes sources d'énergie électrique.",
                    "Contribution à la première version du design des applications de lutte contre la fraude, sur les volets web et mobile, en appui aux équipes produit et techniques.",
                    "Réalisation de supports de présentation pour la communication, le suivi projet et la keynote de lancement de la première version de l'application mobile auprès du grand public."
                  ])
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Création d'un second profil (ex: orienté Design)
  await prisma.profile.create({
    data: {
      name: "Profil Spécialiste UX/UI",
      isDefault: false,
      fullName: 'Etienne Landry YAMB',
      title: 'PRODUCT DESIGNER • UX/UI SPECIALIST',
      email: 'landryyamb446@gmail.com',
      phone: '(+225) 01 51 24 18 26',
      location: "Abidjan - Côte d'Ivoire",
      summary: 'Designer passionné avec une expertise solide en création d\'interfaces (Figma) et développement web. Je conçois des expériences utilisateur engageantes et accessibles, validées par de multiples certifications Uxcel et éprouvées sur des projets d\'envergure.',
      certifications: {
         create: [
          { order: 1, name: 'Product Designer', issuer: 'Uxcel', date: 'Février 2026' },
          { order: 2, name: 'Wireframing', issuer: 'Uxcel', date: 'Juin 2024' },
          { order: 3, name: 'UX Design Foundations', issuer: 'Uxcel', date: 'Avril 2024' },
         ]
      }
    }
  })

  console.log(`✅ Création des profils terminée pour ${profile.fullName}`)
  console.log('🎉 Seed exécuté avec succès !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
