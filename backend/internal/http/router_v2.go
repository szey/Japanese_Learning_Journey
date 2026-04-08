package httpx

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/config"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/handler"
)

func NewRouterV2(cfg config.Config, h *handler.Handler) http.Handler {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{cfg.CORSAllowedOrigin},
		AllowedMethods:   []string{"GET", "POST", "PUT", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Get("/health", h.Health)
	r.Route("/api", func(api chi.Router) {
		api.Get("/kana/{scriptType}", h.ListKana)
		api.Get("/dashboard", h.GetDashboard)
		api.Post("/quiz-results", h.SaveQuizResult)
		api.Post("/progress", h.SaveProgress)
		api.Get("/packs/manifest", h.GetPackManifest)
		api.Get("/packs/lessons", h.GetPackLessons)
		api.Get("/packs/vocab", h.GetPackVocab)
		api.Get("/packs/quizzes", h.GetPackQuizzes)
	})

	return r
}
