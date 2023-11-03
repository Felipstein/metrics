import tinycolor from 'tinycolor2';

import { isContrastAdequate } from './isContrastAdequate';

import { Theme, ThemeColorVariants } from '@/types/Theme';

export function getColorVariants(theme: Theme): ThemeColorVariants {
  const borderColor = tinycolor(theme.color).lighten(24).toString();

  const lightTextColor = tinycolor(theme.lighter).lighten(60).toString();
  const darkTextColor = tinycolor(theme.darker).darken(0).toString();

  const contrastAdequate = isContrastAdequate(theme.color, lightTextColor);

  const textColor = contrastAdequate ? lightTextColor : darkTextColor;
  const mutedTextColor = contrastAdequate
    ? tinycolor(textColor).darken(14).toString()
    : tinycolor(textColor).lighten(10).toString();

  return {
    borderColor,
    lightTextColor,
    darkTextColor,
    contrastAdequate,
    textColor,
    mutedTextColor,
  };
}
