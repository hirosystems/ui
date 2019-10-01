import React from "react";
import { forwardRef } from "react";
import { useFormControl } from "../form-control";
import PseudoBox from "../pseudo-box";

import useInputStyle from "./styles";

const Input = forwardRef((props, ref) => {
  const {
    size,
    variant,
    as,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    isReadOnly,
    isFullWidth,
    isDisabled,
    isInvalid,
    isRequired,
    focusBorderColor,
    ...rest
  } = props;

  const inputStyleProps = useInputStyle(props);
  const formControl = useFormControl(props);

  return (
    <PseudoBox
      ref={ref}
      as={as}
      readOnly={formControl.isReadOnly}
      aria-readonly={isReadOnly}
      disabled={formControl.isDisabled}
      aria-label={ariaLabel}
      aria-invalid={formControl.isInvalid}
      required={formControl.isRequired}
      aria-required={formControl.isRequired}
      aria-disabled={formControl.isDisabled}
      aria-describedby={ariaDescribedby}
      textStyle='body.small'
      {...inputStyleProps}
      {...rest}
    />
  );
});

Input.defaultProps = {
  as: "input",
  isFullWidth: true,
  focusBorderColor: "blue.300"
};

export default Input;
