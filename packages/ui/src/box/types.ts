import { BoxProps as SystemProps, ResponsiveStyleValue } from '@stacks/ui-core';
import { Colors, Spacing, TextStyles } from '@stacks/ui-theme';

export interface ColorProps {
  bg?: ResponsiveStyleValue<Colors> & SystemProps['bg'];
  background?: ResponsiveStyleValue<Colors> & SystemProps['background'];
  color?: ResponsiveStyleValue<Colors> & SystemProps['color'];
  borderColor?: ResponsiveStyleValue<Colors> & SystemProps['borderColor'];
  borderBottomColor?: ResponsiveStyleValue<Colors> & SystemProps['borderBottomColor'];
  borderTopColor?: ResponsiveStyleValue<Colors> & SystemProps['borderTopColor'];
  borderLeftColor?: ResponsiveStyleValue<Colors> & SystemProps['borderLeftColor'];
  borderRightColor?: ResponsiveStyleValue<Colors> & SystemProps['borderRightColor'];
}

export interface SpaceProps {
  margin?: ResponsiveStyleValue<Spacing> & SystemProps['margin'];
  m?: ResponsiveStyleValue<Spacing> & SystemProps['m'];
  mt?: ResponsiveStyleValue<Spacing> & SystemProps['mt'];
  mr?: ResponsiveStyleValue<Spacing> & SystemProps['mr'];
  mb?: ResponsiveStyleValue<Spacing> & SystemProps['mb'];
  ml?: ResponsiveStyleValue<Spacing> & SystemProps['ml'];
  mx?: ResponsiveStyleValue<Spacing> & SystemProps['mx'];
  marginX?: ResponsiveStyleValue<Spacing> & SystemProps['marginX'];
  my?: ResponsiveStyleValue<Spacing> & SystemProps['my'];
  marginY?: ResponsiveStyleValue<Spacing> & SystemProps['marginY'];
  padding?: ResponsiveStyleValue<Spacing> & SystemProps['padding'];
  p?: ResponsiveStyleValue<Spacing> & SystemProps['p'];
  pt?: ResponsiveStyleValue<Spacing> & SystemProps['pt'];
  pr?: ResponsiveStyleValue<Spacing> & SystemProps['pr'];
  pb?: ResponsiveStyleValue<Spacing> & SystemProps['pb'];
  pl?: ResponsiveStyleValue<Spacing> & SystemProps['pl'];
  px?: ResponsiveStyleValue<Spacing> & SystemProps['px'];
  paddingX?: ResponsiveStyleValue<Spacing> & SystemProps['paddingX'];
  py?: ResponsiveStyleValue<Spacing> & SystemProps['py'];
  paddingY?: ResponsiveStyleValue<Spacing> & SystemProps['paddingY'];
  size?: ResponsiveStyleValue<Spacing> & SystemProps['size'];
}
export interface TextStyleProp {
  textStyle?: ResponsiveStyleValue<TextStyles> & SystemProps['textStyle'];
}
type Custom = TextStyleProp & ColorProps & SpaceProps;

export interface Base extends Omit<SystemProps, keyof Custom>, Custom {}
export interface BoxProps extends Omit<Base, 'ref'> {}
