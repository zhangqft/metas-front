<template>
    <view>
        <Layout></Layout>
        <view class="top">
            <view class="title-rect">
                <view style="width: 76rpx;height: 76rpx;">
                    <image :src="currentWager.img" mode="scaleToFill" />
                </view>
                <view class="title">{{ currentWager.title }}</view>
            </view>
        </view>


        <view class="wager-rect">
            <view class="wager-value">
                <view class="txt1">{{ currentWager.value_sum }} METAS</view>
                <view class="txt2">{{ $t('totalVolume') }}</view>
            </view>
            <view class="time-rect" v-if="!currentWager.result">
                <view class="time">
                    <view class="txt3">{{ this.closeTime.day }}</view>
                    <view class="txt4">{{ $t('days') }}</view>
                </view>
                <view class="time">
                    <view class="txt3">{{ this.closeTime.hour }}</view>
                    <view class="txt4">{{ $t('hrs') }}</view>
                </view>
                <view class="time">
                    <view class="txt3">{{ this.closeTime.min }}</view>
                    <view class="txt4">{{ $t('min') }}</view>
                </view>
            </view>

            <view style="color: #707A8A;font-size: 40rpx; line-height: 60rpx;font-weight: 700;"
                v-if="currentWager.result">
                {{ $t('closed') }}
            </view>
        </view>

        <view class="wager-info">
            <view class="info">
                <view class="icon_green"></view>
                <view class="txt5"> Yes {{ $t('volume') }}: {{ currentWager.value_true }} METAS</view>
            </view>
            <view class="info">
                <view class="icon_red"></view>
                <view class="txt6">No {{ $t('volume') }}: {{ currentWager.value_false }} METAS</view>
            </view>
        </view>
        <div class="chart" ref="chart"></div>
        <view class="tab">
            <view @click="tab = 0" :class="tab == 0 ? 'font-active' : 'font'">{{ $t('about') }}</view>
            <view @click="tab = 1" :class="tab == 1 ? 'font-active' : 'font'" style="margin-left: 40rpx;">{{
                $t('holders') }}</view>
        </view>
        <view class="about" v-if="tab == 0">{{ currentWager.content }}</view>
        <view class="holder-rect" v-if="tab == 1">
            <view class="holder">
                <view class="holder-title">YES {{ $t('holders') }}</view>
                <view class="holder-item" v-for="(item, index) in yesHolderList" :key="index">
                    <view class="holder-index" style="background-color: #2EBD85;">{{ index + 1 }}</view>
                    <view class="holder-content">
                        <view class="address">{{ item.addr.slice(0, 6) }}...{{ item.addr.slice(-6) }}</view>
                        <view class="amount" style="color: #2EBD85;">{{ item.value }} metas</view>
                    </view>
                </view>
            </view>
            <view class="holder">
                <view class="holder-title">NO {{ $t('holders') }}</view>
                <view class="holder-item" v-for="(item, index) in noHolderList" :key="index">
                    <view class="holder-index" style="background-color: #F6465D;">{{ index + 1 }}</view>
                    <view class="holder-content">
                        <view class="address">{{ item.addr.slice(0, 6) }}...{{ item.addr.slice(-6) }}</view>
                        <view class="amount" style="color: #F6465D;">{{ item.value }} metas</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="buy">
            <view class="btn" @click="openBuy(true)"
                style="background: url('/static/buy_yes.png') center center no-repeat;background-size: contain;">
            </view>
            <view class="btn" @click="openBuy(false)"
                style="background: url('/static/buy_no.png') center center no-repeat;background-size: contain;"></view>
        </view>

        <u-popup v-model="buyShow" mode="bottom" border-radius="32" @close="buyClose">
            <view class="popup-buy">

                <view class="popup-title">{{ currentWager.title }}</view>
                <view class="popup-txt">{{ $t('buy') }}</view>
                <view class="popup-buy-btn">
                    <view class="buy-btn" :class="currentBuyType ? 'buy-yes-select' : 'buy-yes-noSelect'"
                        @click="currentBuyType = true">
                        Yes
                    </view>
                    <view class="buy-btn" :class="currentBuyType ? 'buy-no-noSelect' : 'buy-no-select'"
                        @click="currentBuyType = false"> No </view>
                </view>
                <view class="buy-info">
                    <view class="txt-l">{{ $t('amount') }}</view>
                    <view class="txt-r">{{ $t('minAmount', { num: 1 }) }}</view>
                </view>

                <view class="input flex">
                    <input type="number" v-model="wagerValue" placeholder="0" placeholder-class="placeholderClass" />
                    <view class="text">
                        METAS
                    </view>
                </view>
                <view class="btn-confirm" @click="confirmBuy">{{ $t('buy') }} {{ currentBuyType == true ? 'Yes' : 'No'
                    }}</view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import { ethers } from "ethers";
