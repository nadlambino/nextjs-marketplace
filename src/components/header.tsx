import Link from 'next/link';
import './../assets/styles/headers.scss';
import { getServerSession } from 'next-auth';

export default async function Header() {
  const session = await getServerSession();

  return (
    <header>
      <Link
        href="/"
        className="link-icon"
      >
        <span className="market">Market</span>
        <span className="place">place</span>
      </Link>
      <ul>
        <li>
          <Link href="/">Shop</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
        <li>
          {session ? (
            <Link href="/api/auth/signout">Sign Out</Link>
          ) : (
            <Link href="/api/auth/signin">Sign In</Link>
          )}
        </li>
      </ul>
    </header>
  );
}
