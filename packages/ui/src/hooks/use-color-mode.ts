import { useContext } from 'react';
import { ColorModeContext } from '../color-modes/context';
import { ColorModeState } from '../color-modes';

export const useColorMode = (): ColorModeState => {
  const state = useContext(ColorModeContext);
  return state;
};
