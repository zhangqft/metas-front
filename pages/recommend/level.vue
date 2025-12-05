<template>

	<view class="level">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<image src="@/static/back.png" mode="widthFix" class="icon" @click="back"></image>
				{{ $t('我的推荐级别') }}
			</view>

			<view class="info">
				<image src="@/static/level_icon.png" mode="widthFix" class="level_icon"></image>
				<view class="level_text">
					V{{ userInfo.level }}
				</view>
				<view class="row flex">
					<view class="text">
						{{ $t('pledge') }}：
					</view>
					<view class="value">
						${{ userInfo.myValue }}
					</view>
				</view>
				<view class="row flex">
					<view class="text">
						{{ $t('推荐质押用户') }}：
					</view>
					<view class="value">
						{{ userInfo.validNum }}
					</view>
				</view>
				<view class="row flex">
					<view class="text">
						{{ $t('小联盟质押') }}：
					</view>
					<view class="value">
						${{ userInfo.areaValue }}
					</view>
				</view>
			</view>

			<view class="card_title">
				{{ $t('下一阶段任务') }}
			</view>

			<view class="task">
				<view class="item flex">
					<image src="@/static/logo.png" mode="widthFix" class="task_icon"></image>
					<view class="right">
						<view class="text">
							{{ $t('质押 METAS') }}
						</view>
						<view class="desc">
							{{ $t("晋升到下一级别需要质押") }}：<text>{{nextLevel.A}}</text>
						</view>
					</view>
				</view>
				<view class="item flex">
					<image src="@/static/task.png" mode="widthFix" class="task_icon"></image>
					<view class="right">
						<view class="text">
							{{ $t('推荐更多用户质押') }}
						</view>
						<view class="desc">
							{{ $t("晋升到下一级别需要推荐质押用户") }}：<text>{{nextLevel.B}}</text>
						</view>
					</view>
				</view>
				<view class="item flex">
					<image src="@/static/task_2.png" mode="widthFix" class="task_icon"></image>
					<view class="right">
						<view class="text">
							{{ $t('alliance_pledge') }}
						</view>
						<view class="desc">
							{{ $t("晋升到下一级别需要小联盟质押") }}：<text>{{nextLevel.C}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="card_title">
				{{ $t('升级标准') }}
			</view>


			<view class="table">

				<view class="th flex">
					<view class="item">
						{{ $t('级别') }}
					</view>
					<view class="item">
						{{ $t('指标A') }}
					</view>
					<view class="item">
						{{ $t('指标B') }}
					</view>
					<view class="item">
						{{ $t('指标C') }}
					</view>
				</view>
				<view class="td flex" v-for="(item, index) in levelList" :key="index">
					<view class="item">
						{{ item.name }}
					</view>
					<view class="item">
						{{ item.A }}
					</view>
					<view class="item">
						{{ item.B }}
					</view>
					<view class="item">
						{{ item.C }}
					</view>
				</view>
			</view>

			<view class="explain">
				<view class="text">
					{{ $t('说明') }}：
				</view>
				<ul>
					<li>
						{{ $t('指标A') }}：{{ $t('你质押的 METAS 价值') }}
					</li>
					<li>
						{{ $t('指标B') }}：{{ $t('你推荐的质押用户数量') }}
					</li>
					<li>
						{{ $t('指标C') }}：{{ $t('小联盟质押价值') }}
					</li>
				</ul>
			</view>

		</view>
	</view>

</template>

<script>

export default {
	data() {
		return {
			levelList: [{
				name: "V1",
				A: "$100",
				B: "3",
				C: "$3000",
				level: 1
			},
			{
				name: "V2",
				A: "$500",
				B: "4",
				C: "$10000",
				level: 2
			},
			{
				name: "V3",
				A: "$1000",
				B: "5",
				C: "$50000",
				level: 3
			},
			{
				name: "V4",
				A: "$2000",
				B: "6",
				C: "$100000",
				level: 4
			},
			{
				name: "V5",
				A: "$3000",
				B: "7",
				C: "$200000",
				level: 5
			},
			{
				name: "V6",
				A: "$4000",
				B: "8",
				C: "$500000",
				level: 6
			},
			{
				name: "V7",
				A: "$5000",
				B: "9",
				C: "$1000000",
				level: 7
			},
			{
				name: "V8",
				A: "$6000",
				B: "10",
				C: "$3000000",
				level: 8
			},
			{
				name: "V9",
				A: "$7000",
				B: "11",
				C: "$6000000",
				level: 9
			},
			{
				name: "V10",
				A: "$8000",
				B: "12",
				C: "V9 x 2",
				level: 10
			},
			{
				name: "V11",
				A: "$9000",
				B: "13",
				C: "V10 x 2",
				level: 11
			},
			{
				name: "V12",
				A: "$10000",
				B: "13",
				C: "V11 x 2",
				level: 12
			},
			{
				name: "V13",
				A: "$10000",
				B: "13",
				C: "V12 x 2",
				level: 13
			}
			],
			userInfo: {},
			nextLevel: []
		}
	},
	onShow() {
		this.$api.memberInfo().then((res) => {
			if (res.code == 0) {
				this.userInfo = res.data;
				this.levelList.push({ name: "V0", A: "$0", B: "0", C: "$0", level: 0 })
				this.nextLevel = this.levelList.find(item => item.level === (this.userInfo.level + 1))
				this.levelList.pop();
			}
		});
	},
	methods: {
		back() {
			uni.navigateBack(1)
		},
	}
}
</script>

<style lang="scss" scoped>
.content {
	padding: 0 32rpx;
	overflow: hidden;

	.icon {
		width: 28rpx;
		margin-right: 30rpx;
	}

	.title {
		margin: 60rpx 0 48rpx;
		font-size: 50rpx;
		font-weight: 600;
	}

	.info {
		border-radius: 20rpx;
		padding: 72rpx 0 48rpx 32rpx;
		background: linear-gradient(to right, #deeefe, #e7f6f3);
		position: relative;
		box-shadow: 0px 8rpx 8rpx rgba(0, 0, 0, .25);

		.level_icon {
			width: 80rpx;
			height: 80rpx;
			position: absolute;
			right: 64rpx;
			top: 48rpx;
		}

		.level_text {
			position: absolute;
			font-size: 44rpx;
			font-weight: 600;
			right: 64rpx;
			bottom: 48rpx;
		}

		.row {
			margin-bottom: 8rpx;

			.text {
				color: #707a8a;
				font-size: 24rpx;
			}

			.value {
				color: #030606;
				font-size: 24rpx;
				font-weight: 600;
			}
		}
	}

	.card_title {
		font-size: 28rpx;
		font-weight: 600;
		margin: 48rpx 0;
	}

	.task {
		.item {
			margin-bottom: 48rpx;

			.task_icon {
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;
				flex-shrink: 0;
			}

			.text {
				font-weight: 600;
				margin-bottom: 16rpx;
			}

			.desc {
				color: #707a8a;
				font-size: 24rpx;

				text {
					font-weight: 600;
					color: #030606;
				}
			}
		}
	}

	.th {
		border-bottom: 1px solid #d8dce1;
		padding-bottom: 20rpx;
	}

	.th,
	.td {
		margin-bottom: 20rpx;
		color: #707a8a;

		.item {
			width: 25%;
			text-align: left;
		}
	}

	.explain {
		color: #707a8a;
		font-size: 24rpx;
		margin: 48rpx 0;

		.text {
			margin-bottom: 8rpx;
		}

		ul {
			padding-left: 58rpx;
		}

		li {
			margin-bottom: 16rpx;
		}
	}

}
</style>