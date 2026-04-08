package models

import "time"

type HealthResponse struct {
	Status string `json:"status"`
}

type KanaItem struct {
	ID          string `json:"id"`
	Kana        string `json:"kana"`
	Romanization string `json:"romanization"`
	ScriptType  string `json:"script_type"`
}

type DashboardStats struct {
	CurrentLevel     string `json:"current_level"`
	CompletedLessons int    `json:"completed_lessons"`
	QuizAttempts     int    `json:"quiz_attempts"`
}

type QuizResultInput struct {
	UserID   string `json:"user_id"`
	QuizType string `json:"quiz_type"`
	Score    int    `json:"score"`
	Total    int    `json:"total"`
}

type QuizResult struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	QuizType  string    `json:"quiz_type"`
	Score     int       `json:"score"`
	Total     int       `json:"total"`
	CreatedAt time.Time `json:"created_at"`
}

type ProgressInput struct {
	UserID   string  `json:"user_id"`
	LessonID string  `json:"lesson_id"`
	Status   string  `json:"status"`
	Score    float64 `json:"score"`
}
