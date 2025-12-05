<template>
	<view class="">
		<Layout></Layout>
		<view class="container">
			<!-- 标题 -->
			<view class="header">
				<image src="@/static/meter_icon.png" mode="" class="meter_icon"></image>
				<text class="title">{{ $t('dashboard') }}</text>
			</view>

			<!-- METAS合约地址 -->
			<view class="section">
				<view class="section-title" style="color: #f7931a;">
					<image src="/static/pledge_icon.png" mode="" class="icon"></image>
					<view style="line-height:36rpx;">{{ $t('contract_site') }}</view>
				</view>
				<view class="address-container flex">
					<text class="address">{{ this.$config.metas_contract }}</text>
					<image src="@/static/copy.png" mode="widthFix" class="copy" @tap="copyAddress('metas_contract')">
					</image>
					<!-- <button class="copy-btn" @tap="copyAddress">复制</button> -->
				</view>
			</view>
			<view class="line"></view>
			<!-- 统计数据 -->
			<view class="section">
				<view class="section-title flex">
					<image src="@/static/Statistics.png" mode="" class="icon"></image>
					{{ $t('stat_data') }}
				</view>
				<view class="stats-grid">
					<view class="stat-item">
						<text class="stat-label">{{ $t('current_price') }}</text>
						<text class="stat-value">$ {{ this.currentPrice | numfixed(4) }}</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">{{ $t('issue_price') }}</text>
						<text class="stat-value">$ 0.6</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">{{ $t('supply_all') }}</text>
						<text class="stat-value">13,000,000</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">{{ $t('market_all') }}</text>
						<text class="stat-value">$ {{ (13000000 * this.currentPrice) | numfixed(2) }}</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">{{ $t('circulate') }}</text>
						<text class="stat-value">{{ this.circulateValue | numfixed(2) }}</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">{{ $t('circulate_market') }}</text>
						<text class="stat-value">${{ (this.circulateValue * this.currentPrice) | numfixed(2) }}</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">{{ $t('pledge_alls') }}</text>
						<text class="stat-value">{{ this.pledgeValue | numfixed(2) }}</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">{{ $t('output') }}</text>
						<text class="stat-value">{{ this.produceValue | numfixed(2) }}</text>
					</view>
					<view class="stat-item">
						<text class="stat-label">{{ $t('destroy_num') }}</text>
						<text class="stat-value">{{ destroyTotal | numfixed(2) }}</text>
					</view>
				</view>
			</view>
			<!-- <view class="line"></view> -->
			<!-- 智能合约 -->
			<!-- <view class="section">
				<view class="section-title">{{ $t('smart_contract') }}</view>
				<view class="contract-list">
					<view class="contract-item flex" v-for="(item, index) in contractList" :key="index">
						<view class="left">
							<view class="contract-label flex">
								<image :src="item.img" mode="widthFix" class="img" v-if="item.img"></image>
								{{ item.title }}
							</view>
							<view class="contract-address">
								{{ item.key }}
							</view>
						</view>
						<image src="@/static/share.png" mode="" class="share" @tap="copyAddress(item.key)"></image>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import statAbi from '@/abi/Stat.json'
	import {
		ethers
	} from "ethers";
	import pledgeAbi from '@/abi/Pledge.json'
	import {
		BigNumber
	} from 'bignumber.js';
	export default {
		data() {
			return {
				destroyTotal: 0,
				circulateValue: 0,
				produceValue: 0,
				pledgeValue: 0,
				currentPrice: 0,
				contractList: [{
						title: "PancakeSwap V2 Pool",
						key: '0x5c4744ab9e9fec921b74a958b92c1f182f7ca54a',
						img: "/static/pancake.png"
					},
					{
						title: "Staking Mining Pool",
						key: '0xd45a509B10CDDe66aeC28536F1dd57036c4d20D5',
						img: ""
					},
					{
						title: "1D Staking Pool",
						key: '0x6b48853ADfa1B24D4729ba6a0c23B01d705D2e61',
						img: ""
					},
					{
						title: "7D Staking Pool",
						key: '0xE5C2c01e8f6e1E6556F72557F79cfB44C32F4849',
						img: ""
					},

					{
						title: "30D Staking Pool",
						key: '0xCDcE7e78b02d630870Bbd21969541e764bFe2a24',
						img: ""
					},
					{
						title: "90D Staking Pool",
						key: '0xB8ceDA0508deD443d3AB3D5F91982D3c39A8Aba1',
						img: ""
					},
					{
						title: "180D Staking Pool",
						key: '0xf51C4C75B22a5A1a45563eD16fA1D90aeC11BF24',
						img: ""
					},
					{
						title: "360D Staking Pool",
						key: '0x759BcF353e6e728b9235BcC06f3673e26607b65e',
						img: ""
					},
					{
						title: "Staking Contract",
						key: '0x7823e55972413eD9a94719A0E08A0Eb148D27219',
						img: ""
					},
					{
						title: "Redemption Contract",
						key: '0xBa843B86A6E57b30c10bc5Ca234211137E14325',
						img: ""
					},
					{
						title: "Released Contract",
						key: '0x8b25c2D9feE4f90F6e869a1712ED8299Cdf4a62b',
						img: ""
					},
					{
						title: "Withdraw Contract",
						key: '0x9e5dd83d51a73CA7f4D814a5B19Ece051f4b18B7',
						img: ""
					},
					{
						title: "Node Reward Pool",
						key: '0xB0Ede807C59487FD974F388cF569935bD41a9242',
						img: ""
					},
					{
						title: "20% UN Fee",
						key: '0x23F49FE353Bc5f360b14ebbE9Dc22Fded1727E23',
						img: ""
					},
					{
						title: "15% UN Fee",
						key: '0x045e0Dd64e6e42AA596836111c1E7c0022CA7aE1',
						img: ""
					},
					{
						title: "10% UN Fee",
						key: '0xBF73966A9d990D4D6037F44b723a994603C3D5aa',
						img: ""
					},

					{
						title: "5% UN Fee",
						key: '0xD0A9cEa6f3BD0f54467C554bA442f278640EaACE',
						img: ""
					}
				]
			}
		},
		async onShow() {

			this.destroyTotal = 0;
			this.$api.destroyLog().then(res => {
				this.destroyLog = res.data;
				this.destroyLog.forEach(res => {
					this.destroyTotal = BigNumber(this.destroyTotal).plus(BigNumber(res.value));
				})
			})

			const res0 = await this.$etherCall.contactFunctionCall(statAbi, "stat",
				[this.$config.metas_contract, this.$config.pledge_contract, this.$config.withdraw1_contract], this
				.$config.stat_contract)
			this.circulateValue = ethers.formatEther(res0.result[0])

			this.produceValue = ethers.formatEther(res0.result[1])
			this.pledgeValue = ethers.formatEther(res0.result[2])
			let metasValue = ethers.parseUnits("1", 18);
			let res1 = await this.$etherCall.contactFunctionCall(pledgeAbi, "get_sell", [metasValue], this.$config
				.pledge_contract);
			this.currentPrice = ethers.formatEther(res1.result)
		},
		methods: {
			copyAddress(address) {
				if (address == 'metas_contract') {
					address = this.$config.metas_contract;
				}
				console.log(address);
				uni.setClipboardData({
					data: address,
					success: () => {
						uni.showToast({
							icon: 'success',
							title: this.$t('fzcg')
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		/* padding: 0 36rpx; */
		background-color: #ffffff;
		min-height: 100vh;
		margin-top: 60rpx;
	}

	.header {
		margin-bottom: 40rpx;
		padding: 0 36rpx;

		.meter_icon {
			width: 44rpx;
			height: 38rpx;
			margin-right: 26rpx;
		}

		.title {
			font-size: 48rpx;
			font-weight: bold;
			color: #333;
		}
	}

	.section {
		margin-bottom: 32rpx;
		padding: 0 36rpx;

		.section-title {
			.icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 16rpx;
			}

			display: flex;
			font-size: 28rpx;
			font-weight: 500;
			margin-bottom: 24rpx;
			color: #333;
		}
	}

	.line {
		background-color: #f5f5f5;
		height: 20rpx;
		margin: 32rpx 0 48rpx;
	}



	.address-container {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.address {
			// font-family: monospace;
			font-size: 24rpx;
			font-weight: 600;
			color: #0f1a1e;
			flex: 1;
			margin-right: 20rpx;
		}
	}



	.copy {
		width: 36rpx;
		height: 36rpx;
	}


	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48rpx 24rpx;

		.stat-item {
			display: flex;
			flex-direction: column;
			padding: 0 20rpx;
			border-radius: 12rpx;

			&:nth-last-child(1) {
				padding-bottom: 0;
			}
		}

		.stat-label {
			font-size: 28rpx;
			color: #909090 !important;
			margin-bottom: 8rpx;
		}

		.stat-value {
			font-size: 30rpx;
			font-weight: 600;
			color: #0F1A1E;
		}
	}



	.contract-list {
		margin: 48rpx 0;
		border: 1px solid transparent;

		.contract-item {
			// display: flex;
			// align-items: center;
			padding: 40rpx 32rpx;
			border-radius: 28rpx;
			border: 1px solid #d8dce1;
			box-shadow: 0px 2px 8px rgba(0, 0, 0, .4);
			justify-content: space-between;
			margin-bottom: 48rpx;

			.left {
				width: 404rpx;
			}

			.share {
				width: 32rpx;
				height: 32rpx;
			}
		}

		.contract-checkbox {
			margin-right: 20rpx;
		}

		.contract-label {
			font-size: 32rpx;
			margin-bottom: 36rpx;
			font-weight: 600;

			.img {
				width: 36rpx;
				height: 36rpx;
				margin-right: 16rpx;
			}
		}

		.contract-address {
			word-wrap: break-word;
		}

	}
</style>