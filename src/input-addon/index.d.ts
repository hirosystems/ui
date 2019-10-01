import * as React from "react";
import { IInput } from "../input";
import { BoxProps } from "../box";

interface IInputAddon {
  /**
   * The content of the `InputAddon`
   */
  children: React.ReactNode;
  /**
   * The size of the addon is inherited from the `InputGroup` via `cloneElement`.
   */
  size?: IInput["size"];
  /**
   * The position the addon should appear relative to the `Input`.
   * We added `InputLeftAddon` and `InputRightAddon` so you might not need to pass this
   */
  placement?: "left" | "right";
}

export type InputAddonProps = IInputAddon & BoxProps;

declare const InputAddon: React.FC<InputAddonProps>;

export default InputAddon;
export const InputLeftAddon: React.FC<InputAddonProps>;
export const InputRightAddon: React.FC<InputAddonProps>;
