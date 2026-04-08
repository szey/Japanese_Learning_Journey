import Link from 'next/link';

const modules = [
  ['Kana Trainer', 'Learn Hiragana and Katakana with a real product flow.'],
  ['Quiz Engine', 'Move from recognition to recall with saved results.'],
  ['Dashboard', 'Track progress per user instead of only inside the browser.'],
  ['Lesson System', 'Prepare for Pre-N5, N5, and later JLPT levels.'],
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Next.js + Supabase upgrade</span>
            <h1>Mirai Nihongo is now moving from static mockup to real web app.</h1>
            <p className="section-copy">
              This scaffold keeps the same product direction, but upgrades it to a stack that can support
              login, cloud-saved progress, lesson data, quiz history, and future expansion from Pre-N5 to N1.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/login">Set up login</Link>
              <Link className="btn" href="/dashboard">Open dashboard</Link>
              <Link className="btn" href="/kana">Open kana module</Link>
            </div>
          </div>
          <div className="panel">
            <span className="eyebrow">Stack</span>
            <div className="grid-3">
              <div className="stat"><strong>Next.js</strong><span>Frontend + routes</span></div>
              <div className="stat"><strong>Supabase</strong><span>Auth + database</span></div>
              <div className="stat"><strong>TypeScript</strong><span>Safer app structure</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <span className="eyebrow">Phase 1</span>
          <h2>What this version is designed to unlock</h2>
          <div className="grid-4">
            {modules.map(([title, desc]) => (
              <article key={title} className="task">
                <strong>{title}</strong>
                <p className="muted">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="card">
            <span className="eyebrow">Current goal</span>
            <h2>Minimal viable learning product</h2>
            <p className="muted">
              First make Pre-N5 truly usable: login, kana study, kana quiz, dashboard, and lesson data.
              Then extend that structure into N5 grammar, vocabulary, and review loops.
            </p>
          </div>
          <div className="card">
            <span className="eyebrow">Next move</span>
            <h2>Connect Supabase and deploy to Vercel</h2>
            <div className="code">
              npm install
              <br />
              npm run dev
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
