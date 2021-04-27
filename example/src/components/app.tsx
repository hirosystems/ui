import React from 'react';
import { ThemeProvider, ColorModeProvider } from '@stacks/ui';
import { ColorsPage } from './colors';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ColorModeProvider defaultMode="light">
        <ColorsPage />
      </ColorModeProvider>
    </ThemeProvider>
  );
};
