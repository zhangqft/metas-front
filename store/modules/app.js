
const state = {

	language: uni.getStorageSync('language') || '' // 新增字段
}

const mutations = {

	SET_LANGUAGE(state, lang) {
		state.language = lang
		uni.setStorageSync('language', lang)
	}
}

const actions = {
	saveToken({
		commit
	}, token) {
		commit('SET_TOKEN', token)
	},
	logout({
		commit
	}) {
		commit('CLEAR_TOKEN')
	},
	changeLanguage({
		commit
	}, lang) {
		commit('SET_LANGUAGE', lang)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}