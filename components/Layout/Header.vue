<template>
	<view class="header">
		<view class="left">
			<image src="@/static/menu.png" mode="widthFix" class="menu-btn" @click="$emit('openSidebar')"></image>
			<image src="@/static/logo.png" mode="widthFix" class="coin" @click="home"></image>
		</view>

		<view class="user">
			<view class="connect" @click="bind" v-if="!isWalletLogin">
				{{ $t('connect') }}
			</view>
			<view class="connect" @click.stop="cutConnect" v-if="isWalletLogin">
				{{ userInfo.account.slice(0, 5) }}...{{ userInfo.account.slice(-5) }}
				<u-icon name="arrow-up" color="#fff" size="28" v-if="connectShow" style="margin-left: 8rpx;"></u-icon>
				<u-icon name="arrow-down" color="#fff" size="28" style="margin-left: 8rpx;" v-else></u-icon>
				<view class="connect_list" v-if="connectShow" v-click-outside="closeConnect">
					<view class="item flex">
						{{ userInfo.account.slice(0, 9) }}...{{ userInfo.account.slice(-9) }}
						<image src="@/static/copy.png" mode="widthFix" class="copy" @click='copyText(userInfo.account)'>
						</image>
					</view>
					<view class="item flex">
						{{ $t('recommend_code') }}：{{ userInfo.shareCode }}
						<image src="@/static/copy.png" mode="widthFix" class="copy"
							@click='copyText(userInfo.shareCode)'></image>
					</view>
					<view class="break" @click.stop="disconnect()"> {{ $t('break') }} </view>
				</view>
			</view>
			<view class="lang_box">
				<image src="@/static/lang.png" mode="widthFix" class="lang" @click.stop="toggleLang"></image>
				<view class="list" v-show="langShow" v-click-outside="closeList">
					<!-- { langActive: item.value == $store.state.app.language } -->
					<view :class="['item', ]" v-for="(item, index) in langList" :key="index"
						@click="setLang(item.value)">
						{{ item.label }}
					</view>
				</view>
			</view>
		</view>

		<u-popup v-model="inviteCodeShow" mode="center" border-radius="14">
			<view class="inviteBox">
				<image src="@/static/close.png" mode="" class="close" @click="closeInviteCode"></image>
				<image src="@/static/logo.png" mode="" class="logo"></image>
				<view class="title">
					{{ title }}
				</view>
				<input type="text" v-model="inviteCode" :class="['input', { input_active: inputFocus }]"
					:placeholder="$t('inviteCodeDesc')" @focus="focus" @blur="blur" />

				<view :class="['bind', { bind_active: inviteCode }]" @click="toBind">
					{{ $t('bind') }}
				</view>

			</view>
		</u-popup>


	</view>
</template>

