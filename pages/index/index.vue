<template>
	<view class="content">
		<Layout></Layout>
		<view class="pledge">
			<view class="header">
				<view class="title">
					{{ $t('pledge') }} Metas
				</view>
				<view class="desc">
					{{ $t('pledge_desc') }}
				</view>
			</view>

			<view class="datas flex">
				<view class="block">
					<view class="name">
						TVL
					</view>
					<view :class="['num']">
						<!-- $ {{ depositInfo.myTotalValueU | numfixed(2) }} -->
						$ {{ allPledgeValueU | numfixed(2) }}
					</view>
				</view>
				<view class="block">
					<view class="name">
						{{ $t('pledge_all') }} METAS
					</view>
					<view :class="['num']">
						<!-- {{ depositInfo.myTotalValueMetas | numfixed(4) }} -->
						{{ allPledgeValue | numfixed(2) }}
					</view>
				</view>
				<view class="block">
					<view class="name">
						<view>{{ $t('pledge_my') }}</view>
						<l-popover :content="$t('pledge_my_describe')" theme="dark" placement="top-left">
							<view style="height: 100%; width: 30rpx;margin-left: 6rpx;margin-top: 4rpx;">
								<image src="/static/show.png" style="width: 22rpx;height: 22rpx;" mode="scaleToFill" />
							</view>
						</l-popover>
					</view>
					<view :class="['num']">
						$ {{ depositInfo.myValueU | numfixed(2) }}
					</view>

				</view>
				<view class="block">
					<view class="name">
						<view>{{ $t('pledge_my') }} METAS</view>
						<l-popover :content="$t('pledge_my_total_describe')" theme="dark" placement="top-right">
							<view style="height: 100%; width: 30rpx;margin-left: 6rpx;margin-top: 4rpx;">
								<image src="/static/show.png" style="width: 22rpx;height: 22rpx;" mode="scaleToFill" />
							</view>
						</l-popover>
					</view>
					<view :class="['num']">
						{{ depositInfo.myValueMetas | numfixed(4) }}
					</view>
				</view>
			</view>

			<view class="tabs flex">
				<view :class="['item', { active: query.type == item.type }]" v-for="(item, index) in tabs" :key="index"
					@click="cutTabs(item)">
					{{ $t(item.key) }}
				</view>
			</view>

			<view class="list" v-if="query.type == 1">
				<view class="item" v-for="(item, index) in investList" :key="index">
					<view class="top flex">
						<view class="left flex">
							<image src="/static/logo.png" mode="" class="logo"></image>
							<view class="text">
								{{ item.type == 7 ? 'Old METAS' : 'METAS' }}
							</view>
							<view class="period">
								{{ item.period }}D
							</view>
							<image src="@/static/pledge_icon.png" mode="widthFix" class="pledge_icon"></image>
						</view>
						<view class="right">
							{{ $t('reference') }} <text> {{ item.reference }}</text>
						</view>
					</view>
					<view class="details">
						<view class="left">
							<view class="line">
								{{ $t('pledge_period') }}：{{ item.period }}Day
							</view>
							<view class="line">
								{{ $t('earnings_day') }}：{{ item.earnings }}
							</view>
							<!-- <view class="line">
								{{ $t('pledge_alls') }}：{{ item.nums }}
							</view> -->
						</view>
						<view class="btn" @click="openPledge(item)">
							{{ $t('pledge') }}
						</view>
					</view>
				</view>
			</view>

			<view class="myList" v-else>
				<view class="item" v-for="(item, index) in myInvestList" :key="index">
					<view class="flex top">
						<view class="left flex">
							<image src="/static/logo.png" mode="" class="logo"></image>
							{{ item.depositMetasValue | numfixed(4) }} METAS
						</view>
						<view :class="['right', { right_active: setDay(item.periodDay, item.curPeriodDay) == 0 }]">
							{{ item.curPeriodDay }}/{{ item.periodDay }} Day
						</view>
					</view>

					<view class="details">
						<view class="row flex">
							<view class="label flex">
								{{ $t('unlock') }}
								<l-popover :content="$t('release_describe')" theme="dark" placement="top-left">
									<view style="height: 100%; width: 30rpx;margin-left: 6rpx;margin-top: 4rpx;">
										<image src="/static/show1.png" style="width: 22rpx;height: 22rpx;"
											mode="scaleToFill" />
									</view>
								</l-popover>
							</view>

							<view class="value flex">
								<text>{{ item.canRedeemValue | numfixed(4) }} METAS</text>
								<view :class="['btn', { btn_active: item.canRedeemValue <= 0 }]"
									@click="openRdeemPopup(item)">
									{{ $t('redeem') }}
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="label flex">
								{{ $t('get') }}

								<l-popover :content="$t('receive_describe')" theme="dark" placement="top-left">
									<view style="height: 100%; width: 30rpx;margin-left: 6rpx;margin-top: 4rpx;">
										<image src="/static/show1.png" style="width: 22rpx;height: 22rpx;"
											mode="scaleToFill" />
									</view>
								</l-popover>
							</view>
							<view class="value flex">
								<text>{{ item.canReceiveAward | numfixed(4) }} METAS</text>
								<view :class="['btn', { btn_active: item.canReceiveAward == 0 }]"
									@click="openReceiveAward(item)">
									{{ $t('get_btn') }}
								</view>
							</view>
						</view>
					</view>

					<view class="schedule">
						<view class="row flex">
							<view class="label">
								{{ $t('residue') }}：<text>${{ item.depositValueUnrelease | numfixed(2) }}</text>
							</view>
							<view class="value">
								{{ $t('pledge_value') }}：<text>${{ item.depositValue | numfixed(2) }}</text>
							</view>
						</view>
						<view class="progress">
							<ProgressBar :value="item.depositValueUnrelease" :total="item.depositValue"
								color="#63c8b1" />
						</view>
						<view class="row flex">
							<view class="label">
								{{ item.createTime | dateFormat }}
							</view>
							<view class="value value2" v-if="setDay(item.periodDay, item.curPeriodDay) != 0">
								{{ $t('expire_day', { days: setDay(item.periodDay, item.curPeriodDay) }) }}
							</view>
							<view class="value2" v-else>
								{{ $t('expire') }}
							</view>
						</view>
					</view>

				</view>
			</view>

		</view>

		<u-popup v-model="pledgeShow" mode="bottom" border-radius="32" @close="PopupClose">
			<view class="pledgePopup">
				<view class="top flex">
					<image src="@/static/pledge_icon2.png" mode="widthFix" class="icon"></image>
					{{ $t('pledge') }}
				</view>
				<view class="" v-if="!succeed">
					<view class="block flex" v-if="pledgeInfo">
						<view class="item">
							<view class="title">
								{{ $t('pledge_period') }}
							</view>
							<view class="value">
								{{ pledgeInfo.period }}Day
							</view>
						</view>
						<view class="item">
							<view class="title">
								{{ $t('reference') }}
							</view>
							<view class="value">
								{{ pledgeInfo.reference }}
							</view>
						</view>
					</view>
					<view class="form">
						<view class="from_title">
							{{ $t('form_title') }}

						</view>
						<view class="input flex">
							<input type="number" :placeholder="$t('form_placeholder')"
								placeholder-class="placeholderClass" v-model="pledgeForm.num" />
							<view class="text">
								METAS
							</view>
							<view class="all" @click="pledgeAll">
								{{ $t('all') }}
							</view>
						</view>
						<view class="balance">
							{{ $t('balance') }}：{{ metasBalance | numfixed(6) }} METAS
						</view>

						<view :class="['submit', { submit_active: pledgeForm.num }]" v-if="schedule == 1"
							@click="pladgeSubmit(1)">
							{{ pledgeForm.num ? $t('ratify') : $t('pledge_save') }}
						</view>
						<view :class="['submit']" v-else-if="schedule == 2">
							{{ $t('dispose') }} <u-loading mode="circle"></u-loading>
						</view>
						<view :class="['submit submit_active']" v-else-if="schedule == 3" @click="pladgeSubmit(3)">
							{{ $t('pledge_save') }}
						</view>
						<view :class="['submit']" v-else-if="schedule == 4">
							{{ $t('pledge_dispose') }} <u-loading mode="circle"></u-loading>
						</view>

						<view class="desc">
							<view class="">
								{{ $t('explain') }}：
							</view>
							<view class="">
								1. {{ $t('pledge_describe_1') }}
							</view>
							<view class="">
								2. {{ $t('pledge_describe_2') }}
							</view>
							<view class="">
								3. {{ $t('pledge_describe_3') }}
							</view>
						</view>
					</view>
				</view>

				<view class="result" v-else>

					<view class="" v-if="succeed == 1">
						<image src="@/static/result_1.png" mode="" class="result_icon"></image>
						<view class="result_text">
							{{ $t('pledge_succeed') }}
						</view>
						<view class="result_num">
							{{ pledgeForm.num }} METAS
						</view>
					</view>
					<view class="" v-if="succeed == 2">
						<image src="@/static/result_2.png" mode="" class="result_icon"></image>
						<view class="result_text">
							{{ $t('pledge_fail') }}
						</view>
						<view class="result_num">
							METAS {{ $t('balance_no') }}
						</view>
					</view>
					<view class="back" @click="pledgeBack">
						{{ $t('back') }}
					</view>
				</view>

			</view>
		</u-popup>

		<u-popup v-model="receiveAwardShow" mode="bottom" border-radius="32" @close="PopupClose">
			<view class="pledgePopup">
				<view class="top flex">
					<image src="@/static/pledge_icon7.png" mode="widthFix" class="icon"></image>
					{{ $t('get_title') }}
				</view>

				<view class="" v-if="!succeed">
					<view class="row">
						<view class="label">
							{{ $t('get_subhead') }}
						</view>
						<view class="value">
							{{ receiveAwardInfo.canReceiveAward }} METAS
						</view>
					</view>
					<view class="form">
						<view class="from_title">
							{{ $t('form_get_title') }}
						</view>
						<view class="input flex">
							<input type="number" placeholder="0" placeholder-class="placeholderClass"
								v-model="receiveAwardForm.num" />
							<view class="text">
								METAS
							</view>
							<view class="all" @click=" receiveAwardForm.num = receiveAwardInfo.canReceiveAward">
								{{ $t('all') }}
							</view>
						</view>

						<view :class="['submit', { submit_active: receiveAwardForm.num }]" v-if="schedule == 1"
							@click="receiveAward">
							{{ $t('get_btn') }}
						</view>
						<view :class="['submit']" v-if="schedule == 2">
							{{ $t('get_btn') }}
						</view>

						<view class="desc">
							<view class="">
								{{ $t('explain') }}：
							</view>
							<view class="">
								1. {{ $t('reward_receive_describe_1') }}
							</view>
							<view class="">
								2. {{ $t('reward_receive_describe_2') }}
							</view>
							<view class="">
								3. {{ $t('reward_receive_describe_3') }}
							</view>
						</view>
					</view>
				</view>

				<view class="result" v-else>
					<view class="" v-if="succeed == 1">
						<image src="@/static/result_1.png" mode="" class="result_icon"></image>
						<view class="result_text">
							{{ $t('get_succeed') }}
						</view>
						<view class="result_num">
							{{ receiveAwardForm.num }} METAS
						</view>
					</view>
					<view class="" v-if="succeed == 2">
						<image src="@/static/result_2.png" mode="" class="result_icon"></image>
						<view class="result_text">
							{{ $t('get_fail') }}
						</view>
						<view class="result_num">
							<!-- METAS {{ $t('balance_no') }} -->
							{{ errorInfo }}
						</view>
					</view>
					<view class="back" @click="receiveAwardPopupBack">
						{{ $t('back') }}
					</view>
				</view>

			</view>
		</u-popup>


		<u-popup v-model="redeemShow" mode="bottom" border-radius="32" @close="PopupClose">
			<view class="pledgePopup">
				<view class="top flex">
					<image src="@/static/pledge_icon6.png" mode="widthFix" class="icon"></image>
					{{ $t('redeem_title') }}
				</view>

				<view class="" v-if="!succeed">
					<view class="row">
						<view class="label">
							{{ $t('redeem_subhead') }}
						</view>
						<view class="value">
							{{ redeemInfo.canRedeemValue }} METAS
						</view>
					</view>
					<view class="form">
						<view class="from_title">
							{{ $t('form_redeem_title') }}
						</view>
						<view class="input flex">
							<input type="number" placeholder="0" placeholder-class="placeholderClass"
								v-model="redeemForm.num" />
							<view class="text">
								METAS
							</view>
							<view class="all" @click="redeemForm.num = redeemInfo.canRedeemValue">
								{{ $t('all') }}
							</view>
						</view>

						<view :class="['submit', { submit_active: redeemForm.num }]" v-if="schedule == 1"
							@click="redeemConfirm">
							{{ $t('redeem_btn') }}
						</view>
						<view :class="['submit']" v-if="schedule == 2">
							{{ $t('dispose_redeem') }}<u-loading mode="circle"></u-loading>
						</view>

						<view class="desc">
							<view class="">
								{{ $t('explain') }}：
							</view>
							<view class="">
								1. {{ $t('redeem_describe_1') }}
							</view>
							<view class="">
								2. {{ $t('redeem_describe_2') }}
							</view>
							<view class="">
								3. {{ $t('redeem_describe_3') }}
							</view>
						</view>
					</view>
				</view>

				<view class="result" v-else>
					<view class="" v-if="succeed == 1">
						<image src="@/static/result_1.png" mode="" class="result_icon"></image>
						<view class="result_text">
							{{ $t('get_redeem_succeed') }}
						</view>
						<view class="result_num">
							{{ redeemForm.num }} METAS
						</view>
					</view>
					<view class="" v-if="succeed == 2">
						<image src="@/static/result_2.png" mode="" class="result_icon"></image>
						<view class="result_text">

							{{ $t('get_redeem_fail') }}
						</view>
						<view class="result_num">
							{{ errorInfo ? errorInfo : $t('balance_redeem_no') }}
						</view>
					</view>
					<view class="back" @click="redeemPopupBack">
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
import pledgeAbi from '@/abi/Pledge.json'
import redeemAbi from '@/abi/Redeem.json'
import incomeAbi from '@/abi/Income.json'
import statAbi from '@/abi/Stat.json'
export default {
	data() {
		return {
			title: 'Hello',
			tabs: [{
				label: this.$t('pledge_list'),
				type: 1,
				key: "pledge_list"
			},
			{
				label: this.$t('pledge_my'),
				type: 2,
				key: "pledge_my"
			}
			],
			query: {
				page: 1,
				pageSize: 10,
				type: 1
			},
			investList: [
				{
					period: "360",
					reference: '7089.52%',
					earnings: "1.2%",
					type: 6
				},
				{
					period: "180",
					reference: '4990.79%',
					earnings: "1.1%",
					type: 5
				},

				{
					period: "90",
					reference: '2416.63%',
					earnings: "0.9%",
					type: 4
				},

				{
					period: "30",
					reference: '1131.99%',
					earnings: "0.7%",
					type: 3
				},
				{
					period: "7",
					reference: '320.70%',
					earnings: "0.4%",
					type: 2
				},
				{
					period: "1",
					reference: '193.97%',
					earnings: "0.3%",
					type: 1
				},
			],
			pledgeShow: false,
			pledgeInfo: {
				period: '',
				reference: ''
			},
			pledgeForm: {
				num: ''
			},

			schedule: 1,
			succeed: null,
			errorInfo: null,
			myInvestList: [],
			//领取
			receiveAwardShow: false,
			receiveAwardInfo: {
				canReceiveAward: 0
			},
			receiveAwardForm: {
				num: ''
			},
			//赎回
			redeemShow: false,
			redeemInfo: {
				canRedeemValue: 0
			},
			redeemForm: {
				num: ''
			},

			depositInfo: {
				myTotalValueU: 0,
				myTotalValueMetas: 0,
				myValueU: 0,
				myValueMetas: 0
			},
			signMessage: '',

			allPledgeValue: 0,
			allPledgeValueU: 0,

			usdtBalance: 0,
			metasBalance: 0,
		}
	},
	onShow() {
		console.log(uni.getStorageSync("walletAccount"))
		if (!uni.getStorageSync("walletAccount")) {
			uni.showToast({
				title: 'login first',
				icon: 'none',
				duration: 2000,
				mask: true
			});
			return;
		}

		this.getInvestList();
		this.depositIndex();
		this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.metas_contract).then((res) => {
			this.metasBalance = ethers.formatUnits(res.result, 'ether');
		})

		this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract).then((res) => {
			this.usdtBalance = ethers.formatUnits(res.result, 'ether');
		})

		this.$etherCall.contactFunctionCall(statAbi, "stat",
			[this.$config.metas_contract, this.$config.pledge_contract, this.$config.withdraw1_contract], this
				.$config.stat_contract).then(res => {
					this.allPledgeValue = ethers.formatEther(res.result[2])
					this.$etherCall.contactFunctionCall(pledgeAbi, "get_sell", [1000000000000000000n], this.$config.pledge_contract).then(res => {
						this.allPledgeValueU = ethers.formatEther(res.result) * this.allPledgeValue
					})
				})
	},

	onLoad() {

	},
	methods: {
		//列表质押按钮
		openPledge(item) {
			if (!uni.getStorageSync("walletAccount")) {
				uni.showToast({
					title: 'login first',
					icon: 'none',
					duration: 2000,
					mask: true
				});
				return;
			}
			this.pledgeShow = true
			this.pledgeInfo = item
		},
		//质押全部
		pledgeAll() {
			this.pledgeForm.num = this.metasBalance;
		},

		//submitFlag  1授权  2质押
		async pladgeSubmit(submitFlag) {
			console.log(this.$config.pledge_contract)
			let pledgeMetasValue = ethers.parseUnits(this.pledgeForm.num.toString(), 18);
			let res = await this.$etherCall.contactFunctionCall(pledgeAbi, "get_sell", [pledgeMetasValue], this.$config.pledge_contract);
			let peladgeValueU = ethers.formatEther(res.result)

			if (peladgeValueU < 100) {
				uni.showToast({
					title: this.$t('balance_no_100'),
					icon: 'none'
				})
				return
			}

			this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.metas_contract).then((res) => {
				this.metasBalance = ethers.formatUnits(res.result, 'ether');
			})

			if (Number(this.metasBalance) < Number(this.pledgeForm.num)) {
				uni.showToast({
					title: 'Metas not enough',
					icon: 'none'
				})
				return
			}

			if (submitFlag == 1) {
				this.schedule = 2

				const allowanceValue = await this.$etherCall.contactFunctionCall(erc20Abi, "allowance", [uni.getStorageSync("walletAccount"), this.$config.pledge_contract], this.$config.metas_contract)
				if (ethers.formatEther(allowanceValue.result) < this.pledgeForm.num) {
					await this.$etherCall.contactFunctionSend(erc20Abi, "approve", [this.$config.pledge_contract, ethers.MaxUint256], this.$config.metas_contract)
				}
				this.schedule = 3

			} else if (submitFlag == 3) {
				this.schedule = 4
				let token = this.$config.metas_contract;

				let pledgeNum = ethers.parseUnits(this.pledgeForm.num, 18);
				this.$etherCall.contactFunctionSend(pledgeAbi, "pledge", [token, pledgeNum, this.pledgeInfo.period],
					this.$config.pledge_contract).then(res => {
						if (res.error) {
							this.schedule = 1
							this.succeed = 2 //成功1 失败2
						} else {

							this.$api.depositAdd({
								"usdtValue": peladgeValueU,
								"metasValue": this.pledgeForm.num,
								"depositType": this.pledgeInfo.type,
								"depositDay": this.pledgeInfo.period,
								"contractAddress": token,
								"txHash": res.transactionHash,
								"signature": ""
							}).then(res => {
								if (res.code == 0) {
									this.schedule = 1
									this.succeed = 1
									this.getInvestList();
								} else {
									this.succeed = 2
								}

							})
						}
					})
			}
		},
		pledgeBack() {
			this.pledgeShow = false
			this.PopupClose()
		},

		//列表赎回按钮
		openRdeemPopup(item) {
			if (item.canRedeemValue <= 0)
				return;
			this.redeemShow = true
			this.redeemInfo = item
		},
		//赎回确认
		redeemConfirm() {
			this.schedule = 2
			this.$api.depositRedeem({
				"depositItemId": this.redeemInfo.id,
				"value": this.redeemForm.num,
				// "signature": this.sign
			}).then(res => {
				if (res.code == 0) {
					let redeemValue = ethers.parseUnits(this.redeemForm.num.toString(), 18);

					const redeemId = res.data.id;
					this.$etherCall.contactFunctionSend(redeemAbi, "redeem",
						[redeemValue, res.data.days, redeemId, res.data.utc, res.data.v, res.data.r, res
							.data.s
						],
						this.$config.redeem_contract).then((res) => {
							if (res.error) {
								this.succeed = 2
							} else {
								this.getInvestList();
								this.succeed = 1
								this.$api.redeemConfirm({
									"redeemId": redeemId,
									"txHash": res.transactionHash,
								})
							}
						})
				} else {
					this.errorInfo = res.msg;
					this.succeed = 2
				}
			})
		},
		//赎回返回
		redeemPopupBack() {
			this.receiveAwardShow = false
			this.redeemShow = false
			this.PopupClose()
		},

		//列表领取奖励
		openReceiveAward(item) {
			if (item.canReceiveAward <= 0) return
			this.receiveAwardShow = true
			this.receiveAwardInfo = item
		},

		//领取奖励
		receiveAward() {
			if (!this.receiveAwardForm.num) return
			this.schedule = 2
			this.$api.receiveAward({
				"depositItemId": this.receiveAwardInfo.id,
				"value": this.receiveAwardForm.num,
				// "signature": this.sign
			}).then(res => {
				if (res.code == 0) {
					const receiveAwardId = res.data.id;
					let receiveAwardValue = ethers.parseUnits(this.receiveAwardForm.num.toString(), 18);
					this.$etherCall.contactFunctionSend(incomeAbi, "income",
						[this.$config.metas_contract, receiveAwardValue, receiveAwardId, res.data.utc, res
							.data.v, res.data.r, res.data.s
						],
						this.$config.income_contract).then((res) => {
							if (res.error) {
								this.succeed = 2
							} else {
								this.$api.receiveAwardConfirm({
									"receiveAwardId": receiveAwardId,
									"txHash": res.transactionHash,
								})
								this.getInvestList();
								this.succeed = 1
							}
						})
				} else {
					this.succeed = 2
				}
			})
		},

		//领取奖励返回
		receiveAwardPopupBack() {
			this.receiveAwardShow = false
			this.PopupClose()
		},

		setDay(value1, value2) {
			return value1 - value2
		},

		PopupClose() {
			this.pledgeForm.num = ''
			this.receiveAwardForm.num = ''
			this.redeemForm.num = ''
			this.schedule = 1
			this.succeed = ''
		},

		cutTabs(item) {
			this.query.type = item.type
			this.query.page = 1
			switch (item.type) {
				case 1:
					this.depositIndex()
					break;
				case 2:
					this.getInvestList()
					break;
			}
		},

		depositIndex() {
			this.$api.depositIndex().then(res => {
				this.depositInfo = res.data
				this.signMessage = res.data.message
			})
		},

		getInvestList() {
			this.$api.investList().then(res => {
				this.myInvestList = res.data.list
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.pledge {
	padding: 0 32rpx;

	.header {
		text-align: center;
		margin: 48rpx auto 36rpx;

		.title {
			font-size: 50rpx;
			font-weight: 600;
		}

		.desc {
			margin-top: 16rpx;
			font-size: 24rpx;
		}
	}

	.datas {
		background-color: #63c8b1;
		margin: 32rpx 0;
		border-radius: 32rpx 32rpx 0 0;
		padding: 32rpx 48rpx;
		flex-wrap: wrap;

		.block {
			width: 50%;
			margin-bottom: 36rpx;

			&:nth-child(n+3) {
				margin-bottom: 0;
			}

			.name {
				margin-bottom: 20rpx;
				color: #fff;
				font-size: 24rpx;
				display: flex;
			}

			.num {
				color: #fff;
				font-weight: 600;
				font-size: 32rpx;
			}

			.num_2 {
				font-size: 32rpx;
			}
		}
	}

	.tabs {
		justify-content: space-between;

		.item {
			width: calc(50% - 12rpx);
			// width: 50%;
			height: 88rpx;
			line-height: 88rpx;
			border: 1px solid #d8dce1;
			text-align: center;
			border-radius: 16rpx;
		}

		.active {
			color: #278ffe;
			background-color: #eaf4ff;
			border: 1px solid #278ffe;
		}
	}

	.list {
		.item {
			margin: 60rpx 0;

			.top {
				justify-content: space-between;

				.left {
					.logo {
						width: 52rpx;
						height: 52rpx;

					}

					.text {
						font-weight: 600;
						margin: 0 20rpx;
						font-size: 28rpx;
					}

					.period {
						color: #278ffe;
						margin: 0 20rpx;
						font-weight: bold;
					}

					.pledge_icon {
						width: 28rpx;
						height: 28rpx;
					}
				}

				.right {
					font-size: 24rpx;

					text {
						font-weight: 600;
						margin-left: 6rpx;
						font-weight: bold;
					}
				}
			}

			.details {
				display: flex;
				margin-top: 24rpx;
				justify-content: space-between;

				.left {
					.line {
						margin-bottom: 12rpx;
						font-size: 24rpx;
					}
				}

				.btn {
					padding: 0rpx 26rpx;
					color: #fff;
					background-color: #278ffe;
					border-radius: 12rpx;
					height: 56rpx;
					line-height: 56rpx;
					font-size: 24rpx;
				}
			}

		}
	}

	.myList {
		.item {
			border: 1px solid #d8dce1;
			border-radius: 20rpx;
			padding: 32rpx;
			margin: 32rpx 0;

			.top {
				justify-content: space-between;

				.logo {
					width: 52rpx;
					height: 52rpx;
					margin-right: 20rpx;
				}

				.left {
					font-weight: 600;
				}

				.right {
					color: #f7931a;
					font-weight: 600;
				}

				.right_active {
					color: #707a8a;
				}


			}

			.details {
				margin: 36rpx 0;

				.btn_active {
					background-color: #d8dce1 !important;
					color: #707a8a !important;
				}
			}

			.details,
			.schedule {
				.row {
					justify-content: space-between;
					font-size: 24rpx;
					margin-bottom: 20rpx;

					&:nth-last-child(1) {
						margin-bottom: 0;
					}

					.label {
						color: #707a8a;

						text {
							color: #0F1A1E;
							font-weight: 600;
						}
					}

					.value {
						font-weight: 600;
						color: #707a8a;

						.btn {
							margin-left: 16rpx;
							padding: 14rpx 26rpx;
							background-color: #278ffe;
							color: #fff;
							border-radius: 12rpx;
						}

						text {
							color: #0F1A1E;
							font-weight: 600;
						}
					}
				}
			}

			.schedule {
				.progress {
					margin: 20rpx 0;
				}

				.value2 {
					color: #707a8a;
					font-weight: 400 !important;
				}


			}
		}
	}

}


.pledgePopup {
	width: 100%;
	padding: 48rpx 32rpx;
	background-color: #ffffff;

	.top {
		font-size: 36rpx;
		font-weight: 600;
		margin-bottom: 60rpx;

		.icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 20rpx;
		}
	}

	.row {
		margin: 60rpx 0;

		.label {
			color: #707a8a;
			margin-bottom: 20rpx;
		}

		.value {
			font-weight: 600;
			font-size: 32rpx;
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
		margin: 60rpx 0;

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
				font-size: 40rpx;
				flex: 1;
				font-weight: 400;
			}

			.placeholderClass {
				font-weight: 400;
			}

			.text {
				margin: 0 16rpx;
				font-weight: 600;
			}

			.all {
				color: #278ffe;
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
			margin: 76rpx 0;
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

			view {
				color: #707a8a;
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
			margin: 0 auto 120rpx;
		}
	}

}
</style>