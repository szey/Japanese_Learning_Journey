'use client';

import { useState } from 'react';
import { saveQuizResult } from '@/lib/api';

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';
const QUESTIONS = [
  { kana: 'あ', answer: 'a', options: ['a', 'i', 'u', 'e'] },
  { kana: 'き', answer: 'ki', options: ['ki', 'ka', 'ri', 'shi'] },
  { kana: 'ア', answer: 'a', options: ['a', 'o', 'e', 'ta'] },
  { kana: 'ぬ', answer: 'nu', options: ['nu', 'ne', 'mu', 'me'] },
];

export default function ApiQuizPage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const item = QUESTIONS[index];

  function choose(option: string) {
    if (locked) return;
    setSelected(option);
    setLocked(true);
    if (option === item.answer) setScore((current) => current + 1);
  }

  async function next() {
    if (index < QUESTIONS.length - 1) {
      setIndex((current) => current + 1);
      setLocked(false);
      setSelected(null);
      return;
    }

    setSaving(true);
    try {
      const finalScore = selected === item.answer && !message.includes('saved') ? score + 1 : score;
      const result = await saveQuizResult({
        user_id: DEMO_USER_ID,
        quiz_type: 'kana',
        score: finalScore,
        total: QUESTIONS.length,
      });
      setMessage(result.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to save quiz result');
    } finally {
      setSaving(false);
    }
  }

  const isComplete = index === QUESTIONS.length - 1 && locked;

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Backend route</span>
            <h1>API-backed quiz page</h1>
            <p className="section-copy">This route submits quiz results to the Go backend.</p>
          </div>
          <div className="panel">
            <strong>{`Question ${index + 1} / ${QUESTIONS.length}`}</strong>
            <p className="muted">{message || 'Finish the short quiz to test the write path.'}</p>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container two-col">
          <section className="card">
            <div className="quiz-question">{item.kana}</div>
            <div className="quiz-grid">
              {item.options.map((option) => {
                const isCorrect = locked && option === item.answer;
                const isWrong = locked && selected === option && option !== item.answer;
                return (
                  <button
                    key={option}
                    className="option"
                    onClick={() => choose(option)}
                    style={{
                      borderColor: isCorrect ? '#41b883' : isWrong ? '#ff6b6b' : undefined,
                      background: isCorrect ? 'rgba(65,184,131,.12)' : isWrong ? 'rgba(255,107,107,.12)' : undefined,
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="cta-row" style={{ marginTop: 16 }}>
              <button className="btn btn-primary" onClick={next} disabled={!locked || saving}>
                {isComplete ? (saving ? 'Saving...' : 'Finish and save') : 'Next question'}
              </button>
            </div>
          </section>
          <aside className="card">
            <span className="eyebrow">Current score</span>
            <h2>{score}</h2>
            <p className="muted">This will post to /api/quiz-results using the Go backend.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
