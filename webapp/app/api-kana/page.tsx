'use client';

import { useEffect, useState } from 'react';
import { fetchKana, type KanaItem } from '@/lib/api';

export default function ApiKanaPage() {
  const [hiragana, setHiragana] = useState<KanaItem[]>([]);
  const [katakana, setKatakana] = useState<KanaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [hira, kata] = await Promise.all([fetchKana('hiragana'), fetchKana('katakana')]);
        if (!cancelled) {
          setHiragana(hira);
          setKatakana(kata);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load kana');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Backend route</span>
            <h1>API-backed kana page</h1>
            <p className="section-copy">This page requests Hiragana and Katakana from the Go API.</p>
          </div>
          <div className="panel">
            <strong>{loading ? 'Loading...' : 'Ready'}</strong>
            <p className="muted">{error || 'Seed kana_items and this route becomes data-driven.'}</p>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container two-col">
          <article className="card">
            <span className="eyebrow">Hiragana</span>
            <div className="grid-4">
              {hiragana.map((item) => (
                <div key={item.id} className="tile">
                  <div>{item.kana}</div>
                  <small className="muted">{item.romanization}</small>
                </div>
              ))}
            </div>
          </article>
          <article className="card">
            <span className="eyebrow">Katakana</span>
            <div className="grid-4">
              {katakana.map((item) => (
                <div key={item.id} className="tile">
                  <div>{item.kana}</div>
                  <small className="muted">{item.romanization}</small>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
