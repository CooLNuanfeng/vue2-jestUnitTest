import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: true,
    lists: []
  },
  getters: {
    getLoginStatus(state){
      return state.isLogin
    }
  },
  mutations: {
    setLogin(state,status){
      state.isLogin = status
    },
    setList(state, lists){
      state.lists = lists
    }
  },
  actions: {
    async fetchList({commit}, playload){
      let result = await axios.post('/store/list',playload)
      commit('setList',result.data)
      return result;
    }
  },
  modules: {
  }
})