import erc20Abi from '@/abi/erc20.json'
import contestAbi from '@/abi/Contest.json'
import * as echarts from 'echarts';
import { format } from 'date-fns-tz';

export default {
    data() {
        return {
            currentId: null,
            currentWager: {},
            currentBuyType: true,
            chartX: [],
            chartTrue: [],
            chartFalse: [],
            closeTime: {
                day: 0,
                hour: 0,
                min: 0
            },
            yesHolderList: [],
            noHolderList: [],
            tab: 0,
            buyShow: false,
            wagerValue: null
        }
    },
    onLoad(option) {
        this.currentId = option.id;
        this.load();

    },
    mounted() {

    },
    onShow() {

    },
    watch: {
        '$i18n.locale'(newval, oldval) {
            this.load();
        }
    },
    methods: {
        load() {
            this.$contestApi.getTopicOne(this.currentId).then(res => {
                this.currentWager = res.data;
                this.setDeadlineTime();
                setInterval(() => { this.setDeadlineTime(); }, 30 * 1000);

                this.chartX = res.rate.map(item => format(item.utc_minute, 'MM-dd HH', { timeZone: 'UTC' }));
                this.chartTrue = res.rate.map(item => item.rate_true * 100).reverse();
                this.chartFalse = res.rate.map(item => item.rate_false * 100).reverse();
                this.chartX = res.rate.map(item => format(item.utc_minute, 'MM-dd HH', { timeZone: 'UTC' }));
                this.$nextTick(() => {
                    this.initChart();
                });
            });

            this.$contestApi.getTopic10(this.currentId).then(res => {
                this.yesHolderList = res.data.data_true;
                this.noHolderList = res.data.data_false;
            })
        },

        initChart() {
            var myChart = echarts.init(this.$refs.chart);
            var option = {
                xAxis: {
                    type: 'category',
                    data: this.chartX,
                    nameLocation: 'center',
                },
                yAxis: {
                    type: 'value',
                    position: 'right',
                    min: 0,
                    max: 100,
                    axisLabel: {
                        formatter: '{value}%',
                        "textStyle": {
                            "fontSize": 10
                        }
                    },
                },
                series: [
                    {
                        data: this.chartFalse,
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            color: 'red'
                        }
                    },
                    {
                        data: this.chartTrue,
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            color: 'green'
                        },
                    }
                ],
                grid: {
                    show: true,
                    top: '10%',
                    left: '0',
                    width: '100%',
                    height: '90%'
                }
            };
            option && myChart.setOption(option);
        },

        setDeadlineTime() {
            const timeSpan = this.currentWager.stop * 1000 - (new Date());
            const deadlineTime = Math.max(0, timeSpan);
            this.closeTime.day = Math.floor(deadlineTime / (24 * 3600 * 1000));
            this.closeTime.hour = Math.floor((deadlineTime % (24 * 3600 * 1000)) / (3600 * 1000));
            this.closeTime.min = Math.floor((deadlineTime % (3600 * 1000)) / (60 * 1000));
        },
        openBuy(type) {
            this.currentBuyType = type;
            this.buyShow = true;
        },
        buyClose() {
            this.buyShow = false;
            this.wagerValue = null;
        },
        async confirmBuy() {
            if (Number(this.wagerValue) < 1) {
                uni.showToast({
                    title: 'At least 1 Metas',
                    icon: 'none'
                });
                return;
            }

            const res = await this.$etherCall.contactFunctionCall(erc20Abi, "balanceOf", [uni.getStorageSync("walletAccount")], this.$config.metas_contract);
            const metasBalance = ethers.formatUnits(res.result, 'ether');
            console.log(metasBalance);
            if (Number(metasBalance) < Number(this.wagerValue) * 1.05) {
                uni.showToast({
                    title: 'Metas balance not enough',
                    icon: 'none'
                });
                return;
            }
            const allowanceValue = await this.$etherCall.contactFunctionCall(erc20Abi, "allowance", [uni.getStorageSync("walletAccount"), this.$config.contest_contract], this.$config.metas_contract)
            if (ethers.formatEther(allowanceValue.result) < Number(this.wagerValue) * 1.05) {
                await this.$etherCall.contactFunctionSend(erc20Abi, "approve", [this.$config.contest_contract, ethers.MaxUint256], this.$config.metas_contract)
            }
            const wagerRes = await this.$etherCall.contactFunctionSend(contestAbi, "stake", [this.currentWager.id, ethers.parseEther(this.wagerValue), this.currentBuyType], this.$config.contest_contract)
            if (!wagerRes.transactionHash) {
                uni.showToast({
                    title: 'failed',
                    icon: 'none'
                });
                return;
            }
            this.$contestApi.ConfirmTx(wagerRes.transactionHash)
            this.buyClose();
        }
    }
}

