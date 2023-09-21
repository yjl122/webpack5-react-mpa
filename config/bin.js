const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const colors = require("colors");

const [n, s, page] = process.argv;

const env = process.env.NODE_ENV;
const RUNTIME_ENV = process.env.RUNTIME_ENV;

// 开发环境
const serve = async () => {
  const devConfig = require("./webpack.dev");
  const compiler = webpack(devConfig);
  const devServerOptions = { ...devConfig.devServer, host: "localhost" };
  const server = new WebpackDevServer(devServerOptions, compiler);
  await server.start();
  const host = `http://localhost:${devConfig.devServer.port}`;
  console.log(`服务启动：${host}/${page || "目录名"}/index.html`.yellow);
};

// 生产环境
const build = () => {
  const prodConfig =
    RUNTIME_ENV === "analyzer" ? require("./webpack.analyzer") : require("./webpack.prod");
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    console.info(stats.toString({ colors: true }));
  });
};

if (env === "development") {
  serve();
} else if (env === "production") {
  build();
}
