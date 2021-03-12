const esbuild = require('rollup-plugin-esbuild');
const path = require('path');

module.exports = {
  rollup(config, options) {
    config.plugins = config.plugins.map(plugin => {
      if (plugin && plugin.name === 'rpt2') {
        return esbuild({
          minify: process.env.NODE_ENV === 'production',
          target: 'esnext',
          jsxFactory: 'React.createElement',
          jsxFragment: 'React.Fragment',
          tsconfig: path.resolve('./tsconfig.json'),
        });
      }
      return plugin;
    });

    if (options.format === 'esm') {
      config = { ...config, preserveModules: true };
      config.output = { ...config.output, dir: 'dist/', entryFileNames: '[name].esm.js' };
      delete config.output.file;
    }
    return config;
  },
};
