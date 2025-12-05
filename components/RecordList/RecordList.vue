<template>
	<view class="record-list">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="left">
				<view class="title flex">
					{{$t(item.title)}}
					<image src="@/static/pledge_icon.png" mode="widthFix" class="icon"
						v-if="item.type == 3 || item.type == 4 || item.type == 5"></image>
				</view>
				<view class="time">{{ item.datetime | dateFormat }}</view>
			</view>
			<view class="right">
				<view
					:class="['amount ', item.type == 5 || item.type == 3 ? '123' : item.amount > 0 ? 'plus' : 'minus']">
					{{ item.amount > 0 && item.type != 5 && item.type != 3 ? '+' : '' }} {{ item.amount }} METAS
				</view>
				<view class="status">{{ item.state == 1 ? $t('completed') : '进行中' }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'RecordList',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
	methods: {

	},
};
</script>

<style lang="scss" scoped>
.record-list {
	/* padding: 20rpx; */
}

.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 0 40rpx 0;
	margin-bottom: 40rpx;
	border-bottom: 1rpx solid #eee;
}

.left .title {
	font-size: 32rpx;
	color: #0f1a1e;
	font-weight: 600;

	.icon {
		width: 28rpx;
		height: 28rpx;
		margin-left: 20rpx;
	}
}

.left .time {
	font-size: 24rpx;
	color: #999;
	margin-top: 12rpx;
}

.right {
	text-align: right;
}

.amount {
	font-size: 32rpx;


}

.amount.plus {
	color: #00c853;
}

.amount.minus {
	color: #ff5252;
}

.status {
	font-size: 24rpx;
	color: #999;
	margin-top: 12rpx;
}

.end {
	text-align: center;
	color: #999;
	font-size: 26rpx;
	margin-top: 40rpx;
}

.empty {
	text-align: center;
	color: #aaa;
	font-size: 26rpx;
	margin-top: 80rpx;
}
</style>