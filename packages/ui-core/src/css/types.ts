/**
 * Theme UI types
 * Much of this has been taken from theme-ui and updated to latest typings & modified to fit our needs
 * Theme UI is built with gatsby in mind, and as such contains many thing we will never use.
 */
import * as CSS from 'csstype';

/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 */
export type ResponsiveStyleValue<T> = T | Array<T | null | undefined | (string | {})>;

/**
 * All non-vendor-prefixed CSS properties. (Allow `number` to support CSS-in-JS libs,
 * since they are converted to pixels)
 */
export interface CSSProperties
  extends CSS.StandardProperties<number | string>,
    CSS.SvgProperties<number | string>,
    CSS.VendorProperties<number | string> {}

/**
 * Map of all CSS pseudo selectors (`:hover`, `:focus`, ...)
 */
export type CSSPseudoSelectorProps = { [K in CSS.Pseudos]?: ThemeUIStyleObject };

/**
 * CSS as POJO that is compatible with CSS-in-JS libraries.
 * Copied directly from [emotion](https://github.com/emotion-js/emotion/blob/ca3ad1c1dcabf78a95b55cc2dc94cad1998a3196/packages/serialize/types/index.d.ts#L45) types
 */
export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudosForCSSObject,
    CSSOthersObjectForCSSObject {}

type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K];
};

type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject };

type CSSInterpolation = undefined | number | string | CSSObject;

interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation;
}

interface OverwriteCSSProperties {
  boxShadow?: CSS.Property.BoxShadow | number;
  fontWeight?: CSS.Property.FontWeight | string;
  borderTopStyle?: CSS.Property.BorderTopStyle | string;
  borderTopWidth?: CSS.Property.BorderTopWidth<never> | string;
  borderBottomStyle?: CSS.Property.BorderBottomStyle | string;
  borderRightStyle?: CSS.Property.BorderRightStyle | string;
  borderLeftStyle?: CSS.Property.BorderLeftStyle | string;
  borderRadius?: CSS.Property.BorderRadius<string | number>;
  zIndex?: CSS.Property.ZIndex | string;
}

/**
 * Map of all available CSS properties (including aliases and overwrites)
 * and their raw value.
 */
export interface ThemeUIExtendedCSSProperties
  extends Omit<CSSProperties, keyof OverwriteCSSProperties>,
    OverwriteCSSProperties {}

export type StylePropertyValue<T> =
  | ResponsiveStyleValue<Exclude<T, undefined>>
  | ((theme: Theme) => ResponsiveStyleValue<Exclude<T, undefined>> | undefined)
  | ThemeUIStyleObject;

export type ThemeUICSSProperties = {
  [K in keyof ThemeUIExtendedCSSProperties]: StylePropertyValue<ThemeUIExtendedCSSProperties[K]>;
};

export interface VariantProperty {
  /**
   * **`Variants`** can be useful for applying complex styles to a component based on a single prop.
   *
   * @example
   * const theme = {
   *   buttons: {
   *     primary: {
   *       p: 3,
   *       fontWeight: 'bold',
   *       color: 'white',
   *       bg: 'primary',
   *       borderRadius: 2,
   *     },
   *   },
   * }
   * const result = css({
   *   variant: 'buttons.primary',
   * })(theme)
   *
   * @see https://styled-system.com/variants
   */
  variant?: string;
}

export interface ThemeDerivedStyles {
  (theme: Theme): ThemeUICSSObject;
}

export interface ThemeDerivedStylesGeneric<T> {
  (theme: Theme): T;
}

export interface Label {
  label?: string;
}

export interface CSSOthersObject {
  // we want to match CSS selectors
  // but index signature needs to be a supertype
  // so as a side-effect we allow unknown CSS properties (Emotion does too)
  [k: string]: StylePropertyValue<string | number> | undefined | null;
}

export interface ThemeUICSSObject
  extends ThemeUICSSProperties,
    CSSPseudoSelectorProps,
    CSSOthersObject,
    VariantProperty,
    Label {}

/**
 * The `ThemeUIStyleObject` extends [style props](https://emotion.sh/docs/object-styles)
 * such that properties that are part of the `Theme` will be transformed to
 * their corresponding values. Other valid CSS properties are also allowed.
 */
export type ThemeUIStyleObject = ThemeUICSSObject | ThemeDerivedStyles;

/**
 * An array or object (possibly nested) of related CSS properties
 */
export type Scale<T> = T[] | { [K: string]: T | Scale<T>; [I: number]: T };

export type TLengthStyledSystem = string | 0 | number;

export interface Theme {
  breakpoints?: string[];
  mediaQueries?: { [size: string]: string };
  space?: Scale<CSS.Property.Margin<number | string>>;
  fontSizes?: Scale<CSS.Property.FontSize<number>>;
  fonts?: Scale<CSS.Property.FontFamily>;
  fontWeights?: Scale<CSS.Property.FontFamily>;
  lineHeights?: Scale<CSS.Property.LineHeight<TLengthStyledSystem>>;
  letterSpacings?: Scale<CSS.Property.LetterSpacing<TLengthStyledSystem>>;
  sizes?: Scale<CSS.Property.Height<{}> | CSS.Property.Width<{}>>;
  borders?: Scale<CSS.Property.Border<{}>>;
  borderStyles?: Scale<CSS.Property.Border<{}>>;
  borderWidths?: Scale<CSS.Property.BorderWidth<TLengthStyledSystem>>;
  radii?: Scale<CSS.Property.BorderRadius<TLengthStyledSystem>>;
  shadows?: Scale<CSS.Property.BoxShadow>;
  zIndices?: Scale<CSS.Property.ZIndex>;
  colorStyles?: Scale<ThemeUICSSProperties>;
  textStyles?: Scale<ThemeUICSSProperties>;
  opacities?: Scale<CSS.Property.Opacity>;

  /**
   * Provide a value here to enable color modes
   */
  initialColorModeName?: string;

  /**
   * Adds styles defined in theme.styles.root to the <body> element along with color and background-color
   */
  useBodyStyles?: boolean;

  /**
   * Initializes the color mode based on the prefers-color-scheme media query
   */
  useColorSchemeMediaQuery?: boolean;

  /**
   * Adds a global box-sizing: border-box style
   */
  useBorderBox?: boolean;

  /**
   * If false, does not save color mode as a localStorage value.
   */
  useLocalStorage?: boolean;

  /**
   * Button variants can be defined in the `theme.buttons` object. The `Button`
   * component uses `theme.buttons.primary` as its default variant style.
   */
  buttons?: Record<string, ThemeUIStyleObject>;

  /**
   * Text style variants can be defined in the `theme.text` object. The `Text`
   * component uses `theme.text.default` as its default variant style.
   */
  text?: Record<string, ThemeUIStyleObject>;
}
