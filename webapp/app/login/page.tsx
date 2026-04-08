'use client';

import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Use magic link sign-in once Supabase is connected.');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined,
      },
    });

    setMessage(error ? error.message : 'Check your email for the login link.');
    setLoading(false);
  }

  return (
    <main className="section">
      <div className="container two-col">
        <section className="card">
          <span className="eyebrow">Authentication</span>
          <h1>Sign in with email magic link</h1>
          <p className="muted">
            This is the cleanest starter auth flow for a personal product: low friction, no password UX, and easy to extend later.
          </p>
          <form onSubmit={handleSubmit} className="checklist">
            <label>
              <span>Email</span>
              <input
                style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(89,97,150,.16)' }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send login link'}
            </button>
          </form>
          <p className="muted">{message}</p>
        </section>
        <aside className="card">
          <span className="eyebrow">Why this page matters</span>
          <h2>This is where the project becomes genuinely dynamic.</h2>
          <div className="checklist">
            <label><input type="checkbox" checked readOnly /> <span>User identity exists</span></label>
            <label><input type="checkbox" checked readOnly /> <span>Progress can belong to a real account</span></label>
            <label><input type="checkbox" checked readOnly /> <span>Quiz history can sync across devices</span></label>
          </div>
        </aside>
      </div>
    </main>
  );
}
