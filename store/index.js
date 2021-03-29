export const state = () => ({
  userInfo: null,
})

export const mutations = {
  userInfo(state, data) {
    if (data.isLogout) {
      state.userInfo = null
    } else {
      state.userInfo = Object.assign({}, state.userInfo, data) // 强制赋新值，解决改变子属性不更新DOM问题
    }
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    const { code, data } = await $axios.post('/api/user/info')
    if (code === 0) {
      commit('userInfo', data)
    }
  },
}

export const getters = {
  isLogin: (state) => {
    return state.userInfo !== null
  },
}
