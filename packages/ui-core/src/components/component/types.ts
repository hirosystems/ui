import * as React from 'react';
import { ColorProps, SpaceProps, ThemeUICSSProperties, TextStyleProp } from '../../css/types';

type Aliases = SpaceProps & ColorProps & TextStyleProp;
type BoxCSSProps = ThemeUICSSProperties & Aliases;

export interface PseudoProps {
  _after?: BoxCSSProps;
  _before?: BoxCSSProps;
  _focus?: BoxCSSProps;
  _hover?: BoxCSSProps;
  _active?: BoxCSSProps;
  _pressed?: BoxCSSProps;
  _selected?: BoxCSSProps;
  _focusWithin?: BoxCSSProps;
  _invalid?: BoxCSSProps;
  _disabled?: BoxCSSProps;
  _grabbed?: BoxCSSProps;
  _expanded?: BoxCSSProps;
  _checked?: BoxCSSProps;
  _mixed?: BoxCSSProps;
  _odd?: BoxCSSProps;
  _even?: BoxCSSProps;
  _visited?: BoxCSSProps;
  _readOnly?: BoxCSSProps;
  _first?: BoxCSSProps;
  _last?: BoxCSSProps;
  _notFirst?: BoxCSSProps;
  _notLast?: BoxCSSProps;
  _placeholder?: BoxCSSProps;
}

export interface SxProp {
  sx?: BoxCSSProps;
  css?: BoxCSSProps;
  style?: React.CSSProperties;
}

export type BoxProps = PseudoProps & BoxCSSProps & SxProp & React.HTMLAttributes<any>;
