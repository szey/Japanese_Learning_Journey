package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/models"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/repository"
)

type Handler struct {
	Repo *repository.Repository
}

func New(repo *repository.Repository) *Handler {
	return &Handler{Repo: repo}
}

func (h *Handler) Health(w http.ResponseWriter, _ *http.Request) {
	respondJSON(w, http.StatusOK, models.HealthResponse{Status: "ok"})
}

func (h *Handler) ListKana(w http.ResponseWriter, r *http.Request) {
	scriptType := chi.URLParam(r, "scriptType")
	items, err := h.Repo.ListKana(r.Context(), scriptType)
	if err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, items)
}

func (h *Handler) GetDashboard(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		respondError(w, http.StatusBadRequest, "user_id is required")
		return
	}
	stats, err := h.Repo.GetDashboardStats(r.Context(), userID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, stats)
}

func (h *Handler) SaveQuizResult(w http.ResponseWriter, r *http.Request) {
	var input models.QuizResultInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if err := h.Repo.SaveQuizResult(r.Context(), input); err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, map[string]string{"message": "quiz result saved"})
}

func (h *Handler) SaveProgress(w http.ResponseWriter, r *http.Request) {
	var input models.ProgressInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		respondError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if err := h.Repo.UpsertProgress(r.Context(), input); err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, map[string]string{"message": "progress saved"})
}

func respondJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func respondError(w http.ResponseWriter, status int, message string) {
	respondJSON(w, status, map[string]string{"error": message})
}
