import Request from '@/common/contestRequset.js';
let request = new Request().http;
//全局定义请求头
export default {
	//竞猜

	getCategory: function (data) {
		return request({
			url: "/Home/category",
			method: "GET",
			data
		})
	},
	getTopic: function (data) {
		return request({
			url: "/Home/topic",
			method: "GET",
			data
		})
	},

	getTopicOne: function (id) {
		return request({
			url: `/Home/topic/${id}`,
			method: "GET",
		})
	},
	getTopic10: function (id) {
		return request({
			url: `/Home/topic/stake/${id}`,
			method: "GET",
		})
	},

	getStake: function (addr) {
		return request({
			url: `/Home/stake/${addr}`,
			method: "GET",
		})
	},

	getStatistics: function (addr) {
		return request({
			url: `/Home/statistics/${addr}`,
			method: "GET",
		})
	},
}