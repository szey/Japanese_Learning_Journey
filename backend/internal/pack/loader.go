package pack

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type Manifest struct {
	PackID                 string `json:"pack_id"`
	PackVersion            string `json:"pack_version"`
	Stage                  string `json:"stage"`
	Title                  string `json:"title"`
	FirmwareMinVersion     string `json:"firmware_min_version"`
	EstimatedTotalSessions int    `json:"estimated_total_sessions"`
	ContentVersion         int    `json:"content_version"`
}

type Lesson struct {
	LessonID         string   `json:"lesson_id"`
	Title            string   `json:"title"`
	Module           string   `json:"module"`
	Type             string   `json:"type"`
	Order            int      `json:"order"`
	EstimatedMinutes int      `json:"estimated_minutes"`
	UnlockRule       *string  `json:"unlock_rule"`
	ContentRefs      []string `json:"content_refs"`
}

type KanaItem struct {
	ItemID       string `json:"item_id"`
	Kana         string `json:"kana"`
	Romanization string `json:"romanization"`
	ScriptType   string `json:"script_type"`
	Group        string `json:"group"`
	Sample       string `json:"sample"`
}

type VocabItem struct {
	ItemID   string `json:"item_id"`
	Word     string `json:"word"`
	Reading  string `json:"reading"`
	Meaning  string `json:"meaning"`
	Category string `json:"category"`
}

type QuizItem struct {
	QuizID   string   `json:"quiz_id"`
	QuizType string   `json:"quiz_type"`
	Prompt   string   `json:"prompt"`
	Answer   string   `json:"answer"`
	Options  []string `json:"options"`
}

type Rules struct {
	CompletionRules map[string]int `json:"completion_rules"`
	MasteryStates   []string       `json:"mastery_states"`
	PromotionRule   map[string]int `json:"promotion_rule"`
}

type Loader struct {
	Root string
}

func NewLoader(root string) *Loader {
	return &Loader{Root: root}
}

func (l *Loader) readJSON(filename string, target any) error {
	path := filepath.Join(l.Root, filename)
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("read %s: %w", filename, err)
	}
	if err := json.Unmarshal(data, target); err != nil {
		return fmt.Errorf("unmarshal %s: %w", filename, err)
	}
	return nil
}

func (l *Loader) Manifest() (Manifest, error) {
	var manifest Manifest
	err := l.readJSON("manifest.json", &manifest)
	return manifest, err
}

func (l *Loader) Lessons() ([]Lesson, error) {
	var lessons []Lesson
	err := l.readJSON("lessons.json", &lessons)
	return lessons, err
}

func (l *Loader) Kana() ([]KanaItem, error) {
	var items []KanaItem
	err := l.readJSON("kana.json", &items)
	return items, err
}

func (l *Loader) Vocab() ([]VocabItem, error) {
	var items []VocabItem
	err := l.readJSON("vocab.json", &items)
	return items, err
}

func (l *Loader) Quizzes() ([]QuizItem, error) {
	var items []QuizItem
	err := l.readJSON("quizzes.json", &items)
	return items, err
}

func (l *Loader) Rules() (Rules, error) {
	var rules Rules
	err := l.readJSON("rules.json", &rules)
	return rules, err
}