<script>
	import utils from "@/utils/utils.js"
	import store from "@/store";
	export default {
		data() {
			return {
				langList: [{
						label: "English",
						value: 'en-US'
					},
					{
						label: "한국어",
						value: 'ko-KR'
					},
					{
						label: "繁体中文",
						value: 'zh-TW'
					},
					{
						label: "日本語",
						value: 'ja-JP'
					},
					{
						label: "Tiếng Việt",
						value: 'vi-VN'
					}
				],
				signinMessage: "", //登陆签名的消息
				signupMessage: "", //注册签名的消息
				langShow: false,
				inviteCodeShow: false,
				title: 'Metas protocol 3.0',
				isWalletLogin: false,
				inviteCode: '',
				inputFocus: false,
				connectShow: false,
				userInfo: {
					account: "",
					shareCode: "",
					signState: 0,
				},
				currentUrl: '', // 当前URL
				urlParams: {}, // URL参数
			}
		},
		mounted() {},
		created() {
			this.isLogined();
			// 获取当前URL和参数
			this.getCurrentUrl();
			// 获取shareCode参数
			this.getShareCode();
		},
		methods: {
			home() {
				const pages = getCurrentPages();

				const currentPage = pages[pages.length - 1];
				// 获取当前页面路由
				const currentRoute = currentPage.route;

				// 判断当前路由是否为 '/pages/index/index'
				if (currentRoute !== 'pages/index/index') {
					// 使用 reLaunch 关闭所有页面并打开首页
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			},
			copyText(value) {
				let that = this
				uni.setClipboardData({
					data: `${value}`,
					showToast: false,
					success() {
						uni.showToast({
							title: that.$t('copy_succeed'),
							icon: 'none'
						})
					}
				})
			},

			disconnect() {
				uni.removeStorageSync("TOKEN");
				uni.removeStorageSync("walletAccount")
				var isLogin = uni.getStorageSync("TOKEN");
				this.isLogined();

				this.$router.go(0)
			},

			closeConnect() {
				this.connectShow = false
			},
			cutConnect() {
				this.connectShow = !this.connectShow
			},
			closeInviteCode() {
				this.inviteCodeShow = false
			},

			// 是否登录
			isLogined() {
				var isLogin = uni.getStorageSync("TOKEN");
				if (isLogin && isLogin.length > 0) {
					console.log("已登录，已认证");
					this.isWalletLogin = true;
					// 获取用户信息
					this.getMemberInfo();

				} else {
					console.log("未登录");
					this.isWalletLogin = false;
				}
			},

			bind() {
				// this.inviteCode = this.shareCode;
				// 获取签名的消息
				this.$api.accountSignMessage().then((res) => {
					if (res.code == 0) {
						this.signinMessage = res.data.signinMessage;
						this.signupMessage = res.data.signupMessage
						this.authorizeHtml();
					}
				});

			},

			authorizeHtml() {
				let that = this;
				if (typeof window.ethereum !== "undefined") {
					// 查找当前钱包地址
					ethereum.request({
						method: "eth_requestAccounts"
					}).then((res) => {
						that.walletAccount = res[0];
						uni.setStorageSync("walletAccount", that.walletAccount);
						that.personalsignHtml();
					});
				} else {
					uni.$u.toast(this.$t("common.qyqbllqdk"));
				}
			},
			personalsignHtml() {
				let that = this;
				this.$etherCall.switchNetwork().then((res) => {
					that.$etherCall.getSignature(that.signinMessage, that.walletAccount).then((res) => {
						that.walletSign = res;
						// 检查是否注册  如果需要授权最大 则在这里调用 approveMax()
						this.isCheck();
					}).catch((err) => {
						console.log(err)
						uni.$u.toast(err.message);
					});
				})
			},
			// 检查是否注册
			isCheck() {
				this.$api.existPhone({
					account: this.walletAccount
				}).then((res) => {
					// 未注册
					if (!res.data.exist) {
						this.inviteCodeShow = true;
					} else {
						this.toLogin();
					}
				});
			},

			// 去绑定
			toBind() {
				this.$etherCall.getSignature(this.signupMessage, this.walletAccount).then((sign) => {
					// 钱包注册
					this.$api.signUp({
						account: this.walletAccount,
						shareCode: this.inviteCode,
						type: 2, // 注册类型，1、app，2、H5，默认app
						signature: sign, // 对“MetaBird”签名结果，当account是地址时必传
					}).then((res) => {
						if (res.code == 0) {
							this.inviteCodeShow = false;
							this.toLogin();
						} else {
							uni.$u.toast(res.msg);
						}
					});
				})
			},
			toLogin() {
				// 钱包登录
				let that = this;
				this.$api.signIn({
					account: this.walletAccount,
					password: this.walletSign
				}).then((res) => {
					if (res.code == 0) {
						this.inviteCodeShow = false;
						uni.setStorageSync("TOKEN", res.data.token);
						uni.setStorageSync("walletAccount", that.walletAccount);
						this.isLogined();

						// this.$router.go(0)
					} else {
						uni.$u.toast(res.msg);
					}
				});
			},

			blur() {
				this.inputFocus = false
			},
			focus(e) {
				this.inputFocus = true
			},
			connect() {
				this.inviteCodeShow = true
			},
			setLang(value) {
				this.$i18n.locale = value
				uni.setStorageSync("lang", value);
				store.dispatch('app/changeLanguage', value)
				this.closeList()
				utils.setTabText(this)
			},
			toggleLang() {
				this.langShow = !this.langShow
			},
			closeList() {
				this.langShow = false
			},

			getMemberInfo() {
				this.$api.memberInfo().then((res) => {
					if (res.code == 0) {
						this.userInfo = res.data;
					}
				});
			},

			// 获取当前URL和参数
			getCurrentUrl() {
				// #ifdef H5
				// H5环境下获取当前URL
				this.currentUrl = window.location.href;
				const paramsUrlArray = this.currentUrl.split('?');
				if (paramsUrlArray.length > 1) {
					const paramsUrl = paramsUrlArray[1].replace(/[#\/]/g, '');
					this.urlParams = this.parseUrlParams('?' + paramsUrl);
					console.log('当前URL:', this.currentUrl);
					console.log('URL参数:', this.urlParams);
				} else {
					console.log('无参数');
				}
				// #endif
			},

			// 解析URL参数
			parseUrlParams(queryString) {
				const params = {};
				if (!queryString) return params;
				const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;
				if (query) {
					const pairs = query.split('&');
					pairs.forEach(pair => {
						const [key, value] = pair.split('=');
						if (key) {
							params[decodeURIComponent(key)] = decodeURIComponent(value || '');
						}
					});
				}

				return params;
			},

			// 获取指定参数值
			getUrlParam(paramName) {
				return this.urlParams[paramName] || null;
			},

			// 检查是否包含指定参数
			hasUrlParam(paramName) {
				return paramName in this.urlParams;
			},

			// 获取shareCode参数
			getShareCode() {
				// 从URL参数中获取shareCode
				const shareCode = this.getUrlParam('shareCode');
				if (shareCode) {
					this.inviteCode = shareCode;
					console.log('获取到分享码:', shareCode);
				}
			},
		},

	}
</script>

<style lang="scss" scoped>
	.header {
		height: 104rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.menu-btn {
		width: 64rpx;
		height: 64rpx;
		margin-right: 20rpx;
	}

	.coin {
		width: 44rpx;
		height: 44rpx;
	}

	.user {
		display: flex;
		align-items: flex-end;
	}

	.connect {
		height: 64rpx;
		background-color: #278ffe;
		border-radius: 8rpx;
		color: #fff;
		max-width: 240rpx;
		min-width: 196rpx;
		padding: 12rpx 16rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 24rpx;
		position: relative;

		.connect_list {
			position: absolute;
			width: 400rpx;
			// height: 240rpx;
			border: 1px solid #d8dce1;
			border-radius: 16rpx;
			padding: 32rpx;
			bottom: -264rpx;
			right: 0;
			box-shadow: 0px 2px 8px rgba(0, 0, 0, .25);
			background-color: #ffffff;


			.item {
				color: #0f1a1e;
				padding-bottom: 16rpx;
				margin-bottom: 28rpx;
				border-bottom: 1px solid #f5f5f5;

				&:nth-last-child(1) {
					margin: 0;
				}

				.copy {
					width: 28rpx;
					height: 28rpx;
					margin-left: 16rpx;
				}

			}

			.break {
				color: #63c8b1;
			}
		}
	}

	.lang_box {
		position: relative;

		.lang {
			width: 64rpx;
			height: 64rpx;
			display: block;
		}

		.list {
			position: absolute;
			width: 200rpx;
			bottom: -360rpx;
			right: 0;
			border: 1px solid #ccc;
			border-radius: 12rpx;
			background-color: #ffffff;

			.item {
				text-align: center;
				margin: 32rpx 0;
				// padding: 32rpx 0;
				font-size: 24rpx;
			}

			.langActive {
				color: #278ffe;
			}
		}
	}

	.inviteBox {
		padding: 32rpx 0 60rpx 0;
		position: relative;
		width: 640rpx;

		.close {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			right: 32rpx;
			top: 32rpx;
		}

		.logo {
			display: block;
			width: 64rpx;
			height: 64rpx;
			margin: 56rpx auto;
		}

		.title {
			text-align: center;
			font-size: 36rpx;
			font-weight: 600;
		}

		.input {
			width: 488rpx;
			height: 84rpx;
			border-radius: 20rpx;
			border: 1px solid #d8dce1;
			margin: 40rpx auto;
			text-align: center;
			font-size: 28rpx;
		}

		.input_active {
			border: 1px solid #278ffe;
		}

		.bind {
			width: 488rpx;
			height: 88rpx;
			line-height: 88rpx;
			background-color: #d8dce1;
			color: #707a8a;
			border-radius: 20rpx;
			margin: auto;
			text-align: center;
			font-weight: 700;
		}

		.bind_active {
			color: #fff;
			background-color: #278ffe;

		}
	}
</style>