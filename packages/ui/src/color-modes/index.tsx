import React from 'react';
import { useColorModeEffect, useColorModeState } from './hooks';
import { ColorModeContext } from './context';
import { ColorModeString } from '@stacks/ui-theme';
import { getPersistedColorMode } from './utils';

export * from './utils';
export * from './styles';

export {
  Color,
  ColorModeString,
  ColorModeState,
  ColorModesInterface,
  ColorModeTypes,
  Colors,
  ColorsStringLiteral,
  ThemeColorsStringLiteral,
} from '@stacks/ui-theme';

export const ColorModeProvider: React.FC<{ defaultMode?: ColorModeString }> = ({
  defaultMode,
  children,
}) => {
  const local = getPersistedColorMode();
  const state = useColorModeState(local || defaultMode);
  useColorModeEffect(defaultMode);
  return <ColorModeContext.Provider value={state}>{children}</ColorModeContext.Provider>;
};
