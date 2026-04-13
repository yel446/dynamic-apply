# Dynamic Apply - Architecture & Documentation

## Overview
Dynamic Apply is a personal Next.js 16 (App Router) Application serving as a smart ATS & resume manager. It eliminates repetitive application tasks by tailoring your CV to specific job descriptions using AI (GPT-4o) and generating ATS-compliant PDF files using `@react-pdf/renderer`.

## Core Philosophy (Multi-Profile)
Because applications vary widely (e.g., Product Manager vs UX/UI Designer), the application relies on the concept of **Multiple Base Profiles**.
1. **Profiles**: The user sets up foundational resumes. A profile named "Product Manager Base" has specific experiences written a certain way, while "UX Designer Base" might frame the same experiences differently.
2. **Applications**: When the user creates a new application, they just paste the job description link/text. The AI determines the right base profile to start from, further customizes the bullets/summary organically for this specific job without lying, and persists the customized data as an `Application` record.
3. **Dashboard**: Only tracks historical applications and created resumes. No external job search features.

## Architecture

*   **Framework**: Next.js 16 (App Router) with React 19.
*   **Database**: PostgreSQL (via Neon) managed by Prisma 7 (`@prisma/adapter-pg` driver adapter for standard PostgreSQL access).
*   **Styling**: Tailwind CSS v4 in dark/glassmorphism theme, using `globals.css` with `@import "tailwindcss"` and direct utility classes. No `tailwind.config.ts`.
*   **Fonts**: Inter (body), Plus Jakarta Sans (headings) loaded via Next Fonts.
*   **AI Integration**: OpenAI SDK (`gpt-4o`) operating seamlessly inside API Route Handlers. Stream responses for cover letters.

## Prisma Schema Details
- `Profile`: The foundational CV variant. Has `name`, `isDefault`, and relations to `Skill`, `Experience`, `Mission`, `Education`, etc.
- `Application`: A job application. Tracks the `status`, and contains AI-customized fields (`adaptedSummary`, `adaptedBullets`, etc.) to never overwrite the base Profile. It links back to the base `Profile` it was generated from.

## Development Workflow Context
When updating UI, follow the glassmorphism premium aesthetic: dark sides (`#11141D`), floating crisp white content cards (`.glass-card`), rounded accents, and precise spacing.

*Do not use standard Next.js Tailwind 3 configs - everything relies on Next.js 16 and Tailwind 4 standards built natively into globals.css.*
