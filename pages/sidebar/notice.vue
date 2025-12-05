<template>

	<view class="notice">
		<Layout></Layout>
		<view class="content">
			<view class="title">
				{{ $t('notice') }}
			</view>

			<view class="list">
				<view class="item flex" v-for="(item, index) in list" :key="index"
					@click="goLink('/pages/sidebar/notice_datails?id=' + item.id)">
					<view class="left">
						<view class="item_title">
							{{ item.title }}
						</view>
						<view class="item_content text-over" v-html="item.content"> </view>
						<view class="item_time">
							{{ item.publishTime | dateFormat }}
						</view>
					</view>
					<image src="@/static/arrow_right.png" mode="" class="arrow"></image>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
export default {
	data() {
		return {
			list: []
		}
	},
	onShow() {
		this.$api.noticeAll().then((res) => {
			this.list = res.data;
		})
	},

	methods: {
		goLink(url) {
			uni.navigateTo({
				url
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.notice {
	.content {
		padding: 0 32rpx;

		.title {
			margin: 60rpx 0;
			font-size: 50rpx;
			font-weight: 600;
		}

		.item {
			border: 1px solid #d8dce1;
			border-radius: 20rpx;
			padding: 32rpx;
			margin-bottom: 24rpx;

			.left {
				width: 0;
				flex: 1;
			}

			.arrow {
				flex-shrink: 0;
				width: 16rpx;
				height: 32rpx;
				margin-left: 32rpx;
			}

			.item_title {
				font-size: 30rpx;
				font-weight: 600;
			}

			.item_content {
				margin: 20rpx 0;

				overflow: hidden;
				text-overflow: ellipsis;
				/* 超出部分省略号 */
				word-break: break-all;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.item_time {
				color: #909090;
				font-size: 24rpx;
			}
		}
	}
}
</style>