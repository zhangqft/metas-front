<template>
	<view class="recommend">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<image src="@/static/invite.png" class="invite_icon" mode="widthFix"></image> {{ $t('nominate') }}
			</view>
			<view class="title_desc">
				{{ $t('nominate_desc') }}
				<!--<text>{{ $t('know') }}</text>-->
			</view>

			<view class="info flex">
				<view class="item flex">
					{{ $t('nominate_level') }}：
					<text style="color: #f7931a;">{{ userInfo.level }}</text>
					<image src="@/static/share_2.png" mode="widthFix" class="copy"
						@click="toPath('/pages/recommend/level')"></image>
				</view>
				<view class="item flex">
					{{ $t('code') }}：{{ inviteInfo.shareCode }}
					<image src="@/static/copy.png" mode="widthFix" class="copy" @click="copyCode"></image>
				</view>
			</view>

			<view class="copy_btn" @click="copyUrl"> {{ $t('copy_url') }} </view>

			<view class="datas flex">
				<view class="block" @click="toPath('/pages/recommend/myList')">
					<view class="data_title ">
						<view class="flex">
							{{ $t('nominate_user') }}
							<l-popover :content="$t('user_describe')" theme="dark" placement="bottom-left">
								<view style="height: 100%; width: 30rpx;margin-left: 6rpx;">
									<image src="/static/show1.png" style="width: 22rpx;height: 22rpx;"
										mode="scaleToFill" />
								</view>
							</l-popover>
						</view>
						<view class="num">
							<text style="margin-right: 12rpx;">{{ userInfo.shareNum }}</text> <text
								style="font-size: 30rpx;">({{ userInfo.validNum }})</text>
						</view>
					</view>
					<image src="@/static/arrow_right.png" mode="widthFix" class="arrow"></image>
				</view>
				<view class="block">
					<view class="data_title">
						{{ $t('alliance_user') }}
						<view class="num">
							{{ userInfo.teamNum }}
						</view>
					</view>
				</view>

				<view class="block" style="width: 100%;background-color: #eaf4ff;">
					<view class="data_title">
						<view class="flex top">
							<text>{{ $t('all_pledge') }}</text>
							<text class="update">{{ $t('数据更新于') }}:{{ getLastPassedTime() }}</text>
						</view>
						<view class="num">
							${{ userInfo.teamValue }}
						</view>
						<view class="yester">
							+${{ userInfo.teamNewAdd | numfixed(2) }} {{ $t('昨日') }}
						</view>
					</view>
				</view>

				<view class="block" style="width: 100%;background-color: #fff5e9;">
					<view class="data_title">
						<view class="flex top">
							<text> {{ $t('alliance_pledge') }}</text>
							<text class="update">{{ $t('数据更新于') }}: {{ getLastPassedTime() }}</text>
						</view>
						<view class="num">
							${{ userInfo.areaValue }}
						</view>
						<view class="yester">
							+${{ userInfo.areaNewAdd | numfixed(2) }} {{ $t('昨日') }}
						</view>
					</view>
				</view>
			</view>

			<!-- 			<view class="tabs flex">
				<view :class="['item', { active: tabsIndex == index }]" v-for="(item, index) in tabs" :key="index">
					{{ $t(item.key) }}
				</view>
			</view>

			<view class="list">
				<view class="item" v-for="(item, index) in teamInfo.shareList" :key="index">
					<view class="head flex">
						<view class="left">
							{{ item.account }}
						</view>
						<view class="right">
							{{ $t('code') }}: {{ item.uid }}
						</view>
					</view>
					<view class="footer flex">
						<view class="tags flex">
							<view class="tag" v-if="item.nodeType > 0">
								{{ $t('node') }}
							</view>
							<view class="tag">
								V{{ item.level }}
							</view>
						</view>
						<view class="time">
							{{ item.createTime | dateFormat }}
						</view>
					</view>
				</view>
			</view> -->


			<view class="classify">
				<view class="classify_title flex">
					<view class="text">
						{{ $t('联盟质押分类数据') }}
					</view>
					<view class="time">
						{{ $t('数据更新于') }}：{{ getLastPassedTime() }}
					</view>
				</view>


				<view class="classify_list flex">
					<view class="item">
						<view class="day">
							{{ $t('pledge') }} 1{{ $t('day_2') }}
						</view>
						<view class="nums">
							{{ userInfo.day1Value }}
						</view>
					</view>
					<view class="item">
						<view class="day">
							{{ $t('pledge') }} 7{{ $t('day_2') }}
						</view>
						<view class="nums">
							{{ userInfo.day7Value }}
						</view>
					</view>
					<view class="item">
						<view class="day">
							{{ $t('pledge') }} 30{{ $t('day_2') }}
						</view>
						<view class="nums">
							{{ userInfo.day30Value }}
						</view>
					</view>
					<view class="item">
						<view class="day">
							{{ $t('pledge') }} 90{{ $t('day_2') }}
						</view>
						<view class="nums">
							{{ userInfo.day90Value }}
						</view>
					</view>
					<view class="item">
						<view class="day">
							{{ $t('pledge') }} 180{{ $t('day_2') }}
						</view>
						<view class="nums">
							{{ userInfo.day180Value }}
						</view>
					</view>
					<view class="item">
						<view class="day">
							{{ $t('pledge') }} 360{{ $t('day_2') }}
						</view>
						<view class="nums">
							{{ userInfo.day360Value }}
						</view>
					</view>
				</view>

			</view>

		</view>

	</view>

