<template>
    <view class="content">
        <Layout></Layout>
        <view class="top">
            <view class="left">
                {{ $t('wager') }}
                <l-popover :content="$t('wager_info')" theme="#707A8A" placement="top-left">
                    <view style="height: 100%; width: 30rpx; margin-left: 6rpx;">
                        <image src="/static/show2.png" style="width: 32rpx;height: 32rpx;" mode="scaleToFill" />
                    </view>
                    <!-- <template #content>
                        <view style="color: black;font-weight: bold;">内容</view>
                    </template> -->
                </l-popover>
            </view>
            <view class="right" @click="goLinkMy">
                <view style="height: 100%; width: 32rpx; margin-right: 6rpx;margin-top: 4rpx;">
                    <image src="/static/positions.png" style="width: 32rpx;height: 32rpx;" mode="scaleToFill" />
                </view>
                {{ $t('positions') }}
            </view>
        </view>

        <view class="wager-category">
            <view class="wager-category-rect">
                <view class="category-txt" :class="index == selectCategoryIndex ? 'category-txt-active' : ''"
                    @click="switchcategory(index, item.id)" v-for="(item, index) in wagerCategory" :key="index">{{
                        item.name
                    }}
                </view>
            </view>
        </view>

        <view class="content-rect" v-for="(item, index) in wagerList" :key="index" @click="goLink(item.id)">
            <view class="title-rect">
                <view style="width: 76rpx;min-height: 76rpx;">
                    <image :src="item.img" mode="scaleToFill" />
                </view>
                <view class="title">{{ item.title }}</view>
            </view>
            <view v-if="getState(item) == 0" class="wager-rect">
                <view class="yes-class" @click.stop="openBuy(item, true)"></view>
                <view class="no-class" @click.stop="openBuy(item, false)"></view>
            </view>

            <view v-if="getState(item) == 1" class="wager-rect-stop">已封盘</view>
            <view v-if="getState(item) == 2" class="wager-rect-stop">已结束</view>

            <view class="statistics-rect">
                <view class="txt">{{ $t('total') }}:{{ item.value_true }}METAS</view>
                <view class="txt">{{ $t('total') }}:{{ item.value_false }}METAS</view>
            </view>
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
export default {
    data() {
        return {
            selectCategoryIndex: 0,
            selectCategoryId: null,
            wagerCategory: [],
            wagerList: [],
            currentWager: {},
            currentBuyType: true,
            buyShow: false,
            wagerValue: null,
        }
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
            this.$contestApi.getCategory().then(res => {
                this.wagerCategory = res.data;
            });

            this.$contestApi.getTopic({ c_id: this.selectCategoryId, page: 1, pageSize: 1000 }).then(res => {
                this.wagerList = res.data;
            });
        },
        getState(item) {
            const currentUtc = (new Date()) / 1000;
            if (currentUtc >= item.stop && currentUtc < item.close) {
                return 1;
            } else if (currentUtc > item.close) {
                return 2;
            }
            return 0;

        },
        goLink(id) {
            uni.navigateTo({
                url: "/pages/wager/detail?id=" + id
            })
        },
        goLinkMy() {
            uni.navigateTo({
                url: "/pages/wager/my"
            })
        },

        switchcategory(index, id) {
            this.selectCategoryIndex = index;
            if (this.selectCategoryIndex == 0) {
                id = null;
                this.selectCategoryId = null
            } else {
                this.selectCategoryId = id
            }
            this.$contestApi.getTopic({ c_id: this.selectCategoryId, page: 1, pageSize: 1000 }).then(res => {
                this.wagerList = res.data;
            });
        },
        async openBuy(item, type) {
            if (!uni.getStorageSync("walletAccount")) {
                uni.showToast({
                    title: 'login first',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                });
                return;
            }
            this.currentWager = item;
            this.currentBuyType = type;
            this.buyShow = true;
        },
        buyClose() {
            this.buyShow = false;
            this.wagerValue = null;
            this.load();
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

            console.log(wagerRes.transactionHash);
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
    width: 90%;
    height: 60rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;

    .left {
        display: flex;
        font-size: 50rpx;
        font-weight: bold;
        line-height: 60rpx;
    }

    .right {
        display: flex;
        color: #278FFE;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 60rpx;
    }
}

.wager-category {
    width: 90%;
    height: 60rpx;
    margin: 0 auto;
    margin-top: 30rpx;

    .wager-category-rect {
        display: flex;
        justify-content: space-start;
        align-items: end;
        overflow-x: scroll;
        height: 60rpx;
        width: 100%;

        .category-txt {
            height: 40rpx;
            min-width: 50rpx;
            line-height: 40rpx;
            font-size: 28rpx;
            color: #707A8A;
            font-weight: 600;
            padding-right: 30rpx;
            flex-shrink: 0;
        }

        .category-txt-active {
            color: #0F1A1E;
            font-weight: 700;
        }
    }
}

.content-rect {
    width: 90%;
    border: 2rpx #D8DCE1 solid;
    border-radius: 16rpx;
    margin: 0 auto;
    margin-top: 50rpx;
    padding: 30rpx 0;

    .title-rect {
        width: 90%;
        margin: 0 auto;
        height: 100rpx;
        display: flex;
        justify-content: start;
        align-items: center;

        image {
            width: 76rpx;
            height: 76rpx;
            border-radius: 8rpx;
        }

        .title {
            margin-left: 20rpx;
            font-size: 28rpx;
            font-weight: 700;
            line-height: 36rpx;
        }
    }

    .wager-rect {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 40rpx;

        .yes-class {
            width: 292rpx;
            height: 80rpx;
            background: url('/static/yes.png') center center no-repeat;
            background-size: contain;
        }

        .no-class {
            width: 292rpx;
            height: 80rpx;
            background: url('/static/no.png') center center no-repeat;
            background-size: contain;
        }
    }

    .wager-rect-stop {
        width: 100%;
        height: 80rpx;
        margin-top: 40rpx;
        background-color: #D8DCE1;
        border-radius: 8rpx;
        text-align: center;
        line-height: 80rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #909090;
    }

    .statistics-rect {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;
        padding: 0 30rpx;

        .txt {
            color: #707A8A;
            font-size: 24rpx;
            line-height: 32rpx;
        }
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