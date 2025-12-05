<template>

	<view class="notice_datails">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<image src="@/static/back.png" mode="widthFix" class="back_icon"></image> {{ $t('notice_datails') }}
			</view>
			<view class="notice_title text-over2">
				{{ details.title }}
			</view>
			<view class="time">
				{{ details.publishTime | dateFormat }}
			</view>
			<view class="notice_content">
				<markcown :source="details.content" :showLine="false"></markcown>
			</view>
		</view>
	</view>

</template>

<script>
export default {
	data() {
		return {
			details: {}
		}
	},
	onLoad(options) {
		this.getNoticeDetail(options.id)
	},
	methods: {
		getNoticeDetail(id) {
			this.$api.noticeDetail({
				id
			}).then((res) => {
				this.details = res.data;
				console.log(this.details)
			})
		},
		goLink(url) {
			uni.navigateTo({
				url
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.notice_datails {
	.content {
		padding: 0 32rpx;

		.back_icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 20rpx;
		}

		.title {
			margin: 60rpx 0;
			font-size: 50rpx;
			font-weight: 600;
		}

		.notice_title {
			font-size: 36rpx;
			font-weight: 500;
		}

		.time {
			color: #909090;
			font-size: 24rpx;
			margin: 32rpx 0 28rpx;
		}

		.notice_content {}

	}
}
</style>