</template>

<script>
// import Layout from '@/components/Layout/index.vue'
export default {
	// components: {
	// 	Layout
	// },
	data() {
		return {
			tabs: [{
				label: this.$t('nominate_my'),
				value: '',
				key: "nominate_my"
			}],
			tabsIndex: 0,
			inviteInfo: {
				shareUrl: "",
				shareCode: "",
			},
			userInfo: {
				account: "",
				level: "",
				shareNum: "",
				teamNum: "",
				teamValue: "",
				areaValue: ""
			},
			teamInfo: {}
		}
	},
	onShow() {

		if (!uni.getStorageSync("walletAccount")) {
			uni.showToast({
				title: 'login first',
				icon: 'none',
				duration: 2000,
				mask: true
			});
			return;
		}

		this.memberShare();
		this.getMemberInfo();
		this.getTeamInfo();
	},
	methods: {
		toPath(path) {
			uni.navigateTo({
				url: `${path}`
			})
		},
		copyUrl() {
			let that = this
			let url = this.inviteInfo.shareUrl
			uni.setClipboardData({
				data: url,
				showToast: false,
				success() {
					uni.showToast({
						title: that.$t('copy_succeed'),
						icon: 'none'
					})
				}
			})
		},
		copyCode() {
			let that = this
			uni.setClipboardData({
				data: this.inviteInfo.shareCode,
				showToast: false,
				success() {
					uni.showToast({
						title: that.$t('copy_succeed'),
						icon: 'none'
					})
				}
			})
		},

		memberShare() {
			if (uni.getStorageSync("walletAccount") != "") {
				this.$api.memberShare().then((res) => {
					this.inviteInfo = res.data;
				});
			}
		},
		getMemberInfo() {
			this.$api.memberInfo().then((res) => {
				if (res.code == 0) {
					this.userInfo = res.data;
					console.log(this.userInfo)
				}
			});
		},
		getTeamInfo() {
			this.$api.getTeamInfo().then(res => {
				this.teamInfo = res.data
			})
		},


		getLastPassedTime() {
			const now = new Date();
			const currentHours = now.getHours();
			const currentMinutes = now.getMinutes();

			// 定义所有时间点（24小时制）
			const timePoints = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];

			// 将当前时间转换为总分钟数便于比较
			const currentTotalMinutes = currentHours * 60 + currentMinutes;

			// 找到刚过的时间点
			for (let i = timePoints.length - 1; i >= 0; i--) {
				const timePointTotalMinutes = timePoints[i] * 60 + 30;

				if (currentTotalMinutes >= timePointTotalMinutes) {
					return `${timePoints[i].toString().padStart(2, '0')}:30`;
				}
			}

			// 如果当前时间早于1:30，返回前一天的23:30
			return "23:30";
		}



	}
}
</script>

