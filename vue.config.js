const deepMerge = require('deepmerge');
const path = require('path');
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
module.exports = {
  // 注掉的写法都可以实现，最终使用deepmerge深度合并对象，是因为对于webpack的配置项，deepmerge对于深层对象不是覆盖，而是合并
  // configureWebpack: {
  //   resolve: {
  // 		extensions:[],
  //     alias: {
  //       assets: '@/assets',
  //       components: '@/components',
  //       network: '@/network',
  //       common: '@/common',
  //       views: '@/views'
  //     },
  //   }
  // },
  configureWebpack: config => {
    // config.resolve.alias['assets'] = '@/assets';
    // config.resolve.alias['components'] = '@/components';
    // config.resolve.alias['network'] = '@/network';
    // config.resolve.alias['common'] = '@/common';
    // config.resolve.alias['views'] = '@/views';
  
    
    // config.resolve = {...config.resolve,
    //   extensions:[],
    //   alias: {
    //     '@':resolves('src'),
    //     assets: '@/assets',
    //     components: '@/components',
    //     network: '@/network',
    //     common: '@/common',
    //     views: '@/views'
    //   },
    // }
    config.resolve = deepMerge(config.resolve,{
      extensions:[],
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        common: '@/common',
        views: '@/views'
      },
    });
    const plugins = [];
		// 骨架屏
		plugins.push(
			new SkeletonWebpackPlugin({ // 实例化插件对象
				webpackConfig: {
					entry: {
						app: path.join(__dirname, "./src/Skeleton.js"), // 引入入口文件
					},
				},
				minimize: true, // SPA 下是否需要压缩注入 HTML 的 JS 代码
				quiet: true, // 在服务端渲染时是否需要输出信息到控制台
			})
		);
		config.plugins = [...config.plugins, ...plugins];
  }
}
// console.log(configureWebpack);