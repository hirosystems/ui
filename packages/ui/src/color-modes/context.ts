import { createContext } from 'react';
import { ColorModeState } from '@stacks/ui-theme';

export const ColorModeContext = createContext<ColorModeState>({
  colorMode: undefined,
  toggleColorMode: undefined,
  setColorMode: undefined,
});
