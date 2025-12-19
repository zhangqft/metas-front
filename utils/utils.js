export default {
	setTabText: function (that) {
		uni.setTabBarItem({
			index: 0,
			text: that.$t('wager')
		})
		uni.setTabBarItem({
			index: 1,
			text: that.$t('earn')
		})
		uni.setTabBarItem({
			index: 2,
			text: that.$t('earnings')
		})

		uni.setTabBarItem({
			index: 3,
			text: that.$t('trade')
		})
	},
}