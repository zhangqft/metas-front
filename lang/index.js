import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'

Vue.use(VueI18n)

// 导入纯 key-value JSON 文件
const messages = {
	en: require('./en.json'),
	// 'zh-cn': require('./zh-cn.json'),
	'zh-tw': require('./zh-Hant.json'),
	ko: require('./ko.json'),
	ja: require('./ja.json'),
	vi: require('./vi.json')
}

// 映射系统语言 -> 我们支持的语言
const langMap = {
	// 'zh-cn': 'zh-cn',
	// 'zh-tw': 'zh-tw',
	'en': 'en',
	'en-us': 'en',
	'ko': 'ko',
	'ko-kr': 'ko',
	'ja': 'ja',
	'ja-jp': 'ja',
	'vi': 'vi',
	'vi-vn': 'vi',

	'en-US': 'en',
	'ko-KR': 'ko',
	'zh-TW': 'zh-tw',
	'ja-JP': 'ja',
	'vi-VN': 'vi-vn',
}

function detectLanguage() {
	try {
		const sysLang = (uni.getSystemInfoSync().language || 'en').toLowerCase()
		console.log(sysLang)
		const found = Object.keys(langMap).find(k => sysLang.startsWith(k))
		return langMap[found] || 'en'
	} catch (e) {
		return 'en'
	}
}

const locale = store?.state?.app?.language || detectLanguage()

let lang = uni.getStorageSync('language')

if (!lang) {
	uni.setStorageSync('language', locale)
	store.dispatch('app/changeLanguage', locale)
}

const i18n = new VueI18n({
	locale,
	messages
})

export default i18n