import { BoxProps } from '../box';

interface LabelPropsBase {
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export type FormLabelProps = LabelPropsBase & BoxProps;
