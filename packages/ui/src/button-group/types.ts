import React from 'react';
import { ButtonSizes, ButtonVariants, ButtonColorVariants } from '../button';
import { BoxProps } from '../box';

export interface ButtonGroupBase {
  size?: ButtonSizes;
  color?: string;
  variant?: ButtonVariants;
  variantColor?: ButtonColorVariants;
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean;
  spacing?: BoxProps['margin'];
  children?: React.ReactNode;
}

export type ButtonGroupProps = ButtonGroupBase & BoxProps;
