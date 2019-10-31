import React, { forwardRef } from 'react'
import { PseudoBox } from '../pseudo-box'
import { BoxProps, IAs } from '../box'

// if nothing is passed for the prop `textStyle`, we will assume styles for various dom elements
const assumeTextStyle = (as: string | React.ElementType) => {
  switch (as) {
    case 'h1':
      return 'display.large'
    case 'h2':
      return 'display.small'
    case 'h3':
      return 'body.large.medium'
    default:
      return
  }
}
const Text = forwardRef<any, BoxProps>(({ textStyle, as, ...rest }, ref) => {
  return (
    <PseudoBox
      ref={ref}
      as="span"
      whiteSpace="unset"
      display="inline"
      textStyle={textStyle || assumeTextStyle(as)}
      {...rest}
    />
  )
})

export { Text }
