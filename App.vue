<script>
	import utils from "@/utils/utils.js"
	export default {

		onLaunch() {
			// 添加switchTab拦截器
			uni.addInterceptor('switchTab', {
				invoke: (args) => {
					// 判断是否跳转到需要拦截的页面
					if (args.url == '/pages/deal/index') {
						window.location.href =
							`https://pancakeswap.finance/swap?inputCurrency=${this.$config.usdt_contract}&outputCurrency=${this.$config.metas_contract}`
						return false;
					}
					// 其他情况正常跳转
					return true;
				}
			});

			// 添加switchTab拦截器
			uni.addInterceptor('navigateTo', {
				invoke: (args) => {
					// 判断是否跳转到需要拦截的页面
					const blackList = [
						// '/pages/sidebar/meter',
					]
					if (blackList.indexOf(args.url) !== -1) {
						uni.showToast({
							title: 'Coming soon',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						return false;
					}
					// 其他情况正常跳转
					return true;
				}
			});
			utils.setTabText(this)
		},

		// onReady() {
		// 	uni.$on('tabBarChange', (data) => {
		// 		console.log('TabBar 切换', data);
		// 		// 针对特定tab进行处理
		// 		if (data.index === 2) { // 假设第三个tab需要拦截
		// 			uni.showToast({
		// 				title: 'login first',
		// 				icon: 'none',
		// 				duration: 2000,
		// 				mask: true
		// 			});
		// 		}
		// 	});
		// },
		onShow: function() {
			if (typeof window.ethereum !== 'undefined' && uni.getStorageSync('walletAccount')) {
				// 查找当前钱包地址
				ethereum.request({
					method: 'eth_requestAccounts'
				}).then(res => {
					if (uni.getStorageSync('walletAccount') != res[0]) {
						uni.removeStorageSync("TOKEN")
						uni.removeStorageSync("walletAccount")
						uni.reLaunch({
							url: '/pages/wager/index'
						})
					}
				})
			}
		},

		mounted() {
			// 监听切换网络ID，切换钱包
			ethereum.on("accountsChanged", function(res) {
				console.log('切换钱包')
				if (uni.getStorageSync('walletAccount') != res[0]) {
					uni.removeStorageSync("TOKEN")
					uni.removeStorageSync("walletAccount")
					uni.reLaunch({
						url: '/pages/wager/index'
					})
				}
			});
			ethereum.on("chainChanged", () => {
				console.log('链切换')
				uni.removeStorageSync("TOKEN")
				uni.removeStorageSync("walletAccount")
				uni.reLaunch({
					url: '/pages/wager/index'
				})
			});
		},
		onHide: function() {}
	}
</script>
<style lang="scss">
	@import "./uni_modules/vk-uview-ui/index.scss";

	* {
		box-sizing: border-box;
		// color: #0f1a1e;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.flex_1 {
		flex: 1;
	}

	.text-over {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		-webkit-line-clamp: 1;
	}

	.text-over2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.text-over3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>