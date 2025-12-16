<template>
    <view>
        <Layout></Layout>
        <view class="top">
            <view class="title-rect">
                <view style="width: 48rpx;height: 48rpx;" @click="goBack">
                    <image src="/static/arrow_left.png" mode="scaleToFill" />
                </view>
                <view class="title">{{ $t('positions') }}</view>
            </view>
        </view>

        <view class="content-rect">
            <view class="rect1">
                <view style="width: 20rpx;height: 20rpx;">
                    <image src="/static/cycle.png" mode="scaleToFill" />
                </view>
                <view class="txt1">{{ $t('portfolio') }}</view>
            </view>

            <view class="rect1" style="align-items: end;">
                <view class="txt2">{{ userAmout.can_value | numfixed(2) }}</view>
                <view class="txt3">METAS</view>
            </view>

            <view class="rect1">
                <view class="txt4">{{ $t('stake') }}:</view>
                <view class="txt5">{{ userAmout.stake_value | numfixed(2) }} METAS</view>
            </view>

            <view v-if="userAmout.can_value > 0" class="receive-btn" @click="openReceive">{{ $t('claim') }}</view>
            <view v-else class="receive-btn" style="background-color: gray;">{{ $t('claim') }}</view>
        </view>

        <view class="content-rect">
            <view class="rect2">
                <view class="rect2-left" style="min-width: 70%;">
                    <view class="rect2-left-1">
                        <view style="width: 20rpx;height: 20rpx;">
                            <image src="/static/lingxing.png" mode="scaleToFill" />
                        </view>
                        <view class="rect2-left-txt">{{ $t('profitLoss') }}</view>
                    </view>
                    <view class="rect-left-2">
                        <view style="font-size: 40rpx; font-weight: 700; color:#0f1a1e;">
                            {{ (userAmout.win_value - userAmout.loss_value) | numfixed(2) }}
                            <span style="font-size: 28rpx; font-weight: 700; color:#0f1a1e;">METAS</span>
                        </view>
                    </view>
                </view>
                <view class="rect2-left">
                    <view class="rect2-left-1">
                        <view style="width: 20rpx;height: 20rpx;;">
                            <image src="/static/lingxing.png" mode="scaleToFill" />
                        </view>
                        <view class="rect2-left-txt">{{ $t('predictions') }}</view>
                    </view>
                    <view class="rect-left-2" style="font-size: 40rpx; font-weight: 700; color:#0f1a1e;">{{
                        userAmout.count }}</view>
                </view>
            </view>
        </view>

        <view class="list-rect">
            <view class="list-title">{{ $t('positions') }}</view>

            <view class="list-content" v-for="(item, index) in wagerList" :key="index">
                <view class="list-item">
                    <view style="min-height: 76rpx; margin-left: 10rpx;display: flex; align-items: center;">
                        <image style="min-width: 76rpx;max-width:78rpx;height: 76rpx;border-radius: 10rpx" :src="item.topic.img"
                            mode="scaleToFill" />
                        <view class="item-title">{{ item.topic.title }}</view>
                    </view>
                    <view style="display: flex; flex-direction: column;">
                        <view class="item-value">{{ item.value }} Metas</view>
                        <view style="font-size: 24rpx; display: flex;align-items: center;padding-top: 10rpx;">
                            <view style="margin-right: 10rpx;">{{ rate(item) | numfixed(2) }}%</view>
                            <view :class="item.result == 1 ? 'item-direction_yes' : 'item-direction_no'">
                                {{ item.result == 1 ? 'YES' : 'NO' }}</view>
                        </view>
                    </view>
                </view>
                <view class="list-bottom">
                    <view class="time">{{ item.utc * 1000 | dateFormat }}</view>
                    <view class="result1" v-if="item.win_open != null && item.win_open >= 0">
                        <view style="width: 28rpx;height: 28rpx;">
                            <image style="width: 28rpx;height: 28rpx;" src="/static/ying.png" mode="scaleToFill" />
                        </view>
                        <view class="txt_ying" v-if="item.win_open > 0">{{ $t('winning') }} +{{ item.win_open |
                            numfixed(2) }}</view>
                        <view class="txt_ying" v-else>{{ $t('winning') }} </view>
                    </view>
                    <view class="result2" v-if="item.win_open != null && item.win_open < 0">
                        <view style="width: 28rpx;height: 28rpx;">
                            <image style="width: 28rpx;height: 28rpx;" src="/static/shu.png" mode="scaleToFill" />
                        </view>
                        <view class="txt_shu">{{ $t('lost') }}</view>
                    </view>
                </view>
            </view>
        </view>

        <u-popup v-model="receiveShow" mode="bottom" border-radius="32" @close="receiveClose">
            <view class="popup-buy">

                <view class="popup-title">
                    <view style="width: 48rpx;height: 48rpx;">
                        <image src="/static/receive.png" style="width: 48rpx;height: 48rpx;" mode="scaleToFill" />
                    </view>
                    {{ $t('claim') }}
                </view>
                <view class="popup-txt1">{{ $t('claimable') }}</view>
                <view class="popup-txt2">{{ userAmout.can_value | numfixed(2) }} METAS</view>
                <!-- <view class="popup-txt3">{{ $t('entenrQuantity') }}</view> -->
                <!-- <view class="input flex">
                    <input type="number" placeholder="0" placeholder-class="placeholderClass" />
                    <view class="text">
                        METAS
                    </view>
                    <view class="all">
                        {{ $t('all') }}
                    </view>
                </view> -->

                <view @click="confirmReceive" class="receive-btn"> {{ $t('claim') }}</view>
            </view>
        </u-popup>
    </view>