</script>

<style lang="scss" scoped>
.top {
    width: 100%;
    margin: 0 auto;
    margin-top: 30rpx;

    .title-rect {
        width: 90%;
        margin: 0 auto;
        display: flex;
        align-items: center;

        image {
            width: 76rpx;
            height: 76rpx;
            border-radius: 8rpx;
        }

        .title {
            margin-left: 20rpx;
            font-size: 40rpx;
            font-weight: 700;
            line-height: 60rpx;
            flex: 1;
        }
    }
}

.wager-rect {
    width: 90%;
    margin: 0 auto;
    display: flex;
    height: 100rpx;
    justify-content: space-between;
    border-bottom: 2rpx #D8DCE1 solid;
    margin-top: 60rpx;

    .wager-value {
        display: flex;
        flex-direction: column;

        .txt1 {
            font-size: 32rpx;
            font-weight: 600;
            color: #0F1A1E;
        }

        .txt2 {
            font-size: 20rpx;
            font-weight: 400;
            color: #707A8A;
        }
    }

    .time-rect {
        width: 200rpx;
        display: flex;
        justify-content: space-arounds;

        .time {
            display: flex;
            flex-direction: column;
            margin-right: 20rpx;

            .txt3 {
                font-size: 32rpx;
                font-weight: 600;
                color: #0F1A1E;
                text-align: center;
            }

            .txt4 {
                font-size: 20rpx;
                font-weight: 400;
                color: #707A8A;
                text-align: center;
            }
        }
    }
}

.wager-info {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-top: 40rpx;

    .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 36rpx;
        margin-top: 20rpx;

        .icon_green {
            background-color: #2EBD85;
            width: 16rpx;
            height: 16rpx;
            border-radius: 8rpx;
        }

        .txt5 {
            color: #2EBD85;
            font-size: 24rpx;
            margin-left: 20rpx;
            line-height: 36rpxs;
        }

        .icon_red {
            background-color: #F6465D;
            width: 16rpx;
            height: 16rpx;
            border-radius: 8rpx;
        }

        .txt6 {
            color: #F6465D;
            font-size: 24rpx;
            margin-left: 20rpx;
            line-height: 36rpxs;
        }
    }
}

.chart {
    width: 90%;
    height: 260rpx;
    margin: 0 auto;
    margin-top: 20rpx;
}

