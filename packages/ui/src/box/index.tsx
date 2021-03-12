import * as React from 'react';
import { css } from '@emotion/react';
import {
  useCss,
  forwardRefWithAs,
  memoWithAs,
  Theme,
  ForwardRefExoticComponentWithAs,
} from '@stacks/ui-core';
import { BoxProps } from './types';

export const Box: ForwardRefExoticComponentWithAs<BoxProps, 'div'> = memoWithAs(
  forwardRefWithAs<BoxProps, 'div'>(({ as: Element = 'div', ...props }, ref) => {
    const [styles, _props] = useCss(props);
    const generateCss = React.useCallback((theme: Theme) => css(styles(theme)), [styles]);
    return <Element ref={ref} css={generateCss} {..._props} as={undefined} />;
  })
);