</template>

<script>

import contestAbi from '@/abi/Contest.json'
export default {
    data() {
        return {
            userAmout: {},
            wagerList: [],
            receiveShow: false,
            receiceAward: []
        }
    },
    onLoad(option) {


    },
    mounted() {

    },

    onShow() {
        this.load();
    },

    watch: {
        '$i18n.locale'(newval, oldval) {
            this.load();
        }
    },
    methods: {
        load() {
            if (!uni.getStorageSync("walletAccount")) {
                uni.showToast({
                    title: 'login first',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                });
                return;
            }
            this.$contestApi.getStatistics(uni.getStorageSync("walletAccount")).then(res => {
                this.userAmout = res.data;
            })

            this.$contestApi.getStake(uni.getStorageSync("walletAccount")).then(res => {
                this.wagerList = res.data;
            })

            this.$contestApi.getSettles(uni.getStorageSync("walletAccount")).then(res => {
                this.receiceAward = res.data;
            })
        },
        openReceive() {
            this.receiveShow = true;
        },
        receiveClose() {
            this.receiveShow = false;
            this.load();
        },

        async confirmReceive() {
            const wagerRes = await this.$etherCall.contactFunctionSend(contestAbi, "settles", [this.receiceAward], this.$config.contest_contract)
            if (!wagerRes.transactionHash) {
                uni.showToast({
                    title: 'failed',
                    icon: 'none'
                });
                return;
            }
            this.$contestApi.ConfirmTx(wagerRes.transactionHash)
            this.receiveClose();
        },
        rate(item) {
            if (item.result == 1) {
                return item.value / item.topic.value_true * 100
            } if (item.result == -1) {
                return item.value / item.topic.value_false * 100
            }
            return 0.0
        },
        goBack() {
            uni.navigateBack({
                delta: 1
            });
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
            width: 48rpx;
            height: 48rpx;
        }

        .title {
            font-size: 40rpx;
            font-weight: 700;
            line-height: 60rpx;
            flex: 1;
        }
    }
}

