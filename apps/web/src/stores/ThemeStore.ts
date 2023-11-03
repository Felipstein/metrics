import { create } from 'zustand';

import { defaultTheme } from '@/constants/defaultTheme';
import { Theme, ThemeColorVariants } from '@/types/Theme';
import { adjustColor } from '@/utils/adjustColor';
import { getColorVariants as _getColorVariants } from '@/utils/getPalleteOfColor';

export interface ThemeStore {
  theme: Theme;
  getColorVariants: () => ThemeColorVariants;
  setThemeColor: (color: string) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: defaultTheme,

  getColorVariants: () => _getColorVariants(get().theme),

  setThemeColor: (color) =>
    set(() => {
      const { lighter, darker } = adjustColor(color);

      return {
        theme: {
          lighter,
          color,
          darker,
        },
      };
    }),

  resetTheme: () => set(() => ({ theme: defaultTheme })),
}));
