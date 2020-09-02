/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/react';
import {
  useCss,
  ForwardRefExoticComponentWithAs,
  forwardRefWithAs,
  Theme,
  BoxProps,
} from '@stacks/ui-core';

export { BoxProps };

export const Box: ForwardRefExoticComponentWithAs<BoxProps, 'div'> = forwardRefWithAs<
  BoxProps,
  'div'
>(({ as: Element = 'div', ...props }, ref) => {
  const [styles, _props] = useCss(props);
  const generateCss = React.useCallback((theme: Theme) => css(styles(theme)), [styles]);
  return <Element ref={ref} css={generateCss} {..._props} as={undefined} />;
});
