import React from 'react';
import Document, {
  DocumentContext,
  DocumentProps,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { THEME_STORAGE_KEY } from '@common/constants';
import { extractCritical } from '@emotion/server';
import { MdxOverrides } from '@components/mdx/overrides';
import { ProgressBarStyles } from '@components/progress-bar';
import { documentColorLoaderSting } from '@stacks/ui';

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return {
      ...page,
      styles: (
        <>
          {MdxOverrides}
          {ProgressBarStyles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="color-scheme" content="light dark" />
          <link
            rel="preload"
            href="/static/fonts/opensaucesans-medium-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="/static/fonts/opensaucesans-regular-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap"
            rel="stylesheet"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `@font-face {
    font-family: 'Open Sauce';
    src: url('/static/fonts/opensaucesans-medium-webfont.woff2') format('woff2'),
      url('/static/fonts/opensaucesans-medium-webfont.woff') format('woff');
    font-weight: 500;
    font-display: swap;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sauce';
    src: url('/static/fonts/opensaucesans-regular-webfont.woff2') format('woff2'),
      url('/static/fonts/opensaucesans-regular-webfont.woff') format('woff');
    font-weight: 400;
    font-weight: normal;
    font-style: normal;
  }
`,
            }}
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: documentColorLoaderSting,
            }}
          />
          <link rel="preconnect" href="https://bh4d9od16a-dsn.algolia.net" crossOrigin="true" />
          <link rel="preconnect" href="https://cdn.usefathom.com" crossOrigin="true" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