.content-rect {
    width: 90%;
    border: 2rpx #D8DCE1 solid;
    border-radius: 16rpx;
    margin: 0 auto;
    margin-top: 50rpx;

    .rect1 {
        width: 90%;
        margin: 0 auto;
        display: flex;
        margin-top: 30rpx;

        image {
            width: 20rpx;
            height: 20rpx;
        }

        .txt1 {
            font-size: 28rpx;
            color: #707A8A;
            margin-left: 10rpx;
        }

        .txt2 {
            font-size: 60rpx;
            color: #0F1A1E;
            font-weight: 700;
        }

        .txt3 {
            font-size: 40rpx;
            color: #0F1A1E;
            margin-left: 10rpx;
            padding-bottom: 8rpx;
            font-weight: 700;
        }

        .txt4 {
            font-size: 28rpx;
            color: #707A8A;
        }

        .txt5 {
            font-size: 28rpx;
            color: #0F1A1E;
            font-weight: 600;
        }
    }

    .receive-btn {
        margin: 30rpx auto;
        width: 600rpx;
        height: 80rpx;
        background-color: #278ffe;
        border-radius: 16rpx;
        text-align: center;
        color: #ffffff;
        font-size: 28rpx;
        font-weight: 700;
        line-height: 80rpx;

    }

    .rect2 {
        width: 90%;
        margin: 0 auto;
        display: flex;

        .rect2-left {
            width: auto;
            display: flex;
            flex-direction: column;
            margin: 40rpx auto;

            .rect2-left-1 {
                display: flex;

                image {
                    width: 20rpx;
                    height: 20rpx;
                    border-radius: 10rpx;
                }

                .rect2-left-txt {
                    font-size: 28rpx;
                    color: #707A8A;
                    margin-left: 10rpx;
                }
            }

            .rect-left-2 {
                display: flex;
                flex-direction: row;
                align-items: end;
                margin-top: 20rpx;
            }
        }
    }
}

.list-rect {
    width: 100%;
    margin-top: 40rpx;

    .list-title {
        width: 90%;
        height: 60rpx;
        margin: 0 auto;
        border-bottom: 2rpx #D8DCE1 solid;
        color: #000000;
        font-size: 32rpx;
        font-weight: 600;
        margin-top: 30rpx;
    }

    .list-content {
        width: 90%;
        border-bottom: 2rpx #D8DCE1 solid;
        margin: 30rpx auto;

        .list-item {
            display: flex;
            justify-content: space-between;
            align-items: start;

            .item-title {
                margin: 0 10rpx;
                font-size: 28rpx;
                font-weight: 700;
                color: #0F1A1E;
                line-height: 45rpx;
                padding-left: 20rpx;
                padding-right: 50rpx;
            }

            .item-value {
                font-size: 28rpx;
                font-weight: 700;
                color: #0F1A1E;
                white-space: nowrap;
                margin-right: 10rpx;
            }

            .item-direction_yes {
                line-height: 30rpx;
                font-size: 24rpx;
                color: #63C8B1;
                padding-top: 4rpx;
            }

            .item-direction_no {
                line-height: 30rpx;
                font-size: 24rpx;
                color: #F6465D;
                padding-top: 4rpx;
            }
        }

        .list-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 30rpx;
            margin-bottom: 30rpx;

            .time {
                font-size: 24rpx;
                color: #707A8A;
                padding-left: 20rpx;
            }

            .result1 {
                display: flex;

                .txt_ying {
                    color: #2ebd85;
                    font-size: 28rpx;
                    margin-left: 10rpx;
                }
            }

            .result2 {
                display: flex;

                .txt_shu {
                    color: #f6465d;
                    font-size: 28rpx;
                    margin-left: 10rpx;
                    line-height: 28rpx;
                    padding-top: 2rpx;
                }
            }
        }
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
                width: 40rpx;
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
    height: 100rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;

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
        font-size: 36rpx;
        color: #0F1A1E;
        font-weight: bold;
        display: flex;
        margin-top: 40rpx;
        align-items: centers;
    }

    .popup-txt1 {
        width: 90%;
        margin: 0 auto;
        margin-top: 40rpx;
        font-size: 28rpx;
        color: #707A8A;
    }

    .popup-txt2 {
        width: 90%;
        margin: 0 auto;
        margin-top: 20rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: #0F1A1E;
    }

    .popup-txt3 {
        width: 90%;
        margin: 0 auto;
        margin-top: 40rpx;
        font-size: 32rpx;
        color: #0F1A1E;
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

        .all {
            color: #278ffe;
        }
    }

    .receive-btn {
        width: 90%;
        height: 88rpc;
        margin: 40rpx auto;
        text-align: center;
        background-color: #278ffe;
        line-height: 88rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: #ffffff;
        border-radius: 44rpx;
    }

}
</style>