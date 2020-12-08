import { ButtonSizes, ButtonVariants } from '../button';
import { BoxProps } from '../box';

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
