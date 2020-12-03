import { createContext } from 'react';
import { ColorModeState } from './types';

export const ColorModeContext = createContext<ColorModeState>({
  colorMode: undefined,
  toggleColorMode: undefined,
  setColorMode: undefined,
});
