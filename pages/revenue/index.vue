<template>
  <view class="revenue">
    <Layout></Layout>
    <view class="content">
      <view class="card">
        <view class="header flex">
          <view class="title flex">
            {{ $t("earnings_my") }}
            <l-popover :content="$t('awawd_describe')" theme="#707A8A" placement="bottom-left">
              <view style="height: 100%; width: 40rpx; margin-left: 6rpx">
                <image src="/static/show2.png" style="width: 32rpx; height: 32rpx" mode="scaleToFill" />
              </view>
            </l-popover>
            <!-- <image src="@/static/issue.png" mode="widthFix" class="issue"></image> -->
          </view>
          <image src="/static/help.png" mode="" class="help_icon" @click="releaseLog"></image>
        </view>

        <view class="datas flex">
          <view class="item" @click="goLink(50)">
            <view class="head flex">
              <image src="@/static/pledge_icon2.png" mode="" class="icon"></image>
              {{ $t("earnings_pledge") }}
            </view>
            <view class="nums">
              {{ peledgeIncome | numfixed(4) }}
            </view>
            <image src="@/static/arrow_right.png" mode="" class="arrow"></image>
          </view>
          <view class="item" @click="goLink(54)">
            <view class="head flex">
              <image src="@/static/pledge_icon3.png" mode="" class="icon"></image>
              {{ $t("earnings_award") }}
            </view>
            <view class="nums">
              {{ rewardIncome | numfixed(4) }}
            </view>
            <image src="@/static/arrow_right.png" mode="" class="arrow"></image>
          </view>
          <view class="item" @click="goLink(58)">
            <view class="head flex">
              <image src="@/static/pledge_icon4.png" mode="" class="icon"></image>
              {{ $t("earnings_node") }}
            </view>
            <view class="nums">
              {{ nodeIncome | numfixed(4) }}
            </view>
            <image src="@/static/arrow_right.png" mode="" class="arrow"></image>
          </view>

          <view class="item">
            <view class="head flex">
              <image src="@/static/pledge_icon8.png" mode="" class="icon"></image>
              {{ $t("收益贡献值") }}
              <l-popover :content="$t('contribute_describe')" theme="#707A8A" placement="bottom-right">
                <view style="height: 100%; width: 30rpx; margin-left: 6rpx">
                  <image src="/static/show1.png" style="width: 22rpx; height: 22rpx" mode="scaleToFill" />
                </view>
              </l-popover>
            </view>
            <view class="nums">
              {{ (residualIncome > 0 ? residualIncome : 0) | numfixed(4) }}
            </view>
          </view>
        </view>

        <view class="release" @click="openRelease">
          {{ $t("earnings_release") }}
        </view>
      </view>

      <view class="division"></view>

      <view class="card">
        <!-- 暂时屏蔽日志页面 -->
        <view class="header flex">
          <view class="title flex">
            {{ $t("withdraw_title") }}
            <!-- <image src="@/static/issue.png" mode="widthFix" class="issue"></image> -->
            <l-popover :content="$t('awawd_describe')" theme="#707A8A" placement="bottom-middle">
              <view style="height: 100%; width: 40rpx; margin-left: 6rpx">
                <image src="/static/show2.png" style="width: 32rpx; height: 32rpx" mode="scaleToFill" />
              </view>
            </l-popover>
          </view>
          <image src="/static/help.png" mode="" class="help_icon" @click="bill"></image>
        </view>

        <view class="title flex" style="width: 100%">
          <image src="/static/logo.png" mode="" style="width: 56rpx; height: 56rpx"></image>
          <view style="margin-left: 20rpx; font-weight: bold; font-size: 32rpx"> METAS </view>
          <view style="flex: 1"></view>
          <view style="margin-right: 20rpx; font-weight: bold; font-size: 32rpx">
            {{ (award + dividend) | numfixed(4) }}
          </view>
        </view>

        <view class="release" @click="openWithdraw">
          {{ $t("withdraw_btn") }}
        </view>

        <view class="list_head flex">
          <view class="label">
            {{ $t("withdraw_num") }}
          </view>
          <view class="value">
            {{ $t("operation") }}
          </view>
        </view>

        <view class="list">
          <view class="row" v-for="(item, index) in applyWithdrawList" :key="index">
            <view class="top">
              {{ item.total }} METAS
              <text v-if="item.walletType == 3">({{ $t("earnings") }})</text>
              <text v-if="item.walletType == 5">({{ $t("dividend") }})</text>
            </view>
            <view class="footer"> {{ item.fee }} fee </view>
            <view class="time flex" v-if="setTime(item.second) != 0">
              <image src="@/static/time_2.png" mode="" class="time_icon"></image>
              {{ setTime(item.second) }}
            </view>
            <view class="send" @click="openSend(item)" v-else>
              {{ $t("send") }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 释放 -->
    <u-popup v-model="releaseShow" mode="bottom" border-radius="32" @close="PopupClose">
      <view class="pledgePopup">
        <view class="top flex">
          <view class="left flex">
            <image src="@/static/pledge_icon5.png" mode="widthFix" class="icon"></image>
            {{ $t("earnings_release") }}
          </view>
          <image src="@/static/close_2.png" mode="widthFix" class="close_icon" @click="close"></image>
        </view>

        <view class="" v-if="!succeed">
          <view class="row">
            <view class="label">
              {{ $t("earnings_select") }}
            </view>
            <view class="tabs flex">
              <view :class="['item', { item_active: item.awardType == query.awardType }]"
                v-for="(item, index) in awardTypeList" :key="index" @click="cutTabs(item)">
                {{ $t(item.title) }}
              </view>
            </view>
          </view>
          <view class="form">
            <view class="row">
              <view class="from_title" style="display: flex; justify-content: space-between">
                <view>{{ $t("earnings_input") }}</view>
                <view>{{ $t("balance") }}：{{ releaseBalance | numfixed(4) }}</view>
              </view>
              <view class="input flex">
                <input type="number" placeholder="0" placeholder-class="placeholderClass" v-model="query.num"
                  @input="queryChange" />
                <view class="text"> METAS </view>
                <view class="all" @click="releaseAll">
                  {{ $t("all") }}
                </view>
              </view>
            </view>

            <view class="row" style="margin-bottom: 0">
              <view class="from_title">
                {{ $t("earnings_period") }}
              </view>
              <view class="period flex">
                <view :class="['item', { select_period: item.releaseType == query.releaseType }]"
                  v-for="(item, index) in releaseDaysList" :key="index" @click="cutPeriod(item)">
                  <view class="text">
                    <text v-if="item.key == 'now'">{{ $t(item.key) }}</text>
                    <text v-else>{{ $t(item.key, { days: item.days }) }}</text>
                  </view>
                  <view class="ratio"> {{ item.unFee }}% UN </view>
                </view>
              </view>
            </view>

            <view class="desc_box" v-if="query.days != 60">
              <view class="desc_top">
                {{ $t("explain_6") }}
              </view>
              <view class="">
                {{ $t("balance_USDT") }}：<text>{{ usdtBalance | numfixed(4) }}</text>
              </view>
            </view>

            <view :class="['submit', { submit_active: 10 }]" @click="releaseAmount()" v-if="query.days == 60">
              {{ $t("save_release") }}
            </view>

            <view :class="['submit', { submit_active: releaseFee }]" @click="() => releaseAmount()"
              v-else-if="query.days != 60 && schedule == 1">
              {{ $t("ratify_nums", { nums: releaseFee }) }}
            </view>
            <view :class="['submit', { submit_active: releaseFee }]" v-else="query.days != 60">
              {{ $t("deal") }}<u-loading mode="circle" color="278ffe"></u-loading>
            </view>
          </view>
        </view>

        <view class="result" v-else>
          <view class="" v-if="succeed == 1">
            <image src="@/static/result_1.png" mode="" class="result_icon"></image>
            <view class="result_text">
              {{ $t("release_succeed") }}
            </view>
            <view class="result_num"> {{ query.num }} Metas </view>
          </view>
          <view class="" v-if="succeed == 2">
            <image src="@/static/result_2.png" mode="" class="result_icon"></image>
            <view class="result_text">
              {{ $t("release_fail") }}
            </view>
            <view class="result_num">
              <!-- USDT {{ $t('balance_no') }} -->
              {{ errorInfo }}
            </view>
          </view>

          <!--30天-->
          <view :class="['back', { back_bottom: query.days != 60 }]" @click="getBack">
            {{ $t("back") }}
          </view>

          <!-- <view class="chain flex" @click="getBack" v-if="query.days != 30 && succeed == 1">
						<image src="/static/pledge_icon.png" mode="" class="icon"></image>
						{{ $t('chain_deal') }}
					</view> -->
        </view>
      </view>
    </u-popup>

    <!-- 提现 -->
    <u-popup v-model="withdrawShow" mode="bottom" border-radius="32" @close="PopupClose">
      <view class="pledgePopup">
        <view class="top flex">
          <view class="left flex">
            <image src="@/static/pledge_icon5.png" mode="widthFix" class="icon"></image>
            {{ $t("withdraw_btn") }}
          </view>
          <image src="@/static/close_2.png" mode="widthFix" class="close_icon" @click="close"></image>
        </view>

        <view class="" v-if="!succeed">
          <view class="row">
            <view class="label">
              {{ $t("withdraw_select") }}
            </view>
            <view class="tabs flex withdraw_tabs">
              <view :class="['item', { item_active: withdrawQuery.type == 1 }]" @click="cutWithdraw(1)">
                {{ $t("withdraw_revenue") }}
                <view class="nums">
                  {{ award }}
                </view>
              </view>
              <view :class="['item', { item_active: withdrawQuery.type == 2 }]" @click="cutWithdraw(2)">
                {{ $t("withdraw_dividend") }}
                <view class="nums">
                  {{ dividend }}
                </view>
              </view>
            </view>
          </view>
          <view class="form">
            <view class="row" style="margin-bottom: 32rpx">
              <view class="from_title">
                {{ $t("withdraw_input") }}
              </view>
              <view class="input flex">
                <input type="number" placeholder="0" placeholder-class="placeholderClass" v-model="withdrawQuery.num"
                  @input="withdrawQueryChange" />
                <view class="text"> METAS </view>
                <view class="all" @click="withdrawAll">
                  {{ $t("all") }}
                </view>
              </view>
            </view>

            <view class="desc_box" v-if="requireUsdtValue">
              <view class="desc_top">
                {{ $t("explain_7") }}
              </view>
              <view class="">
                {{ $t("balance_USDT") }}：<text>{{ usdtBalance | numfixed(4) }}USDT</text>
              </view>
            </view>

            <view :class="['submit', { submit_active: requireUsdtValue }]" @click="applyWithdraw" v-if="schedule == 1">
              {{ requireUsdtValue ? $t("ratify_nums", { nums: requireUsdtValue }) : $t("withdraw_btn") }}
            </view>
            <view :class="['submit', { submit_active: requireUsdtValue }]" v-else> {{ $t("deal") }} <u-loading
                mode="circle" color="278ffe"></u-loading> </view>
            <view class="desc">
              <view class=""> {{ $t("explain") }}： </view>
              <view class=""> 1.{{ $t("withdraw_describe_1") }} </view>
              <view class=""> 2.{{ $t("withdraw_describe_2") }} </view>
            </view>
          </view>
        </view>

        <view class="result" v-else>
          <view class="" v-if="succeed == 1">
            <image src="@/static/result_1.png" mode="" class="result_icon"></image>
            <view class="result_text">
              {{ $t("withdraw_succeed") }}
            </view>
            <view class="result_num"> {{ withdrawQuery.num }} METAS </view>
          </view>
          <view class="" v-if="succeed == 2">
            <image src="@/static/result_2.png" mode="" class="result_icon"></image>
            <view class="result_text">
              {{ $t("withdraw_fail") }}
            </view>
            <view class="result_num">
              <!-- USDT {{ $t('balance_no') }} -->
              {{ errorInfo }}
            </view>
          </view>
          <view :class="['back', { back_bottom: query.days != 60 }]" @click="getBack">
            {{ $t("back") }}
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 发送 -->
    <u-popup v-model="sendShow" mode="bottom" border-radius="32" @close="PopupClose">
      <view class="pledgePopup">
        <view class="top flex">
          <view class="left flex">
            <image src="@/static/pledge_icon5.png" mode="widthFix" class="icon"></image>
            {{ $t("send_title") }}
          </view>
        </view>

        <view class="" v-if="!succeed">
          <view class="form">
            <view class="form_item flex">
              <view class="">
                {{ $t("withdraw_num") }}
              </view>
              <view class=""> {{ withdrawInfo.total }} METAS </view>
            </view>
            <view class="form_item flex">
              <view class="">
                {{ $t("procedure") }}
              </view>
              <view class=""> {{ withdrawInfo.fee }} METAS </view>
            </view>
            <view class="form_item bold flex">
              <view class="">
                {{ $t("account") }}
              </view>
              <view class=""> {{ withdrawInfo.value }} METAS </view>
            </view>
            <view :class="['submit submit_active']" @click="confirmWithdraw(withdrawInfo)" v-if="schedule == 1">
              {{ $t("ratify_send") }}
            </view>
            <view :class="['submit submit_active']" v-else>
              {{ $t("send_loading") }}
            </view>
          </view>
        </view>

        <view class="result" v-else>
          <view class="" v-if="succeed == 1">
            <image src="@/static/result_1.png" mode="" class="result_icon"></image>
            <view class="result_text">
              {{ $t("send_succeed") }}
            </view>
            <view class="result_num"> {{ withdrawInfo.value }} METAS </view>
          </view>
          <view class="" v-if="succeed == 2">
            <image src="@/static/result_2.png" mode="" class="result_icon"></image>
            <view class="result_text">
              {{ $t("send_fail") }}
            </view>
            <view class="result_num">
              {{ withdrawFailReason }}
              <!-- {{ $t('balance_no_BNB') }} -->
            </view>
          </view>
          <view :class="['back', { back_bottom: query.days != 60 }]" @click="getBack">
            {{ $t("back") }}
          </view>
          <!-- <view class="chain flex" @click="getBack" v-if="query.days != 30 && succeed == 1">
						<image src="/static/pledge_icon.png" mode="" class="icon"></image>
						{{ $t('chain_deal') }}
					</view> -->
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { ethers } from "ethers";
import pledgeAbi from "@/abi/Pledge.json";
import erc20Abi from "@/abi/erc20.json";
import releaseAbi from "@/abi/Release.json";
import withdraw0Abi from "@/abi/Withdraw0.json";
import withdraw1Abi from "@/abi/Withdraw1.json";
import nodeAbi from "@/abi/Node.json";
import Layout from "@/components/Layout/Layout.vue";
import { formatTimeDiff2 } from "@/utils/formatTimeDiff.js";
import Bignumber from "bignumber.js"

export default {
  components: {
    Layout,
  },
  data() {
    return {
      peledgeIncome: 0,
      rewardIncome: 0,
      nodeIncome: 0,
      award: 0, //收益
      dividend: 0, //分红
      usdtBalance: 0,
      residualIncome: 0, //收益贡献值

      applyWithdrawList: [],
      releaseShow: false,
      releaseBalance: 0,
      query: {
        num: "",
        awardType: 1,
        releaseType: 1,
        days: 0,
      },
      awardTypeList: [
        {
          label: this.$t("earnings_pledge"),
          title: "earnings_pledge",
          awardType: 1,
        },
        {
          label: this.$t("earnings_award"),
          title: "earnings_award",
          awardType: 2,
        },
        {
          label: this.$t("earnings_node"),
          title: "earnings_node",
          awardType: 4,
        },
      ],
      releaseDaysList: [
        {
          label: this.$t("now"),
          key: "now",
          releaseType: 1,
          days: 0,
          unFee: "20",
        },
        {
          label: this.$t("now_day", {
            days: 10,
          }),
          key: "now_day",
          releaseType: 2,
          days: 10,
          unFee: "15",
        },
        {
          label: this.$t("now_day", {
            days: 20,
          }),
          key: "now_day",
          releaseType: 3,
          days: 20,
          unFee: "10",
        },
        {
          label: this.$t("now_day", {
            days: 30,
          }),
          key: "now_day",
          releaseType: 4,
          days: 30,
          unFee: "5",
        },
        {
          label: this.$t("now_day", {
            days: 60,
          }),
          key: "now_day",
          releaseType: 5,
          days: 60,
          unFee: "0",
        },
      ],
      succeed: "",
      schedule: 1,
      errorInfo: null,
      withdrawShow: false,
      withdrawQuery: {
        type: 1,
        num: "",
      },
      withdrawFailReason: "",
      releaseFee: 0,
      requireUsdtValue: 0,

      withdrawInfo: {
        id: 0,
        total: 0,
        value: 0,
        fee: 0,
      },
      sendShow: false,
    };
  },
  onShow() {
    if (!uni.getStorageSync("walletAccount")) {
      uni.showToast({
        title: "login first",
        icon: "none",
        duration: 2000,
        mask: true,
      });
      return;
    }

    this.$api.walletInfo().then((res) => {
      this.peledgeIncome = res.data.list.find((item) => item.type === 1)?.balance;
      this.rewardIncome = res.data.list.find((item) => item.type === 2)?.balance;
      this.nodeIncome = res.data.list.find((item) => item.type === 4)?.balance;
      this.award = res.data.list.find((item) => item.type === 3)?.balance;
      this.dividend = res.data.list.find((item) => item.type === 5)?.balance;
      this.releaseBalance = this.peledgeIncome;
    });

    this.$api.applyWithdrawList().then((res) => {
      this.applyWithdrawList = res.data;
    });

    this.$api.myDeposit().then((res) => {
      this.residualIncome = Number(res.data.dynamicAwardLimit) - Number(res.data.hasGetAward);
    });

    this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract).then((res) => {
      this.usdtBalance = ethers.formatUnits(res.result, "ether");
    });
  },
  methods: {
    bill() {
      uni.navigateTo({
        url: "/pages/bill/index",
      });
    },
    releaseLog() {
      uni.navigateTo({
        url: "/pages/bill/releaseLog",
      });
    },

    async openRelease() {
      this.query.awardType = 1
      this.query.releaseType = 1
      this.releaseShow = true;
      this.releaseFee = ""
      const usdtRes = await this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract);
      this.usdtBalance = ethers.formatUnits(usdtRes.result, "ether");
    },
    goLink(type) {
      uni.navigateTo({
        url: "/pages/bill/index?type=" + type,
      });
    },
    releaseAll() {
      if (this.query.awardType == 1) {
        this.query.num = this.peledgeIncome;
      }
      if (this.query.awardType == 2) {
        this.query.num = this.rewardIncome;
      }
      if (this.query.awardType == 4) {
        this.query.num = this.nodeIncome;
      }
      this.computeReleaseFee();
    },
    cutPeriod(item) {
      this.query.releaseType = item.releaseType;
      this.query.days = item.days;
      this.computeReleaseFee();
    },

    queryChange() {
      this.computeReleaseFee();
    },

    computeReleaseFee() {
      if (Number(this.query.num) > 0) {
        let currentFee = 0;
        if (this.query.days === 60) {
          this.releaseFee = 0;
          currentFee = 0;
          return
        }
        if (this.query.days === 0) {
          currentFee = Bignumber((Number(this.query.num) * 2) / 10);
        }
        if (this.query.days === 10) {
          currentFee = Bignumber((Number(this.query.num) * 15) / 100);
        }
        if (this.query.days === 20) {
          currentFee = Bignumber(Number(this.query.num) / 10);
        }
        if (this.query.days === 30) {
          currentFee = Bignumber((Number(this.query.num) * 5) / 100);
        }

        this.$etherCall.contactFunctionCall(releaseAbi, "get_buy", [ethers.parseEther(currentFee.toFixed(8))],
          this.$config.release_contract).then(res => {
            this.releaseFee = Bignumber(Bignumber(ethers.formatEther(res.result)).toFixed(6));
          })
      } else {
        this.releaseFee = 0;
      }
    },
    cutTabs(item) {
      this.query.awardType = item.awardType;
      if (this.query.awardType == 1) {
        this.releaseBalance = this.peledgeIncome;
      }
      if (this.query.awardType == 2) {
        this.releaseBalance = this.rewardIncome;
      }
      if (this.query.awardType == 4) {
        this.releaseBalance = this.nodeIncome;
      }
      this.query.num = "";
    },
    async releaseAmount() {
      console.log("+++++++++++++++++++++++")
      this.schedule = 2;

      const allowanceValue = await this.$etherCall.contactFunctionCall(erc20Abi, "allowance",
        [uni.getStorageSync("walletAccount"), this.$config.release_contract],
        this.$config.usdt_contract
      );
      if (ethers.formatEther(allowanceValue.result) < this.query.num) {
        await this.$etherCall.contactFunctionSend(erc20Abi, "approve", [this.$config.release_contract, ethers.MaxUint256], this.$config.usdt_contract);
      }

      if (this.releaseFee > 0) {
        let currentFee = 0;
        if (this.query.days === 0) {
          currentFee = (Number(this.query.num) * 2) / 10;
        }
        if (this.query.days === 10) {
          currentFee = (Number(this.query.num) * 15) / 100;
        }
        if (this.query.days === 20) {
          currentFee = Number(this.query.num) / 10;
        }
        if (this.query.days === 30) {
          currentFee = (Number(this.query.num) * 5) / 100;
        }
        const res = await this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract);
        this.usdtBalance = ethers.formatUnits(res.result, "ether");
        console.log("blance", this.usdtBalance)

        const usdtValueRes = await this.$etherCall.contactFunctionCall(
          releaseAbi,
          "get_buy",
          [ethers.parseEther(currentFee.toString())],
          this.$config.release_contract
        );
        const usdtValue = Number(ethers.formatEther(usdtValueRes.result));
        if (Number(this.usdtBalance) < usdtValue) {
          this.errorInfo = `USDT Balance not enough,Requires ${Number(usdtValue).toFixed(6)},Balance ${Number(this.usdtBalance).toFixed(6)}`;
          this.succeed = 2;
          return;
        }
      }

      this.$api.awardRelease({
        awardType: this.query.awardType,
        amount: this.query.num,
        releaseType: this.query.releaseType,
        releaseDays: this.query.days,
        // "signature": this.sign
      }).then((res) => {
        if (res.code == 0) {
          let releaseValue = ethers.parseEther(this.query.num.toString());
          const releaseId = res.data.id;
          this.$etherCall.contactFunctionSend(releaseAbi, "release",
            [releaseValue, res.data.days, releaseId, res.data.utc, res.data.v, res.data.r, res.data.s],
            this.$config.release_contract).then((res) => {
              if (res.error) {
                this.succeed = 2;
              } else {
                this.succeed = 1;
                this.$api.releaseConfirm({
                  releaseId: releaseId, txHash: res.transactionHash,
                });
              }
            });
        } else {
          this.errorInfo = res.msg;
          this.succeed = 2;
        }
      });

      const usdtRes = await this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract);
      this.usdtBalance = ethers.formatUnits(usdtRes.result, "ether");
      this.release = '';
    },
    async withdrawQueryChange() {
      await this.computeWithdrawUsdt();
    },

    async computeWithdrawUsdt() {
      if (Number(this.withdrawQuery.num) > 0) {
        const usdtValue = await this.$etherCall.contactFunctionCall(
          withdraw0Abi,
          "get_buy",
          [ethers.parseEther(this.withdrawQuery.num.toString())],
          this.$config.withdraw0_contract
        );
        this.requireUsdtValue = Number(Number(ethers.formatEther(usdtValue.result)).toFixed(6));
      } else {
        this.requireUsdtValue = 0;
      }
    },
    async applyWithdraw() {
      this.schedule = 2;
      const allowanceValue = await this.$etherCall.contactFunctionCall(
        erc20Abi,
        "allowance",
        [uni.getStorageSync("walletAccount"), this.$config.withdraw0_contract],
        this.$config.usdt_contract
      );

      if (ethers.formatEther(allowanceValue.result) < this.withdrawQuery.num) {
        await this.$etherCall.contactFunctionSend(erc20Abi, "approve", [this.$config.withdraw0_contract, ethers.MaxUint256], this.$config.usdt_contract);
      }

      const usdtRes = await this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract);
      this.usdtBalance = ethers.formatUnits(usdtRes.result, "ether");

      const usdtValue = await this.$etherCall.contactFunctionCall(withdraw0Abi, "get_buy",
        [ethers.parseEther(this.withdrawQuery.num.toString())],
        this.$config.withdraw0_contract
      );
      this.requireUsdtValue = Number(Number(ethers.formatEther(usdtValue.result)).toFixed(6));
      if (Number(this.usdtBalance) < Number(this.requireUsdtValue)) {
        this.errorInfo = "USDT Balance not enough, At least " + this.requireUsdtValue + " U";
        this.succeed = 2;
        return;
      }

      let walletType = 0;
      if (this.withdrawQuery.type == 1) {
        walletType = 3;
      }
      if (this.withdrawQuery.type == 2) {
        walletType = 5;
      }
      this.$api.applyWithdraw({
        value: this.withdrawQuery.num,
        walletType: walletType,
        // "signature": this.sign
      }).then((res) => {
        if (res.code == 0) {
          let applyValue = ethers.parseEther(res.data.metasValue);
          const applyId = res.data.id;
          this.$etherCall.contactFunctionSend(withdraw0Abi, "withdraw",
            [applyValue, applyId, res.data.utc, res.data.v, res.data.r, res.data.s],
            this.$config.withdraw0_contract
          ).then((res) => {
            if (res.error) {
              this.succeed = 2;
            } else {
              this.$api.applyWithdrawConfirm({ applyId: applyId, txHash: res.transactionHash, }).then((res) => {
                if (res.code == 0) {
                  this.succeed = 1;
                  this.$api.applyWithdrawList().then((res) => {
                    this.applyWithdrawList = res.data;
                  });
                } else {
                  this.succeed = 2;
                }
              });
            }
          });
        } else {
          this.errorInfo = res.msg;
          this.succeed = 2;
        }
      });

      this.$api.applyWithdrawList().then((res) => {
        this.applyWithdrawList = res.data;
      });
    },

    async openWithdraw() {
      // uni.showToast({
      // 	title: '即將開放',
      // 	icon: 'none',
      // 	duration: 2000,
      // 	mask: true
      // });
      // return;
      this.withdrawShow = true;
      const usdtRes = await this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.usdt_contract);
      this.usdtBalance = ethers.formatUnits(usdtRes.result, "ether");
      this.requireUsdtValue = "";
    },
    cutWithdraw(value) {
      this.withdrawQuery.type = value;
      this.withdrawQuery.num = ''
    },
    async withdrawAll() {
      if (this.withdrawQuery.type == 1) {
        this.withdrawQuery.num = this.award;
      } else {
        this.withdrawQuery.num = this.dividend;
      }

      await this.computeWithdrawUsdt();
    },

    confirmWithdraw(withdrawInfo) {
      this.schedule = 2;
      this.$api
        .confirmWithdraw({
          withdrawId: withdrawInfo.id,
          // "signature": this.sign
        })
        .then((res) => {
          if (res.code == 0) {
            let withdrawValue = ethers.parseEther(res.data.metasValue);
            const applyId = res.data.id;
            if (res.data.awardType == 3) {
              this.$etherCall.contactFunctionSend(withdraw1Abi, "withdraw_complete",
                [withdrawValue, applyId, res.data.utc, res.data.v, res.data.r, res.data.s],
                this.$config.withdraw1_contract
              )
                .then((res) => {
                  if (res.error) {
                    this.succeed = 2;
                  } else {
                    this.succeed = 1;
                    this.$api.confirmWithdraw1({
                      applyId: applyId,
                      txHash: res.transactionHash,
                    });
                  }
                });
            }
            if (res.data.awardType == 5) {
              console.log(this.$config.node_contract);
              this.$etherCall.contactFunctionSend(nodeAbi, "income",
                [this.$config.metas_contract, withdrawValue, applyId, res.data.utc, res.data.v, res.data.r, res.data.s],
                this.$config.node_contract
              ).then((res) => {
                if (res.error) {
                  this.succeed = 2;
                } else {
                  this.succeed = 1;
                  this.$api.confirmWithdraw1({
                    applyId: applyId, txHash: res.transactionHash,
                  });
                }
              });
            }
          } else if (res.code == 400) {
            this.withdrawFailReason = res.msg;
            this.succeed = 2;
          } else {
            this.succeed = 2;
          }
        });
    },
    openSend(item) {
      this.sendShow = true;
      this.withdrawInfo = item;
    },
    getBack() {
      this.releaseShow = false;
      this.withdrawShow = false;
      this.sendShow = false;
      this.PopupClose();

      this.$api.applyWithdrawList().then((res) => {
        this.applyWithdrawList = res.data;
      });
      this.$api.walletInfo().then((res) => {
        this.peledgeIncome = res.data.list.find((item) => item.type === 1)?.balance;
        this.rewardIncome = res.data.list.find((item) => item.type === 2)?.balance;
        this.nodeIncome = res.data.list.find((item) => item.type === 4)?.balance;
        this.award = res.data.list.find((item) => item.type === 3)?.balance;
        this.dividend = res.data.list.find((item) => item.type === 5)?.balance;
      });
    },

    PopupClose() {
      this.query.num = "";
      this.withdrawQuery.num = "";
      this.schedule = 1;
      this.succeed = "";
      this.withdrawFailReason = ""
    },

    close() {
      this.releaseShow = false;
      this.withdrawShow = false;
    },
    setTime(value) {
      return formatTimeDiff2(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.revenue {
  // background-color: #f5f5f5;

  .content {
    // padding: 0 32rpx;
    margin-top: 64rpx;

    .division {
      background-color: #f5f5f5;
      height: 20rpx;
      margin: 52rpx 0;
    }

    .card {
      background-color: #fff;
      padding: 0 32rpx;

      .header {
        margin-bottom: 48rpx;
        justify-content: space-between;

        .help_icon {
          width: 32rpx;
          height: 32rpx;
        }

        .title {
          font-weight: 600;
          font-size: 50rpx;
        }

        .issue {
          width: 32rpx;
          height: 32rpx;
          margin-left: 24rpx;
        }
      }

      .datas {
        flex-wrap: wrap;

        .item {
          // width: 320rpx;
          width: calc(50% - 12rpx);
          border: 1px solid #d8dce1;
          border-radius: 20rpx;
          padding: 28rpx 32rpx;
          position: relative;
          margin-bottom: 28rpx;
          margin-right: 16rpx;

          &:nth-child(2n) {
            margin-right: 0;
          }

          &:nth-child(n + 3) {
            margin-bottom: 0;
          }

          .icon {
            width: 36rpx;
            height: 36rpx;
            margin-right: 20rpx;
          }

          .nums {
            margin-top: 20rpx;
            font-weight: 600;
            font-size: 28rpx;
          }

          .arrow {
            position: absolute;
            width: 12rpx;
            height: 24rpx;
            right: 32rpx;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }

      .release {
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        color: #fff;
        border-radius: 16rpx;
        background-color: #278ffe;
        margin-top: 40rpx;
        font-size: 32rpx;
      }

      .list_head {
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom: 24rpx;
        margin: 48rpx 0 0rpx;

        .label,
        .value {
          color: #707a8a;
        }
      }

      .list {
        .row {
          padding: 32rpx 0;
          position: relative;
          border-bottom: 1px solid #f5f5f5;

          &:nth-last-child(1) {
            margin-bottom: 0;
          }

          .top {
            font-size: 28rpx;

            text {
              margin-left: 8rpx;
            }
          }

          .footer {
            font-size: 24rpx;
          }

          .time {
            position: absolute;
            right: 0rpx;
            top: 40rpx;
            color: #f7931a;
            font-size: 24rpx;
            font-weight: 600;

            .time_icon {
              width: 36rpx;
              height: 36rpx;
              margin-right: 8rpx;
            }
          }

          .send {
            position: absolute;
            right: 0rpx;
            top: 32rpx;
            padding: 16rpx 24rpx;
            background-color: #278ffe;
            color: #fff;
            border-radius: 12rpx;
            font-size: 24rpx;
          }
        }
      }
    }
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

    .withdraw_tabs {
      .item {
        width: 328rpx;
        height: 120rpx;
        line-height: 28rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .nums {
          font-weight: 600;
        }
      }

      .item_active {
        color: #fff;

        .nums {
          color: #fff;
        }
      }
    }

    .period {
      flex-wrap: wrap;

      .item {
        width: 210rpx;
        height: 100rpx;
        padding: 12rpx 0;
        text-align: center;
        border: 1px solid #d8dce1;
        border-radius: 60rpx;
        margin-right: 28rpx;
        margin-bottom: 24rpx;

        &:nth-child(3n) {
          margin-right: 0;
        }

        .ratio {
          font-size: 24rpx;
        }
      }

      .select_period {
        background-color: #278ffe;

        .text,
        .ratio {
          color: #fff;
        }
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
      margin: 0 auto 120rpx;
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
