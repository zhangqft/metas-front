<template>
	<view class="layout">
		<!-- 顶部栏 -->
		<Header @openSidebar="toggleSidebar" />

		<!-- 主内容 -->
		<!-- <view class="content">
			<slot></slot>
		</view> -->

		<!-- 左侧弹出的侧边栏 -->
		<view class="sidebar-mask" v-if="showSidebar" @click="closeSidebar"></view>

		<view class="sidebar" :class="{ show: showSidebar }">
			<Sidebar @close="closeSidebar" />
		</view>
	</view>
</template>

<script>
	import Header from './Header.vue'
	import Sidebar from './Sidebar.vue'

	export default {
		components: {
			Header,
			Sidebar
		},
		data() {
			return {
				showSidebar: false
			}
		},
		methods: {
			toggleSidebar() {
				this.showSidebar = !this.showSidebar
			},
			closeSidebar() {
				this.showSidebar = false
			}
		}
	}
</script>

<style scoped>
	.layout {
		/* height: 100vh; */
		display: flex;
		flex-direction: column;
		position: relative;
		/* overflow: hidden; */
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 222;
	}

	.content {
		flex: 1;
		background-color: #f8f8f8;
		padding: 20rpx;
		overflow-y: auto;
	}

	/* 遮罩层 */
	.sidebar-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		z-index: 99;
	}

	/* 侧边栏样式 */
	.sidebar {
		position: fixed;
		top: 0;
		left: -500rpx;
		/* width: 500rpx; */
		width: 320rpx;
		height: 100%;
		background-color: #fff;
		z-index: 100;
		transition: left 0.3s ease;
		box-shadow: 4rpx 0 10rpx rgba(0, 0, 0, 0.1);
		overflow-y: scroll;
	}

	.sidebar.show {
		left: 0;
	}
</style>