import { light, dark, foundation } from './system/colors';

export type LightTheme = typeof light;
export type DarkTheme = typeof dark;
export type FoundationColors = keyof typeof foundation;

export type Theme = Record<keyof DarkTheme, FoundationColors>;

function color(name: keyof LightTheme) {
  return `var(--colors-${name})`;
}
