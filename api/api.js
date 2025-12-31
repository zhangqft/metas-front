import Request from '@/common/requset.js';
let request = new Request().http;
//全局定义请求头
export default {
	// ------- 首页 -------------

	// 快讯
	homeNews: function (data) {
		return request({
			url: "/home/news",
			method: "GET",
			data
		})
	},

	// ------- 持仓 -------------
	// 首页
	depositIndex: function (data) {
		return request({
			url: "/deposit/index",
			method: "GET",
			data
		})
	},
	// 增加持仓
	depositAdd: function (data) {
		return request({
			url: "/deposit/deposit",
			method: "POST",
			data
		})
	},

	// 赎回
	depositRedeem: function (data) {
		return request({
			url: "/deposit/redeem",
			method: "POST",
			data
		})
	},


	// 赎回确认
	redeemConfirm: function (data) {
		return request({
			url: "/deposit/redeemConfirm",
			method: "GET",
			data
		})
	},

	// 领取奖励
	receiveAward: function (data) {
		return request({
			url: "/deposit/receiveAward",
			method: "POST",
			data
		})
	},

	// 领取奖励确认
	receiveAwardConfirm: function (data) {
		return request({
			url: "/deposit/receiveAwardConfirm",
			method: "GET",
			data
		})
	},

	// 持仓记录
	depositLogs: function (data) {
		return request({
			url: "/deposit/logs",
			method: "GET",
			data
		})
	},
	// 质押列表
	investList: function (data) {
		return request({
			url: "/deposit/myDepositItem",
			method: "GET",
			data
		})
	},

	// 个人质押汇总
	myDeposit: function (data) {
		return request({
			url: "/deposit/myDeposit",
			method: "GET",
			data
		})
	},

	// ------- 节点 -------------
	// 节点首页
	getNodeIndex: function (data) {
		return request({
			url: "/node/index",
			method: "GET",
			data
		})
	},

	// 节点列表
	getNodeList: function (data) {
		return request({
			url: "/node/list",
			method: "GET",
			data
		})
	},
	// 获取签名的消息
	nodeSignMessage: function (data) {
		return request({
			url: "/node/signMessage",
			method: "GET",
			data
		})
	},
	// 购买节点
	nodeBuy: function (data) {
		return request({
			url: "/node/buy",
			method: "POST",
			data
		})
	},

	// 查看个人节点信息
	nodeInfo: function (data) {
		return request({
			url: "/node/nodeInfo",
			method: "GET",
			data
		})
	},

	// 节点分红记录
	nodeDividendList: function (data) {
		return request({
			url: "/node/award/logs",
			method: "GET",
			data
		})
	},


	// ------- 个人 -------------
	// 会员信息
	memberInfo: function (data) {
		return request({
			url: "/member/info",
			method: "GET",
			data
		})
	},
	// 根据UID查询会员信息
	memberQuery: function (data) {
		return request({
			url: "/member/query",
			method: "GET",
			data
		})
	},

	// 邀请分享
	memberShare: function (data) {
		return request({
			url: "/member/share",
			method: "GET",
			data
		})
	},
	// 团队信息
	getTeamInfo: function (data) {
		return request({
			url: "/member/teamInfo",
			method: "GET",
			data
		})
	},

	// 直推详细
	teamList: function (data) {
		return request({
			url: "/member/teamList",
			method: "GET",
			data
		})
	},

	// 公告列表
	noticeAll: function () {
		return request({
			url: "/uni/notice/all",
			method: "GET",
		})
	},
	// 公告详情
	noticeDetail: function (data) {
		return request({
			url: "/uni/notice/detail",
			method: "GET",
			data
		})
	},
	// 获取开盘价
	openPrice: function (data) {
		return request({
			url: "/uni/openPrice",
			method: "GET",
			data
		})
	},

	//获取销毁日志
	destroyLog: function () {
		return request({
			url: "/uni/destroyLog",
			method: "GET"
		})
	},

	//获取销毁总数
	destroyLogTotal: function () {
		return request({
			url: "/uni/destroyLogTotal",
			method: "GET"
		})
	},

	//获取配置信息
	getEnv: function () {
		return request({
			url: "/uni/getEnv",
			method: "GET"
		})
	},
	//获取配置信息
	getPromotion: function () {
		return request({
			url: "/uni/getPromotion",
			method: "GET"
		})
	},

	// 资讯详情
	newsDetail: function (data) {
		return request({
			url: "/home/news/detail",
			method: "GET",
			data
		})
	},
	// 版本信息
	appInfo: function (data) {
		return request({
			url: "/uni/appInfo",
			method: "GET",
			data
		})
	},

	// ------- 钱包 -------------
	// 获取签名的消息
	walletSignMessage: function (data) {
		return request({
			url: "/wallet/signMessage",
			method: "GET",
			data
		})
	},

	// 释放
	awardRelease: function (data) {
		return request({
			url: "/wallet/release",
			method: "POST",
			data
		})
	},

	// 释放确认
	releaseConfirm: function (data) {
		return request({
			url: "/wallet/releaseConfirm",
			method: "GET",
			data
		})
	},

	releaseLog: function (data) {
		return request({
			url: "/wallet/releaseLog",
			method: "GET",
			data
		})
	},

	// 钱包总览
	walletInfo: function (data) {
		return request({
			url: "/wallet/walletInfo",
			method: "GET",
			data
		})
	},

	//申请提现列表
	applyWithdrawList: function () {
		return request({
			url: "/wallet/applyWithdrawList",
			method: "GET",
		})
	},

	//申请提现
	applyWithdraw: function (data) {
		return request({
			url: "/wallet/applyWithdraw",
			method: "POST",
			data
		})
	},

	// 申请提现确认
	applyWithdrawConfirm: function (data) {
		return request({
			url: "/wallet/applyWithdrawConfirm",
			method: "GET",
			data
		})
	},

	//确认提现
	confirmWithdraw: function (data) {
		return request({
			url: "/wallet/confirmWithdraw",
			method: "POST",
			data
		})
	},
	// 二次确认提现 
	confirmWithdraw1: function (data) {
		return request({
			url: "/wallet/confirmWithdraw1",
			method: "GET",
			data
		})
	},

	// 账户明细
	walletDetail: function (data) {
		return request({
			url: "/wallet/detail",
			method: "GET",
			data
		})
	},

	// 财务记录
	walletLogs: function (data) {
		return request({
			url: "/wallet/logs",
			method: "GET",
			data
		})
	},
	// 获取充值信息
	rechargeInfo: function (data) {
		return request({
			url: "/wallet/recharge/info",
			method: "GET",
			data
		})
	},

	// ------- 账号 -------------
	// 检查账号是否注册
	existPhone: function (data) {
		return request({
			url: "/account/exist",
			method: "GET",
			data
		})
	},
	// 注册
	signUp: function (data) {
		return request({
			url: "/account/signUp",
			method: "POST",
			data
		})
	},
	// 登录
	signIn: function (data) {
		return request({
			url: "/account/signIn",
			method: "POST",
			data
		})
	},
	// 获取签名的消息
	accountSignMessage: function (data) {
		return request({
			url: "/account/signMessage",
			method: "GET",
			data
		})
	},

	// 获取币价
	getPrice: function (data) {
		return request({
			url: "/sign/getPrice",
			method: "GET",
			data
		})
	},


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
}
/*
请求样式：
	自定义名字: function(data) {
		return request({
			url: "/banner", //请求头
			method: "GET", //请求方式
			data: data,	//请求数据
			token: token, // 可传 
			hideLoading: false, //加载样式
		})
	},
页面请求方法样式 1 在请求页面中调用
	1.先导入本页面
		import api from '@/common/api.js'
		
	2.在methods 中 调用：
		api.classifyLeft().then((res) => {
			console.log(res);
		})
页面请求方法样式 2 全局调用
	1. 在main.js 中引入api.js
		import api from '@/common/api.js'
		Vue.prototype.$api = api
	2. 在页面中调用
	//不传参数
		this.$api.classifyLeft().then((res) => {
			console.log(res);
		})
	//传参
		this.$api.classifyLeft({参数}).then((res) => {
			console.log(res);
		})
*/