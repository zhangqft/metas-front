<template>

	<view class="dao">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<!-- {{$t('dao')}} -->
				<image src="@/static/DAO.png" mode="" class="icon"></image>
				{{$t('dao')}}
			</view>

			<view class="desc">
				{{$t('dao_text')}}
			</view>
			<!-- <view class="desc">
				<markcown :source="desc" :showLine="false"></markcown>
			</view> -->
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				desc: '社区自治，对重要的事情进行投票治理'
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
	}
</style>