<style lang="scss" scoped>
.content {
	padding: 0 32rpx;
	margin-top: 64rpx;

	.title {
		font-weight: 600;
		font-size: 50rpx;
	}

	.invite_icon {
		width: 44rpx;
		height: 44rpx;
		margin-right: 26rpx;
	}

	.title_desc {
		margin: 20rpx 0 48rpx 0;

		text {
			color: #278ffe;
		}
	}

	.info {
		justify-content: space-between;

		.item {
			width: 320rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 16rpx;
			border: 1px solid #c0ebda;
			text-align: center;
			font-weight: 600;
			justify-content: center;

			.copy {
				width: 32rpx;
				height: 32rpx;
				margin-left: 16rpx;
			}
		}
	}

	.copy_btn {
		width: 100%;
		background-color: #63c8b1;
		color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 16rpx;
		margin: 26rpx auto;
	}

	.datas {
		flex-wrap: wrap;

		.block {
			width: calc(50% - 16rpx);
			margin-right: 16rpx;
			background-color: #f5f5f5;
			border-radius: 16rpx;
			padding: 20rpx 32rpx;
			margin-bottom: 28rpx;
			position: relative;

			&:nth-child(2n) {
				margin-right: 0;
			}

			.data_title {
				font-size: 28rpx;
				font-weight: 600;

				.top {
					justify-content: space-between;

					.update {
						font-size: 24rpx;
						color: #909090;
						font-weight: 400;
					}
				}
			}

			.yester {
				color: #f7931a;
				font-size: 28rpx;
				margin-top: 16rpx;
			}

			.num {
				color: #f7931a;
				font-size: 60rpx;
				font-weight: 400;
				margin-top: 16rpx;
			}

			.arrow {
				position: absolute;
				right: 32rpx;
				top: 26rpx;
				// transform: translateY(-50%);
				width: 16rpx;
			}
		}
	}

	.tabs {
		margin: 60rpx auto 0;

		.item {
			font-weight: 600;
			font-size: 32rpx;
			padding-bottom: 10rpx;
			position: relative;

		}

		.active {
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 6rpx;
				background-color: #278ffe;
				left: 0;
				bottom: 0;
			}
		}
	}

	.list {
		margin-top: 32rpx;

		.item {
			padding: 32rpx;
			background-color: #f5f5f5;
			border-radius: 16rpx;
			margin-bottom: 28rpx;
			font-size: 24rpx;
			color: #000;
		}

		.head {
			justify-content: space-between;
			margin-bottom: 16rpx;

		}

		.footer {
			justify-content: space-between;
		}

		.tags {
			.tag {
				padding: 10rpx 32rpx;
				border: 1px solid #d8dce1;
				border-radius: 16rpx;
				margin-right: 16rpx;
			}
		}

		.time {
			color: #909090;
		}
	}

	.classify {
		margin: 48rpx 0 28rpx;

		.classify_title {
			justify-content: space-between;
			margin-bottom: 28rpx;

			.text {
				font-weight: 600;
				font-size: 28rpx;
			}

			.time {
				color: #909090;
				font-size: 24rpx;
			}
		}

		.classify_list {
			flex-wrap: wrap;

			.item {
				width: calc(50% - 12rpx);
				margin-right: 16rpx;
				padding: 20rpx 32rpx;
				border: 1px solid #d8dce1;
				border-radius: 16rpx;
				margin-bottom: 28rpx;

				&:nth-child(2n) {
					margin-right: 0;
				}

				.day {
					color: #909090;
					font-weight: 600;
				}

				.nums {
					margin-top: 16rpx;
					font-weight: 600;
					font-size: 32rpx;
				}
			}
		}

	}

}
</style>