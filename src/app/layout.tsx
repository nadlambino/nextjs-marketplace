import './../assets/styles/globals.scss';
import type { Metadata } from 'next';
import Header from '../components/Header';
import { ClientProvider } from '@/providers/ClientProvider';

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
        <ClientProvider>
          <Header />
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
