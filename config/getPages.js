const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getEntry = page => {
  const pages = path.resolve(process.cwd(), "src/pages");
  if (page) {
    return {
      [page]: [path.resolve(pages, page, "./index")]
    };
  }
  const files = fs.readdirSync(pages);
  const entry = files.reduce((a, b) => {
    return {
      ...a,
      [b]: [path.resolve(pages, b, "./index")]
    };
  }, {});
  return entry;
};

const getHtmlPlugins = entry => {
  const htmlPlugins = [];
  Object.keys(entry).forEach(key => {
    // 页面目录
    const pageRoot = path.resolve(process.cwd(), `src/pages/${key}`);

    // 默认配置
    const params = {
      filename: `${key}/index.html`,
      template: path.resolve(process.cwd(), `index.ejs`),
      templateParameters: {
        title: "",
        scripts: [],
        styles: []
      },
      chunks: [key]
    };
    // 读取setting
    const existsSetting = fs.existsSync(`${pageRoot}/setting.json`);
    if (existsSetting) {
      params.templateParameters = Object.assign(
        params.templateParameters,
        require(`${pageRoot}/setting.json`)
      );
    }

    // 自定义页面是否存在
    const existsEjs = fs.existsSync(`${pageRoot}/index.ejs`);
    if (existsEjs) {
      params.template = path.resolve(process.cwd(), `${pageRoot}/index.ejs`);
    }
    htmlPlugins.push(new HtmlWebpackPlugin(params));
  });
  return htmlPlugins;
};

const getPages = page => {
  const entry = getEntry(page);
  const htmlPlugin = getHtmlPlugins(entry);
  return {
    entry,
    htmlPlugin
  };
};

module.exports = getPages;
