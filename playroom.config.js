module.exports = {
  outputPath: './dist/playroom',
  components: './src/index.ts',
  frameComponent: './playroom/frame-component.js',
  // Optional:
  title: 'Waffle Design System',
  widths: [320, 1024],
  port: 9000,
  openBrowser: true,
  exampleCode: `
    <Button>
      Hello World!
    </Button>
  `,
  webpackConfig: () => ({
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    loose: true,
                    modules: 'commonjs'
                  }
                ],
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                [
                  'babel-plugin-transform-react-remove-prop-types',
                  {
                    mode: 'unsafe-wrap'
                  }
                ]
              ]
            }
          }
        },

        {
          test: /\.js$/,
          include: __dirname,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        }
      ]
    }
  })
}
