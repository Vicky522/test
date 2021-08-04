import React from 'react';
import Link from 'next/link';
import navStyle from '../../styles/Nav.module.css';

export default function Nav() {
  return (
    <nav className={navStyle.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
}
