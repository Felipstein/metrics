import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { Logo } from '@/components/Logo';

export function Header() {
  return (
    <header className="mb-2 flex items-center justify-between border-b border-b-slate-100/20 px-4 py-6 backdrop-blur-md">
      <Link href="/">
        <Logo />
      </Link>

      <UserButton afterSignOutUrl="/login" />
    </header>
  );
}
