import React, { forwardRef } from "react";
import styled, { keyframes } from "styled-components";
import Box from "../box";
import VisuallyHidden from "../visually-hidden";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledBox = styled(Box)`
  animation: ${spin} ${props => props.speed} linear infinite;
`;

const sizes = {
  xs: "0.75rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem"
};

const Spinner = forwardRef(
  (
    {
      size = "md",
      label = "Loading...",
      thickness = "2px",
      speed = "0.85s",
      color,
      emptyColor = "transparent",
      ...props
    },
    ref
  ) => {
    const _size = sizes[size] || size;

    return (
      <StyledBox
        ref={ref}
        display="inline-block"
        borderWidth={thickness}
        borderColor="currentColor"
        borderBottomColor={emptyColor}
        borderLeftColor={emptyColor}
        rounded="full"
        speed={speed}
        color={color}
        size={_size}
        {...props}
      >
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </StyledBox>
    );
  }
);

export default Spinner;
