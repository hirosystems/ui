import * as React from 'react';
import { Box } from '../box';
import { GridProps } from './types';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';

export const Grid: ForwardRefExoticComponentWithAs<GridProps, 'div'> = forwardRefWithAs<
  GridProps,
  'div'
>((props, ref) => <Box display="grid" ref={ref} {...props} />);

export { GridProps };
