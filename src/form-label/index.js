import React, { forwardRef } from "react";
import Box from "../box";
import Text from "../text";
import { useFormControl } from "../form-control";

export const RequiredIndicator = props => (
  <Box
    as="span"
    ml={1}
    color="red"
    aria-hidden="true"
    children="*"
    {...props}
  />
);

export const FormLabel = forwardRef(({ children, ...props }, ref) => {
  const formControl = useFormControl(props);
  return (
    <Text
      ref={ref}
      pb="4px"
      opacity={formControl.isDisabled ? "0.4" : "1"}
      textAlign="left"
      verticalAlign="middle"
      display="inline-block"
      as="label"
      textStyle="body.small.medium"
      {...props}
    >
      {children}
      {formControl.isRequired && <RequiredIndicator />}
    </Text>
  );
});

export default FormLabel;
