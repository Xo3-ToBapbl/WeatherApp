const Path = require("path");
const PugPlugin = require("pug-plugin");
const projectRoot = process.cwd();
const webpack = require("webpack");

module.exports = (env) => {
  const envName = env.prod ? "prod" : env.mock ? "mock" : "dev";
  const envVars = require(`./envs/${envName}.json`);
  const config = ((name) => { return {
    isProd: name == "prod",
    isDev: name == "dev",
    isMock: name == "mock",
    envName: name,
  }})(envName);

  return {
    mode: envVars.mode,
    devtool: envVars.devtool,
    devServer: {
      open: false,
      static: `./dist/${envName}`,
    },
    entry: {
      index: envVars.entryPath
    },
    resolve: {
      alias: {
        $app: Path.resolve(projectRoot, "src/app"),
        $src: Path.resolve(projectRoot, "src/"),
        $services: Path.resolve(projectRoot, `src/${envVars.servicesSource}/services`),
        $resources: Path.resolve(projectRoot, "src/resources"),
        $images: Path.resolve(projectRoot, "src/resources/images"),
        $blocks: Path.resolve(projectRoot, "src/blocks"),
        $lib: Path.resolve(projectRoot, "src/lib"),
        $mocks: Path.resolve(projectRoot, "src/mocks"),
        $utils: Path.resolve(projectRoot, "src/utils"),
      },
    },
    output: {
      publicPath: `/`,
      path: Path.resolve(projectRoot, envVars.distPath),
      filename: envVars.outputScriptsPath,
      assetModuleFilename: envVars.assetsPath,
      clean: true,
    },
  
    plugins: [
      new PugPlugin({
        modules: [
          PugPlugin.extractCss({
            filename: envVars.stylesPath
          })
        ]
      }),

      new webpack.DefinePlugin({
        $app_config: JSON.stringify(config),
      }),
    ],
  
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
          options: {
            method: "render",
          }
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: "css-loader",
              options: {
                import: false,
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};