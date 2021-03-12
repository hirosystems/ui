/** @jsx jsx */
import { jsx, keyframes } from '@emotion/react';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';
import { LiteralUnion } from 'type-fest';

import { Box } from './box';
import type { BoxProps } from './box/types';
import { VisuallyHidden } from './visually-hidden';

export enum SpinnerSizes {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export type NamedSizeLiterals = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type SpinnerSize = LiteralUnion<NamedSizeLiterals, string>;

export interface SpinnerPropsBase {
  size?: SpinnerSize;
  emptyColor?: string;
  thickness?: string;
  speed?: string;
  label?: string;
}

export type SpinnerProps = SpinnerPropsBase & Omit<BoxProps, 'size'>;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const getSize = (size: SpinnerSize): string => {
  switch (size) {
    case 'xs':
      return '0.75rem';
    case 'sm':
      return '1rem';
    case 'md':
      return '1.5rem';
    case 'lg':
      return '2rem';
    case 'xl':
      return '3rem';
    default:
      return size;
  }
};

/**
 * Spinner is used for indicating a loading state of a component or page.
 *
 * RECOMMENDED: Add `aria-busy="true"` to the component that triggered the loading state while the spinner is shown.
 */
export const Spinner: ForwardRefExoticComponentWithAs<SpinnerProps, 'div'> = forwardRefWithAs<
  SpinnerProps,
  'div'
>(
  (
    {
      size = 'md',
      label = 'Loading...',
      thickness = '2px',
      speed = '0.85s',
      color,
      emptyColor = 'transparent',
      ...props
    },
    ref
  ) => {
    const _size = getSize(size);

    return (
      <Box
        ref={ref}
        display="inline-block"
        borderWidth={thickness}
        borderColor="currentColor"
        borderBottomColor={emptyColor}
        borderLeftColor={emptyColor}
        borderRadius="100%"
        color={color}
        size={_size}
        animation={`${spin} ${speed} linear infinite`}
        {...(props as any)}
      >
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </Box>
    );
  }
);

Spinner.displayName = 'Spinner';
