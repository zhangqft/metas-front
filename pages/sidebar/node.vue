<template>

	<view class="node">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<image src="@/static/node.png" mode="" class="icon"></image>
				{{ $t('node') }}
			</view>
			<!-- <view class="buy" @click="openBuyNode" v-if="nodeInfo == null">
				{{ $t('buy_node') }}
			</view> -->

			<view v-if="nodeInfo != null" style="font-size: 28rpx;line-height: 42rpx;width: 100%;">
				<span style="color: #0F1A1E; display: block;float: left;">{{$t('node_level')}}</span>
				<span style="color: #F7931A; display: block;font-weight: 600;margin-left: 20rpx;float: left;">{{
					nodeInfo.usdtTotal
				}} USD</span>
			</view>
		</view>

		<u-popup v-model="buyNodeShow" mode="bottom" border-radius="32" @close="PopupClose">
			<view class="pledgePopup">
				<view class="top flex">
					<view class="left flex">
						<image src="@/static/pledge_icon5.png" mode="widthFix" class="icon"></image>
						{{ $t('buy_node') }}
					</view>
					<image src="@/static/close_2.png" mode="widthFix" class="close_icon" @click="PopupClose"></image>

				</view>

				<view class="" v-if="!succeed">
					<view class="row">
						<view class="label">
							{{ $t('select_node_type') }}
						</view>
						<view class="tabs flex">
							<view :class="['item', { item_active: item.nodeType == query.nodeType }]"
								v-for="(item, index) in nodeTypeList" :key="index" @click="switchNodeType(item)">
								{{ $t(item.title) }}
							</view>
						</view>
					</view>
					<view class="form">
						<view class="row">
							<view class="from_title">
								{{ $t('price') }}
							</view>
							<view class="input flex">
								<input type="number" placeholder="0" placeholder-class="placeholderClass" disabled
									v-model="query.num" />
								<view class="text">
									USDT
								</view>
							</view>
						</view>
						<view class="desc_box">
							<view class="desc_top">
								{{ $t('buy_node_2') }}
							</view>
							<view class="">
								{{ $t('balance_USDT') }}：<text>{{ usdtBalance | numfixed(2) }}</text>
							</view>
						</view>
						<view :class="['submit', { submit_active: query.num }]" @click="buyNode" v-if="schedule == 1">
							{{ $t('approve_usdt', { nums: query.num }) }}
						</view>

						<view :class="['submit']" v-else="schedule == 2">
							{{ $t('dispose') }}
						</view>
					</view>
				</view>

				<view class="result" v-else>
					<view class="" v-if="succeed == 1">
						<image src="@/static/result_1.png" mode="" class="result_icon"></image>
						<view class="result_text">
							{{ $t('node_buy_succeed') }}
						</view>
					</view>
					<view class="" v-if="succeed == 2">
						<image src="@/static/result_2.png" mode="" class="result_icon"></image>
						<view class="result_text">
							{{ $t('node_buy_fail') }}
						</view>
					</view>

					<!-- <view class="chain flex" @click="getBack">
						<image src="/static/pledge_icon.png" mode="" class="icon"></image>
						{{ $t('chain_deal') }}
					</view> -->
					<view class="back" @click="getBack">
						{{ $t('back') }}
					</view>
				</view>

			</view>
		</u-popup>
	</view>

</template>

