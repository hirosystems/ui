import React, { forwardRef } from "react";
import { MarginProps } from "styled-system";
import PseudoBox from "../pseudo-box";
import Box from "../box";
import { useButtonStyle } from "./styles";
import Spinner from "../spinner";
import { ButtonProps } from "./types";

export * from './types';

const Button = forwardRef<any, ButtonProps>(
  (
    {
      isDisabled,
      isActive,
      children,
      as: Comp,
      mode = "primary",
      variant = "solid",
      type,
      size = "lg",
      isLoading,
      loadingText,
      ...rest
    },
    ref
  ) => {
    const styles = useButtonStyle({
      variant,
      mode,
      size
    });
    return (
      <PseudoBox
        disabled={isDisabled}
        aria-disabled={isDisabled}
        ref={ref}
        type={type}
        borderRadius="6px"
        fontWeight="medium"
        data-active={isActive ? "true" : undefined}
        as={"button" || Comp}
        {...rest}
        {...styles}
      >
        {isLoading && (
          <Spinner
            position={loadingText ? "relative" : "absolute"}
            mr={loadingText ? 2 : 0}
            color="currentColor"
            size="1em"
          />
        )}
        {isLoading
          ? loadingText || (
              <Box as="span" opacity="0">
                {children}
              </Box>
            )
          : children}
      </PseudoBox>
    );
  }
);

export default Button;
