import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { Providers } from './providers';

import type { Metadata } from 'next';

import { Background } from '@/components/layout/Background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Metrics',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Background />

          <div id="app-root" className="relative text-white">
            <Providers>
              <Toaster richColors />

              {children}

              <ReactQueryDevtools />
            </Providers>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
