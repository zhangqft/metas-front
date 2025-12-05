<template>

	<view class="dao">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<image src="@/static/FAQ.png" mode="" class="icon"></image>
				FAQ
			</view>

			<view class="list">
				<view class="item flex">
					User Guide - English
					<image src="@/static/share.png" mode="" class="icon"
						@click='toUrl(`https://metas-1.gitbook.io/metas-docs/en`)'></image>
				</view>
				<view class="item flex">
					新手教程 - 简体中文
					<image src="@/static/share.png" mode="" class="icon" @click="toUrl(`
						https://metas-1.gitbook.io/metas-docs`)"></image>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			toUrl(url) {
				window.open(url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dao {
		.content {
			padding: 0 32rpx;

			.icon {
				width: 44rpx;
				height: 44rpx;
				margin-right: 26rpx;
			}

			.title {
				margin: 60rpx 0 20rpx;
				font-size: 50rpx;
				font-weight: 600;
			}


		}

		.list {
			margin-top: 48rpx;

			.item {
				justify-content: space-between;
				background-color: #f3f4f6;
				border-radius: 40rpx;
				height: 132rpx;
				padding: 0 32rpx;
				font-size: 30rpx;
				font-weight: 600;
				margin-bottom: 28rpx;

				.icon {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>