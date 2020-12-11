import * as React from 'react';
import { Box, BoxProps } from '../box';
import { Flex } from '../flex';
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
  isDisabled?: boolean;
  loadingText?: string;
  isLoading?: boolean;
  type?: 'button' | 'reset' | 'submit';
  size?: 'sm' | 'md' | 'lg';
}

const modeStyles = (mode: ButtonProps['mode'], variant: ButtonProps['variant'] = 'solid') => {
  if (variant === 'solid') {
    switch (mode) {
      case 'secondary':
        return ({
          isPressed,
          isDisabled,
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
          _hover: {
            bg: blue(0.25, true),
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            ..._hover,
          },
          _focus: {
            boxShadow: `0 0 0 3px ${focusBlue(0.5)}`,
          },
        });
      case 'tertiary':
        return ({
          isPressed,
          isDisabled,
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
          _hover: {
            bg: color('bg-3'),
            boxShadow: 'high',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            ..._hover,
          },
          _focus: {
            boxShadow: `0 0 0 3px ${focusBlue(0.5)}`,
          },
        });
      default:
        return ({
          isPressed,
          isDisabled,
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
          _hover: { bg: blue(1, true), cursor: isDisabled ? 'not-allowed' : 'pointer', ..._hover },
          _focus: {
            boxShadow: `0 0 0 3px ${focusBlue(0.75)}`,
          },
        });
    }
  } else {
    return ({
      _hover,
      isPressed,
      isDisabled,
    }: {
      isPressed?: boolean;
      isDisabled?: boolean;
      isLoading?: boolean;
      _hover?: any;
    }) => ({
      color: blue(1, isPressed),
      textDecoration: 'none',
      _hover: {
        textDecoration: 'underline',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ..._hover,
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
        fontSize: '12px',
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
        px: 'base-loose',
        py: 'base',
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
    variant = 'solid',
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
  const _modeStyle = modeStyles(mode, variant);
  const modeStyle = _modeStyle({ isPressed, _hover, isDisabled });
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
      opacity={isDisabled ? 0.4 : 1}
      alignItems="center"
      justifyContent="center"
      {...modeStyle}
      {...sizeStyles}
      {...rest}
      display={rest.display || 'inline-flex'}
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
      >
        <Spinner size="sm" color="currentColor" />
      </Grid>
      <Flex
        transition="opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1)"
        as="span"
        color="currentColor"
        opacity={isLoading ? 0 : 1}
        display={rest.display || 'inline-flex'}
        alignItems={rest.alignItems || 'center'}
        justifyContent={rest.justifyContent || 'center'}
      >
        {children}
      </Flex>
    </Box>
  );
});
