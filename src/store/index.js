import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: true,
    lists: [],
    curList: null,
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
    },
    setCurList(state, item){
      state.curList = item
    }
  },
  actions: {
    async fetchList({commit}, playload){
      let result = await axios.post('/store/list',playload)
      commit('setList',result.data)
      return result;
    },
    // async fetchCurList({commit}, playload){
    //   let result = await axios.post('/store/curlist',playload)
    //   commit('setCurList',playload)
    //   return result;
    // }
  },
  modules: {
  }
})
