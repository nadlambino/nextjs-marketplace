import Link from 'next/link';
import './../assets/styles/headers.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import HeaderMenu from './HeaderItems/HeaderMenu';
import { AiOutlineShoppingCart, AiOutlineKey } from 'react-icons/ai';

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header className="bg-white shadow-md z-10">
			<Link
				href="/"
				className="link-icon"
			>
				<span className="market">Market</span>
				<span className="place">place</span>
			</Link>
			<ul>
				<li>
					<AiOutlineShoppingCart size={20} />
					<Link href="/cart">Cart</Link>
				</li>
				<li>
					{session && session.user ? (
						<HeaderMenu />
					) : (
						<>
							<AiOutlineKey size={20} />
							<Link href="/auth/signin">Sign In</Link>
						</>
					)}
				</li>
			</ul>
		</header>
	);
}
