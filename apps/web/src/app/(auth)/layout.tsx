import { ReactNode } from 'react';

import { CardContainer } from '@/components/CardContainer';
import { Logo } from '@/components/Logo';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-full items-center justify-center">
      <header className="absolute top-4 flex w-full items-center justify-center sm:top-6">
        <Logo />
      </header>

      <CardContainer className="mx-auto h-fit w-[90vw] text-white sm:w-fit sm:min-w-[400px] sm:max-w-7xl">
        {children}
      </CardContainer>
    </main>
  );
}
