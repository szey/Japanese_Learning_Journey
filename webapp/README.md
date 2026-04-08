# Mirai Nihongo Webapp

This folder upgrades the project from a static GitHub Pages prototype into a real app scaffold using Next.js and Supabase.

## What is included

- Next.js app router structure
- Supabase client helper
- email magic-link login page
- dashboard scaffold
- kana module scaffold
- quiz scaffold
- starter database schema

## Local development

```bash
cd webapp
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Suggested deployment

- Frontend: Vercel
- Auth + Database: Supabase

## First real milestone

1. Create a Supabase project
2. Run `supabase/schema.sql`
3. Fill `.env.local`
4. Test magic-link login
5. Replace placeholder dashboard data with live queries
6. Persist quiz results to `quiz_results`
