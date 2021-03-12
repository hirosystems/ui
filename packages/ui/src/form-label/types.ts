import type { BoxProps } from '../box/types';

interface LabelPropsBase {
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export type FormLabelProps = LabelPropsBase & BoxProps;
