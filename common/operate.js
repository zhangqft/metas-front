/* 
 用来放置一些全局方法的
在main 中全局调用
	import operate from "common/operate.js" 
	Vue.prototype.$operate = operate
*/

import config from "../config/configDev"

export default {
	//接口
	api: function () {
		if (process.env.NODE_ENV === 'development') {
			console.log('开发环境');
			return 'https://test.metas.fi/api'; 
			// return 'http://127.0.0.1:20051/api'; //本地 
		} else {
			console.log('生产环境')
			return '/api'; //本地 
			if (config.isMainnet) {
				return '/api'; //本地 
			} else {
				return 'http://127.0.0.1:20051/api'; //本地 
			}
		}
	},

	contestApi: function () {
		if (process.env.NODE_ENV === 'development') {
			console.log('开发环境');
			return 'https://test.metas.fi/dapp-api/';
			return 'https://metas.dad/dapp-api/';
		} else {
			console.log('生产环境')
			return '/dapp-api';
		}
	},

	//吐司 提示
	toast: function (options) {
		let {
			title,
			duration,
			icon,
			mask
		} = options;
		uni.showToast({
			title: title,
			duration: 4000,
			icon: icon || "none",
			mask: mask || false
		});
	},
}

