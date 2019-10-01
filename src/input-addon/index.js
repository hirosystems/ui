import React from "react";
import { oneOf } from "prop-types";
import Box from "../box";
import useInputStyle from "../input/styles";

const InputAddon = ({ placement = "left", size = "md", ...props }) => {
  const _placement = {
    left: {
      mr: "-1px",
      roundedRight: 0,
      borderRightColor: "transparent",
      borderLeftWidth: 0
    },
    right: {
      order: 1,
      roundedLeft: 0,
      borderLeftColor: "transparent",
      borderLeftWidth: 0
    }
  };

  const styleProps = {
    ...useInputStyle({ size, variant: "outline" }),
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    bg: "white", // todo: abstract out for colorMode
    ..._placement[placement]
  };

  return (
    <Box
      {...styleProps}
      {...props}
      css={{ "input:focus + &": { zIndex: -1 } }}
    />
  );
};

InputAddon.propTypes = {
  placement: oneOf(["left", "right"])
};

const InputLeftAddon = props => <InputAddon placement="left" {...props} />;
const InputRightAddon = props => <InputAddon placement="right" {...props} />;

export { InputLeftAddon, InputRightAddon };
export default InputAddon;
