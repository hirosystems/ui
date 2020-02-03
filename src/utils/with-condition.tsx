import React, { forwardRef } from 'react';

type Component = ({ ref }: any) => JSX.Element;

export function withCondition(Component: Component) {
  return ({ condition = true, forwardedRef, ...rest }) => {
    return forwardRef((props, ref) => (!!condition ? <Component ref={forwardedRef} {...rest} /> : null));
  };
}
