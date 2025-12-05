<template>

	<view class="dao">
		<Layout></Layout>
		<view class="content">
			<view class="title">
				{{ this.$t('fisc') }}
			</view>

		</view>
	</view>

</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.dao {
	.content {
		padding: 0 32rpx;

		.title {
			margin: 60rpx 0;
			font-size: 50rpx;
			font-weight: 600;
		}


	}
}
</style>