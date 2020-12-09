import * as React from 'react';
import { ThemeUICSSProperties } from '../../css/types';
import { ColorProps, SpaceProps, TextStyleProp } from '../../css/custom-types';

type Aliases = SpaceProps & ColorProps & TextStyleProp;
type BoxCSSProps = ThemeUICSSProperties & Aliases;

export interface PseudoProps extends BoxCSSProps {
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
  sx?: BoxCSSProps;
  css?: BoxCSSProps;
  style?: React.CSSProperties;
}

export type BoxProps = PseudoProps & React.HTMLAttributes<any>;
