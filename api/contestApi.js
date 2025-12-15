import Request from '@/common/contestRequset.js';
let request = new Request().http;
//全局定义请求头
export default {
	//竞猜

	getCategory: function (data) {
		return request({
			url: "/home/category",
			method: "GET",
			data
		})
	},
	getTopic: function (data) {
		return request({
			url: "/home/topic",
			method: "GET",
			data
		})
	},

	getTopicOne: function (id) {
		return request({
			url: `/home/topic/${id}`,
			method: "GET",
		})
	},
	getTopic10: function (id) {
		return request({
			url: `/home/topic/stake/${id}`,
			method: "GET",
		})
	},
	getStake: function (addr) {
		return request({
			url: `/home/stake/${addr}`,
			method: "GET",
		})
	},
	getStatistics: function (addr) {
		return request({
			url: `/home/statistics/${addr}`,
			method: "GET",
		})
	},
	ConfirmTx: function (txHash) {
		return request({
			url: `/home/ConfirmTx/${txHash}`,
			method: "PUT",
		})
	},
	getSettles: function (addr) {
		return request({
			url: `home/settles/${addr}`,
			method: "GET",
		})
	},
}