package main

import (
	"log"
	"net/http"
	"path/filepath"

	"github.com/szey/Japanese_Learning_Journey/backend/internal/config"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/db"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/handler"
	httpx "github.com/szey/Japanese_Learning_Journey/backend/internal/http"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/pack"
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
	packService := pack.NewService(filepath.Join("..", "..", "packs"))
	handler.ConfigurePackService(packService)
	router := httpx.NewRouterV2(cfg, h)

	addr := ":" + cfg.Port
	log.Printf("Go API v2 listening on %s", addr)
	if err := http.ListenAndServe(addr, router); err != nil {
		log.Fatalf("server stopped: %v", err)
	}
}
