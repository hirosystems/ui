import type { ButtonSizes, ButtonVariants } from '../button/types';
import type { BoxProps } from '../box/types';

export interface ButtonGroupProps extends Omit<BoxProps, 'size'> {
  size?: ButtonSizes;
  variant?: ButtonVariants;
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean;
  spacing?: BoxProps['margin'];
}
