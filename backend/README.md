# Mirai Nihongo Go Backend

This backend is the API layer for the Japanese Learning Journey project.

## Stack

- Go
- Chi router
- pgx PostgreSQL driver
- Supabase Postgres as the database

## Responsibilities

- serve lesson and kana data
- save user progress
- save quiz results
- return dashboard stats

## Environment variables

```bash
PORT=8080
DATABASE_URL=postgres://postgres:password@db.host:5432/postgres?sslmode=require
CORS_ALLOWED_ORIGIN=http://localhost:3000
```

## Run locally

```bash
cd backend
go mod tidy
go run ./cmd/api
```

## Suggested frontend flow

- Next.js calls Go API
- Go API reads/writes Postgres
- Supabase Auth can remain for login at first
- later you can validate Supabase JWT inside Go middleware
