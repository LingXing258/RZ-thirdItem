// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false,
//   configureWebpack: {
//     devtool: 'source-map',
//   },
//    assetsDir:'static',
//     publicPath : './' ,
// })
module.exports = {
  lintOnSave: false,
  assetsDir:'static',
  publicPath : './' ,
//   devServer:{
//       host: '0.0.0.0',
//       port:8088, // 启动端口号
//       open:true,  // 启动后是否自动打开网页
//       proxy: { // 配置跨域
//           '/weixin': {
//               /* 目标代理服务器地址 */
//               target: 'http://192.168.5.6:8080/bpmx3_dev/',
//               /* 允许跨域 */
//               changeOrigin: true,
//               pathRewrite: {
//                   '^/weixin': '' //规定请求地址以什么作为开头
//               }
//           },
//       },
//   },
  configureWebpack:{
      module: {
          rules: [
              {
                  test: /.mjs$/,
                  include: /node_modules/,
                  type: "javascript/auto"
              }
          ]
      }
  }
}
