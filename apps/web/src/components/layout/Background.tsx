'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useThemeStore } from '@/stores/ThemeStore';

export function Background() {
  const pathname = usePathname();

  const { lighter, color, darker } = useThemeStore((s) => s.theme);
  const resetTheme = useThemeStore((s) => s.resetTheme);

  useEffect(() => {
    if (!pathname.includes('/workspaces')) {
      resetTheme();
    }
  }, [pathname, resetTheme]);

  return (
    <div className={`absolute inset-0 bg-[${color}]`} style={{ color }}>
      <div
        className="h-full w-full"
        style={{ background: `linear-gradient(to bottom left, ${lighter}, ${color}, ${darker})` }}
      />
    </div>
  );
}
