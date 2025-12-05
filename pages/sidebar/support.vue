<template>

	<view class="support">
		<Layout></Layout>
		<view class="content">
			<view class="title flex">
				<image src="@/static/support_icon.png" mode="widthFix" class="icon"></image> {{$t('support')}}
			</view>
			<view class="lang" v-if="$store.state.app.language=='en'">
				Visit our <text class="mark" @click="mark">documentation</text> ，{{$t('know_Protocol')}}
			</view>
			<view class="lang" v-else-if="$store.state.app.language=='ko'">
				우리의 <text class="mark" @click="mark">문서</text>를 방문하세요 ，{{$t('know_Protocol')}}
			</view>
			<view class="lang" v-else-if="$store.state.app.language=='vi'">
				Truy cập <text class="mark" @click="mark">tài liệu</text> của chúng tôi ，{{$t('know_Protocol')}}
			</view>
			<view class="lang" v-else-if="$store.state.app.language=='zh-tw'">
				訪問我們的 <text class="mark" @click="mark">文檔</text>，{{$t('know_Protocol')}}
			</view>
			<view class="lang" v-else-if="$store.state.app.language=='ja'">
				私たちの <text class="mark" @click="mark">ドキュメント</text> をご覧ください，{{$t('know_Protocol')}}
			</view>


			<view class="desc">
				{{$t('technology')}}
			</view>
			<view class="Email">
				metasprotocol@sina.com
			</view>

			<view class="sendEmail">
				<uni-link href="mailto:metasprotocol@sina.com" text="metasprotocol@sina.com" font-size="14" color="#fff"
					style="text-decoration:auto;">{{$t('发送邮件')}}</uni-link>
			</view>

		</view>
	</view>

</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				lang: ''
			}
		},
		methods: {
			mark() {
				if (store.state.app.language == 'zh-tw') {
					window.open('https://metas-1.gitbook.io/metas-docs')
				} else {
					window.open('https://metas-1.gitbook.io/metas-docs/en')
				}

			},
		},
		onLoad() {
			console.log('$store.state.app.language=>>>>>', this.$store.state.app.language)
		}
	}
</script>

<style lang="scss" scoped>
	.support {
		.content {
			padding: 0 32rpx;

			.back_icon {
				width: 48rpx;
				height: 48rpx;
				margin-right: 20rpx;
			}

			.title {
				margin: 60rpx 0 20rpx;
				font-size: 50rpx;
				font-weight: 600;
			}

			.icon {
				width: 44rpx;
				margin-right: 26rpx;
			}

			.notice_title {
				font-size: 36rpx;
				font-weight: 500;
			}

			.time {
				color: #909090;
				font-size: 24rpx;
				margin: 32rpx 0 28rpx;
			}

			.notice_content {}

			.desc {
				margin: 48rpx 0 0;
			}
		}


	}

	.lang {
		.mark {
			color: #278ffe;
			margin-left: 6rpx;
		}
	}

	.Email {
		font-weight: 600;
	}

	.sendEmail {
		margin-top: 32rpx;
		padding: 10rpx 32rpx;
		background-color: #278ffe;
		border-radius: 8rpx;
		display: inline-block;
		color: #fff;
	}
</style>