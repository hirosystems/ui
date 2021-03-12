import { BoxProps } from '../box/types';

export type ButtonSizes = 'sm' | 'md' | 'lg';
export type ButtonVariants = 'link' | 'solid';
export type ButtonModes = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends Omit<BoxProps, 'size'> {
  variant?: ButtonVariants;
  mode?: ButtonModes;
  isDisabled?: boolean;
  loadingText?: string;
  isLoading?: boolean;
  size?: ButtonSizes;
}
