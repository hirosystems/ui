import { ThemeUICSSObject, ResponsiveStyleValue } from './types';

export interface ColorProps {
  bg?: ThemeUICSSObject['backgroundColor'];
  background?: ThemeUICSSObject['background'];
  color?: ThemeUICSSObject['color'];
  borderColor?: ThemeUICSSObject['borderColor'];
  borderBottomColor?: ThemeUICSSObject['borderBottomColor'];
  borderTopColor?: ThemeUICSSObject['borderTopColor'];
  borderLeftColor?: ThemeUICSSObject['borderLeftColor'];
  borderRightColor?: ThemeUICSSObject['borderRightColor'];
}

export interface SpaceProps {
  margin?: ThemeUICSSObject['margin'];
  m?: ThemeUICSSObject['margin'];
  mt?: ThemeUICSSObject['marginTop'];
  mr?: ThemeUICSSObject['marginRight'];
  mb?: ThemeUICSSObject['marginBottom'];
  ml?: ThemeUICSSObject['marginLeft'];
  mx?: ThemeUICSSObject['marginLeft'];
  marginX?: ThemeUICSSObject['marginLeft'];
  my?: ThemeUICSSObject['marginTop'];
  marginY?: ThemeUICSSObject['marginTop'];
  padding?: ThemeUICSSObject['padding'];
  p?: ThemeUICSSObject['padding'];
  pt?: ThemeUICSSObject['paddingTop'];
  pr?: ThemeUICSSObject['paddingRight'];
  pb?: ThemeUICSSObject['paddingBottom'];
  pl?: ThemeUICSSObject['paddingLeft'];
  px?: ThemeUICSSObject['paddingLeft'];
  paddingX?: ThemeUICSSObject['paddingLeft'];
  py?: ThemeUICSSObject['paddingTop'];
  paddingY?: ThemeUICSSObject['paddingTop'];
  size?: ThemeUICSSObject['width'];
}

export interface TextStyleProp {
  textStyle?: ResponsiveStyleValue<string>;
}
