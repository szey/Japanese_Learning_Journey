import './globals.css';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/site-nav';

export const metadata: Metadata = {
  title: 'Mirai Nihongo',
  description: 'Dynamic Japanese learning app scaffold from kana to JLPT N1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
