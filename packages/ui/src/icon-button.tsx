import React from 'react';
import { useHover } from 'use-events';
import { forwardRefWithAs, MemoExoticComponentWithAs, memoWithAs } from '@stacks/ui-core';
import { transition } from '@stacks/ui-theme';

import { Box, BoxProps } from './box';
import { Grid } from './grid';
import { color } from './color-modes';

export interface IconButtonProps extends BoxProps {
  icon: any;
  iconSize?: BoxProps['size'];
  iconProps?: BoxProps;
  isHovered?: boolean;
  invert?: boolean;
}

export const IconButton: MemoExoticComponentWithAs<IconButtonProps, 'button'> = memoWithAs(
  forwardRefWithAs((props, ref) => {
    const [_isHovered, bind] = useHover();
    const {
      icon: Icon,
      iconSize = '20px',
      iconProps = {},
      invert,
      _hover = {},
      isHovered,
      ...rest
    } = props;

    const hovered = _isHovered || isHovered;
    return (
      <Grid
        placeItems="center"
        borderRadius="100%"
        transition={transition}
        size="36px"
        position="relative"
        userSelect="none"
        _hover={{
          cursor: 'pointer',
          ..._hover,
        }}
        color="currentColor"
        ref={ref}
        {...bind}
        {...rest}
      >
        <Icon display="block" size={iconSize} color="currentColor" {...iconProps} />
        <Box
          position="absolute"
          left={0}
          top={0}
          borderRadius="100%"
          size="100%"
          bg={color(invert ? 'bg' : 'invert')}
          transition={transition}
          opacity={hovered ? 0.12 : 0}
        />
      </Grid>
    );
  })
);
