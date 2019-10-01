import React, { Children, cloneElement } from "react";
import Box from "../box";
import Input from "../input";
import { inputSizes } from "../input/styles";
import { InputLeftElement, InputRightElement } from "../input-element";
import { useTheme } from "../theme-provider";

const InputGroup = ({ children, size = "default", ...props }) => {
  const { sizes } = useTheme();
  const height = inputSizes[size] && inputSizes[size]["height"];
  let pl = null;
  let pr = null;
  return (
    <Box display="flex" position="relative" {...props}>
      {Children.map(children, child => {
        if (child.type === InputLeftElement) {
          pl = sizes[height];
        }
        if (child.type === InputRightElement) {
          pr = sizes[height];
        }
        if (child.type === Input) {
          return cloneElement(child, {
            size,
            pl: child.props.pl || pl,
            pr: child.props.pr || pr
          });
        }
        return cloneElement(child, { size });
      })}
    </Box>
  );
};

export default InputGroup;