.tab {
    width: 90%;
    height: 72rpx;
    border-bottom: 2rpx #D8DCE1 solid;
    margin: 0 auto;
    margin-top: 40rpx;
    display: flex;
    align-items: center;

    .font-active {
        font-size: 32rpx;
        font-weight: 700;
        color: #0F1A1E;
    }

    .font {
        font-size: 32rpx;
        font-weight: 700;
        color: #707A8A;
    }
}

.about {
    color: #0F1A1E;
    font-size: 28rpx;
    line-height: 45rpx;
    width: 90%;
    margin: 0 auto;
    margin-top: 20rpx;
}

.holder-rect {
    width: 90%;
    margin: 0 auto;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;

    .holder {
        display: flex;
        flex-direction: column;
        width: 45%;

        .holder-title {
            height: 50rpx;
            font-size: 28rpx;
            font-weight: 700;
            border-bottom: 2rpx #D8DCE1 solid;
        }

        .holder-item {
            display: flex;
            border-bottom: 2rpx #D8DCE1 solid;
            align-items: center;
            height: 100rpx;

            .holder-index {
                min-width: 40rpx;
                height: 40rpx;
                border-radius: 20rpx;
                // background-color: #2EBD85;
                font-size: 22rpx;
                color: #ffffff;
                text-align: center;
                line-height: 40rpx;
            }

            .holder-content {
                display: flex;
                flex-direction: column;
                margin-left: 20rpx;

                .address {
                    font-size: 24rpx;
                    color: #000000;
                    line-height: 36rpx;
                }

                .amount {
                    font-size: 24rpx;
                    // color: #2EBD85;
                    line-height: 36rpx;
                }
            }
        }
    }




}

.buy {
    position: fixed;
    left: 0px;
    bottom: 0px;

    width: 100%;
    margin: 0 auto;
    height: 128rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;

    background-color: #ffffff;
    border: 2rpx #D8DCE1 solid;

    .btn {
        width: 292rpx;
        height: 80rpx;
    }
}

.popup-buy {
    margin-top: 20rpx;
    width: 100%;

    .popup-title {
        width: 90%;
        margin: 0 auto;
        font-size: 56rpx;
        line-height: 84prx;
        color: #0F1A1E;
        font-weight: bold;
    }

    .popup-txt {
        width: 90%;
        margin: 0 auto;
        margin-top: 40rpx;
        font-size: 32rpx;
        color: #0F1A1E;
    }

    .popup-buy-btn {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;

        .buy-btn {
            width: 316rpx;
            height: 100rpx;
            font-size: 32rpx;
            font-weight: bold;
            text-align: center;
            line-height: 100rpx;
        }

        .buy-yes-select {
            background-color: #2EBD85;
            color: #ffffff;
        }

        .buy-yes-noSelect {
            background-color: rgba(46, 189, 133, 0.3);
            opacity: 1;
            color: #ffffff;
        }

        .buy-no-select {
            background-color: rgba(246, 70, 93);
            color: #ffffff;
        }

        .buy-no-noSelect {
            background-color: rgba(246, 70, 93, 0.1);
            color: #F6465D;
            opacity: 1;
        }

    }

    .buy-info {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;

        .txt-l {
            font-size: 32rpx;
            color: #0F1A1E;
        }

        .txt-r {
            font-size: 28rpx;
            color: #707A8A;
        }
    }

    .input {
        width: 90%;
        border: 1px solid #d8dce1;
        background-color: #f5f5f5;
        border-radius: 20rpx;
        height: 112rpx;
        padding: 0 32rpx;
        margin: 0 auto;
        margin-top: 20rpx;

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
    }

    .btn-confirm {
        width: 100%;
        height: 100rpx;
        margin-top: 20rpx;
        text-align: center;
        background-color: #278ffe;
        line-height: 100rpx;
        font-size: 32rpx;
        color: #ffffff;
        margin-top: 40rpx;
    }

}
</style>