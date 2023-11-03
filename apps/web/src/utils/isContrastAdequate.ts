import tinycolor from 'tinycolor2';

export function isContrastAdequate(
  color1: tinycolor.ColorInput,
  color2: tinycolor.ColorInput,
  customContrastRatioCheck = 2.5,
) {
  const contrastRatio = tinycolor.readability(color1, color2);

  return contrastRatio >= customContrastRatioCheck;
}
