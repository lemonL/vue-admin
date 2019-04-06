import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 保存数据变量
const state = {
  username: ''
}
// 修改数据
const mutations = {
  setUserName: (state, username) => {
    state.username = username
    localStorage.setItem('username', username)
  }
}
const actions = {}
const getters = {
  getUserName: (state) => localStorage.getItem('username')
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
