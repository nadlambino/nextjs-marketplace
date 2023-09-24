import './../assets/styles/globals.scss';
import type { Metadata } from 'next';
import { ClientProvider } from '@/providers/ClientProvider';
import Header from '../components/header';

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
