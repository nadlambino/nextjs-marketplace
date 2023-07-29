import './../assets/styles/globals.scss';
import type { Metadata } from 'next';
import Header from '../components/Header';
import { NextAuthSessionProvider } from '@/providers/NextAuthSessionProvider';

export const metadata: Metadata = {
  title: 'Marketplace',
  description: `We got what you need, we buy what you don't`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          <Header />
          <main>{children}</main>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
