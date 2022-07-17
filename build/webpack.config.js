const Path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = (env) => {
  const envName = env.prod ? 'prod' : 'dev';
  const envVars = require(`./envs/${envName}.json`);

  return {
    mode: envVars.mode,
    devtool: envVars.devtool,
    entry: {
      index: envVars.entryPath
    },
    output: {
      publicPath: '/',
      path: Path.resolve(process.cwd(), envVars.distPath),
      filename: envVars.outputScriptsPath,
      assetModuleFilename: envVars.assetsPath,
    },
  
    plugins: [
      new PugPlugin({
        modules: [
          PugPlugin.extractCss({
            filename: envVars.stylesPath
          })
        ]
      })
    ],
  
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
          options: {
            method: 'render',
          }
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                import: false,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};