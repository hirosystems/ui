import { css } from '@emotion/react';
import { useCss, allPossibleProps } from '../../hooks/use-css';
import { createShouldForwardProp } from '@styled-system/should-forward-prop';

import type { As, PropsWithAs } from '../../common/forward-ref/types';

export const shouldForwardProp = createShouldForwardProp([...allPossibleProps]);

export const Base = <SystemProps, ComponentType extends As = 'div'>({
  as,
  ...props
}: PropsWithAs<SystemProps, ComponentType>) => {
  const Component = as || 'div';
  const [styles, allProps] = useCss(props);
  return <Component css={(theme: any) => css(styles(theme))} {...shouldForwardProp(allProps)} />;
};
