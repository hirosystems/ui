import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { theme as defaultTheme } from './theme';
import { Theme } from '@stacks/ui-core';
import { ColorModes } from './color-modes';

export const ThemeContext = React.createContext(defaultTheme);

const ThemeProvider: React.FC<{ theme?: Theme; children: any }> = ({
  theme = defaultTheme,
  children,
}) => (
  <EmotionThemeProvider theme={theme}>
    <ColorModes />
    {children}
  </EmotionThemeProvider>
);

export { ThemeProvider };
