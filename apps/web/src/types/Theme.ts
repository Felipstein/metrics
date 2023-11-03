export interface Theme {
  color: string;
  lighter: string;
  darker: string;
}

export interface ThemeColorVariants {
  borderColor: string;
  lightTextColor: string;
  darkTextColor: string;
  contrastAdequate: boolean;
  textColor: string;
  mutedTextColor: string;
}
