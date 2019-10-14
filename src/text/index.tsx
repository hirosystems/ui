import React, { forwardRef } from 'react'
import Box from '../pseudo-box'

// if nothing is passed for the prop `textStyle`, we will assume styles for various dom elements
const assumeTextStyle = ({ as }: { as: string }) => {
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
const Text = forwardRef<any, any>(({ textStyle, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      as="span"
      whiteSpace="unset"
      display="inline"
      textStyle={textStyle || assumeTextStyle(rest)}
      {...rest}
    />
  )
})

export default Text
