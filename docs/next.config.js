const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const path = require('path');
const { remarkPlugins } = require('./lib/remark-plugins');
const { rehypePlugins } = require('./lib/rehype-plugins');
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')(['@tabler/icons/icons-react/dist/index.esm.js']);

module.exports = withTM(
  withFonts(
    withBundleAnalyzer({
      experimental: {
        modern: true,
        polyfillsOptimization: true,
        jsconfigPaths: true,
        trailingSlash: true,
      },
      pageExtensions: ['js', 'ts', 'tsx', 'md', 'mdx'],
      webpack: (config, options) => {
        config.module.rules.push({
          test: /.mdx?$/, // load both .md and .mdx files
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@mdx-js/loader',
              options: {
                remarkPlugins,
                rehypePlugins,
              },
            },
            path.join(__dirname, './lib/mdx-frontmatter-loader'),
          ],
        });

        config.module.rules.push({
          test: /\.ya?ml$/,
          type: 'json',
          use: 'yaml-loader',
        });

        if (!options.dev) {
          const splitChunks = config.optimization && config.optimization.splitChunks;
          if (splitChunks) {
            const cacheGroups = splitChunks.cacheGroups;
            const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
            if (cacheGroups.framework) {
              cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
                test,
              });
              cacheGroups.commons.name = 'framework';
            } else {
              cacheGroups.preact = {
                name: 'commons',
                chunks: 'all',
                test,
              };
            }
          }

          // Install webpack aliases:
          const aliases = config.resolve.alias || (config.resolve.alias = {});
          aliases.react = aliases['react-dom'] = 'preact/compat';
          // aliases['@stacks/ui'] = '@stacks/ui/dist/index.esm.js';
          aliases['react-ssr-prepass'] = 'preact-ssr-prepass';
        }
        config.resolve.alias['@emotion/react'] = path.resolve(
          __dirname,
          './node_modules/@emotion/react'
        );

        return config;
      },
    })
  )
);
