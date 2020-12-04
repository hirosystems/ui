import React, { forwardRef, memo, Ref } from 'react';
import { BoxProps, IconButton, useColorMode } from '@stacks/ui';
import { IconSun, IconSunOff } from '@tabler/icons/icons-react/dist/index.esm';

export const ColorModeButton = memo(
  forwardRef((props: BoxProps, ref: Ref<HTMLDivElement>) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const Icon = colorMode === 'light' ? IconSun : IconSunOff;
    return (
      <IconButton
        flexShrink={0}
        icon={Icon}
        onClick={toggleColorMode}
        title="Toggle color mode"
        {...(props as any)}
        ref={ref as any}
      />
    );
  })
);
