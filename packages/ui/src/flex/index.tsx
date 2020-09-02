import * as React from 'react';
import { Box } from '../box';
import { FlexProps } from './types';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';

export const Flex: ForwardRefExoticComponentWithAs<FlexProps, 'div'> = forwardRefWithAs<
  FlexProps,
  'div'
>((props, ref) => <Box display="flex" ref={ref} {...props} />);

export { FlexProps };
