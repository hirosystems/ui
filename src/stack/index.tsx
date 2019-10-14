import React, { forwardRef, Children, cloneElement, isValidElement } from 'react'
import Flex from '../flex'
import Box from '../box'
import { StackProps } from './types'

export * from './types'

const Stack = forwardRef<any, StackProps>(
  ({ isInline, children, align, justify, spacing = 2, shouldWrapChildren, ...rest }, ref) => {
    return (
      <Flex align={align} justify={justify} flexDir={isInline ? 'row' : 'column'} ref={ref} {...rest}>
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) {
            return
          }
          if (!Array.isArray(children)) {
            return
          }
          const isLastChild = children.length === index + 1
          const spacingProps = isInline
            ? { mr: isLastChild ? undefined : spacing }
            : { mb: isLastChild ? undefined : spacing }

          if (shouldWrapChildren) {
            return (
              <Box d="inline-block" {...spacingProps}>
                {child}
              </Box>
            )
          }
          return cloneElement(child, spacingProps)
        })}
      </Flex>
    )
  }
)

export default Stack
