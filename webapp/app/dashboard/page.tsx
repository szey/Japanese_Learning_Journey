export default function DashboardPage() {
  const stats = [
    ['Current level', 'Pre-N5'],
    ['Completed lessons', '3'],
    ['Quiz attempts', '5'],
    ['Streak target', '7 days'],
  ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">User dashboard</span>
            <h1>Cloud-synced learner dashboard</h1>
            <p className="section-copy">
              This page is currently scaffolded with placeholder values. Once Supabase is wired up, it should read lesson progress, quiz history, and streak data for the signed-in user.
            </p>
          </div>
          <div className="panel stats-grid">
            {stats.map(([label, value]) => (
              <div key={label} className="stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container grid-3">
          <article className="lesson">
            <span className="eyebrow">Now studying</span>
            <h2>Kana foundation</h2>
            <p className="muted">Finish Hiragana rows, Katakana basics, and one quiz pass.</p>
          </article>
          <article className="lesson">
            <span className="eyebrow">Unlock next</span>
            <h2>Pre-N5 sentence blocks</h2>
            <p className="muted">Greetings, numbers, time, particles, and starter verbs.</p>
          </article>
          <article className="lesson">
            <span className="eyebrow">Later</span>
            <h2>N5 grammar path</h2>
            <p className="muted">Convert this static sequence into real lesson records and completion states.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
