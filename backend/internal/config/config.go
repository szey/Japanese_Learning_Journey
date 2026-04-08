package config

import (
	"log"
	"os"
)

type Config struct {
	Port              string
	DatabaseURL       string
	CORSAllowedOrigin string
}

func Load() Config {
	cfg := Config{
		Port:              getEnv("PORT", "8080"),
		DatabaseURL:       getEnv("DATABASE_URL", ""),
		CORSAllowedOrigin: getEnv("CORS_ALLOWED_ORIGIN", "http://localhost:3000"),
	}

	if cfg.DatabaseURL == "" {
		log.Println("warning: DATABASE_URL is empty")
	}

	return cfg
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
