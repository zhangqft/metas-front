<template>
	<view class="bill">
		<Layout></Layout>
		<view class="content">
			<view class="header flex">
				<image src="@/static/back.png" mode="widthFix" class="back" @click="back"></image>
				{{ $t('release_history') }}
			</view>


			<view class="list">
				<view class="item" v-for="(item, index) in recordList" :key="index">
					<view class="left">
						<view class="title flex">{{$t(releaseTitle(item.awardType)) }}</view>
						<view class="time">time&nbsp;&nbsp;:&nbsp;&nbsp;{{ item.createTime | dateFormat }}</view>
						<view class="time">UN Fee&nbsp;&nbsp;:&nbsp;&nbsp;({{ getRate(item.releaseType)
							}}%)&nbsp;&nbsp;{{ item.unFee }}&nbsp;&nbsp;METAS</view>
						<view class="time">{{$t('释放状态')}}&nbsp;&nbsp;:&nbsp;&nbsp;{{ $t(releaseState(item)) }}</view>
					</view>
					<view class="right">
						<view class="title flex">{{ item.releaseValue | numfixed(2) }} METAS</view>
						<view class="day">
							Day&nbsp;&nbsp;:&nbsp;&nbsp;{{ item.curReleasePeriod }}&nbsp;&nbsp;/&nbsp;&nbsp;{{
								item.releasePeriod }}</view>
						<view class="status">&nbsp;</view>
						<view class="status">&nbsp;</view>
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
				recordList: [],
			}
		},
		onShow() {
			this.$api.releaseLog().then(res => {
				this.recordList = res.data;
				console.log(this.recordList)
			})
		},
		methods: {
			back() {
				uni.navigateBack(1)
			},
			releaseTitle(awardType) {
				if (awardType == 1)
					return "释放 - 质押收益"
				if (awardType == 1)
					return "释放 - 质押收益"
				if (awardType == 4)
					return "释放 - 节点收益"
			},
			releaseState(item) {
				if (item.txState == 0 && item.flag == 1) {
					return "待确认"
				}
				if (item.txState == 0 && item.flag == 0) {
					return "失败"
				}
				if (item.txState == 1 && item.state == 0) {
					return "释放中"
				}
				if (item.txState == 1 && item.state == 1) {
					return "释放完成"
				}
			},
			getRate(releaseType) {
				if (releaseType == 1) {
					return 20;
				}
				if (releaseType == 2) {
					return 15;
				}
				if (releaseType == 3) {
					return 10;
				}
				if (releaseType == 4) {
					return 5;
				}
				if (releaseType == 5) {
					return 0;
				}
			}
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


		}
	}

	.list {
		margin-top: 60rpx;

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0 30rpx 0;
			margin-bottom: 30rpx;
			border-bottom: 1rpx solid #eee;

			.title {
				font-size: 32rpx;
				color: #0f1a1e;
				font-weight: 500;
			}

			.left .time {
				font-size: 24rpx;
				color: #999;
				font-weight: 400;
				margin-top: 20rpx;
			}

			.right {
				text-align: right;

				.day {
					font-size: 24rpx;
					color: #F7931A;
					margin-top: 20rpx;
					font-weight: 700;
				}

				.status {
					font-size: 24rpx;
					color: #999;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>