import React from 'react';
import { Box } from '../box';
import { InputProps } from './types';

import useInputStyle from './styles';

export * from './types';

export const Input: React.FC<InputProps> = React.forwardRef((props, ref) => {
  const {
    as = 'input',
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    isReadOnly,
    isDisabled,
    isInvalid,
    isRequired,
    style = {},
    ...rest
  } = props;

  const inputStyleProps = useInputStyle(props);

  return (
    <Box
      ref={ref}
      as={as}
      _readOnly={isReadOnly}
      aria-readonly={isReadOnly}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-invalid={isInvalid}
      required={isRequired}
      aria-required={isRequired}
      aria-disabled={isDisabled}
      aria-describedby={ariaDescribedby}
      textStyle="body.small"
      style={{ WebkitAppearance: 'none', ...style }}
      {...(inputStyleProps as any)}
      width="100%"
      {...rest}
    />
  );
});

Input.displayName = 'Input';
