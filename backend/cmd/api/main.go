package main

import (
	"log"
	"net/http"

	"github.com/szey/Japanese_Learning_Journey/backend/internal/config"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/db"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/handler"
	httpx "github.com/szey/Japanese_Learning_Journey/backend/internal/http"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/repository"
)

func main() {
	cfg := config.Load()

	pool, err := db.NewPool(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}
	defer pool.Close()

	repo := repository.New(pool)
	h := handler.New(repo)
	router := httpx.NewRouter(cfg, h)

	addr := ":" + cfg.Port
	log.Printf("Go API listening on %s", addr)
	if err := http.ListenAndServe(addr, router); err != nil {
		log.Fatalf("server stopped: %v", err)
	}
}
