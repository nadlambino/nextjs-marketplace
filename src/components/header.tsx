import Link from 'next/link';
import './../assets/styles/headers.scss';

export default function Header() {
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
          <Link href="/">Products</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}
