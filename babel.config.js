const isDEV = process.env.NODE_ENV === 'development';

module.exports = {
    presets: [
        [
            '@babel/preset-env', //  babel 编译的预设,可以转换目前最新的js标准语法
            {
                "useBuiltIns": 'usage', // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                "corejs": 3, // 配置使用core-js低版本
                "modules": false, // 是否将 ESM 转化为其他模块化标准将此设置为 false 将保留 ESM 不受转换
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        isDEV && require.resolve('react-refresh/babel'),
    ].filter(Boolean)
}