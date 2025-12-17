<template>
	<view class="sidebar-content">
		<image src="@/static/logo.png" mode="widthFix" class="coin" @click="home"></image>
		<view class="menu">
			<view class="menu-item flex" v-for="(item, index) in menus" :key="index" @click="goPage(item)">
				<image :src="item.icon" mode="" class="icon"></image>
				{{ $t(item.key) }}
			</view>
		</view>
		<view class="menu">
			<view class="menu-item2 " v-for="(item, index) in menus2" :key="index" @click="goPage(item)">
				{{ $t(item.key) }} <text v-if="item.name == 'X'" style="margin-left: 8rpx;">({{ $t('Twitter') }})</text>
			</view>
		</view>
		<view class="placeholder"> </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menus: [{
						name: this.$t('dashboard'),
						path: '/pages/sidebar/meter',
						openType: 1,
						url: "",
						key: "dashboard",
						icon: "/static/sidebar_1.png"
					},
					{
						name: this.$t('nominate'),
						path: '/pages/recommend/index',
						openType: 1,
						url: "",
						key: "nominate",
						icon: "/static/sidebar_2.png"
					},
					{
						name: this.$t('node'),
						path: '/pages/sidebar/node',
						openType: 1,
						url: "",
						key: "node",
						icon: "/static/sidebar_3.png"
					},
					{
						name: this.$t('合约'),
						path: '/pages/sidebar/contract',
						openType: 1,
						url: "",
						key: "合约",
						icon: "/static/sidebar_4.png"
					},
					// {
					// 	name: this.$t('fisc'),
					// 	path: '/pages/sidebar/treasury',
					// 	openType: 1,
					// 	url: "",
					// 	key: "fisc"
					// },
					{
						name: this.$t('destroy'),
						path: '/pages/sidebar/destroy',
						openType: 1,
						url: "",
						key: "destroy",
						icon: "/static/sidebar_5.png"
					},
					// {
					// 	name: this.$t('notice'),
					// 	path: '/pages/sidebar/notice',
					// 	openType: 1,
					// 	url: "",
					// 	key: "notice"
					// },
					{
						name: this.$t('DAO'),
						path: '/pages/sidebar/dao',
						openType: 1,
						url: "",
						key: 'DAO',
						icon: "/static/sidebar_6.png"
					}
				],
				menus2: [{
						name: this.$t('course'),
						path: '/pages/sidebar/faq',
						openType: 1,
						url: "",
						key: 'course',
					},
					{
						name: this.$t('browser'),
						path: '',
						openType: 2,
						url: "https://bscscan.com/token/0x567fd5658f48C1c826a912ea1Ba37696A6B32006",
						key: 'browser',
					},
					{
						name: this.$t('X'),
						path: '',
						openType: 2,
						url: "https://x.com/MetasOfficial",
						key: 'X',
					},
					{
						name: this.$t('tg'),
						path: '',
						openType: 2,
						url: "https://t.me/Metas_Global",
						key: 'tg',
					},
					{
						name: this.$t('uccn'),
						path: '',
						openType: 2,
						url: "https://www.metas.fi/",
						key: 'uccn',
					},
					{
						name: this.$t('contract_Audit'),
						path: '',
						openType: 2,
						url: "https://aegis.binenet.com/report.html?id=metas-code-audit-20251217-3uy",
						key: 'contract_Audit',
					},
					{
						name: this.$t('support'),
						path: '/pages/sidebar/support',
						openType: 1,
						url: "",
						key: 'support',
					}
				]
			}
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
			goPage(item) {
				switch (item.openType) {
					case 1:
						uni.navigateTo({
							url: item.path
						})
						break;
					case 2:
						window.open(item.url);
						break;

					case 3:
						uni.showToast({
							title: 'Coming soon',
							icon: 'none',
							duration: 2000,
							mask: true
						});
						// window.open(item.url);
						break;
				}
				this.$emit('close')
			},
		},

	}
</script>

<style lang="scss" scoped>
	.sidebar-content {
		// padding: 40rpx 20rpx;

		.coin {
			display: block;
			width: 60rpx;
			height: 60rpx;
			margin: 40rpx 0 40rpx 32rpx;
		}
	}

	.menu-item {
		font-size: 36rpx;
		padding: 0 0 60rpx 32rpx;

		&:nth-last-child(1) {
			border-bottom: 1px solid #d8dce1;
			padding-bottom: 36rpx;
			margin-bottom: 52rpx;
		}

		.icon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 16rpx;
		}
	}




	.menu-item2 {
		padding: 0 0 60rpx 60rpx;
		font-size: 28rpx;
	}

	.close-btn {
		margin-top: 40rpx;
		text-align: center;
		color: #007aff;
		font-size: 30rpx;
	}

	.placeholder {
		height: 100rpx;
	}
</style>