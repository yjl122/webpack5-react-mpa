const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getPages = (entry)=> {
  if(!entry)return [];
    const htmlPlugins = [];
    Object.keys(entry).forEach((key) => {
      // 页面目录
      const pageRoot = path.resolve(process.cwd(), `src/pages/${key}`);
    
      // 默认配置
      const params = {
        filename: `${key}/index.html`,
        template: path.resolve(process.cwd(),  `index.ejs`),
        templateParameters: {
          title: '',
          scripts: [],
          styles: [],
        },
        chunks: [key],
      };
      // 读取setting
      const existsSetting = fs.existsSync(`${pageRoot}/setting.json`);
      if (existsSetting) {
        params.templateParameters = Object.assign(
          params.templateParameters,
          require(`${pageRoot}/setting.json`),
        );
      }
    
      // 自定义页面是否存在
      const existsEjs = fs.existsSync(`${pageRoot}/index.ejs`);
      if (existsEjs) {
        params.template = path.resolve(process.cwd(),`${pageRoot}/index.ejs`)
      }
      htmlPlugins.push(new HtmlWebpackPlugin(params));
    });
    return htmlPlugins;
  }

  module.exports = getPages;