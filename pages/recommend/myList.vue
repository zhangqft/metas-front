<template>

	<view class="myList">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<image src="@/static/back.png" mode="widthFix" class="icon" @click="back"></image>
				{{ $t('我的推荐用户') }}
			</view>

			<view class="list">
				<view class="item" v-for="(item, index) in teamList" :key="index">
					<view class="row flex">
						<view class="label bold">
							{{ item.account.slice(0, 8) }}...{{ item.account.slice(-8) }}
						</view>
						<view class="value">
							{{ item.createTime | dateFormat }}
						</view>
					</view>
					<view class="row flex">
						<view class="label flex">
							<view class="usd" v-if="item.nodeType > 0">
								Node：{{ getNodeType(item.nodeType) }} USD
							</view>
							<view class="level">
								Tier：V{{ item.level }}
							</view>
						</view>
						<view class="value">
							{{ $t('code') }}: <text style="font-weight: 400;color: black;">{{ item.uid }}</text>
						</view>
					</view>
					<view class="row flex" style="border-bottom: 1px solid #d8dce1;padding-bottom: 12rpx;">
						<view class="label flex">
							{{ $t('all_pledge') }}
						</view>
						<view class="value pledge_value">
							$ {{ item.teamValue | numfixed(2) }}
						</view>
					</view>
					<view class="row flex">
						<view class="label flex">
							{{ $t('联盟质押天数', { days: 1 }) }}
						</view>
						<view class="value pledge_value">
							$ {{ item.day1Value | numfixed(2) }}
						</view>
					</view>
					<view class="row flex">
						<view class="label flex">
							{{ $t('联盟质押天数', { days: 7 }) }}
						</view>
						<view class="value pledge_value">
							$ {{ item.day7Value | numfixed(2) }}
						</view>
					</view>
					<view class="row flex">
						<view class="label flex">
							{{ $t('联盟质押天数', { days: 30 }) }}
						</view>
						<view class="value pledge_value">
							$ {{ item.day30Value | numfixed(2) }}
						</view>
					</view>

					<view class="row flex">
						<view class="label flex">
							{{ $t('联盟质押天数', { days: 90 }) }}
						</view>
						<view class="value pledge_value">
							$ {{ item.day90Value | numfixed(2) }}
						</view>
					</view>
					<view class="row flex">
						<view class="label flex">
							{{ $t('联盟质押天数', { days: 180 }) }}
						</view>
						<view class="value pledge_value">
							$ {{ item.day180Value | numfixed(2) }}
						</view>
					</view>
					<view class="row flex">
						<view class="label flex">
							{{ $t('联盟质押天数', { days: 360 }) }}
						</view>
						<view class="value pledge_value">
							$ {{ item.day360Value | numfixed(2) }}
						</view>
					</view>

				</view>
			</view>

		</view>
	</view>

</template>

<script>
export default {
	data() {
		return {
			desc: '社区自治，对重要的事情进行投票治理',
			teamList: []
		}
	},
	onShow() {
		this.$api.teamList().then(res => {
			this.teamList = res.data
		})
	},
	methods: {
		back() {
			uni.navigateBack(1)
		},
		getNodeType(type) {
			if (type == 1) {
				return 500;
			} else if (type == 2) {
				return 1000;
			} else if (type == 3) {
				return 1500;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.myList {
	.content {
		padding: 0 32rpx;

		.icon {
			width: 28rpx;
			margin-right: 30rpx;
		}

		.title {
			margin: 60rpx 0 20rpx;
			font-size: 50rpx;
			font-weight: 600;
		}

		.list {
			margin-top: 48rpx;

			.item {
				padding: 32rpx;
				border: 1px solid #d8dce1;
				border-radius: 16rpx;
				margin-bottom: 32rpx;

				.row {
					justify-content: space-between;
					margin-bottom: 26rpx;

					&:nth-last-child(1) {
						margin-bottom: 0;
					}

					.label,
					.value {
						font-size: 24rpx;
						color: #909090;

					}

					.label {
						.usd {
							padding: 10rpx 20rpx;
							color: #2ebd85;
							border: 1px solid #b1e4d8;
							border-radius: 16rpx;
							font-weight: 600;
							font-size: 24rpx;
							margin-right: 16rpx;
						}

						.level {
							padding: 10rpx 20rpx;
							color: #278ffe;
							border: 1px solid #93c7ff;
							border-radius: 16rpx;
						}
					}

					.bold {
						font-weight: 600;
						font-size: 26rpx;
						color: #030606;
					}

					.value {}

					.pledge_value {
						color: #707a8a;
					}
				}
			}
		}
	}
}
</style>