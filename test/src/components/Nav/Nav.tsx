import Link from 'next/link';
import { useRouter } from 'next/router';
import navStyle from '../../styles/Nav.module.css';

export default function Nav() {
  const router = useRouter();

  return (
    <nav className={navStyle.nav}>
      <ul>
        <li className={router.asPath == '/' ? `${navStyle.active}` : ''}>
          <Link href="/">Home</Link>
        </li>
        <li className={router.asPath == '/users' ? `${navStyle.active}` : ''}>
          <Link href="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
}
