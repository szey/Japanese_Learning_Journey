package repository

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/szey/Japanese_Learning_Journey/backend/internal/models"
)

type Repository struct {
	DB *pgxpool.Pool
}

func New(db *pgxpool.Pool) *Repository {
	return &Repository{DB: db}
}

func (r *Repository) ListKana(ctx context.Context, scriptType string) ([]models.KanaItem, error) {
	rows, err := r.DB.Query(ctx, `select id, kana, romanization, script_type from kana_items where script_type = $1 order by kana`, scriptType)
	if err != nil {
		return nil, fmt.Errorf("query kana items: %w", err)
	}
	defer rows.Close()

	items := make([]models.KanaItem, 0)
	for rows.Next() {
		var item models.KanaItem
		if err := rows.Scan(&item.ID, &item.Kana, &item.Romanization, &item.ScriptType); err != nil {
			return nil, fmt.Errorf("scan kana item: %w", err)
		}
		items = append(items, item)
	}
	return items, rows.Err()
}

func (r *Repository) SaveQuizResult(ctx context.Context, input models.QuizResultInput) error {
	_, err := r.DB.Exec(ctx, `insert into quiz_results (user_id, quiz_type, score, total) values ($1, $2, $3, $4)`, input.UserID, input.QuizType, input.Score, input.Total)
	if err != nil {
		return fmt.Errorf("insert quiz result: %w", err)
	}
	return nil
}

func (r *Repository) UpsertProgress(ctx context.Context, input models.ProgressInput) error {
	_, err := r.DB.Exec(ctx, `
		insert into user_progress (user_id, lesson_id, status, score)
		values ($1, $2, $3, $4)
		on conflict (user_id, lesson_id)
		do update set status = excluded.status, score = excluded.score, updated_at = now()
	`, input.UserID, input.LessonID, input.Status, input.Score)
	if err != nil {
		return fmt.Errorf("upsert user progress: %w", err)
	}
	return nil
}

func (r *Repository) GetDashboardStats(ctx context.Context, userID string) (models.DashboardStats, error) {
	stats := models.DashboardStats{CurrentLevel: "Pre-N5"}

	if err := r.DB.QueryRow(ctx, `select coalesce(count(*), 0) from user_progress where user_id = $1 and status = 'completed'`, userID).Scan(&stats.CompletedLessons); err != nil {
		return stats, fmt.Errorf("count completed lessons: %w", err)
	}

	if err := r.DB.QueryRow(ctx, `select coalesce(count(*), 0) from quiz_results where user_id = $1`, userID).Scan(&stats.QuizAttempts); err != nil {
		return stats, fmt.Errorf("count quiz attempts: %w", err)
	}

	return stats, nil
}
