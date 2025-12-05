<template>
	<view class="progress-bar">
		<!-- 外层容器 -->
		<view class="progress-track">
			<!-- 进度条 -->
			<view class="progress-fill" :style="{
          width: progressWidth,
          background: color,
          transition: animated ? 'width 0.4s ease' : 'none'
        }"></view>
		
		{{progressWidth}}
		</view>

	</view>
</template>

<script>
	export default {
		name: "ProgressBar",
		props: {
			value: {
				type: Number,
				default: 0
			},
			total: {
				type: Number,
				default: 0
			},
			color: {
				type: String,
				default: "#4CAF50" // 默认绿色
			},

			animated: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			// 百分比（保留 1 位小数）
			percentage() {
				if (this.total === 0) return 0
				return ((this.value / this.total) * 100).toFixed(1)
			},
			// 宽度
			progressWidth() {
				return `${this.percentage}%`
			}
		}
	}
</script>

<style scoped>
	.progress-bar {
		display: flex;
		align-items: center;
	}

	.progress-track {
		flex: 1;
		height: 12rpx;
		background-color: #eee;
		border-radius: 999rpx;
		overflow: hidden;
		position: relative;
	}

	.progress-fill {
		height: 100%;
		border-radius: 999rpx;
	}

	.progress-text {
		margin-left: 12rpx;
		font-size: 24rpx;
		color: #333;
		min-width: 60rpx;
		text-align: right;
	}
</style>