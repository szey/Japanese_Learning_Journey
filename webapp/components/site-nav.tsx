import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/kana', label: 'Kana' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/login', label: 'Login' },
];

export function SiteNav() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand">
          <span className="brand-mark">み</span>
          <div>
            <strong>Mirai Nihongo</strong>
            <p>Dynamic learning app scaffold</p>
          </div>
        </Link>
        <nav className="nav-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
