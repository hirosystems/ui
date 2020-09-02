import * as React from 'react';
import {
  ForwardRefExoticComponentWithAs,
  ForwardRefWithAsRenderFunction,
  FunctionComponentWithAs,
  MemoExoticComponentWithAs,
  As,
} from './types';

export function forwardRefWithAs<Props, ComponentType extends As = 'div'>(
  render: ForwardRefWithAsRenderFunction<Props, ComponentType>
) {
  return (React.forwardRef(render) as unknown) as ForwardRefExoticComponentWithAs<
    Props,
    ComponentType
  >;
}

export function memoWithAs<Props, ComponentType extends As = 'div'>(
  Component: FunctionComponentWithAs<Props, ComponentType>,
  propsAreEqual?: (
    prevProps: Readonly<React.PropsWithChildren<Props>>,
    nextProps: Readonly<React.PropsWithChildren<Props>>
  ) => boolean
) {
  return React.memo(Component, propsAreEqual) as MemoExoticComponentWithAs<ComponentType, Props>;
}
