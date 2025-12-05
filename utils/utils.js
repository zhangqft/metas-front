export default {
	setTabText: function (that) {
		uni.setTabBarItem({
			index: 0,
			text: that.$t('earn')
		})
		uni.setTabBarItem({
			index: 1,
			text: that.$t('earnings')
		})
		uni.setTabBarItem({
			index: 2,
			text: that.$t('deal_text')
		})
	},
}