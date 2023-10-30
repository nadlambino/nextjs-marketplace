import './../assets/styles/globals.scss';
import type { Metadata } from 'next';
import { ClientProvider } from '@/providers/ClientProvider';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
					<ToastContainer
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnHover
						theme="colored"
						/>
					<Header />
					<main>{children}</main>
				</ClientProvider>
			</body>
		</html>
	);
}
