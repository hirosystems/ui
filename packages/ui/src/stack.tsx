import React, { Children, cloneElement, isValidElement } from 'react';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';

import { Flex, FlexProps } from './flex';
import { Box } from './box';

export interface StackProps extends FlexProps {
  isInline?: boolean;
  children?: React.ReactNode[] | React.ReactNode;
  divider?: React.ReactElement;
  spacing?: FlexProps['margin'];
  shouldWrapChildren?: boolean;
}

export const Stack: ForwardRefExoticComponentWithAs<StackProps, 'div'> = forwardRefWithAs<
  StackProps,
  'div'
>((props, ref) => {
  const {
    isInline,
    as,
    children,
    align,
    justify,
    spacing = 'tight',
    shouldWrapChildren,
    divider,
    ...rest
  } = props;
  const validChildren = Array.isArray(children) ? children.filter(isValidElement) : [];

  return (
    <Flex
      align={align}
      justify={justify}
      flexDirection={isInline ? 'row' : 'column'}
      as={as}
      ref={ref}
      {...rest}
    >
      {validChildren?.length
        ? Children.map(validChildren, (child, index) => {
            if (!isValidElement(child)) {
              return null;
            }
            if (!Array.isArray(children)) {
              return null;
            }
            const isLastChild = validChildren.length === index + 1;
            const spacingProps = isInline
              ? { mr: isLastChild ? undefined : spacing }
              : { mb: isLastChild ? undefined : spacing };

            const Divider = divider ? cloneElement(divider, spacingProps) : null;

            if (shouldWrapChildren) {
              return (
                <>
                  <Box display="inline-block" {...spacingProps}>
                    {child}
                  </Box>
                  {!isLastChild ? Divider : null}
                </>
              );
            }
            return (
              <>
                {cloneElement(child, spacingProps)}
                {!isLastChild ? Divider : null}
              </>
            );
          })
        : children}
    </Flex>
  );
});

Stack.displayName = 'Stack';
