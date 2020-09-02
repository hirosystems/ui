import * as React from 'react';
import { Box, BoxProps } from '../box';
import { forwardRefWithAs } from '@stacks/ui-core';

export const Text = forwardRefWithAs<BoxProps, 'span'>((props: BoxProps, ref) => (
  <Box as="span" ref={ref} {...props} />
));
