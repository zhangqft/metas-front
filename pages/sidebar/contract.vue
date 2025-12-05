<template>

	<view class="dao">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<!-- {{$t('dao')}} -->
				<image src="@/static/contract.png" mode="" class="icon"></image>
				{{$t('smart_contract')}}
			</view>

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
					<image src="@/static/share.png" mode="" class="share" @tap="copyAddress(item.url)"></image>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				contractList: [{
						title: "PancakeSwap V2 Pool",
						key: '0x5c4744ab9e9fec921b74a958b92c1f182f7ca54a',
						img: "/static/pancake.png",
						url: 'https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x567fd5658f48C1c826a912ea1Ba37696A6B32006&chain=bsc'
					},
					{
						title: "Staking Mining Pool",
						key: '0xd45a509B10CDDe66aeC28536F1dd57036c4d20D5',
						img: "",
						url: 'https://bscscan.com/address/0xd45a509B10CDDe66aeC28536F1dd57036c4d20D5#tokentxns'
					},
					{
						title: "1D Staking Pool",
						key: '0x6b48853ADfa1B24D4729ba6a0c23B01d705D2e61',
						img: "",
						url: 'https://bscscan.com/address/0x6b48853ADfa1B24D4729ba6a0c23B01d705D2e61#tokentxns'
					},
					{
						title: "7D Staking Pool",
						key: '0xE5C2c01e8f6e1E6556F72557F79cfB44C32F4849',
						img: "",
						url: 'https://bscscan.com/address/0xE5C2c01e8f6e1E6556F72557F79cfB44C32F4849#tokentxns'
					},

					{
						title: "30D Staking Pool",
						key: '0xCDcE7e78b02d630870Bbd21969541e764bFe2a24',
						img: "",
						url: 'https://bscscan.com/address/0xCDcE7e78b02d630870Bbd21969541e764bFe2a24#tokentxns'
					},
					{
						title: "90D Staking Pool",
						key: '0xB8ceDA0508deD443d3AB3D5F91982D3c39A8Aba1',
						img: "",
						url: 'https://bscscan.com/address/0xB8ceDA0508deD443d3AB3D5F91982D3c39A8Aba1#tokentxns'
					},
					{
						title: "180D Staking Pool",
						key: '0xf51C4C75B22a5A1a45563eD16fA1D90aeC11BF24',
						img: "",
						url: 'https://bscscan.com/address/0xf51C4C75B22a5A1a45563eD16fA1D90aeC11BF24#tokentxns'
					},
					{
						title: "360D Staking Pool",
						key: '0x759BcF353e6e728b9235BcC06f3673e26607b65e',
						img: "",
						url: 'https://bscscan.com/address/0x759BcF353e6e728b9235BcC06f3673e26607b65e#tokentxns'
					},
					{
						title: "Staking Contract",
						key: '0x7823e55972413eD9a94719A0E08A0Eb148D27219',
						img: "",
						url: 'https://bscscan.com/address/0x7823e55972413eD9a94719A0E08A0Eb148D27219'
					},
					{
						title: "Redemption Contract",
						key: '0xBa843B86A6E57b30c10bc5Ca234211137E14325',
						img: "",
						url: 'https://bscscan.com/address/0xBa843B86A6E57b30c10bc5Ca2342111D37E14325'
					},
					{
						title: "Released Contract",
						key: '0x8b25c2D9feE4f90F6e869a1712ED8299Cdf4a62b',
						img: "",
						url: 'https://bscscan.com/address/0x8b25c2D9feE4f90F6e869a1712ED8299Cdf4a62b'
					},
					{
						title: "Withdraw Contract",
						key: '0x9e5dd83d51a73CA7f4D814a5B19Ece051f4b18B7',
						img: "",
						url: 'https://bscscan.com/address/0x9e5dd83d51a73CA7f4D814a5B19Ece051f4b18B7#tokentxns'
					},
					{
						title: "Node Reward Pool",
						key: '0xB0Ede807C59487FD974F388cF569935bD41a9242',
						img: "",
						url: 'https://bscscan.com/address/0xB0Ede807C59487FD974F388cF569935bD41a9242#tokentxns'
					},
					{
						title: "20% UN Fee",
						key: '0x23F49FE353Bc5f360b14ebbE9Dc22Fded1727E23',
						img: "",
						url: 'https://bscscan.com/address/0x23F49FE353Bc5f360b14ebbE9Dc22Fded1727E23#tokentxns'
					},
					{
						title: "15% UN Fee",
						key: '0x045e0Dd64e6e42AA596836111c1E7c0022CA7aE1',
						img: "",
						url: 'https://bscscan.com/address/0x045e0Dd64e6e42AA596836111c1E7c0022CA7aE1#tokentxns'
					},
					{
						title: "10% UN Fee",
						key: '0xBF73966A9d990D4D6037F44b723a994603C3D5aa',
						img: "",
						url: 'https://bscscan.com/address/0xBF73966A9d990D4D6037F44b723a994603C3D5aa#tokentxns'
					},

					{
						title: "5% UN Fee",
						key: '0xD0A9cEa6f3BD0f54467C554bA442f278640EaACE',
						img: "",
						url: 'https://bscscan.com/address/0xD0A9cEa6f3BD0f54467C554bA442f278640EaACE#tokentxns'
					}
				]
			}
		},
		methods: {
			copyAddress(url) {
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
				width: 38rpx;
				height: 44rpx;
				margin-right: 28rpx;
			}

			.title {
				margin: 60rpx 0 20rpx;
				font-size: 50rpx;
				font-weight: 600;
			}


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

			// align-items: flex-end;
			.left {
				width: 500rpx;
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