import { Spacing, Colors } from './literal-types';
import { ResponsiveStyleValue } from '@stacks/ui-core';

export const space = (spacing: ResponsiveStyleValue<Spacing>): ResponsiveStyleValue<Spacing> =>
  spacing;

export const themeColor = (color: ResponsiveStyleValue<Colors>): ResponsiveStyleValue<Colors> =>
  color;
