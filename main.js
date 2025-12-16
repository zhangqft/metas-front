import App from './App'
import store from './store'
import i18n from './lang'
import clickOutside from '@/utils/clickOutside.js'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'


import api from './api/api.js';
Vue.prototype.$api = api;


import contestApi from './api/contestApi.js';
Vue.prototype.$contestApi = contestApi;

import operate from "./common/operate.js"
Vue.prototype.$operate = operate;

import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

import configDev from "./config/configDev.js"
import configProd from "./config/configProd.js"

// if (process.env.NODE_ENV === 'production') {
// 	if (configDev.enable) {
// 		console.log("*****测试环境配置地址*****")
// 		Vue.prototype.$config = configDev;
// 		console.log("*****测试环境配置地址*****")
// 	} else {
// 		console.log("*****生产环境配置地址*****")
// 		Vue.prototype.$config = configProd;
// 		console.log("*****生产环境配置地址*****")
// 	}
// } else {
// 	console.log("*****测试环境配置地址*****")
// 	Vue.prototype.$config = configDev;
// 	console.log("*****测试环境配置地址*****")
// }

import etherCall from "./common/etherCall.js"
Vue.prototype.$etherCall = etherCall;


//全局时间格式化过滤器
Vue.filter('dateFormat', function (value) {
	const date = new Date(value);
	const YYYY = date.getFullYear();
	const MM = (date.getMonth() + 1 + '').padStart(2, '0');
	const DD = (date.getDate() + '').padStart(2, '0');
	const hh = (date.getHours() + '').padStart(2, '0');
	const mm = (date.getMinutes() + '').padStart(2, '0');
	const ss = (date.getSeconds() + '').padStart(2, '0')
	return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
});

// 数字每三个字符加个逗号
// 返回整数位
// Vue.filter('numfixed', function (val, fix) {
// 	// var fix = 2
// 	val = Number(val).toFixed(fix); // 保留小数2位
// 	val = "" + val; // 转换成字符串
// 	var int = val.slice(0, fix * -1 - 1); // 拿到整数
// 	var ext = val.slice(fix * -1 - 1); // 获取到小数
// 	//每个三位价格逗号
// 	int = int.split("").reverse().join("") // 翻转整数
// 	var temp = ""; // 临时变量
// 	for (var i = 0; i < int.length; i++) {
// 		temp += int[i];
// 		if ((i + 1) % 3 == 0 && i != int.length - 1) {
// 			temp += ","; // 每隔三个数字拼接一个逗号
// 		}
// 	}
// 	temp = temp.split("").reverse().join(""); // 加完逗号之后翻转
// 	temp = temp + ext; // 整数小数拼接
// 	return temp; // 返回
// })

Vue.filter('numfixed', function (val, fix) {
    val = Number(val); // 转换为数字
    if (isNaN(val)) return ''; // 非数字返回空字符串
    fix = fix || 2; // 默认保留两位小数
    var isNegative = val < 0; // 判断是否为负数
    val = Math.abs(val).toFixed(fix); // 取绝对值并保留小数
    var [int, ext] = val.split('.'); // 分离整数和小数部分
    int = int.split('').reverse().join(''); // 翻转整数部分
    var temp = '';
    for (var i = 0; i < int.length; i++) {
        temp += int[i];
        if ((i + 1) % 3 === 0 && i !== int.length - 1) {
            temp += ','; // 每隔三位添加逗号
        }
    }
    temp = temp.split('').reverse().join(''); // 再次翻转
    return (isNegative ? '-' : '') + temp + (ext ? '.' + ext : ''); // 拼接负号和小数
});



import uView from './uni_modules/vk-uview-ui';
Vue.use(uView);

Vue.directive('click-outside', clickOutside)


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
//#endif

// main.js
async function initApp() {
	try {
		const response = await api.getEnv();
		Vue.prototype.$config = response.data;

		console.log("******获取到后端配置******")
		console.log(response.data)
		console.log("******获取到后端配置******")

		Vue.config.productionTip = false
		App.mpType = 'app'
		const app = new Vue({
			store,
			i18n,
			...App
		})
		app.$mount()
	} catch (error) {
		console.error('配置加载失败:', error);
	}
}

initApp();

// #endif