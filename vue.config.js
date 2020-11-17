const pxtorem = require('postcss-pxtorem');
// 网络路径
// const network = 'http://localhost';
const network = 'http://manga.tt2.ink';
// 本地路径
const localhost = 'http://localhost/';

const path = require('path')
// 根据路径获取文件
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    // 开发环境代理
    devServer: {
        // 开放公网
        open: true,
        // 初始页面
        // openPage: '#/about',
        // 不知道
        hot: true,
        // 端口号
        port: 8001,
        // 主机
        // host: '0.0.0.0',
        proxy: {//配置代理
            '/cms': {
                target: network,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/cms': ''
                }
            }
        }
    },
    // css配置项
    css: {
        // posttocss配置
        loaderOptions: {
            postcss: {
                plugins: [
                    // 各浏览器前缀
                    // autoprefixer(),
                    // px单位转换
                    pxtorem({
                        'postcss-import': {},
                        'postcss-url': {},
                        autoprefixer: {
                            // 筛选浏览器
                            browsers: ['Android >= 4.0', 'iOS >= 8'],
                        },
                        'postcss-pxtorem': {
                            // 根元素,1rem的大小
                            rootValue: 37.5,
                            // 哪些需要进行px转rem
                            propList: ['*'],
                            // 排除哪些开头的如 .weui-button 等等
                            // 该项仅在使用 Circle 组件时需要
                            // 原因参见 https://github.com/youzan/vant/issues/1948
                            selectorBlackList: ['van-circle__layer'],
                            // 最小转换，如低于 4px的不会进行转成rem
                            minPixelValue: 4,
                            // re单位的小数位数上限
                            unitPrecision: 10,
                        }
                    })
                ]
            }
        }
    },
    // 配置less的相对路径
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': resolve('./src'),
        },
    },
    pluginOptions: {
        // 为less 配置全局变量，不用每个vue都引入
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                resolve('./src/styles/mixin.less'),
            ],
        }
    },
    pwa: {//图标设置
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
};
