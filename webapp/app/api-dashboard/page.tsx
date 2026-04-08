'use client';

import { useEffect, useState } from 'react';
import { fetchDashboard } from '@/lib/api';

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

type DashboardState = {
  current_level: string;
  completed_lessons: number;
  quiz_attempts: number;
};

export default function ApiDashboardPage() {
  const [stats, setStats] = useState<DashboardState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchDashboard(DEMO_USER_ID);
        if (!cancelled) {
          setStats(data);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load dashboard');
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
            <h1>API-backed dashboard page</h1>
            <p className="section-copy">This page requests learner stats from the Go API.</p>
          </div>
          <div className="panel">
            <strong>{loading ? 'Loading...' : 'Ready'}</strong>
            <p className="muted">{error || 'Replace the demo user id with the signed-in user later.'}</p>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container stats-grid">
          <div className="stat"><strong>{stats?.current_level ?? '—'}</strong><span>Current level</span></div>
          <div className="stat"><strong>{stats?.completed_lessons ?? 0}</strong><span>Completed lessons</span></div>
          <div className="stat"><strong>{stats?.quiz_attempts ?? 0}</strong><span>Quiz attempts</span></div>
        </div>
      </section>
    </main>
  );
}
