---
name: Raanzlr project structure
description: Key facts about the Raanzlr website artifact — stack, routing, data locations, and contact form flow
---

## Stack
- React + Vite, react-router-dom v7 (BrowserRouter), framer-motion, axios, sonner, react-helmet-async, Tailwind CSS, TypeScript
- `artifacts/raanzlr/src/` — all pages, components, contexts, data, lib

## Data locations
- Service data: `src/lib/translations.ts` → `t.services.items[]` (has `key`, `title`, `desc`, `long`, `helps`, `image`, `tier`)
- Blog posts: `src/data/posts.ts` — POSTS array with `slug`, `sections[]`
- Case studies: `src/data/cases.ts` — CASES array with `slug`, `challenge`, `solution`

## Routing
- `/services/:slug` → ServiceDetail.tsx (slug = service `key` from translations)
- `/insights/:slug` → InsightPost.tsx
- `/case-studies/:slug` → CaseStudyDetail.tsx

## Contact form
- Frontend: uses VITE_N8N_CONTACT_WEBHOOK / VITE_N8N_SERVICE_WEBHOOK env vars (optional)
- Backend: POST /api/contacts → saves to `contacts` DB table, GET /api/contacts → list all submissions

**Why:** Contact form needed a persistent backend fallback independent of n8n webhooks
