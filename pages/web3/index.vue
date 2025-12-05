<template>

	<view class="web3">
		<view class="title">
			Welcome to Metas Web 3.0
		</view>

		<view class="list">
			<view :class="['item bg-wrap']" v-for="(item,index) in list" :key="index">
				<image :src="item.icon" mode="widthFix" :class="['icon bg-img',{show:showFirst}]"></image>
				<image :src="item.icon2" mode="widthFix" :class="['icon icon2 bg-img',{show:!showFirst}]"></image>
				<view class="ai-glow"></view>
				<view class="item_title">
					{{$t(item.titleKey)}}
				</view>
				<view class="item_desc">
					{{$t(item.desceKey)}}
				</view>
				<view class="more flex">
					{{$t(item.more)}}
					<u-icon name="arrow-right" color="#fff" style="margin-left: 20rpx;"></u-icon>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: [{
						title: "数字 AI 脸谱体系",
						titleKey: "web_1",
						desc: "它将成为链上身份、资产绑定、行为表达、游戏角色与社交形象的统一入口。",
						desceKey: "web_2",
						more: "探索更多",
						icon: "/static/web_icon1.png",
						icon2: "/static/web_icon1.png"
					},
					{
						title: "元宇宙 5D 会议",
						titleKey: "web_3",
						desc: "超高拟真的沉浸式虚拟会议空间，让用户通过 5D 数字化身在全球范围内实现实时交流、展示与协作。",
						desceKey: "web_4",
						more: "探索更多",
						icon: "/static/web_icon2.png",
						icon2: "/static/web_icon2.png"
					},
					{
						title: "全球预测市场",
						titleKey: "web_5",
						desc: "搭建全球级预测系统，通过预言机网络把真实世界事件同步至链上。",
						desceKey: "web_6",
						more: "探索更多",
						icon: "/static/web_icon3.png",
						icon2: "/static/web_icon3.png"
					},
					{
						title: "社交应用网络",
						titleKey: "web_7",
						desc: "利用 AI 技术构建全新的 Web3 社交网络，跨社交、娱乐、工作、链游的“AI 社交应用生态体系”。",
						desceKey: "web_8",
						more: "探索更多",
						icon: "/static/web_icon4.png",
						icon2: "/static/web_icon4.png"
					}
				],
				showFirst: true,
				timer: null
			}
		},
		methods: {

		},
		onLoad() {
			this.timer = setInterval(() => {
				this.showFirst = !this.showFirst
			}, 3000)
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		}
	}
</script>

<style lang="scss" scoped>
	.web3 {
		padding: 0 32rpx;

		.title {
			font-weight: 600;
			font-size: 50rpx;
			text-align: center;
			white-space: nowrap;
			margin: 60rpx 0;
		}

		.list {
			.item {
				height: 334rpx;
				margin-bottom: 16rpx;
				border-radius: 20rpx;
				overflow: hidden;
				padding: 38rpx 34rpx;
				display: flex;
				flex-direction: column;

				.icon,
				.icon2 {
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 1;
					left: 0;
					top: 0;
					opacity: 0;
					transition: opacity 1.2s ease-in-out;
				}

				.icon2 {
					z-index: 2;
				}

				.show {
					opacity: 1;
				}

				&:nth-child(1) {
					background-color: #030607;
				}

				&:nth-child(2) {
					background-color: #f4911a;
				}

				&:nth-child(3) {
					background-color: #2a2b6e;
				}

				&:nth-child(4) {
					background-color: #63c8b1;
				}

				.item_title {
					color: #fff;
					position: relative;
					z-index: 22;
					font-size: 40rpx;
					font-weight: 600;
					margin-bottom: 12rpx;
				}

				.item_desc {
					width: 432rpx;
					font-size: 24rpx;
					color: #ffffff;
					position: relative;
					z-index: 22;
					flex: 1;
				}

				.more {
					color: #fff;
					font-size: 32rpx;
					position: relative;
					z-index: 22;
				}
			}
		}
	}

	.bg-wrap {
		position: relative;
		// overflow: hidden;
	}


	/* 浮动效果 */
	.float {
		animation: floatBg 8s ease-in-out infinite;
	}

	@keyframes floatBg {
		0% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-8px);
		}

		100% {
			transform: translateY(0);
		}
	}

	/* 呼吸光效 */
	.bg-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 60% 40%, rgba(0, 200, 255, .25), transparent 70%);
		z-index: 2;
		animation: glow 4s ease-in-out infinite;
	}

	@keyframes glow {
		0% {
			opacity: .5;
		}

		50% {
			opacity: .9;
		}

		100% {
			opacity: .5;
		}
	}


	/* 扫描线 */
	.scan-line {
		position: absolute;
		top: -100%;
		left: 0;
		width: 100%;
		height: 200%;
		background: linear-gradient(transparent, rgba(0, 255, 255, .15), transparent);
		animation: scan 5s linear infinite;
		z-index: 3;
	}

	@keyframes scan {
		0% {
			top: -100%;
		}

		100% {
			top: 100%;
		}
	}

	/* 能量波动 */
	.energy-layer {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, rgba(0, 255, 255, .2), transparent 70%);
		animation: pulse 3s infinite;
		z-index: 2;
	}

	@keyframes pulse {
		0% {
			opacity: .4;
		}

		50% {
			opacity: .8;
		}

		100% {
			opacity: .4;
		}
	}

	.ai-bg-wrap {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: #000;
	}

	/* 背景图 */
	.ai-bg-img {
		width: 100%;
		height: 100%;
		position: absolute;
		opacity: .9;
	}

	/* 呼吸光 */
	.ai-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 60% 40%, rgba(0, 180, 255, .35), transparent 70%);
		animation: glow 4s ease-in-out infinite;
	}

	@keyframes glow {
		0% {
			opacity: .4;
		}

		50% {
			opacity: .9;
		}

		100% {
			opacity: .4;
		}
	}

	/* 扫描线 */
	.ai-scan {
		position: absolute;
		top: -120%;
		width: 100%;
		height: 200%;
		background: linear-gradient(transparent, rgba(0, 255, 255, .15), transparent);
		animation: scan 5s linear infinite;
	}

	@keyframes scan {
		0% {
			top: -120%;
		}

		100% {
			top: 120%;
		}
	}

	/* 能量脉冲 */
	.ai-energy {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, rgba(0, 255, 255, .25), transparent 60%);
		animation: pulse 3s ease-in-out infinite;
	}

	@keyframes pulse {
		0% {
			opacity: .3;
		}

		50% {
			opacity: .7;
		}

		100% {
			opacity: .3;
		}
	}

	/* 流光效果 */
	.ai-flow {
		position: absolute;
		inset: -50%;
		background: linear-gradient(120deg, transparent, rgba(0, 255, 255, .2), transparent);
		animation: flow 6s linear infinite;
	}

	@keyframes flow {
		0% {
			transform: translateX(-50%) rotate(10deg);
		}

		100% {
			transform: translateX(50%) rotate(10deg);
		}
	}
</style>