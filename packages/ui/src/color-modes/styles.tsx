import React from 'react';
import { css, Global } from '@emotion/react';
import { generateCssVariables } from './utils';
import { theme } from '@stacks/ui-theme';

export const LightMode = (
  <Global
    styles={css`
      :root {
        ${generateCssVariables('light')({ colorMode: 'light', theme })};
        --colors-highlight-line-bg: rgba(255, 255, 255, 0.08);
      }
    `}
  />
);

export const DarkMode = (
  <Global
    styles={css`
      :root {
        ${generateCssVariables('dark')({ colorMode: 'dark', theme })};
        --colors-highlight-line-bg: rgba(255, 255, 255, 0.05);
      }
    `}
  />
);

export const Base = (
  <Global
    styles={css`
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      html {
        background: var(--colors-bg);
        border-color: var(--colors-border);

        &.light {
          ${generateCssVariables('light')({ colorMode: 'light', theme })};
          --colors-highlight-line-bg: rgba(255, 255, 255, 0.08);
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
        &.dark {
          ${generateCssVariables('dark')({ colorMode: 'dark', theme })};
          --colors-highlight-line-bg: rgba(255, 255, 255, 0.04);
          * {
            -webkit-font-smoothing: subpixel-antialiased;
            -moz-osx-font-smoothing: auto;
          }
        }
      }
    `}
  />
);

export const ColorModes: React.FC = React.memo(() => (
  <>
    <style
      data-emotion-css={'css-global ' + DarkMode.props.styles.name}
      dangerouslySetInnerHTML={{ __html: DarkMode.props.styles.styles }}
      media="(prefers-color-scheme: dark)"
    />
    <style
      data-emotion-css={'css-global ' + LightMode.props.styles.name}
      dangerouslySetInnerHTML={{ __html: LightMode.props.styles.styles }}
      media="(prefers-color-scheme: light)"
    />
    {Base}
  </>
));
