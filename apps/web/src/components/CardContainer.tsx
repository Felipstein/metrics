'use client';

import React, { ComponentProps, ReactNode } from 'react';
import tinycolor from 'tinycolor2';

import { useThemeStore } from '@/stores/ThemeStore';
import { Theme } from '@/types/Theme';
import { cn } from '@/utils/cn';
import { getColorVariants } from '@/utils/getPalleteOfColor';

type CardContainerFunction = (props: {
  lightTextColor: string;
  darkTextColor: string;
  contrastAdequate: boolean;
  textColor: string;
  mutedTextColor: string;
}) => ReactNode;

export interface CardContainerProps extends Omit<ComponentProps<'div'>, 'children'> {
  theme?: Theme;
  noPadding?: boolean;
  children?: ReactNode | CardContainerFunction;
}

export function CardContainer({
  theme: customTheme,
  noPadding = false,
  className,
  style,
  children,
  ...props
}: CardContainerProps) {
  const themeOfStore = useThemeStore((s) => s.theme);

  const theme = customTheme || themeOfStore;

  const color = tinycolor(theme.color).lighten(60).setAlpha(0.12);

  const { lightTextColor, darkTextColor, contrastAdequate, textColor, mutedTextColor, borderColor } =
    getColorVariants(theme);

  return (
    <div
      className={cn(
        'h-full w-full rounded-md border-2 text-zinc-900 shadow-md backdrop-blur-sm',
        !noPadding && 'px-12 py-8',
        className,
      )}
      style={{
        background: `linear-gradient(to top left, ${color}, #ffffff35)`,
        borderColor,
        color: textColor,
        ...style,
      }}
      {...props}
    >
      {typeof children === 'function'
        ? children({ lightTextColor, darkTextColor, contrastAdequate, textColor, mutedTextColor })
        : children}
    </div>
  );
}
