const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getPages = require("./getPages");

const [n, b, page] = process.argv;
const { entry, htmlPlugin } = getPages(page);
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  context: process.cwd(),
  entry,
  output: {
    path: path.resolve(__dirname, "../dist"),
    clean: true,
    filename: "[name]/static/[contenthash:8].js",
    publicPath: "/"
  },
  cache: {
    type: "filesystem" // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /\.jsx?$|tsx?$/, // 匹配.js, jsx文件
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      // {
      //   test: /\.jsx?$|tsx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "swc-loader",
      //   },
      // },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: obj => {
            return `${obj.runtime}/static/images/[name][ext]`; // 文件输出目录和命名
          }
        }
      },
      {
        test: /.(css|less)$/, //匹配 css和less 文件
        include: [path.resolve(process.cwd(), "src")],
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:8]"
              }
            }
          },
          "postcss-loader",
          "less-loader"
        ] // 从右到左，从下到上的原则
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  plugins: [
    ...htmlPlugin,
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.RUNTIME_ENV": JSON.stringify(process.env.RUNTIME_ENV)
    }),
    new CopyPlugin({
      patterns: Object.keys(entry).map(key => ({
        from: "public",
        to: `${key}/public`,
        filter: source => {
          return !source.includes("index.html"); // 忽略index.html
        }
      }))
    })
  ]
};
