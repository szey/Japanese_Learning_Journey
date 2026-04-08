'use client';

import { useMemo, useState } from 'react';

const questions = [
  { kana: 'あ', answer: 'a', options: ['a', 'i', 'u', 'e'] },
  { kana: 'き', answer: 'ki', options: ['ki', 'ka', 'ri', 'shi'] },
  { kana: 'ぬ', answer: 'nu', options: ['nu', 'ne', 'mu', 'me'] },
  { kana: 'ア', answer: 'a', options: ['a', 'o', 'e', 'ta'] },
];

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const item = useMemo(() => questions[index], [index]);

  function choose(option: string) {
    if (locked) return;
    setSelected(option);
    setLocked(true);
    if (option === item.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setLocked(false);
      setSelected(null);
    }
  }

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Quiz engine</span>
            <h1>Starter kana quiz scaffold</h1>
            <p className="section-copy">
              This page already behaves like a small app. Next step: store attempts in Supabase and fetch question sets from database tables instead of keeping them in the component.
            </p>
          </div>
          <div className="panel">
            <div className="stats-grid">
              <div className="stat"><strong>{index + 1}</strong><span>Question</span></div>
              <div className="stat"><strong>{score}</strong><span>Score</span></div>
              <div className="stat"><strong>{questions.length}</strong><span>Total</span></div>
            </div>
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
              <button className="btn btn-primary" onClick={next} disabled={!locked || index === questions.length - 1}>
                Next question
              </button>
            </div>
          </section>
          <aside className="card">
            <span className="eyebrow">Database-ready plan</span>
            <div className="checklist">
              <label><input type="checkbox" checked readOnly /> <span>Question table</span></label>
              <label><input type="checkbox" checked readOnly /> <span>Quiz result table</span></label>
              <label><input type="checkbox" checked readOnly /> <span>User progress table</span></label>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
