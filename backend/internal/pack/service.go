package pack

import (
	"fmt"
	"path/filepath"
)

type Service struct {
	BaseDir string
}

func NewService(baseDir string) *Service {
	return &Service{BaseDir: baseDir}
}

func (s *Service) loader(packID, packVersion string) (*Loader, error) {
	if packID == "" || packVersion == "" {
		return nil, fmt.Errorf("pack_id and pack_version are required")
	}
	root := filepath.Join(s.BaseDir, fmt.Sprintf("%s-%s", packID, packVersion))
	return NewLoader(root), nil
}

func (s *Service) GetManifest(packID, packVersion string) (Manifest, error) {
	loader, err := s.loader(packID, packVersion)
	if err != nil {
		return Manifest{}, err
	}
	return loader.Manifest()
}

func (s *Service) GetLessons(packID, packVersion string) ([]Lesson, error) {
	loader, err := s.loader(packID, packVersion)
	if err != nil {
		return nil, err
	}
	return loader.Lessons()
}

func (s *Service) GetKana(packID, packVersion string) ([]KanaItem, error) {
	loader, err := s.loader(packID, packVersion)
	if err != nil {
		return nil, err
	}
	return loader.Kana()
}

func (s *Service) GetVocab(packID, packVersion string) ([]VocabItem, error) {
	loader, err := s.loader(packID, packVersion)
	if err != nil {
		return nil, err
	}
	return loader.Vocab()
}

func (s *Service) GetQuizzes(packID, packVersion string) ([]QuizItem, error) {
	loader, err := s.loader(packID, packVersion)
	if err != nil {
		return nil, err
	}
	return loader.Quizzes()
}

func (s *Service) GetRules(packID, packVersion string) (Rules, error) {
	loader, err := s.loader(packID, packVersion)
	if err != nil {
		return Rules{}, err
	}
	return loader.Rules()
}
