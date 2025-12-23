<template>

	<view class="destroy">
		<Layout></Layout>
		<view class="content">
			<view class="datas">
				<view class="head flex">
					<image src="@/static/logo.png" mode="widthFix" class="logo"></image>
					<view class="text">
						{{ $t('destroy_all') }}
					</view>
				</view>

				<view class="nums">
					{{ destroyTotal }}
				</view>

			</view>

			<view class="list">
				<view class="item flex" v-for="(item, index) in destroyLog" :key="index">
					<view class="left flex">
						{{ $t('destroy') }}
						<image src="@/static/pledge_icon.png" mode="widthFix" class="icon"></image>
					</view>
					<view class="right">
						<view class="num">
							{{ item.value }} METAS
						</view>
						<view class="time">
							{{ item.utc * 1000 | dateFormat }}
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
import { BigNumber } from 'bignumber.js';

export default {
	data() {
		return {
			destroyLog: [],
			destroyTotal: 0
		}
	},
	onShow() {
		this.destroyTotal = 0;
		this.$api.destroyLog().then(res => {
			this.destroyLog = res.data;
		});

		this.$api.destroyLogTotal().then(res => {
			this.destroyTotal = res.data;
		})
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.destroy {
	.content {
		padding: 0 32rpx;

		.datas {
			background-color: #278ffe;
			padding: 32rpx;
			border-radius: 8rpx;
			margin: 60rpx 0 40rpx;

			.head {
				justify-content: center;
				margin-bottom: 16rpx;

				.logo {
					width: 36rpx;
					height: 36rpx;
					margin-right: 16rpx;
				}

				.text {
					color: #fff;
				}
			}

			.nums {
				font-size: 60rpx;
				color: #fff;
				font-weight: 600;
				text-align: center;
			}
		}

		.list {
			background-color: #f5f5f5;
			padding: 40rpx 32rpx;
			border-radius: 16rpx;

			.item {
				padding-bottom: 40rpx;
				margin-bottom: 40rpx;
				justify-content: space-between;
				align-items: flex-start;
				border-bottom: 1px solid #d8dce1;

				&:nth-last-child(1) {
					padding-bottom: 0;
					margin-bottom: 0;
					border: none;
				}

				.left {
					.icon {
						width: 28rpx;
						height: 28rpx;
						margin-left: 20rpx;
					}
				}

				.right {
					text-align: right;

					.num {
						font-size: 32rpx;
					}

					.time {
						font-size: 24rpx;
						color: #909090;
						margin-top: 12rpx;
					}
				}
			}
		}


	}
}
</style>