<script>
	import {
		ethers
	} from "ethers";
	import erc20Abi from '@/abi/erc20.json'
	export default {
		data() {
			return {
				usdtBalance: 0,
				buyNodeShow: false,
				nodeInfo: {},
				query: {
					num: '500',
					nodeType: 1,
				},
				nodeTypeList: [{
						title: '$ 500',
						nodeType: 1,
						value: '500'
					},
					{
						title: '$ 1000',
						nodeType: 2,
						value: '1000'
					},
					{
						title: '$ 3000',
						nodeType: 3,
						value: '3000'
					}
				],

				succeed: '',
				schedule: 1,
			}
		},
		methods: {
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

				// this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract).then((res) => {
				// 	this.usdtBalance = ethers.formatUnits(res.result, 'ether');
				// })
				this.$api.nodeInfo().then(res => {
					this.nodeInfo = res.data;
					console.log(this.nodeInfo)
				})
			},
			openBuyNode() {
				this.buyNodeShow = true
			},

			PopupClose() {
				this.query.num = 500
				this.succeed = ''
				this.buyNodeShow = false
				this.schedule = 1;
				this.$api.nodeInfo().then(res => {
					this.nodeInfo = res.data;
				})
			},
			switchNodeType(item) {
				this.query.nodeType = item.nodeType
				this.query.num = item.value
			},
			buyNode() {
				// this.schedule = 2;
				// let usdtValue = ethers.parseUnits(this.query.num, 18);
				// console.log(usdtValue)

				// const usdt_contract = this.$config.isMainnet == true ? this.$config.usdt_contract_prod : this.$config.usdt_contract;
				// const node_receive_address = this.$config.isMainnet == true ? this.$config.node_receive_address_prod : this.$config.node_receive_address_test;

				// this.$etherCall.contactFunctionSend(erc20Abi, "transfer", [node_receive_address, usdtValue], usdt_contract).then(res => {
				// 	console.log(res)
				// 	if (res.error) {
				// 		this.succeed = 2  //成功1 失败2
				// 	} else {

				// 		this.$api.nodeBuy({
				// 			"nodeType": this.query.nodeType,
				// 			"usdtValue": this.query.num,
				// 			"txHash": res.transactionHash,
				// 			// "signature": ""
				// 		}).then(res => {
				// 			console.log(res)
				// 			if (res.code == 0) {
				// 				this.succeed = 1;
				// 			} else {
				// 				this.succeed = 2;
				// 			}
				// 		})
				// 	}
				// })
			},
			getBack() {
				this.buyNodeShow = false
				this.PopupClose()

			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 32rpx;

		.title {
			margin: 60rpx 0 48rpx;
			font-size: 50rpx;
			font-weight: 600;
		}

		.icon {
			width: 38rpx;
			height: 44rpx;
			margin-right: 26rpx;
		}

		.buy {
			background-color: #63c8b1;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 16rpx;
			color: #fff;
		}
	}


	.pledgePopup {
		width: 100%;
		padding: 48rpx 32rpx;
		background-color: #ffffff;
		max-height: 95vh;

		.top {
			font-size: 36rpx;
			font-weight: 600;
			margin-bottom: 60rpx;
			justify-content: space-between;

			.icon {
				width: 48rpx;
				height: 48rpx;
				margin-right: 20rpx;
			}

			.close_icon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.row {
			margin: 60rpx 0;

			.label {
				color: #0f1a1e;
				margin-bottom: 20rpx;
			}

			.value {
				font-weight: 600;
				font-size: 32rpx;
			}

			.tabs {
				justify-content: space-between;

				.item {
					width: 220rpx;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					border: 1px solid #d8dce1;
					border-radius: 16rpx;
					color: #707a8a;
				}

				.item_active {
					background-color: #278ffe;
					color: #fff;
					border: 1px solid transparent;
				}
			}
		}

		.desc_box {
			background-color: #f0faf8;
			padding: 32rpx;
			border: 1px solid #63c8b1;
			border-radius: 16rpx;

			.desc_top {
				font-size: 24rpx;
				margin-bottom: 20rpx;
			}

			text {
				font-weight: 600;
			}
		}

		.block {
			.item {
				width: 50%;

				.title {
					color: #707a8a;
					font-size: 28rpx;
				}

				.value {
					margin-top: 20rpx;
					font-weight: 600;
					font-size: 32rpx;
				}
			}
		}

		.form {
			margin: 60rpx 0 0;

			.from_title {
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}

			.input {
				border: 1px solid #d8dce1;
				background-color: #f5f5f5;
				border-radius: 20rpx;
				height: 112rpx;
				padding: 0 32rpx;
				margin: 16rpx 0;

				input {
					font-size: 24rpx;
					flex: 1;
					font-weight: 600;
				}

				.placeholderClass {
					font-weight: 400;
				}

				.text {
					margin: 0 16rpx;
					font-weight: 600;
				}
			}

			.balance {
				font-size: 24rpx;
				color: #707a8a;
			}

			.submit {
				background-color: #d8dce1;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 60rpx;
				color: #707a8a;
				margin: 76rpx 0 0;
				font-weight: 600;
				font-size: 32rpx;
			}

			.submit_active {
				background-color: #278ffe;
				color: #fff;
			}

			.desc {
				font-size: 24rpx;
				line-height: 36rpx;
				margin-top: 60rpx;

				view {
					color: #707a8a;
				}
			}

			.form_item {
				justify-content: space-between;
				margin-bottom: 36rpx;

				view {
					color: #707a8a;
				}
			}

			.bold {
				font-weight: 600;

				view {
					color: #0f1a1e;
				}
			}

		}

		.result {
			text-align: center;

			.result_icon {
				display: block;
				width: 120rpx;
				height: 120rpx;
				margin: 140rpx auto 48rpx;
			}

			.result_text {
				font-size: 40rpx;
				font-weight: 600;
			}

			.result_num {
				color: #0f1a1e;
				margin: 20rpx auto 100rpx;
			}

			.back {
				width: 300rpx;
				height: 80rpx;
				line-height: 80rpx;
				border: 1px solid #d8dce1;
				border-radius: 10rpx;
				margin: 60rpx auto 120rpx;
			}

			.back_bottom {
				margin-bottom: 32rpx;
			}

			.chain {
				border: 1px solid #278ffe;
				width: 300rpx;
				height: 80rpx;
				border-radius: 20rpx;
				margin: 32rpx auto;
				justify-content: center;

				.icon {
					width: 28rpx;
					height: 28rpx;
					margin-right: 20rpx;
				}
			}

		}
	}
</style>