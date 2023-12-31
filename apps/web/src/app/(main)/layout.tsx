import { ReactNode } from 'react';

import { Header } from './components/Header';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-full flex-col">
      <Header />

      {children}
    </main>
  );
}
