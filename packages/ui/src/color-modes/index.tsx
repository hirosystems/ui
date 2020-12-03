import React from 'react';
import { useColorModeEffect, useColorModeState } from './hooks';
import { ColorModeContext } from './context';
import { ColorModeString } from './types';
import { getPersistedColorMode } from './utils';

export * from './utils';
export * from './types';
export * from './styles';

export const ColorModeProvider: React.FC<{ defaultMode?: ColorModeString }> = ({
  defaultMode,
  children,
}) => {
  const local = getPersistedColorMode();
  const state = useColorModeState(local || defaultMode);
  useColorModeEffect(defaultMode);
  return <ColorModeContext.Provider value={state}>{children}</ColorModeContext.Provider>;
};
