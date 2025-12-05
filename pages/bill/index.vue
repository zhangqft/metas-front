<template>
	<view class="bill">
		<Layout></Layout>
		<view class="content">
			<view class="header flex">
				<image src="@/static/back.png" mode="widthFix" class="back" @click="back"></image>
				{{ $t('bill_my') }}
			</view>
			<view class="tabs flex">
				<view :class="['item', { active: query.type == item.type }]" v-for="(item, index) in tabs" :key="index"
					@click="cutTabs(item)">
					{{$t(item.key)}}
				</view>
			</view>

			<view class="list">
				<RecordList :list="recordList" />
			</view>

		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				tabs: [{
						label: "全部",
						type: 'all',
						key: 'all'
					},
					{
						label: "质押",
						type: 50,
						key: 'pledge'
					},
					{
						label: "奖励",
						type: 54,
						key: 'award'
					},
					{
						label: "释放",
						type: 55,
						key: 'release'
					},
					{
						label: "提现",
						type: 52,
						key: 'withdraw_btn'
					},
					{
						label: "发送",
						type: 5,
						key: 'send'
					},
					{
						label: "节点",
						type: 58,
						key: 'node'
					}
				],
				query: {
					type: 'all'
				},

				allRecordList: [],
				recordList: [],

				currentUrl: '',
				urlParams: {},

			}
		},
		onShow() {

			this.getCurrentUrl();
			this.$api.walletLogs().then(res => {
				this.allRecordList = res.data;
				this.recordList = this.allRecordList;

				const logType = this.getUrlParam('type');
				if (logType) {
					const item = this.tabs.filter(item => item.type == logType);
					this.cutTabs(item[0]);
				}
			})



		},
		methods: {
			back() {
				uni.navigateBack(1)
			},
			cutTabs(item) {
				this.query.type = item.type
				if (item.type != 'all') {
					this.recordList = this.allRecordList.filter(item => item.type == this.query.type)
				} else {
					this.recordList = this.allRecordList;
				}
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

			hasUrlParam(paramName) {
				return paramName in this.urlParams;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bill {
		.content {
			padding: 0 32rpx;

			.header {
				font-size: 50rpx;
				font-weight: 600;
				margin-top: 80rpx;

				.back {
					width: 28rpx;
					height: 20rpx;
					margin-right: 30rpx;
				}
			}

			.tabs {
				margin: 60rpx 0;
				overflow-x: scroll;

				.item {
					margin-right: 30rpx;
					color: #909090;
					font-weight: bold;
					font-size: 32rpx;
					padding-bottom: 10rpx;
					position: relative;
					flex-shrink: 0;
				}

				.active {
					color: #0f1a1e;

					&::after {
						content: '';
						position: absolute;
						width: 32rpx;
						height: 6rpx;
						background-color: #278ffe;
						left: 50%;
						bottom: -6rpx;
						transform: translateX(-50%);
					}
				}
			}

		}
	}
</style>