const hira = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'];
const kata = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'];

export default function KanaPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Module: Kana</span>
            <h1>Kana module ready to plug into database-backed lessons</h1>
            <p className="section-copy">
              This page is the dynamic-app version of the earlier Kana Lab. The next step is to replace hardcoded arrays with real lesson records from Supabase.
            </p>
          </div>
          <div className="panel">
            <span className="eyebrow">Goal</span>
            <h2>Recognition → audio → quiz → completion</h2>
            <p className="muted">Each tile here can later become a lesson item with status, audio source, and stroke order metadata.</p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container two-col">
          <article className="card">
            <span className="eyebrow">Hiragana</span>
            <div className="grid-4">
              {hira.map((item) => (
                <div key={item} className="tile">{item}</div>
              ))}
            </div>
          </article>
          <article className="card">
            <span className="eyebrow">Katakana</span>
            <div className="grid-4">
              {kata.map((item) => (
                <div key={item} className="tile">{item}</div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
