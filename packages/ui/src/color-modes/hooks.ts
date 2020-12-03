/**
 * Private hooks
 */

import React, { useCallback, useEffect } from 'react';
import { handleSetColorMode, initColorMode } from './utils';
import { ColorModeString } from './types';
import { useMediaQuery } from '../hooks';

export const useColorModeState = (defaultMode?: ColorModeString) => {
  const [darkmode] = useMediaQuery('(prefers-color-scheme: dark)');
  const [lightmode] = useMediaQuery('(prefers-color-scheme: light)');

  const systemMode: ColorModeString = darkmode ? 'dark' : lightmode ? 'light' : 'light';

  const [colorMode, setMode] = React.useState<ColorModeString | undefined>(
    defaultMode || systemMode
  );

  const setColorMode = useCallback(
    (mode: 'light' | 'dark') => {
      setMode(mode);
      handleSetColorMode(mode);
    },
    [colorMode, setMode]
  );

  const toggleColorMode = useCallback(() => {
    if (colorMode === 'light') {
      setColorMode('dark');
      return;
    }
    if (colorMode === 'dark') {
      setColorMode('light');
      return;
    }
    if (systemMode) {
      setColorMode('dark');
      return;
    }
  }, [colorMode, setColorMode, systemMode]);

  return {
    colorMode,
    toggleColorMode,
    setColorMode,
    systemMode,
  };
};

export const useColorModeEffect = (defaultMode?: ColorModeString) => {
  const { colorMode, setColorMode, systemMode } = useColorModeState(defaultMode);
  useEffect(() => {
    if (!colorMode && systemMode) {
      setColorMode(systemMode);
    }
  }, [colorMode, systemMode]);

  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    initColorMode(setColorMode, colorMode || systemMode);
  }, [isBrowser]);
};
