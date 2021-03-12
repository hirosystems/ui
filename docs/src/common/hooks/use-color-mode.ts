import React from 'react';
import { useMediaQuery } from '@common/hooks/use-media-query';
import { THEME_STORAGE_KEY } from '@common/constants';

export const useColorMode = (): [string, () => void, (mode: 'dark' | 'light') => void] => {
  const [darkmode] = useMediaQuery('(prefers-color-scheme: dark)');
  const [lightmode] = useMediaQuery('(prefers-color-scheme: light)');
  const setMode = typeof localStorage !== 'undefined' && localStorage.getItem(THEME_STORAGE_KEY);

  const [colorMode, setColorMode] = React.useState<'dark' | 'light' | undefined>(undefined);

  const setHtmlBackgroundColor = React.useCallback(() => {
    document.documentElement.style.background = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--colors-bg');
  }, []);

  const setDarkMode = React.useCallback(() => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    setColorMode('dark');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    setHtmlBackgroundColor();
  }, []);

  const setLightMode = React.useCallback(() => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    setColorMode('light');
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    setHtmlBackgroundColor();
  }, []);

  React.useEffect(() => {
    if (setMode) {
      if (setMode === 'dark') {
        setColorMode('dark');
      }
      if (setMode === 'light') {
        setColorMode('light');
      }
    } else {
      if (darkmode) {
        setDarkMode();
      }
      if (lightmode) {
        setLightMode();
      }
    }
  }, [setMode, lightmode, darkmode]);

  const toggleColorMode = React.useCallback(() => {
    if (typeof document !== 'undefined') {
      if (setMode) {
        if (setMode === 'light') {
          setDarkMode();
        } else {
          setLightMode();
        }
      } else if (darkmode) {
        setLightMode();
      } else {
        setDarkMode();
      }
    }
  }, [darkmode, lightmode, setMode, colorMode]);

  return [colorMode, toggleColorMode, setColorMode];
};
