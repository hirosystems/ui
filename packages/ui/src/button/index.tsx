import * as React from 'react';
import { Box, BoxProps } from '../box';
import { transition } from '@stacks/ui-theme';
import { color } from '@stacks/ui-utils';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';
import { usePress } from 'react-aria';
import { Grid } from '../grid';
import { Spinner } from '../spinner';

export const blue = (alpha = 1, darker = false) =>
  `rgba(${darker ? '70,55,255' : '85,70,255'},${alpha})`;
export const focusBlue = (alpha = 1) => `rgba(170, 179, 255,${alpha})`;

export interface ButtonProps extends Omit<BoxProps, 'size'> {
  variant?: 'link' | 'solid';
  mode?: 'primary' | 'secondary' | 'tertiary';
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  isLoading?: boolean;
  type?: 'button' | 'reset' | 'submit';
  size: 'sm' | 'md' | 'lg';
}

const modeStyles = (mode: ButtonProps['mode']) => {
  switch (mode) {
    case 'secondary':
      return ({
        isPressed,
        _hover,
      }: {
        isPressed?: boolean;
        isDisabled?: boolean;
        isLoading?: boolean;
        _hover?: any;
      }) => ({
        bg: blue(0.2, isPressed),
        border: '1px solid',
        borderRadius: '6px',
        color: color('invert'),
        borderColor: blue(0),
        _hover: { bg: blue(0.25, true), cursor: 'pointer', ..._hover },
        _focus: {
          boxShadow: `0 0 0 3px ${focusBlue(0.5)}`,
        },
      });
    case 'tertiary':
      return ({
        isPressed,
        _hover,
      }: {
        isPressed?: boolean;
        isDisabled?: boolean;
        isLoading?: boolean;
        _hover?: any;
      }) => ({
        border: '1px solid',
        borderRadius: '6px',
        color: color('invert'),
        bg: color(isPressed ? 'bg' : 'bg-2'),
        borderColor: color('border'),
        boxShadow: 'mid',
        _hover: { bg: color('bg-3'), boxShadow: 'high', cursor: 'pointer', ..._hover },
        _focus: {
          boxShadow: `0 0 0 3px ${focusBlue(0.5)}`,
        },
      });
    default:
      return ({
        isPressed,
        _hover,
      }: {
        isPressed?: boolean;
        isDisabled?: boolean;
        isLoading?: boolean;
        _hover?: any;
      }) => ({
        border: '1px solid',
        borderRadius: '6px',
        bg: blue(1, isPressed),
        color: 'white',
        borderColor: blue(0),
        _hover: { bg: blue(1, true), cursor: 'pointer', ..._hover },
        _focus: {
          boxShadow: `0 0 0 3px ${focusBlue(0.75)}`,
        },
      });
  }
};

const sizeProps = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': {
      return {
        px: 'tight',
        py: 'extra-tight',
        fontSize: '12px,',
      };
    }
    case 'md': {
      return {
        px: 'base',
        py: 'base-tight',
        fontSize: '14px',
      };
    }
    case 'lg': {
      return {
        px: 'loose',
        py: 'base-loose',
        fontSize: '14px',
      };
    }
  }
};

export const Button: ForwardRefExoticComponentWithAs<ButtonProps, 'button'> = forwardRefWithAs<
  ButtonProps,
  'button'
>((props, ref) => {
  const {
    children,
    as = 'button',
    onClick,
    mode = 'primary',
    variant,
    isLoading,
    isDisabled,
    size = 'md',
    _hover,
    ...rest
  } = props;

  const { pressProps, isPressed } = usePress({
    ref,
    onPress: e => {
      onClick?.(e as any);
    },
  });
  const { onKeyUp, onKeyDown } = pressProps;

  const sizeStyles = variant === 'link' ? {} : sizeProps(size);
  const modeStyle = modeStyles(mode);

  return (
    <Box
      as={as}
      outline="none"
      fontWeight="500"
      transition={transition}
      userSelect="none"
      ref={ref}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      position="relative"
      pointerEvents={isLoading || isDisabled ? 'none' : 'unset'}
      onClick={e => {
        onClick?.(e);
      }}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      opacity={isDisabled ? 0.4 : 1}
      {...rest}
      {...modeStyle({ isPressed, _hover, isDisabled })}
      {...sizeStyles}
    >
      <Grid
        transition={transition}
        opacity={isLoading ? 1 : 0}
        zIndex={2}
        position="absolute"
        top={0}
        left={0}
        size="100%"
        placeItems="center"
        {...modeStyle({ isPressed: false })}
      >
        <Spinner size="sm" color={'white'} />
      </Grid>
      {children}
    </Box>
  );
});
