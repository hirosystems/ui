import { AppProps } from 'next/app';
import * as React from 'react';
import 'modern-normalize/modern-normalize.css';
import { AppWrapper } from '@components/app-wrapper';
import { theme, ThemeProvider } from '@stacks/ui';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { RecoilRoot } from 'recoil';
import '@docsearch/css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, ...rest }) => (
  <RecoilRoot>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <AppWrapper {...rest}>
          <Component {...pageProps} />
        </AppWrapper>
      </ThemeProvider>
    </CacheProvider>
  </RecoilRoot>
);

export default MyApp;
