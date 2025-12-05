//请求头 放置地址
import operate from '@/common/operate.js'
/*
	协作者：zzq
	修改请求方式
*/
export default class Request {
	http(param) {
		var url = param.url,
			method = param.method,
			header = {},
			data = param.data || {},
			token = param.token || "",
			hideLoading = param.hideLoading || false;
		//拼接完整请求地址
		var requestUrl = operate.api() + url;

		//请求方式
		if (!method) {
			method = "GET"
		} else {
			method = method.toUpperCase();
			var lang = uni.getStorageSync('lang')
			if (method == "POST" || method == "PUT") {
				header = {
					// 'content-type': "application/x-www-form-urlencoded"
					'content-type': "application/json",
					'Accept-Language': lang
					// 'content-type': "application/from-data"
				};

				// 判断 token值是否为空
				if (uni.getStorageSync("TOKEN")) {
					let auth = uni.getStorageSync("TOKEN");
					header["Authorization"] = `Bearer ${auth}`;
				} else {
					header["Authorization"] = ``;
				}

				// 判断 address值是否为空
				if (uni.getStorageSync("walletAccount")) {
					let walletAccount = uni.getStorageSync("walletAccount");
					header["address"] = walletAccount;
				} else {
					header["address"] = '';
				}
			} else {
				header = {
					'content-type': "application/json",
					'Accept-Language': lang
				};

				// 判断 token值是否为空
				if (uni.getStorageSync("TOKEN")) {
					let auth = uni.getStorageSync("TOKEN");
					header["Authorization"] = `Bearer ${auth}`;
				} else {
					header["Authorization"] = ``;
				}

				// 判断 address值是否为空
				if (uni.getStorageSync("walletAccount")) {
					let walletAccount = uni.getStorageSync("walletAccount");
					header["address"] = walletAccount;
				} else {
					header["address"] = '';
				}
			}
		}
		//加载圈
		if (!hideLoading) {
			// uni.showLoading({
			// 	title: '加载中...'
			// });
		}
		//开始请求
		return new Promise((resolve, reject) => {
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: header,
				success: (res) => {
					// 判断 请求api 格式是否正确
					if (res.statusCode && res.statusCode != 200) {
						uni.showToast({
							// 接口异常请检查
							// title: "数据库多出数据接口出错，请联系后端工作人员" + res.errMsg,
							title: "请检查" + res.errMsg,
							icon: 'none',
							duration: 2500
						});
						return;
					}
					if (res.data.code == 500) {
						console.log("请求出错:"+requestUrl);
						console.log(res.data)
						// uni.removeStorageSync("TOKEN");
						// uni.removeStorageSync("MEMBER");
						// // 钱包登录
						// uni.removeStorageSync("walletAccount");
						// uni.reLaunch({
						// 	url: "/pages/home/index",
						// });
						// return;
					}
					// 将结果抛出
					resolve(res.data)
				},
				//请求失败
				fail: (e) => {
					console.log(e);
					// uni.showToast({
					// 	title: "" + e.data.msg,
					// 	icon: 'none'
					// });
					// uni.showToast({
					// 	title: '网络超时，请尝试重新连接.....',
					// 	icon: "error"
					// });
					resolve(e.data);
				},
				complete() {
					// 隐藏加载
					if (!hideLoading) {
						uni.hideLoading();
					}
					return;
				}
			})
		})
	}
}