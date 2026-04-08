package handler

import (
	"net/http"

	"github.com/szey/Japanese_Learning_Journey/backend/internal/pack"
)

var packService *pack.Service

func ConfigurePackService(service *pack.Service) {
	packService = service
}

func (h *Handler) GetPackManifest(w http.ResponseWriter, r *http.Request) {
	if packService == nil {
		respondError(w, http.StatusInternalServerError, "pack service is not configured")
		return
	}
	packID := r.URL.Query().Get("pack_id")
	packVersion := r.URL.Query().Get("pack_version")
	manifest, err := packService.GetManifest(packID, packVersion)
	if err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, manifest)
}

func (h *Handler) GetPackLessons(w http.ResponseWriter, r *http.Request) {
	if packService == nil {
		respondError(w, http.StatusInternalServerError, "pack service is not configured")
		return
	}
	packID := r.URL.Query().Get("pack_id")
	packVersion := r.URL.Query().Get("pack_version")
	lessons, err := packService.GetLessons(packID, packVersion)
	if err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, lessons)
}

func (h *Handler) GetPackVocab(w http.ResponseWriter, r *http.Request) {
	if packService == nil {
		respondError(w, http.StatusInternalServerError, "pack service is not configured")
		return
	}
	packID := r.URL.Query().Get("pack_id")
	packVersion := r.URL.Query().Get("pack_version")
	items, err := packService.GetVocab(packID, packVersion)
	if err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, items)
}

func (h *Handler) GetPackQuizzes(w http.ResponseWriter, r *http.Request) {
	if packService == nil {
		respondError(w, http.StatusInternalServerError, "pack service is not configured")
		return
	}
	packID := r.URL.Query().Get("pack_id")
	packVersion := r.URL.Query().Get("pack_version")
	items, err := packService.GetQuizzes(packID, packVersion)
	if err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, items)
}
