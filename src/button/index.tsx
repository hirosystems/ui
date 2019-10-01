import React, { forwardRef } from "react";
import { MarginProps } from "styled-system";
import PseudoBox from "../pseudo-box";
import Box from "../box";
import { useButtonStyle } from "./styles";
import Spinner from "../spinner";

/**
 * The size of the button
 */
type ButtonSizes = "sm" | "md" | "lg"
/**
 * The color scheme of the button variant. Use the color keys passed in `theme.colors`.
 */
type ButtonColorVariants = "green" | "purple" | "orange"
/**
 * The variant of the button style to use.
 */
type ButtonVariants = "outline" | "unstyled" | "link" | "solid"
/**
 * The mode of the button style to use.
 */
type ButtonModes = "primary" | "secondary"

interface ButtonProps {
  size?: ButtonSizes;
  isLoading?: boolean;
  variantColor?: ButtonColorVariants;
  variant?: ButtonVariants;
  mode?: ButtonModes;
  /**
   * If `true`, the button will be styled in it's active state.
   */
  isActive?: boolean;
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean;
  /**
   * The html button type to use.
   */
  type?: "button" | "reset" | "submit";
  /**
   * The content of the button.
   */
  children: React.ReactNode;
  /**
   * If added, the button will show an icon before the button's label.
   * Use the icon key in `theme.iconPath`
   */
  leftIcon?: string;
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon?: string;
  /**
   * The space between the button icon and label.
   * Use the styled-system tokens or add custom values as a string
   */
  iconSpacing?: MarginProps["margin"];
}

const Button: React.FC<ButtonProps> = forwardRef(
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
