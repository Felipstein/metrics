import tinycolor from 'tinycolor2';

export function adjustColor(hexColor: string) {
  const color = tinycolor(hexColor);
  const hsl = color.toHsl();

  let lighter = tinycolor({
    h: hsl.h,
    s: Math.min(hsl.s + 0.23, 1),
    l: Math.min(hsl.l + 0.33, 1),
  }).toHex();

  let darker = tinycolor({
    h: hsl.h,
    s: Math.max(hsl.s - 0.13, 0),
    l: Math.max(hsl.l - 0.27, 0),
  }).toHex();

  lighter = `#${lighter}`;
  darker = `#${darker}`;

  return { lighter, darker };
}
