import React from 'react';
import { ColorModeProvider } from '@stacks/ui';
import { AppStateProvider } from '@components/app-state';
import { ProgressBar } from '@components/progress-bar';
import { BaseLayout } from '@components/layouts/base-layout';
import { Meta } from '@components/meta-head';
import { useFathom } from '@common/hooks/use-fathom';

export const AppWrapper: React.FC<any> = ({ children, isHome }) => {
  useFathom();
  return (
    <ColorModeProvider>
      <Meta />
      <ProgressBar />
      <AppStateProvider>
        <BaseLayout isHome={isHome}>{children}</BaseLayout>
      </AppStateProvider>
    </ColorModeProvider>
  );
};
