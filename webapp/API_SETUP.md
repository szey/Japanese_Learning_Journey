# Frontend API setup

Add this to your local `webapp/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

If your Go backend runs on another host, replace `NEXT_PUBLIC_API_BASE_URL` with that address.
