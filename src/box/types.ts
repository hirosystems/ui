import * as StyledSystem from 'styled-system'
import * as React from 'react'
import {Ref} from 'react'
import { Omit } from '../common-types'

type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'

type FontWeight = 'hairline' | 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'

interface IFontSize {
  fontSize?: StyledSystem.ResponsiveValue<FontSize> | StyledSystem.FontSizeProps['fontSize']
}

interface IFontWeight {
  fontWeight?: StyledSystem.ResponsiveValue<FontWeight> | StyledSystem.FontWeightProps['fontWeight']
}

type LineHeight = 'none' | 'shorter' | 'short' | 'normal' | 'tall' | 'taller'

interface ILineHeight {
  lineHeight?: StyledSystem.ResponsiveValue<LineHeight> | StyledSystem.LineHeightProps['lineHeight']
}

type LetterSpacing = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'

interface ILetterSpacing {
  letterSpacing?: StyledSystem.ResponsiveValue<LetterSpacing> | StyledSystem.LetterSpacingProps['letterSpacing']
}

type TextAlign =
  | 'inherit'
  | 'unset'
  | 'initial'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'justify-all'
  | 'start'
  | 'end'
  | 'match-parent'

interface ITextAlign {
  textAlign?: StyledSystem.ResponsiveValue<TextAlign> | StyledSystem.TextAlignProps['textAlign']
}

type TextStyle =
  | 'display.large'
  | 'display.small'
  | 'body.large.medium'
  | 'body.large'
  | 'body.small.medium'
  | 'body.small'
  | 'caption'
  | 'caption.medium'

interface ITextStyle {
  textStyle?: StyledSystem.ResponsiveValue<TextStyle> | StyledSystem.TextStyleProps['textStyle']
}

interface IAs {
  as?: React.ElementType
}

type TypographyProps = Omit<
  StyledSystem.TypographyProps,
  'fontWeight' | 'lineHeight' | 'fontSize' | 'letterSpacing' | 'textAlign' | 'textStyle'
>

interface IFlexDirectionShorthandProps {
  flexDir?: StyledSystem.FlexDirectionProps['flexDirection']
}

interface IDisplayShorthandProps {
  d?: StyledSystem.DisplayProps['display']
}

type ShorthandProps = IFlexDirectionShorthandProps & IDisplayShorthandProps

export type BoxProps = React.RefAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> &
  StyledSystem.LayoutProps &
  StyledSystem.ColorProps &
  StyledSystem.SpaceProps &
  StyledSystem.BordersProps &
  StyledSystem.BackgroundProps &
  StyledSystem.PositionProps &
  StyledSystem.FlexboxProps &
  StyledSystem.ShadowProps &
  StyledSystem.GridProps &
  StyledSystem.OpacityProps &
  ShorthandProps &
  TypographyProps &
  IFontSize &
  ILetterSpacing &
  ITextAlign &
  ITextStyle &
  IFontWeight &
  ILineHeight &
  IAs

export type BoxComponent = React.FC<BoxProps>
