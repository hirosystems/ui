import React from 'react';

interface WhenProps {
  // Typing as `any` allows consumers of this component to make use of truthy/falsy props
  condition: boolean | any;
}

export const When: React.FC<WhenProps> = ({ condition, children }) => (!!condition ? <>{children}</> : null);
