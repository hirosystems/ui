import styled from 'styled-components'
import React from 'react'
import BaseTag from '../base-tag'
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

import extraConfig from './config'
import { BoxProps } from './types'

export const systemProps = compose(
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

export * from './types'

const StyledBox = styled('div')<BoxProps>`
  ${systemProps};
  ${extraConfig};
`

// @ts-ignore
const Box = forwardRef<BoxProps>(({ as, ...rest }, ref) => (
  //@ts-ignore
  <StyledBox as={p => <BaseTag {...p} as={as} />} {...rest} ref={ref} />
))

export default Box
