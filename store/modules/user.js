import {
	getUserInfo
} from '@/api/user.js'

const state = {
	userInfo: uni.getStorageSync('userInfo') || {}
}

const mutations = {
	SET_USER_INFO(state, info) {
		state.userInfo = info
		uni.setStorageSync('userInfo', info)
	},
	CLEAR_USER_INFO(state) {
		state.userInfo = {}
		uni.removeStorageSync('userInfo')
	}
}

const actions = {
	async fetchUserInfo({
		commit
	}) {
		try {
			const res = await getUserInfo()
			commit('SET_USER_INFO', res)
			return res
		} catch (e) {
			console.log('获取用户信息失败:', e)
		}
	},
	clearUser({
		commit
	}) {
		commit('CLEAR_USER_INFO')
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}