import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { config } from '../box/config'
// @ts-ignore
import { createShouldForwardProp, props as fwdProps } from '@styled-system/should-forward-prop'
import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  textStyle,
  colorStyle,
  buttonStyle,
  compose
} from 'styled-system'

const systemProps = compose(
  layout,
  color,
  space,
  background,
  border,
  grid,
  position,
  shadow,
  typography,
  flexbox,
  textStyle,
  buttonStyle,
  colorStyle
)

// @ts-ignore
const configProps = Object.keys(config)

const allSystemProps = systemProps.propNames

const shouldForwardProp = createShouldForwardProp([...fwdProps, ...allSystemProps, ...configProps])

// @ts-ignore
const getFinalDomProps = initialProps => {
  // @ts-ignore
  const array = Object.keys(initialProps)
  // @ts-ignore
  const allowedPropsArray = array.map(p => (shouldForwardProp(p) ? p : null)).filter(Boolean)
  // @ts-ignore
  const finalProps = allowedPropsArray.reduce(
    (accumulator, propName) => ({ ...accumulator, [propName]: initialProps[propName] }),
    {}
  )
  // @ts-ignore
  console.log(finalProps)
  return finalProps
}

const BaseStyled = styled('div')``;
// @ts-ignore
export const BaseTag = forwardRef<any>(({ // @ts-ignore
  // @ts-ignore
  as: Tag = BaseStyled, ...props }, ref) =>
  // @ts-ignore
  React.createElement(Tag, {
    ref,
    ...getFinalDomProps(props)
  })
)

export default BaseTag
