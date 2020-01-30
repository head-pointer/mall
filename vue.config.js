// 给路径起别名，这样就能避免类似与../../assets....的情况出现
// @代表的是src，在脚手架2中不能直接在别名中直接使用@，但脚手架3和4可以
// router和store因为引用少，所以就不用起别名
// 在html中引用好像要加~才行，在js中好像可以直接引用
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network'
      }
    }
  }
}