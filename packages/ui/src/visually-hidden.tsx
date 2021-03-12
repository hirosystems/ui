import * as React from 'react';
import { Box } from './box';
import type { BoxProps } from './box/types';
import { forwardRefWithAs } from '@stacks/ui-core';

export const VisuallyHidden: React.FC<BoxProps> = forwardRefWithAs<BoxProps, 'div'>(
  (props, ref) => (
    <Box
      border={0}
      height="1px"
      width="1px"
      margin="-1px"
      padding="0"
      overflow="hidden"
      whiteSpace="nowrap"
      position="absolute"
      clip="rect(0px, 0px, 0px, 0px)"
      ref={ref}
      {...props}
    />
  )
);
