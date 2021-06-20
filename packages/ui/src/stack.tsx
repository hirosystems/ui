import React, { useCallback } from 'react';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs, get, Theme } from '@stacks/ui-core';

import { Flex, FlexProps } from './flex';
import { Box } from './box';

export interface StackProps extends FlexProps {
  isInline?: boolean;
  children?: React.ReactNode[] | React.ReactNode;
  divider?: React.ReactElement;
  spacing?: FlexProps['margin'];
  shouldWrapChildren?: boolean;
}

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

export const selector = '& > *:not(style):not(:last-child)';

export const Stack: ForwardRefExoticComponentWithAs<StackProps, 'div'> = forwardRefWithAs<
  StackProps,
  'div'
>((props, ref) => {
  const {
    isInline,
    as,
    children,
    alignItems,
    justifyContent,
    spacing = 'tight',
    shouldWrapChildren,
    divider = null,
    ...rest
  } = props;
  const validChildren = getValidChildren(children);

  const spacingProps = useCallback(
    (theme: Theme) => {
      const value = get(theme, 'space')[spacing as string];
      return isInline
        ? {
            marginTop: 0,
            marginInlineEnd: value,
            marginBottom: 0,
            marginInlineStart: 0,
          }
        : { marginBottom: value };
    },
    [spacing]
  );
  const cssStyles = useCallback((theme: Theme) => ({ [selector]: spacingProps(theme) }), [
    spacingProps,
  ]);

  return validChildren?.length ? (
    <Flex
      alignItems={alignItems}
      justifyContent={justifyContent}
      flexDirection={isInline ? 'row' : 'column'}
      as={as}
      ref={ref}
      css={cssStyles}
      {...rest}
    >
      {validChildren.map((child, index) => {
        const isLastChild = validChildren.length === index + 1;
        if (shouldWrapChildren)
          return (
            <React.Fragment key={index}>
              <Box display="inline-block">{child}</Box>
              {!isLastChild ? divider : null}
            </React.Fragment>
          );
        return (
          <React.Fragment key={index}>
            {child}
            {!isLastChild && divider ? divider : null}
          </React.Fragment>
        );
      })}
    </Flex>
  ) : null;
});

Stack.displayName = 'Stack';
