import styled from "styled-components";

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
  compose,
  system
} from "styled-system";

import extraConfig from "./config";
import { BoxProps } from "./types";

export const truncate = (props: any) => {
  if (props.isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    };
  }
};

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
);

const Box = styled.div<BoxProps>`
  ${systemProps};
  ${extraConfig};
`;

export default Box;
