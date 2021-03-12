import * as React from 'react';
import { Box } from './box';
import type { BoxProps } from './box/types';
import { forwardRefWithAs } from '@stacks/ui-core';

export const Text = forwardRefWithAs<BoxProps, 'span'>((props: BoxProps, ref) => (
  <Box as="span" display="inline-block" ref={ref} {...props} />
));
