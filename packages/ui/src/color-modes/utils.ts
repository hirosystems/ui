import { Theme } from '@stacks/ui-core';
import { Color, ColorModeString, ColorModeTypes, ColorsStringLiteral } from '@stacks/ui-theme';
import { color } from '@stacks/ui-utils';
import { themeGet } from '@styled-system/theme-get';

export { color };
export const THEME_STORAGE_KEY = 'theme';

const colors = {
  light: {
    [Color.Accent]: '#5546FF',
    [Color.Brand]: '#5546FF',
    [Color.Bg]: 'white',
    [Color.Bg2]: 'white',
    [Color.Bg3]: 'white',
    [Color.Bg4]: '#F7F7FA',
    [Color.BgAlt]: '#F7F7FA',
    [Color.BgLight]: 'white',
    [Color.Invert]: '#040404',
    [Color.TextHover]: '#5546FF',
    [Color.TextTitle]: '#141416',
    [Color.TextCaption]: '#747478',
    [Color.TextBody]: '#424248',
    [Color.Icon]: '#9C9CA2',
    [Color.InputPlaceholder]: '#747478',
    [Color.Border]: '#F0F0F2',
    [Color.FeedbackAlert]: '#FE9000',
    [Color.FeedbackError]: '#CF0000',
    [Color.FeedbackSuccess]: '#00A200',
  },
  dark: {
    [Color.Accent]: '#7F80FF',
    [Color.Brand]: '#7F80FF',
    [Color.Bg]: '#040404',
    [Color.Bg2]: '#0A0A0A',
    [Color.Bg3]: '#141416',
    [Color.Bg4]: '#1E1E20',
    [Color.BgAlt]: '#1E1E20',
    [Color.BgLight]: '#1E1E20',
    [Color.Invert]: '#ffffff',
    [Color.TextHover]: '#7F80FF',
    [Color.TextTitle]: '#ffffff',
    [Color.TextCaption]: '#9C9CA2',
    [Color.TextBody]: '#F7F7FA',
    [Color.Icon]: '#9C9CA2',
    [Color.InputPlaceholder]: '#9C9CA2',
    [Color.Border]: '#202020',
    [Color.FeedbackAlert]: '#FFB44D',
    [Color.FeedbackError]: '#F34D4D',
    [Color.FeedbackSuccess]: '#49CE49',
  },
};

export const colorGet = (path: string, fallback?: string): ((props: any) => any) =>
  themeGet('colors.' + path, fallback);

const colorModeStyles = (props: { theme: Theme; colorMode: 'light' | 'dark' }): ColorModeTypes =>
  colors[props.colorMode];

const colorMap = (props: { theme: Theme; colorMode: 'light' | 'dark' }): ColorsStringLiteral[] =>
  Object.keys(colors[props.colorMode]) as ColorsStringLiteral[];

export const generateCssVariables =
  (mode: 'light' | 'dark') =>
  ({ colorMode = mode, ...rest }: any) =>
    colorMap({ colorMode, ...rest }).map((key: ColorsStringLiteral) => {
      return `--colors-${key}: ${colorModeStyles({ colorMode, ...rest })[key]};`;
    });

export const getInvertedValue = (string: ColorModeString) =>
  string === 'light' ? 'dark' : 'light';

export const setDocumentStyles = (value: ColorModeString) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add(value);
    document.documentElement.classList.remove(getInvertedValue(value));
    document.documentElement.style.background = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--colors-bg');
  }
};

export const getPersistedColorMode = (): ColorModeString | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(THEME_STORAGE_KEY) as ColorModeString;
  }
  return null;
};

export const initColorMode = (
  setter: (mode: ColorModeString) => void,
  initialValue?: ColorModeString
) => {
  if (typeof window !== 'undefined') {
    let value = initialValue;
    const savedValue = getPersistedColorMode();
    if (savedValue != null) {
      value = savedValue;
      setter(value);
    }
    value && setDocumentStyles(value);
  }
};

export const handleSetColorMode = (colorMode: ColorModeString) => {
  localStorage.setItem(THEME_STORAGE_KEY, colorMode);
  setDocumentStyles(colorMode as ColorModeString);
};

export const documentColorLoaderSting = `(function() {
const getSystemMedia = () => {
  if (typeof window !== 'undefined') {
    if (!('matchMedia' in window)) {
      return 'light';
    }
    const dark = '(prefers-color-scheme: dark)';

    if (window.matchMedia(dark).matches) {
      return 'dark';
    }
    return 'light';
  }
};

const setDocumentStyles = (value) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add(value);
    document.documentElement.classList.remove(value === 'light' ? 'dark' : 'light');
    document.documentElement.style.background = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--colors-bg');
  }
};

try {
    const mode = localStorage.getItem('${THEME_STORAGE_KEY}');
    setDocumentStyles(mode || getSystemMedia());
} catch (e) {}
})()`;
