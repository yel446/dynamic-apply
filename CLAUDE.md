@AGENTS.md

Cartographie détaillée:
- `/src/app/page.tsx` : Dashboard de tracking des candidatures générées et stats (Score ATS).
- `/src/app/profile` : Gestion multi-profils (Édition pointue des bases de CV).
- `/src/app/applications` : Hub des applications avec wizard de génération `/applications/new`.
- `/src/app/api` : 
    - `/api/analyze-offer` : Extract ATS keywords.
    - `/api/adapt-cv` : Rewrite logic for the specific profile.
    - `/api/generate-cover-letter` : Streaming route.
- `/src/lib/prisma.ts` : Prisma 7 Client instantiation via Pool.
- `/src/components/cv/CVDocument.tsx` : The `@react-pdf/renderer` ATS-compliant template builder.

Règle principale de développement: Toujours maintenir le plan d'implémentation et vérifier la cohérence des bases de données lors des ajouts.
