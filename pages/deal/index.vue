<template>
	<view class="swap-page">
		<Layout></Layout>
		<view class="content">
			<!-- 顶部信息 -->
			<view class="header">
				<view class="title">METAS/USDT</view>
				<view class="sub flex items-center">
					<view class="price">${{ metasPrice }}</view>
					<view class="rate">{{ rate }}%</view>
				</view>
			</view>

			<!-- 从 / 至 -->
			<view class="swap-box">
				<!-- 从 -->
				<view class="swap-item">
					<view class="row between">
						<view class='hint'>{{ $t('from') }}</view>
						<view class="balance">Balance: {{ metasBalance | numfixed(2) }}</view>
					</view>
					<view class="token flex between">
						<view class="token-info flex items-center">
							<image src="@/static/logo.png" mode="" class="metas"></image>
							<view class="flex-col">
								<view class="name">METAS</view>
								<view class="chain">BNB Chain</view>
							</view>
						</view>
						<view class="amount">0.00</view>
					</view>
				</view>

				<!-- 中间切换按钮 -->
				<view class="switch-btn flex-center">
					<!-- <view class="icon exchange"></view> -->
					<image src="@/static/deal_1.png" mode="" class="deal_1"></image>
					<image src="@/static/deal_2.png" mode="" class="deal_2"></image>
				</view>

				<!-- 至 -->
				<view class="swap-item">
					<view class="row between">
						<view class='hint'>{{ $t('arrive') }}</view>
						<view class="balance">Balance: {{ usdtBalance | numfixed(2) }}</view>
					</view>
					<view class="token flex between">
						<view class="token-info flex items-center">
							<image src="@/static/usdt.png" mode="" class="metas"></image>
							<view class="flex-col">
								<view class="name">USDT</view>
								<view class="chain">BNB Chain</view>
							</view>
						</view>
						<view class="amount">0.00</view>
					</view>
				</view>
				<!-- 兑换按钮 -->
				<view class="swap-btn swap_active">{{ $t('link_wallet') }}</view>
			</view>



			<!-- 汇总信息 -->
			<!-- <view class="summary">
				<view class="row between">
					<view class='left'>{{ $t('predict') }}</view>
					<view class="highlight">109.584567 USDT</view>
				</view>
				<view class="row between">
					<view class='left'>{{ $t('astrict') }}</view>
					<view>0.5%</view>
				</view>
				<view class="row between">
					<view class='left'>{{ $t('reference_price') }}</view>
					<view>1 METAS ≈ 0.58 USDT</view>
				</view>
				<view class="row between">
					<view class='left'>{{ $t('conversion_path') }}</view>
					<view>PancakeSwap V2</view>
				</view>
			</view> -->
		</view>

	</view>
</template>

<script>
import { ethers } from "ethers";
import { BigNumber } from "bignumber.js"
import erc20Abi from '@/abi/erc20.json'
import pledgeAbi from '@/abi/Pledge.json'
export default {
	name: 'SwapPage',
	data() {
		return {
			usdtBalance: 0,
			metasBalance: 0,
			metasPrice: 0,
			rate: 0,
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

		this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.metas_contract).then((res) => {
			this.metasBalance = ethers.formatUnits(res.result, 'ether');
		})

		this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract).then((res) => {
			this.usdtBalance = ethers.formatUnits(res.result, 'ether');
		})

		let pledgeMetasValue = 1000000000000000000n;
		this.$etherCall.contactFunctionCall(pledgeAbi, "get_buy", [pledgeMetasValue], this.$config.pledge_contract).then(res => {
			this.metasPrice = BigNumber(res.result).dividedBy(BigNumber(pledgeMetasValue)).toFixed(8);

			this.$api.openPrice().then(res => {
				this.rate = (BigNumber(this.metasPrice).minus(BigNumber(res.data.value))).dividedBy(BigNumber(res.data.value)).times(100).toFixed(2)
			})
		})
	}
};
</script>

<style lang="scss" scoped>
/* 全局布局 */
.swap-page {
	background-color: #fff;
	min-height: 100vh;
}

.content {
	padding: 0 32rpx;
}


.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.between {
	justify-content: space-between;
}

.items-center {
	align-items: center;
}

.flex-col {

	.name {
		font-size: 36rpx;
		font-weight: 600;
		margin-bottom: 8rpx;
	}

	.chain {
		font-size: 24rpx;
		color: #030606;
	}
}


/* 顶部汇率 */
.header {
	width: 100%;
	margin: 60rpx 0 40rpx;
}

.title {
	font-size: 48rpx;
	font-weight: 600;
}

.sub {
	margin-top: 36rpx;
}

.price {
	font-size: 40rpx;
	color: #f7931a;
	margin-right: 24rpx;
}

.rate {
	color: #e94b19;
	font-size: 28rpx;
}

/* 兑换区块 */
.swap-box {
	width: 100%;
	background-color: #f5f5f5;
	border-radius: 40rpx;
	padding: 36rpx 32rpx;
}

.swap-item {
	border-radius: 20rpx;
	// padding: 20rpx;
	margin-bottom: 20rpx;

	.hint {
		font-weight: 600;
	}
}

.row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 32rpx;
}

.balance {
	font-size: 24rpx;
	color: #707a8a;
}

.token {
	background-color: #d8dce1;
	border-radius: 44rpx;
	padding: 40rpx 32rpx;
}

.token-info {
	gap: 10rpx;
}

.chain {
	font-size: 22rpx;
	color: #999;
	margin-top: 6rpx;
}

.amount {
	font-size: 44rpx;
	font-weight: 600;
	color: #707a8a;
}

.switch-btn {
	margin: 20rpx 0;
	position: relative;
	height: 80rpx;

	.deal_1 {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.deal_2 {
		width: 32rpx;
		height: 36rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}



/* 模拟代币图标 */
.metas {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	margin-right: 16rpx;
}

.icon.usdt {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	background: #26a17b;
}

/* 按钮 */
.swap-btn {
	width: 100%;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	background-color: #82b7ff;
	color: #fff;
	font-size: 32rpx;
	font-weight: 500;
	border-radius: 60rpx;
	margin: 60rpx auto 16rpx;
}

.swap_active {
	background-color: #278ffe;
}

/* 汇总信息 */
.summary {
	width: 100%;
	background-color: #f5f5f5;
	border-radius: 20rpx;
	padding: 40rpx 32rpx;
	font-size: 24rpx;
	margin: 48rpx 0 60rpx;
}

.summary .row {
	margin-bottom: 36rpx;

	&:nth-last-child(1) {
		margin-bottom: 0;
	}

	.left {
		color: #707a8a;
	}
}

.highlight {
	font-weight: 600;
	background-color: #63c8b1;
	padding: 8rpx;
	border-radius: 8rpx;
	color: #fff;
}

/* 底部导航 */
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	background-color: #fff;
	border-top: 1rpx solid #eee;
}

.nav-item {
	flex: 1;
	text-align: center;
	line-height: 100rpx;
	font-size: 28rpx;
	color: #333;
}
</style>