import { Spacing, Colors } from './literal-types';
import { BoxProps, ResponsiveStyleValue } from '@stacks/ui-core';

export const space = (
  spacing: ResponsiveStyleValue<Spacing> & BoxProps['margin']
): ResponsiveStyleValue<Spacing> & BoxProps['margin'] => spacing;

export const themeColor = (
  color: ResponsiveStyleValue<Colors> & BoxProps['color']
): ResponsiveStyleValue<Colors> & BoxProps['color'] => color;
