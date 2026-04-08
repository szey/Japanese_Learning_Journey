create table if not exists profiles (
  id uuid primary key,
  email text unique,
  display_name text,
  target_level text default 'Pre-N5',
  created_at timestamptz default now()
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  level text not null,
  kind text not null,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists kana_items (
  id uuid primary key default gen_random_uuid(),
  kana text not null,
  romanization text not null,
  script_type text not null,
  audio_url text,
  stroke_data jsonb default '[]'::jsonb
);

create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id uuid references lessons(id) on delete cascade,
  status text not null default 'not_started',
  score numeric,
  updated_at timestamptz default now()
);

create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  quiz_type text not null,
  score integer not null,
  total integer not null,
  created_at timestamptz default now()
);
