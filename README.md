# Dynamic Apply

**Générateur dynamique de CV et lettres de motivation optimisés ATS**

Outil personnel développé par **Etienne Landry YAMB** pour adapter automatiquement son CV et générer des lettres de motivation ciblées en fonction de chaque offre d'emploi.

---

## Concept

Dynamic Apply résout un problème concret : adapter son CV à chaque offre d'emploi est fastidieux et chronophage. Cet outil automatise le processus en utilisant l'IA pour analyser une offre, détecter les mots-clés ATS, adapter le contenu du CV et générer une lettre de motivation sur mesure — le tout exportable en PDF professionnel fidèle à un template Figma.

### Fonctionnalités principales

- **Profil éditable** — Toutes mes informations de CV stockées en base, éditables section par section
- **Analyse d'offre par IA** — Extraction automatique des mots-clés ATS, compétences requises et scoring de compatibilité
- **Adaptation intelligente du CV** — L'IA réorganise les compétences, reformule les bullets et ajuste le résumé pour maximiser le match avec l'offre
- **Génération de lettre de motivation** — Lettre structurée, adaptée au poste et à l'entreprise, avec choix de ton
- **Export PDF ATS-compliant** — CV et lettre de motivation en PDF respectant les normes des systèmes ATS
- **Suivi des candidatures** — Dashboard de suivi avec statuts (brouillon, postulé, entretien, refusé, offre)

---

## Stack technique

| Couche         | Technologie                                    |
| -------------- | ---------------------------------------------- |
| Framework      | Next.js 14+ (App Router)                       |
| Langage        | TypeScript                                     |
| Styling        | Tailwind CSS 4                                 |
| Base de données| PostgreSQL (Neon) via Prisma ORM               |
| Intelligence   | OpenAI API (GPT-4o)                            |
| Génération PDF | @react-pdf/renderer                            |
| Icônes         | lucide-react                                   |
| Polices        | Google Fonts (Plus Jakarta Sans, Inter)         |
| Validation     | Zod + React Hook Form                          |
| UI primitives  | Radix UI                                       |

---

## Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Compte Neon (PostgreSQL) avec une base créée
- Clé API OpenAI

### Setup

```bash
# 1. Cloner le projet
git clone <repo-url>
cd dynamic-apply

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs :
#   DATABASE_URL=postgresql://...
#   OPENAI_API_KEY=sk-proj-...

# 4. Initialiser la base de données
npx prisma generate
npx prisma db push

# 5. Seed : pré-remplir le profil avec les données CV
npx prisma db seed

# 6. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`.

---

## Structure du projet

```
dynamic-apply/
├── prisma/
│   ├── schema.prisma         # Schéma de la base de données
│   └── seed.ts               # Données initiales du CV
├── src/
│   ├── app/                  # Pages Next.js (App Router)
│   │   ├── page.tsx          # Dashboard
│   │   ├── profile/          # Édition du profil CV
│   │   ├── applications/     # Gestion des candidatures
│   │   │   ├── new/          # Wizard nouvelle candidature
│   │   │   └── [id]/         # Détail candidature
│   │   └── api/              # Route Handlers (OpenAI)
│   ├── components/
│   │   ├── ui/               # Composants UI réutilisables
│   │   ├── cv/               # Templates PDF (CV + lettre)
│   │   ├── forms/            # Formulaires d'édition
│   │   ├── dashboard/        # Composants dashboard
│   │   └── layout/           # Sidebar, Header
│   ├── lib/                  # Prisma client, OpenAI client, utils
│   └── types/                # Types TypeScript
├── public/fonts/             # Polices embarquées pour le PDF
└── .env.local                # Variables d'environnement (non committé)
```

---

## Workflow d'utilisation

```
1. Éditer mon profil de base (/profile)
         ↓
2. Créer une nouvelle candidature (/applications/new)
         ↓
3. Coller l'offre d'emploi (URL ou texte)
         ↓
4. L'IA analyse l'offre → mots-clés ATS, scoring, suggestions
         ↓
5. Adapter le CV → accepter/modifier les suggestions de l'IA
         ↓
6. Générer la lettre de motivation → éditer si besoin
         ↓
7. Exporter CV + lettre en PDF
         ↓
8. Suivre la candidature dans le dashboard
```

---

## Template CV

Le template PDF du CV reproduit fidèlement le design Figma du projet **CV-YAMB-ETIENNE-LANDRY**. Le design est professionnel avec une palette bleue marine / bleue accent, une hiérarchie typographique claire et une mise en page aérée optimisée pour la lecture ATS.

Les rubriques sont dynamiques : elles s'affichent uniquement si elles contiennent du contenu, et le PDF gère automatiquement les sauts de page intelligents.

---

## Variables d'environnement

| Variable        | Description                      |
| --------------- | -------------------------------- |
| `DATABASE_URL`  | URL de connexion PostgreSQL Neon |
| `OPENAI_API_KEY`| Clé API OpenAI                   |

Créer un fichier `.env.example` sans les valeurs sensibles pour référence.

---

## Sécurité

- Outil à usage **strictement personnel et local**
- Les clés API ne sont jamais exposées côté client (Route Handlers côté serveur)
- `.env.local` est dans `.gitignore`
- Aucune authentification nécessaire (usage mono-utilisateur)

---

## Licence

Usage personnel — Etienne Landry YAMB — 2026
